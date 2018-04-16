import { Path, GET, POST, PUT, DELETE, PathParam, Errors, Context, ServiceContext } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import UserSpecialBetSingle from '../models/userSpecialBetSingle.model'
import { IUserSpecialBetSingle } from '../types/models.d'

@Path('/api/leagues/:leagueId/user/bets/single')
export default class UserSpecialBetSinglesController {
    @Context
    context: ServiceContext

    @Inject
    private database: Database

    @PathParam('leagueId')
    leagueId: number

    @GET
    async getUserSpecialBetSingles(): Promise<IUserSpecialBetSingle[]> {
        const leagueUser = await this.database.models.LeagueUser.findOne({
          where: { userId: this.context.request['user'].id, leagueId: this.leagueId }})
        if (!leagueUser) {
          throw new Error('User not signed into league.')
        }

        return await this.database.models.UserSpecialBetSingle.findAll({
          include: [
            {model: this.database.models.LeagueTeam, as: 'teamResult', include: [this.database.models.Team]},
            {model: this.database.models.LeaguePlayer, as: 'playerResult', include: [this.database.models.Player]},
          ],
          where: {leagueUserId: leagueUser.id} })
    }

    @GET
    @Path(':id')
    async getUserSpecialBetSingle(@PathParam('id') userSpecialBetSingleId: number): Promise<IUserSpecialBetSingle> {
        try {
            const userSpecialBetSingle = await this.database.models.UserSpecialBetSingle.findById(userSpecialBetSingleId)

            if (!userSpecialBetSingle) {
                throw new Error('not found')
            }

            return userSpecialBetSingle
        } catch (e) {
            throw new Errors.NotFoundError('User special bet Single not found.')
        }
    }

    @POST
    async createUserSpecialBetSingle(userSpecialBetSingle: any): Promise<IUserSpecialBetSingle> {
        return await this.database.models.UserSpecialBetSingle.create(userSpecialBetSingle)
    }

    @PUT
    @Path(':id')
    async updateUserSpecialBetSingle(@PathParam('id') userSpecialBetSingleId: number, userSpecialBetSingle: any): Promise<IUserSpecialBetSingle> {
        const dbUserSpecialBetSingle = await this.database.models.UserSpecialBetSingle.findById(userSpecialBetSingleId)

        if (dbUserSpecialBetSingle) {
          const leagueUser = await this.database.models.LeagueUser.findOne({where: { userId: this.context.request['user'].id, leagueId: this.leagueId }})
          if (leagueUser && leagueUser.id === dbUserSpecialBetSingle.leagueUserId) {
            return await dbUserSpecialBetSingle.update(userSpecialBetSingle)
          }

          throw new Error('User not signed into this league.')
        } else {
          const leagueUser = await this.database.models.LeagueUser.findOne({where: { userId: this.context.request['user'].id, leagueId: this.leagueId }})

          if (leagueUser) {
              userSpecialBetSingle.leagueUserId = leagueUser.id
              userSpecialBetSingle.dateTime = new Date()
              return await this.database.models.UserSpecialBetSingle.create(userSpecialBetSingle)
          }

          throw new Error('User not signed into this league.')
        }
    }

    @DELETE
    @Path(':id')
    async deleteUserSpecialBetSingle(@PathParam('id') userSpecialBetSingleId: number): Promise<void> {
        const dbUserSpecialBetSingle = await this.database.models.UserSpecialBetSingle.findById(userSpecialBetSingleId)

        if (dbUserSpecialBetSingle) {
            await dbUserSpecialBetSingle.destroy()
        }
    }

}
