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
  @Path('/:leagueId/bets/matches/')
  async getBetsMatches(@PathParam('leagueId') leagueId: number, @QueryParam('date') date: string): Promise<IMatch[]> {
    const leagueUser = await this.database.models.LeagueUser.findOne({where: { userId: this.context.request['user'].id, leagueId: leagueId }})

    // TODO refactor
    const actual = new Date()
    const previous = new Date()
    const next = new Date()
    previous.setDate(actual.getDate() - 60)
    next.setDate(actual.getDate() + 2)

    return this.database.query(`SELECT "Match"."overtime" as "matchOvertime",
      "Match"."dateTime" as "matchDateTime", "Match"."id" AS "matchId1", "Match"."homeScore" AS "matchHomeScore", "Match"."awayScore" AS "matchAwayScore",
      "UserBet".*, "Match"."homeTeamId", "Match"."awayTeamId",
      (SELECT "Team"."name" FROM "Team" LEFT JOIN "LeagueTeam" ON "LeagueTeam"."teamId" = "Team"."id" WHERE "LeagueTeam"."id" = "Match"."homeTeamId") AS "homeTeam",
      (SELECT "Team"."name" FROM "Team" LEFT JOIN "LeagueTeam" ON "LeagueTeam"."teamId" = "Team"."id" WHERE "LeagueTeam"."id" = "Match"."awayTeamId") AS "awayTeam",
      (SELECT "Player"."firstName" FROM "Player" LEFT JOIN "LeaguePlayer" ON "LeaguePlayer"."playerId" = "Player"."id" WHERE "LeaguePlayer"."id" = "UserBet"."scorerId") AS "scorer"
      FROM "Match"
      LEFT JOIN "UserBet" ON ("Match"."id" = "UserBet"."matchId" AND "UserBet"."leagueUserId" = ${leagueUser.id})
      WHERE "Match"."leagueId" = ${leagueId}
      AND "Match"."dateTime" >= '${previous.toISOString().substring(0, 10)}' AND "Match"."dateTime" <= '${next.toISOString().substring(0, 10)}'
      ORDER BY "Match"."dateTime" DESC`, { type: this.database.QueryTypes.SELECT})
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
    return await this.database.models.League.create(league)
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
