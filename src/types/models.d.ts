export interface ILeague {
  id: number
  name: string
  sportId: number
  isActive: boolean
  isTheMostActive: boolean
  isFinished: boolean
  seasonFrom: number
  seasonTo: number
}

export interface ILeaguePlayer {
    id: number
    leagueTeamId: number
    playerId: number
    seasonGames: number
    seasonGoals: number
    seasonAssists: number
    bestScorer: boolean
    secondBestScorer: boolean
    thirdBestScorer: boolean
    fourthBestScorer: boolean
}

export interface ILeagueSpecialBetSerie {
  id: number
  leagueId: number
  specialBetSerieId: number
  homeTeamId: number
  awayTeamId: number
  homeTeamScore: number
  awayTeamScore: number
  dateTime: Date
}

export interface ILeagueSpecialBetSingle {
  id: number
  leagueId: number
  specialBetSingleId: number
  specialBetTeamResultId: number
  specialBetPlayerResultId: number
  specialBetValue: number
  dateTime: Date
}

export interface ILeagueTeam {
  id: number
  leagueId: number
  teamId: number
}

export interface ILeagueUser {
    id: number
    leagueId: number
    userId: number
    paid: boolean
    active: boolean
}

export interface IMatch {
    id: string
    leagueId: number
    league: ILeague
    gameNumber: number
    dateTime: Date
    homeTeamId: number
    homeTeam: ITeam
    awayTeamId: number
    awayTeam: ITeam
    homeScore: number
    awayScore: number
    overtime: boolean
    shootout: boolean
    homeWinner: boolean
    isEvaluated: boolean
    externalId: number
    scorers: Array<number>
    doubled: boolean
}

export interface IMatchScorer {
  matchId: number
  scorerId: number
  numberOfGoals: number
}

export interface IPlayer {
  id: number
  firstName: string
  lastName: string
  isActive: boolean
}

export interface ISpecialBetSerie {
  id: number
  bestOf: number
  name: string
}

export interface ISpecialBetSingle {
    id: number
    sportId: number
    specialBetType: number
    name: string
}

export interface ISport {
  id: number
  name: string
}

export interface ITeam {
  id: number
  name: string
  nickname: string
  shortcut: string
  sportId: string
}

export interface IUser {
    id: number
    email: string
    firstName: string
    lastName: string
    username: string
    mobileNumber: string
    password: string
}

export interface IUserBet {
  id: number
  matchId: number
  leagueUserId: number
  dateTime: Date
  homeScore: number
  awayScore: number
  homeWinner: boolean
  scorerId: number
}

export interface IUserRequest {
  id: number
  userId: number
  leagueId: number
  decided: boolean
  accepted: boolean
}

export interface IUserSetting {
  id: number
  leagueUserId: number
  emailBetNotification: boolean
  emailBetNotificationValue: number
  emailRankingNotification: boolean
  emailRankingNotificationValue: number
}

export interface IUserSpecialBetSerie {
  id: number
  leagueSpecialBetSerieId: number
  leagueUserId: number
  homeTeamScore: number
  awayTeamScore: number
  dateTime: Date
}

export interface IUserSpecialBetSingle {
  id: number
  leagueSpecialBetSingleId: number
  leagueUserId: number
  bet: string
  dateTime: Date
}
