import { Path, GET, POST, PUT, DELETE, PathParam, Errors, Context, ServiceContext } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import UserSpecialBetSerie from '../models/userSpecialBetSerie.model'
import { IUserSpecialBetSerie } from '../types/models.d'
import User from '../models/user.model'

@Path('/api/leagues/:leagueId/user/bets/series')
export default class UserSpecialBetSeriesController {
  @Context
  context: ServiceContext

  @Inject
  private database: Database

  @PathParam('leagueId')
  leagueId: number

  @PUT
  @Path(':id')
  async updateUserSpecialBetSerie(@PathParam('id') userSpecialBetSerieId: number = 0, userSpecialBetSerie: any): Promise<IUserSpecialBetSerie> {
    const dbUserSpecialBetSerie = await this.database.models.UserSpecialBetSerie.findById(userSpecialBetSerieId)

    // const specialBetSerie = await this.database.models.leagueSpecialBetSerie.findById(userSpecialBetSerie.leagueSpecialBetSerieId)
    // if (new Date().getTime() >= new Date(specialBetSerie.dateTime).getTime()) {
    //   throw new Error('It\'s too late')
    // }

    if (dbUserSpecialBetSerie) {
      // check if userId match

      const leagueUser = await this.database.models.LeagueUser.findOne({where: { userId: (this.context.request['user'] as User).id, leagueId: this.leagueId }})
      if (leagueUser && leagueUser.id === dbUserSpecialBetSerie.leagueUserId) {
        return await dbUserSpecialBetSerie.update(userSpecialBetSerie)
      }

      throw new Error('User not signed into this league.')
    } else {
      const leagueUser = await this.database.models.LeagueUser.findOne({where: { userId: (this.context.request['user'] as User).id, leagueId: this.leagueId }})

      if (leagueUser) {
          userSpecialBetSerie.leagueUserId = leagueUser.id
          userSpecialBetSerie.dateTime = new Date()
          return await this.database.models.UserSpecialBetSerie.create(userSpecialBetSerie)
      }

      throw new Error('User not signed into this league.')
    }
  }
}
