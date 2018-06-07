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
}
