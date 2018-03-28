export interface IUser {
  id: string,
  email: string,
  firstname: string,
  lastname: string,
  username: string,
  mobileNumber: string,
  createdAt: Date,
  updatedAt: Date
}
export interface IMatch {
  id: string,
  bettingLeague: string,
  gameNumber: string,
  dateTime: Date,
  homeTeam: string,
  awayTeam: string,
  homeScore: string,
  awayScore: string,
  overtime: boolean,
  shotout: boolean,
  winner: boolean,
  isEvaluated: boolean
}
export interface ILeague {
  id: string,
  name: string
  sport: string
  isActive: boolean
  isTheMostActive: boolean
  seasonFrom: string
  seasonTo: string
  isFinished: boolean
}
export interface IMatchScorer {
  matchId: string
  scorerId: string
  numberOfGoals: string
}
export interface IPlayer {
  id: string
  firstName: string
  lastName: string
  team: string
  seasonFrom: string
  seasonTo: string
  bestScorer: string
  isActive: boolean
  seasonGames: string
  seasonGoals: string
  seasonAssists: string
}
export interface ISpecialBet {
  id: string
  key: string
}
export interface ISpecialBetResult {
  id: string
  bettingLeagueId: string
  specialBetId: string
  seriesHomeTeam: string
  seriesAwayTeam: string
  specialBetResult: string
}
export interface ISport {
  id: string
  czName: string
  engName: string
  value: string
}
export interface ITeam {
  id: string
  czName: string
  engName: string
  value: string
  shortcut: string
  sport: string
  league: string
}
export interface IUserBet {
  id: string
  matchId: string
  userId: string
  dateTime: Date
  homeScore: string
  awayScore: string
  homeWinner: boolean
  scorer: string
}
export interface IUserPayment {
  id: string
  userId: string
  bettingLeagueId: string
  paid: boolean
  displayed: boolean
}
export interface IUserRequest {
  id: string
  userId: string
  bettingLeagueId: string
  decided: boolean
  accepted: boolean
}
export interface IUserSetting {
  id: string
  userId: number
  bettingLeagueId: number
  emailBetNotification: boolean
  emailRankingNotification: boolean
}
export interface IUserSpecialBet {
  id: string
  specialBetId: number
  bettingLeagueId: number
  userId: number
  seriesHomeTeam: number
  seriesAwayTeam: number
  specialBet: number
  dateTime: Date
}
