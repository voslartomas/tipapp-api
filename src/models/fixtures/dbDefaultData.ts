module.exports = {

  BettingLeagues: [
    {
      name: 'Stanley Cup 2018',
      sportId: 2,
      isActive: true,
      isTheMostActive: true,
      seasonFrom: 2017,
      seasonTo: 2018,
      isFinished: false
    },
    {
      name: 'MS Hokej Dánsko 2018',
      sportId: 2,
      isActive: true,
      isTheMostActive: false,
      seasonFrom: 2017,
      seasonTo: 2018,
      isFinished: false
    },
    {
      name: 'MS Fotbal Rusko 2018',
      sportId: 1,
      isActive: true,
      isTheMostActive: false,
      seasonFrom: 2017,
      seasonTo: 2018,
      isFinished: false
    },
    {
      name: 'ME Chorvatsko 2018',
      sportId: 3,
      isActive: true,
      isTheMostActive: false,
      seasonFrom: 2017,
      seasonTo: 2018,
      isFinished: true
    }
  ],

  Matches: [
    {
      leagueId: 1,
      gameNumber: 1,
      dateTime: '2017-11-29 20:00:00',
      homeTeamId: 1,
      awayTeamId: 2,
      homeScore: 5,
      awayScore: 2,
      overtime: false,
      shotout: false,
      winner: 1,
      isEvaluated: true
    },
    {
      leagueId: 1,
      // gameNumber: 2,
      dateTime: '2017-11-29 21:00:00',
      homeTeamId: 3,
      awayTeamId: 4,
      homeScore: 3,
      awayScore: 3,
      overtime: true,
      shotout: false,
      winner: 2,
      isEvaluated: true
    },
    {
      leagueId: 1,
      // gameNumber: 3,
      dateTime: '2017-12-29 20:00:00',
      homeTeamId: 1,
      awayTeamId: 3,
      homeScore: 2,
      awayScore: 4,
      overtime: false,
      shotout: false,
      winner: 1,
      isEvaluated: false
    },
    {
      leagueId: 1,
      // gameNumber: 3,
      dateTime: '2017-12-29 20:00:00',
      homeTeamId: 2,
      awayTeamId: 4,
      homeScore: 5,
      awayScore: 5,
      overtime: false,
      shotout: true,
      winner: 1,
      isEvaluated: true
    },
    {
      leagueId: 1,
      // gameNumber: 3,
      dateTime: '2017-12-30 20:00:00',
      homeTeamId: 1,
      awayTeamId: 4,
      // homeScore: 5,
      // awayScore: 2,
      overtime: false,
      shotout: false,
      winner: 1,
      isEvaluated: false
    },
  ],

  MatchScorers: [
    {
      matchId: 1,
      scorerId: 1,
      numberOfGoals: 1
    },
    {
      matchId: 1,
      scorerId: 2,
      numberOfGoals: 3
    },
    {
      matchId: 2,
      scorerId: 5,
      numberOfGoals: 2
    },
    {
      matchId: 2,
      scorerId: 7,
      numberOfGoals: 1
    },
    {
      matchId: 3,
      scorerId: 2,
      numberOfGoals: 1
    },
    {
      matchId: 3,
      scorerId: 6,
      numberOfGoals: 1
    },
    {
      matchId: 4,
      scorerId: 7,
      numberOfGoals: 1
    },
    {
      matchId: 4,
      scorerId: 8,
      numberOfGoals: 1
    }
  ],

  Players: [
    {
      firstName: 'Tomáš',
      lastName: 'Plekanec',
      team: 1,
      seasonFrom: 2017,
      seasonTo: 2018,
      bestScorer: false,
      isActive: true,
      seasonGames: 75,
      seasonGoals: 12,
      seasonAssists: 31
    },
    {
      firstName: 'Brendan',
      lastName: 'Gallagher',
      team: 1,
      seasonFrom: 2017,
      seasonTo: 2018,
      bestScorer: true,
      isActive: true,
      seasonGames: 69,
      seasonGoals: 19,
      seasonAssists: 15
    },
    {
      firstName: 'John',
      lastName: 'Tavares',
      team: 2,
      seasonFrom: 2017,
      seasonTo: 2018,
      bestScorer: false,
      isActive: true,
      seasonGames: 82,
      seasonGoals: 24,
      seasonAssists: 45
    },
    {
      firstName: 'Brook',
      lastName: 'Nelson',
      team: 2,
      seasonFrom: 2017,
      seasonTo: 2018,
      bestScorer: true,
      isActive: true,
      seasonGames: 75,
      seasonGoals: 29,
      seasonAssists: 26
    },
    {
      firstName: 'Sidney',
      lastName: 'Crosby',
      team: 3,
      seasonFrom: 2017,
      seasonTo: 2018,
      bestScorer: false,
      isActive: true,
      seasonGames: 65,
      seasonGoals: 26,
      seasonAssists: 31
    },
    {
      firstName: 'Jevgenij',
      lastName: 'Malkin',
      team: 3,
      seasonFrom: 2017,
      seasonTo: 2018,
      bestScorer: false,
      isActive: true,
      seasonGames: 79,
      seasonGoals: 23,
      seasonAssists: 25
    },
    {
      firstName: 'Connor',
      lastName: 'McDavid',
      team: 4,
      seasonFrom: 2017,
      seasonTo: 2018,
      bestScorer: true,
      isActive: true,
      seasonGames: 82,
      seasonGoals: 39,
      seasonAssists: 45
    },
    {
      firstName: 'Milan',
      lastName: 'Lucic',
      team: 4,
      seasonFrom: 2017,
      seasonTo: 2018,
      bestScorer: false,
      isActive: true,
      seasonGames: 75,
      seasonGoals: 12,
      seasonAssists: 11
    },
    {
      firstName: 'Neymar',
      lastName: '',
      team: 5,
      seasonFrom: 2017,
      seasonTo: 2018,
      bestScorer: true,
      isActive: true,
      seasonGames: 16,
      seasonGoals: 6
    },
    {
      firstName: 'Ezequiel',
      lastName: 'Garay',
      team: 6,
      seasonFrom: 2017,
      seasonTo: 2018,
      bestScorer: false,
      isActive: true,
      seasonGames: 15,
      seasonGoals: 2
    },
    {
      firstName: 'Thomas',
      lastName: 'Müller',
      team: 7,
      seasonFrom: 2017,
      seasonTo: 2018,
      bestScorer: true,
      isActive: true,
      seasonGames: 8,
      seasonGoals: 6
    },
    {
      firstName: 'Didier',
      lastName: 'Drogba',
      team: 8,
      seasonFrom: 2017,
      seasonTo: 2018,
      bestScorer: true,
      isActive: true,
      seasonGames: 13,
      seasonGoals: 7
    },
  ],

  SpecialBets: [
    {
      key: 'nhlWinner',
    },
    {
      key: 'nhlConferenceWinner',
    },
    {
      key: 'nhlSeriesWinner',
    },
    {
      key: 'nhlMvp',
    },
    {
      key: 'nhlTotalGoals',
    },
    {
      key: 'wcGroupWinner',
    },
    {
      key: 'wcGroupLost',
    },
    {
      key: 'wcWinner',
    },
    {
      key: 'wcBestGoalkeeper',
    },
    {
      key: 'wcBestScorer',
    },
    {
      key: 'wcMvp',
    },
    {
      key: 'wcTotalGoals',
    },
    {
      key: 'footballGroupWinner',
    },
    {
      key: 'footballGroupAdvancer',
    },
    {
      key: 'footballBestScorer',
    },
    {
      key: 'footballBestPlayer',
    },
    {
      key: 'footballBestGoalkeeper',
    },
    {
      key: 'footballTotalGoals',
    },
    {
      key: 'footballTournamentWinner',
    },
    {
      key: 'footballTournamentRunnerUp',
    },
    {
      key: 'footballTournament3rdPlace',
    }
  ],

  SpecialBetsResults: [
    {
      leagueId: 1,
      specialBetId: 1,
      seriesHomeTeam: undefined,
      seriesAwayTeam: undefined,
      specialBetResult: 'PIT'
    },
    {
      leagueId: 1,
      specialBetId: 2,
      seriesHomeTeam: undefined,
      seriesAwayTeam: undefined,
      specialBetResult: 'PIT'
    },
    {
      leagueId: 1,
      specialBetId: 2,
      seriesHomeTeam: undefined,
      seriesAwayTeam: undefined,
      specialBetResult: 'CHI'
    },
    {
      leagueId: 1,
      specialBetId: 4,
      seriesHomeTeam: undefined,
      seriesAwayTeam: undefined,
      specialBetResult: '5'
    },
    {
      leagueId: 1,
      specialBetId: 5,
      seriesHomeTeam: undefined,
      seriesAwayTeam: undefined,
      specialBetResult: '851'
    },
    {
      leagueId: 1,
      specialBetId: 3,
      seriesHomeTeam: 1,
      seriesAwayTeam: 2,
      specialBetResult: '4-3'
    },
    {
      leagueId: 1,
      specialBetId: 3,
      seriesHomeTeam: 2,
      seriesAwayTeam: 4,
      specialBetResult: '2-4'
    }
  ],

  Sports: [
    {
      czName: 'Fotbal',
      engName: 'Football',
      value: 'football'
    },
    {
      czName: 'Lední hokej',
      engName: 'Ice Hockey',
      value: 'iceHockey'
    },
    {
      czName: 'Házená',
      engName: 'Handball',
      value: 'handball'
    },
  ],

  Teams: [
    {
      czName: 'Montreal Canadiens',
      engName: 'Montreal Canadiens',
      value: 'montreal',
      shortcut: 'MTL',
      sport: 2,
      league: 'NHL'
    },
    {
      czName: 'New York Islanders',
      engName: 'New York Islanders',
      value: 'islanders',
      shortcut: 'NYI',
      sport: 2,
      league: 'NHL'
    },
    {
      czName: 'Pittsburgh Penguins',
      engName: 'Pittsburgh Penguins',
      value: 'pittsburgh',
      shortcut: 'PIT',
      sport: 2,
      league: 'NHL'
    },
    {
      name: 'Edmonton Oilers',
      czName: 'Edmonton Oilers',
      engName: 'Edmonton Oilers',
      value: 'edmonton',
      shortcut: 'EDM',
      sport: 2,
      league: 'NHL'
    },
    {
      czName: 'Brazílie',
      engName: 'Brasil',
      value: 'brasil',
      shortcut: 'BRA',
      sport: 1,
      league: 'WCF'
    },
    {
      czName: 'Argentina',
      engName: 'Argentina',
      value: 'argentina',
      shortcut: 'ARG',
      sport: 1,
      league: 'WCF'
    },
    {
      czName: 'Německo',
      engName: 'Germany',
      value: 'germany',
      shortcut: 'GER',
      sport: 1,
      league: 'WCF'
    },
    {
      czName: 'Pobřeží Slonoviny',
      engName: "Côte d'Ivoire",
      value: 'coteDIvoire',
      shortcut: 'CIV',
      sport: 1,
      league: 'WCF'
    }
  ],

  Users: [
    {
      firstname: 'Roman',
      lastname: 'Talaš',
      username: 'admin',
      email: 'rotakt@gmail.com',
      mobileNumber: '724724724',
      password: '12345'
    },
    {
      firstname: 'Petr',
      lastname: 'Novák',
      username: 'user',
      email: 'rotakt@hotmail.com',
      mobileNumber: '724724725',
      password: '12345'
    },
    {
      firstname: 'Martin',
      lastname: 'Nový',
      username: 'user1',
      email: 'ahoj@seznam.com',
      mobileNumber: '724724726',
      password: '12345'
    },
    {
      firstname: 'Miroslav',
      lastname: 'Janíček',
      username: 'user2',
      email: 'ahoj2@seznam.com',
      mobileNumber: '724724727',
      password: '12345'
    },
    {
      firstname: 'Lidumil',
      lastname: 'Lidumilový',
      username: 'user3',
      email: 'ahoj3@seznam.com',
      mobileNumber: '724724728',
      password: '12345'
    }
  ],

  UserBets: [
    {
      matchId: 1,
      userId: 1,
      dateTime: '2016-08-09 04:05:03',
      homeScore: 5,
      awayScore: 1,
      homeWinner: true,
      scorer: 1,
    },
    {
      matchId: 2,
      userId: 1,
      dateTime: '2016-08-09 04:05:03',
      homeScore: 3,
      awayScore: 3,
      homeWinner: true,
      scorer: 2,
    },
    {
      matchId: 3,
      userId: 1,
      dateTime: '2016-08-09 04:05:05',
      homeScore: 2,
      awayScore: 3,
      homeWinner: false,
      scorer: 6,
    },
    {
      matchId: 4,
      userId: 1,
      dateTime: '2016-08-09 04:05:04',
      homeScore: 5,
      awayScore: 2,
      homeWinner: true,
      scorer: 7,
    },
    {
      matchId: 5,
      userId: 1,
      dateTime: '2016-08-09 04:05:02',
      homeScore: 2,
      awayScore: 3,
      homeWinner: false,
      scorer: 8,
    },

    {
      matchId: 1,
      userId: 2,
      dateTime: '2016-08-09 04:06:03',
      homeScore: 5,
      awayScore: 1,
      homeWinner: true,
      scorer: 1,
    },
    {
      matchId: 2,
      userId: 2,
      dateTime: '2016-08-09 04:05:03',
      homeScore: 2,
      awayScore: 2,
      homeWinner: true,
      scorer: 2,
    },
    {
      matchId: 3,
      userId: 2,
      dateTime: '2016-08-09 04:07:05',
      homeScore: 2,
      awayScore: 1,
      homeWinner: true,
      scorer: 6,
    },
    {
      matchId: 4,
      userId: 2,
      dateTime: '2016-08-09 04:15:04',
      homeScore: 5,
      awayScore: 5,
      homeWinner: true,
      scorer: 7,
    },
    {
      matchId: 5,
      userId: 2,
      dateTime: '2016-08-09 04:11:02',
      homeScore: 2,
      awayScore: 4,
      homeWinner: false,
      scorer: 8,
    }

  ],

  UserPayments: [
    {
      userId: 1,
      bettingLeagueId: 1,
      paid: true,
      displayed: true
    },
    {
      userId: 2,
      bettingLeagueId: 1,
      paid: true,
      displayed: true
    },
    {
      userId: 3,
      bettingLeagueId: 1,
      paid: false,
      displayed: true
    },
    {
      userId: 4,
      bettingLeagueId: 1,
      paid: false,
      displayed: true
    },
    {
      userId: 1,
      bettingLeagueId: 2,
      paid: true,
      displayed: true
    },
    {
      userId: 2,
      bettingLeagueId: 2,
      paid: false,
      displayed: true
    },
    {
      userId: 3,
      bettingLeagueId: 3,
      paid: true,
      displayed: false
    },
    {
      userId: 4,
      bettingLeagueId: 3,
      paid: false,
      displayed: false
    }
  ],

  UserRequests: [
    {
     userId: '1',
     bettingLeagueId: '1',
     decided: false,
     accepted: false
    },
    {
      userId: '2',
      bettingLeagueId: '1',
      decided: true,
      accepted: true
    },
    {
      userId: '3',
      bettingLeagueId: '1',
      decided: true,
      accepted: false
    },
    {
      userId: '4',
      bettingLeagueId: '1',
      decided: false,
      accepted: false
    },
    {
      userId: '1',
      bettingLeagueId: '3',
      decided: false,
      accepted: false
    },
    {
      userId: '2',
      bettingLeagueId: '3',
      decided: true,
      accepted: true
    },
    {
      userId: '3',
      bettingLeagueId: '3',
      decided: true,
      accepted: false
    },
    {
      userId: '4',
      bettingLeagueId: '3',
      decided: false,
      accepted: false
    }
  ],

  UserSettings: [
    {
      userId: 1,
      bettingLeagueId: 1,
      emailBetNotification: true,
      emailRankingNotification: true
    },
    {
      userId: 2,
      bettingLeagueId: 1,
      emailBetNotification: true,
      emailRankingNotification: false
    },
    {
      userId: 3,
      bettingLeagueId: 2,
      emailBetNotification: false,
      emailRankingNotification: false
    },
    {
      userId: 4,
      bettingLeagueId: 2,
      emailBetNotification: false,
      emailRankingNotification: true
    },
  ],

  UserSpecialBets: [
    {
      specialBetId: 1,
      bettingLeagueId: 1,
      userId: 1,
      seriesHomeTeam: undefined,
      seriesAwayTeam: undefined,
      specialBet: 'PIT',
      dateTime: '2018-02-03 04:05:02'
    },
    {
      specialBetId: 2,
      bettingLeagueId: 1,
      userId: 1,
      seriesHomeTeam: undefined,
      seriesAwayTeam: undefined,
      specialBet: 'PIT',
      dateTime: '2018-02-03 04:05:02'
    },
    {
      specialBetId: 2,
      bettingLeagueId: 1,
      userId: 1,
      seriesHomeTeam: undefined,
      seriesAwayTeam: undefined,
      specialBet: 'VAN',
      dateTime: '2018-02-03 07:05:02'
    },
    {
      specialBetId: 4,
      bettingLeagueId: 1,
      userId: 1,
      seriesHomeTeam: undefined,
      seriesAwayTeam: undefined,
      specialBet: '6',
      dateTime: '2018-02-03 06:05:02'
    },
    {
      specialBetId: 5,
      bettingLeagueId: 1,
      userId: 1,
      seriesHomeTeam: undefined,
      seriesAwayTeam: undefined,
      specialBet: '683',
      dateTime: '2018-02-03 05:05:02'
    },
    {
      specialBetId: 3,
      bettingLeagueId: 1,
      userId: 1,
      seriesHomeTeam: 1,
      seriesAwayTeam: 2,
      specialBet: '4-3',
      dateTime: '2018-02-03 05:05:02'
    },
    {
      specialBetId: 3,
      bettingLeagueId: 1,
      userId: 1,
      seriesHomeTeam: 2,
      seriesAwayTeam: 4,
      specialBet: '4-1',
      dateTime: '2018-02-03 05:05:02'
    },

    {
      specialBetId: 1,
      bettingLeagueId: 1,
      userId: 2,
      seriesHomeTeam: undefined,
      seriesAwayTeam: undefined,
      specialBet: 'CHI',
      dateTime: '2018-02-03 04:05:02'
    },
    {
      specialBetId: 2,
      bettingLeagueId: 1,
      userId: 2,
      seriesHomeTeam: undefined,
      seriesAwayTeam: undefined,
      specialBet: 'PIT',
      dateTime: '2018-02-03 04:05:02'
    },
    {
      specialBetId: 2,
      bettingLeagueId: 1,
      userId: 2,
      seriesHomeTeam: undefined,
      seriesAwayTeam: undefined,
      specialBet: 'CHI',
      dateTime: '2018-02-03 07:06:02'
    },
    {
      specialBetId: 4,
      bettingLeagueId: 1,
      userId: 2,
      seriesHomeTeam: undefined,
      seriesAwayTeam: undefined,
      specialBet: '1',
      dateTime: '2018-02-03 06:15:02'
    },
    {
      specialBetId: 5,
      bettingLeagueId: 1,
      userId: 2,
      seriesHomeTeam: undefined,
      seriesAwayTeam: undefined,
      specialBet: '777',
      dateTime: '2018-02-04 05:05:02'
    },
    {
      specialBetId: 3,
      bettingLeagueId: 1,
      userId: 2,
      seriesHomeTeam: 1,
      seriesAwayTeam: 2,
      specialBet: '1-4',
      dateTime: '2018-02-03 05:05:03'
    },
    {
      specialBetId: 3,
      bettingLeagueId: 1,
      userId: 2,
      seriesHomeTeam: 2,
      seriesAwayTeam: 4,
      specialBet: '4-3',
      dateTime: '2018-02-04 05:05:02'
    }

  ]

}
