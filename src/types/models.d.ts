export interface IMatch {
  id: number,
  leagueId: number,
  gameNumber: number,
  dateTime: Date,
  homeTeamId: number,
  awayTeamId: number,
  homeScore: number,
  awayScore: number,
  overtime: boolean,
  shotout: boolean,
  homeWinner: boolean,
  isEvaluated: boolean
}

export interface ILeague {
  id: number,
  name: string
  sportId: number
  isActive: boolean
  isTheMostActive: boolean
  seasonFrom: number
  seasonTo: number
  isFinished: boolean
}

export interface IMatchScorer {
  matchId: number
  scorerId: number
  numberOfGoals: number
}

export interface IPlayer {
  id: string
  firstName: string
  lastName: string
  teamId: number
  seasonFrom: number
  seasonTo: number
  bestScorer: boolean
  isActive: boolean
  seasonGames: number
  seasonGoals: number
  seasonAssists: number
}

export interface ISpecialBet {
  id: number
  key: string
}

export interface ISpecialBetResult {
  id: number
  leagueId: number
  specialBetId: number
  specialBetResult: string
  seriesHomeTeamId: number
  seriesAwayTeamId: number
  seriesHomeTeamResult: number
  seriesAwayTeamResult: number
}

export interface ISport {
  id: number
  czName: string
  engName: string
  value: string
}

export interface ITeam {
  id: number
  czName: string
  engName: string
  value: string
  shortcut: string
  sportId: number
  leagueId: number
}

export interface IUser {
  id: number,
  email: string,
  firstname: string,
  lastname: string,
  username: string,
  mobileNumber: string,
  createdAt: Date,
  updatedAt: Date
}

export interface IUserBet {
  id: number
  matchId: number
  userId: number
  dateTime: Date
  homeScore: number
  awayScore: number
  homeWinner: boolean
  scorerId: number
}

export interface IUserPayment {
  id: number
  userId: number
  leagueId: number
  paid: boolean
  displayed: boolean
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
  userId: number
  leagueId: number
  emailBetNotification: boolean
  emailRankingNotification: boolean
}

export interface IUserSpecialBet {
  id: number
  specialBetId: number
  leagueId: number
  userId: number
  seriesHomeTeamId: number
  seriesAwayTeamId: number
  seriesHomeTeamBet: number
  seriesAwayTeamBet: number
  value: string
  dateTime: Date
}
