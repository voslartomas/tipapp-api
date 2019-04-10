import { Path, GET, POST, PUT, DELETE, PathParam, QueryParam, Errors, Context, ServiceContext } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import League from '../models/league.model'
import { ILeague } from '../types/models.d'
import { IMatch, IPlayer, ITeam, ILeagueTeam } from '../types/models'
import Match from '../models/match.model'
import Player from '../models/player.model'
import LeagueTeam from '../models/leagueTeam.model'

@Path('/api/leagues')
export default class LeaguesController {
  @Inject
  private database: Database

  @Context
  context: ServiceContext

  @GET
  async getLeagues(): Promise<ILeague[]> {
    return await this.database.models.League.findAll({})
  }

  @GET
  @Path('/active')
  async getActiveLeagues(): Promise<ILeague[]> {
    return this.database.models.LeagueUser.findAll({where: { userId: this.context.request['user'].id}
      , include: [{model: this.database.models.League, where: {isActive: true}}]
    })
  }

  @GET
  @Path('/:leagueId/matches')
  async getLeagueMatches(@PathParam('leagueId') leagueId: number): Promise<IMatch[]> {
    return await this.database.models.Match.findAll({include: [
        {model: this.database.models.LeagueTeam, as: 'homeTeam', include: [this.database.models.Team]},
        {model: this.database.models.LeagueTeam, as: 'awayTeam', include: [this.database.models.Team]}],
        where: {leagueId: leagueId}})
  }

  @GET
  @Path('/:leagueId/users/bets/series/')
  async getBetsSpecial(@PathParam('leagueId') leagueId: number) {
    const leagueUser = await this.database.models.LeagueUser.findOne({where: { userId: this.context.request['user'].id, leagueId: leagueId }})

    return this.database.query(`SELECT "Serie"."dateTime" AS "endDate", "Serie"."homeTeamScore" AS "serieHomeScore", "Serie"."awayTeamScore" AS "serieAwayScore",
      "UserSpecialBetSerie".*, "Serie"."id" AS "leagueSpecialBetSerieId",
      (SELECT "Team"."name" FROM "Team" LEFT JOIN "LeagueTeam" ON "LeagueTeam"."teamId" = "Team"."id" WHERE "LeagueTeam"."id" = "Serie"."homeTeamId") AS "homeTeam",
      (SELECT "Team"."name" FROM "Team" LEFT JOIN "LeagueTeam" ON "LeagueTeam"."teamId" = "Team"."id" WHERE "LeagueTeam"."id" = "Serie"."awayTeamId") AS "awayTeam"
      FROM "LeagueSpecialBetSerie" AS "Serie"
      LEFT JOIN "UserSpecialBetSerie" ON ("Serie"."id" = "UserSpecialBetSerie"."leagueSpecialBetSerieId" AND "UserSpecialBetSerie"."leagueUserId" = ${leagueUser.id})
      WHERE "Serie"."leagueId" = ${leagueId}
      ORDER BY "Serie"."dateTime" DESC`, { type: this.database.QueryTypes.SELECT})
  }

  @GET
  @Path('/:leagueId/users/bets/single/')
  async getBetsSingle(@PathParam('leagueId') leagueId: number) {
    const leagueUser = await this.database.models.LeagueUser.findOne({where: { userId: this.context.request['user'].id, leagueId: leagueId }})

    return this.database.query(`SELECT "Single"."dateTime", "SpecialBetSingle"."name", "SpecialBetSingle"."specialBetType" AS "type",
      "UserSpecialBetSingle".*, "Single"."id" AS "singleId", "UserSpecialBetSingle"."id" AS "betId", "Single"."dateTime" AS "endDate",
      (SELECT "Team"."name" FROM "Team" LEFT JOIN "LeagueTeam" ON "LeagueTeam"."teamId" = "Team"."id" WHERE "LeagueTeam"."id" = "Single"."specialBetTeamResultId") AS "team",
      (SELECT "Team"."name" FROM "Team" LEFT JOIN "LeagueTeam" ON "LeagueTeam"."teamId" = "Team"."id" WHERE "LeagueTeam"."id" = "UserSpecialBetSingle"."teamResultId") AS "teamBet",
      (SELECT CONCAT("Player"."firstName", ' ', "Player"."lastName") FROM "Player" LEFT JOIN "LeaguePlayer" ON "LeaguePlayer"."playerId" = "Player"."id" WHERE "LeaguePlayer"."id" = "Single"."specialBetPlayerResultId") AS "player",
      (SELECT CONCAT("Player"."firstName", ' ', "Player"."lastName") FROM "Player" LEFT JOIN "LeaguePlayer" ON "LeaguePlayer"."playerId" = "Player"."id" WHERE "LeaguePlayer"."id" = "UserSpecialBetSingle"."playerResultId") AS "playerBet",
      "Single"."specialBetValue" AS "value",
      "UserSpecialBetSingle"."value" AS "valueBet"
      FROM "LeagueSpecialBetSingle" AS "Single"
      LEFT JOIN "SpecialBetSingle" ON ("Single"."specialBetSingleId" = "SpecialBetSingle"."id")
      LEFT JOIN "UserSpecialBetSingle" ON ("Single"."id" = "UserSpecialBetSingle"."leagueSpecialBetSingleId" AND "UserSpecialBetSingle"."leagueUserId" = ${leagueUser.id})
      WHERE "Single"."leagueId" = ${leagueId}
      ORDER BY "Single"."dateTime" DESC`, { type: this.database.QueryTypes.SELECT})
  }

  @GET
  @Path('/:leagueId/bets/matches/')
  async getBetsMatches(
    @PathParam('leagueId') leagueId: number,
    @QueryParam('order') order: string = 'DESC',
    @QueryParam('history') history: boolean = true,
    @QueryParam('limitDays') limitDays: number = 5): Promise<IMatch[]> {

    const leagueUser = await this.database.models.LeagueUser.findOne({where: { userId: this.context.request['user'].id, leagueId: leagueId }})

    const today = new Date().toISOString().substring(0, 10)
    let whereDate
    if (!history) {
      const toDate = new Date()
      toDate.setDate(new Date().getDate() + limitDays)
      const toDateString = toDate.toISOString().substring(0, 10)
      whereDate = `"Match"."dateTime" >= '${today}' AND "Match"."dateTime" <= '${toDateString}'`
    } else {
      whereDate = `"Match"."dateTime" < '${today}'`
    }

    return this.database.query(`SELECT "Match"."overtime" as "matchOvertime", "Match"."isEvaluated",
      "Match"."dateTime" as "matchDateTime", "Match"."id" AS "matchId1", "Match"."homeScore" AS "matchHomeScore", "Match"."awayScore" AS "matchAwayScore",
      "UserBet".*, "Match"."homeTeamId", "Match"."awayTeamId", "UserBet"."id",
      (SELECT "Team"."name" FROM "Team" LEFT JOIN "LeagueTeam" ON "LeagueTeam"."teamId" = "Team"."id" WHERE "LeagueTeam"."id" = "Match"."homeTeamId") AS "homeTeam",
      (SELECT "Team"."name" FROM "Team" LEFT JOIN "LeagueTeam" ON "LeagueTeam"."teamId" = "Team"."id" WHERE "LeagueTeam"."id" = "Match"."awayTeamId") AS "awayTeam",
      (SELECT CONCAT("Player"."firstName", ' ', "Player"."lastName") FROM "Player" LEFT JOIN "LeaguePlayer" ON "LeaguePlayer"."playerId" = "Player"."id" WHERE "LeaguePlayer"."id" = "UserBet"."scorerId") AS "scorer"
      FROM "Match"
      LEFT JOIN "UserBet" ON ("Match"."id" = "UserBet"."matchId" AND "UserBet"."leagueUserId" = ${leagueUser.id})
      WHERE "Match"."leagueId" = ${leagueId}
      AND ${whereDate}
      ORDER BY "Match"."dateTime" ${order}`, { type: this.database.QueryTypes.SELECT})
  }

  @GET
  @Path('/:leagueId/leaderboard')
  async getLeaderboard(@PathParam('leagueId') leagueId: number): Promise<any> {
    const users = await this.database.query(`SELECT "User"."firstName", "User"."lastName",
      ((SELECT coalesce(SUM("UserBet"."totalPoints"), 0) FROM "UserBet" WHERE "leagueUserId" = "LeagueUser"."id") +
      (SELECT coalesce(SUM("UserSpecialBetSerie"."totalPoints"), 0) FROM "UserSpecialBetSerie" WHERE "leagueUserId" = "LeagueUser"."id") +
      (SELECT coalesce(SUM("UserSpecialBetSingle"."totalPoints"), 0) FROM "UserSpecialBetSingle" WHERE "leagueUserId" = "LeagueUser"."id")) AS "totalPoints"
      FROM "LeagueUser"
      LEFT JOIN "User" ON "LeagueUser"."userId" = "User"."id" WHERE "leagueId" = ${leagueId}
      ORDER BY "totalPoints" DESC`, { type: this.database.QueryTypes.SELECT})

    return users
  }

  @GET
  @Path('/:leagueId/users/bets/single/:singleId')
  async getBetsSingleAllUsers(@PathParam('leagueId') leagueId: number, @PathParam('singleId') singleId: number) {
    const leagueUser = await this.database.models.LeagueUser.findOne({where: { userId: this.context.request['user'].id, leagueId: leagueId }})

    return await this.database.models.UserSpecialBetSingle.findAll({include: [
        {model: this.database.models.LeagueUser, as: 'leagueUser', include: [this.database.models.User]},
        {model: this.database.models.LeagueTeam, as: 'teamResult', include: [this.database.models.Team]},
        {model: this.database.models.LeaguePlayer, as: 'playerResult', include: [this.database.models.Player]},
        ],
        where: {leagueSpecialBetSingleId: singleId}})
  }

  @GET
  @Path('/:leagueId/users/bets/match/:matchId')
  async getBetsMatchAllUsers(@PathParam('leagueId') leagueId: number, @PathParam('matchId') matchId: number) {
    const leagueUser = await this.database.models.LeagueUser.findOne({where: { userId: this.context.request['user'].id, leagueId: leagueId }})

    return await this.database.models.UserBet.findAll({include: [
        {model: this.database.models.LeagueUser, as: 'user', include: [this.database.models.User]},
        {model: this.database.models.LeaguePlayer, as: 'scorer', include: [this.database.models.Player]}
        ],
        where: {matchId: matchId}})
  }

  @GET
  @Path(':id')
  async getLeague(@PathParam('id') leagueId: number): Promise<ILeague> {
    try {
      const league = await this.database.models.League.findById(leagueId)

      if (!league) {
        throw new Error('not found')
      }

      return league
    } catch (e) {
      throw new Errors.NotFoundError('League not found.')
    }
  }

  @POST
  async createLeague(league: any): Promise<ILeague> {
    const dbLeague =  await this.database.models.League.create(league)

    try {
      // add current user as admin
      await this.database.models.LeagueUser.create({
        userId: this.context.request['user'].id,
        leagueId: dbLeague.id,
        admin: true
      })
    } catch (err) {
      console.log(err)
    }

    return dbLeague
  }

  @PUT
  @Path(':id')
  async updateLeague(@PathParam('id') leagueId: number, league: any): Promise<ILeague> {
    const dbLeague = await this.database.models.League.findById(leagueId)

    if (dbLeague) {
      return await dbLeague.update(league)
    } else {
      return await this.database.models.League.create(league)
    }
  }

  @DELETE
  @Path(':id')
  async deleteBetLeague(@PathParam('id') leagueId: number): Promise<void> {
    const dbLeague = await this.database.models.League.findById(leagueId)

    if (dbLeague) {
      await dbLeague.destroy()
    }
  }

  // Teams
  @GET
  @Path('/:leagueId/teams')
  async getTeams(@PathParam('leagueId') leagueId: number): Promise<ITeam[]> {
    const leagueTeams = await this.database.models.LeagueTeam.findAll({
      include: [this.database.models.Team, {model: this.database.models.League, include: [this.database.models.Sport]}],
      where: { leagueId }
    })

    return leagueTeams
  }

  @POST
  @Path('/:id/teams')
  async createTeam(@PathParam('id') leagueId: number, leagueTeam: any): Promise<ILeagueTeam> {
      return await this.database.models.LeagueTeam.create(leagueTeam)
  }

  @DELETE
  @Path('/:leagueId/teams/:id')
  async deleteTeam(@PathParam('id') teamId: number): Promise<void> {
      const dbLeagueTeam = await this.database.models.LeagueTeam.findById(teamId)

      if (dbLeagueTeam) {
          await dbLeagueTeam.destroy()
      }
  }

}
