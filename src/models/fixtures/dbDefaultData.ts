module.exports = {

  Leagues: [
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

  LeaguePlayers: [
        {
            leagueTeamId: 1,
            playerId: 1,
            seasonGames: 75,
            seasonGoals: 12,
            seasonAssists: 31,
            bestScorer: false
        },
        {
            leagueTeamId: 1,
            playerId: 2,
            seasonGames: 69,
            seasonGoals: 19,
            seasonAssists: 15,
            bestScorer: true
        },
        {
            leagueTeamId: 2,
            playerId: 3,
            seasonGames: 82,
            seasonGoals: 24,
            seasonAssists: 45,
            bestScorer: true
        },
        {
            leagueTeamId: 2,
            playerId: 4,
            seasonGames: 75,
            seasonGoals: 29,
            seasonAssists: 26,
            bestScorer: false
        },
        {
            leagueTeamId: 3,
            playerId: 5,
            seasonGames: 65,
            seasonGoals: 26,
            seasonAssists: 31,
            bestScorer: true
        },
        {
            leagueTeamId: 3,
            playerId: 6,
            seasonGames: 79,
            seasonGoals: 23,
            seasonAssists: 25,
            bestScorer: false
        },
        {
            leagueTeamId: 4,
            playerId: 7,
            seasonGames: 82,
            seasonGoals: 39,
            seasonAssists: 45,
            bestScorer: true
        },
        {
            leagueTeamId: 4,
            playerId: 8,
            seasonGames: 75,
            seasonGoals: 12,
            seasonAssists: 11,
            bestScorer: false
        },
        {
            leagueTeamId: 6,
            playerId: 9,
            isActive: true,
            seasonGames: 15,
            seasonGoals: 2,
            bestScorer: false
        },
        {
            leagueTeamId: 7,
            playerId: 10,
            isActive: true,
            seasonGames: 8,
            seasonGoals: 6,
            bestScorer: true
        },
        {
            leagueTeamId: 8,
            playerId: 11,
            isActive: true,
            seasonGames: 13,
            seasonGoals: 7,
            bestScorer: true
        }
    ],

  LeagueSpecialBetSingles: [
        {
            leagueId: 1,
            specialBetSingleId: 1,
            specialBetTeamResultId: 3,
            specialBetPlayerResultId: undefined,
            specialBetValueId: undefined,
            dateTime: '2018-02-03 04:05:02'
        },
        {
            leagueId: 1,
            specialBetSingleId: 1,
            specialBetTeamResultId: undefined,
            specialBetPlayerResultId: undefined,
            specialBetValueId: undefined,
            dateTime: '2018-02-03 04:05:02'
        },
        {
            leagueId: 1,
            specialBetSingleId: 2,
            specialBetTeamResultId: 3,
            specialBetPlayerResultId: undefined,
            specialBetValueId: undefined,
            dateTime: '2018-02-03 04:05:02'
        },
        {
            leagueId: 1,
            specialBetSingleId: 3,
            specialBetTeamResultId: undefined,
            specialBetPlayerResultId: 1,
            specialBetValueId: undefined,
            dateTime: '2018-02-03 04:05:02'
        }
    ],

  LeagueSpecialBetSeries: [
        {
            leagueId: 1,
            specialBetSerieId: 2,
            homeTeamId: 1,
            awayTeamId: 2,
            homeTeamScore: 4,
            awayTeamScore: 3,
            dateTime: '2018-02-03 05:05:02'
        },
        {
            leagueId: 1,
            specialBetSerieId: 2,
            homeTeamId: 2,
            awayTeamId: 4,
            homeTeamScore: 4,
            awayTeamScore: 1,
            dateTime: '2018-02-03 05:05:03'
        },
        {
            leagueId: 1,
            specialBetSerieId: 2,
            homeTeamId: 2,
            awayTeamId: 3,
            homeTeamScore: 1,
            awayTeamScore: 4,
            dateTime: '2018-02-03 05:05:04'
        },
        {
            leagueId: 1,
            specialBetSerieId: 2,
            homeTeamId: 2,
            awayTeamId: 4,
            homeTeamScore: 4,
            awayTeamScore: 2,
            dateTime: '2018-02-03 05:05:05'
        }
    ],

  LeagueTeams: [
        {
            leagueId: 1,
            teamId: 1
        },
        {
            leagueId: 1,
            teamId: 2
        },
        {
            leagueId: 1,
            teamId: 3
        },
        {
            leagueId: 1,
            teamId: 4
        },
        {
            leagueId: 3,
            teamId: 5
        },
        {
            leagueId: 3,
            teamId: 6
        },
        {
            leagueId: 3,
            teamId: 7
        },
        {
            leagueId: 3,
            teamId: 8
        }
    ],

  LeagueUsers: [
        {
            leagueId: 1,
            userId: 1,
            paid: true,
            active: true
        },
        {
            leagueId: 1,
            userId: 2,
            paid: false,
            active: true
        },
        {
            leagueId: 1,
            userId: 3,
            paid: true,
            active: false
        },
        {
            leagueId: 1,
            userId: 4,
            paid: false,
            active: false
        },
        {
            leagueId: 3,
            userId: 1,
            paid: true,
            active: true
        },
        {
            leagueId: 3,
            userId: 2,
            paid: false,
            active: true
        },
        {
            leagueId: 3,
            userId: 3,
            paid: true,
            active: false
        },
        {
            leagueId: 3,
            userId: 4,
            paid: false,
            active: false
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
      shootout: false,
      homeWinner: 1,
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
      shootout: false,
      homeWinner: 2,
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
      shootout: false,
      homeWinner: 1,
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
      shootout: true,
      homeWinner: 1,
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
      shootout: false,
      homeWinner: 1,
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
      isActive: true
    },
    {
      firstName: 'Brendan',
      lastName: 'Gallagher',
      isActive: true
    },
    {
      firstName: 'John',
      lastName: 'Tavares',
      isActive: true
    },
    {
      firstName: 'Brook',
      lastName: 'Nelson',
      isActive: true
    },
    {
      firstName: 'Sidney',
      lastName: 'Crosby',
      isActive: true
    },
    {
      firstName: 'Jevgenij',
      lastName: 'Malkin',
      isActive: true
    },
    {
      firstName: 'Connor',
      lastName: 'McDavid',
      isActive: true
    },
    {
      firstName: 'Milan',
      lastName: 'Lucic',
      isActive: true
    },
    {
      firstName: 'Neymar',
      lastName: '',
      teamId: 5,
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
      isActive: true
    },
    {
      firstName: 'Thomas',
      lastName: 'Müller',
      isActive: true
    },
    {
      firstName: 'Didier',
      lastName: 'Drogba',
      isActive: true
    },
  ],

  SpecialBetSeries: [
    {
      bestOf: 3,
      name: 'Na 2 vítězné zápasy'
    },
    {
      bestOf: 5,
      name: 'Na 3 vítězné zápasy'
    },
    {
      bestOf: 7,
      name: 'Na 4 vítězné zápasy'
    }
  ],

  SpecialBetSingles: [
    {
      sportId: 2,
      specialBetType: 2,
      name: 'Vítěz NHL'
    },
    {
      sportId: 2,
      specialBetType: 2,
      name: 'Vítěz konference NHL'
    },
    {
      sportId: 2,
      specialBetType: 1,
      name: 'Nejužitečnější hráč'
    },
    {
      sportId: 2,
      specialBetType: 2,
      name: 'Vítěz skupiny MS'
    },
    {
      sportId: 2,
      specialBetType: 2,
      name: 'Poslední ve skupině MS'
    },
    {
      sportId: 2,
      specialBetType: 2,
      name: 'Vítěz MS'
    },
    {
      sportId: 2,
      specialBetType: 1,
      name: 'Nejlepší brankář MS'
    },
    {
      sportId: 2,
      specialBetType: 1,
      name: 'Nejlepší střelec MS'
    },
    {
      sportId: 2,
      specialBetType: 1,
      name: 'Nejužitečnější hráč MS'
    },
    {
      sportId: 2,
      specialBetType: 3,
      name: 'Celkový počet branek na MS'
    },
    {
      sportId: 1,
      specialBetType: 2,
      name: 'Vítěz MS'
    },
    {
      sportId: 2,
      specialBetType: 2,
      name: 'Poražený finalista MS'
    },
    {
      sportId: 2,
      specialBetType: 2,
      name: 'Třetí tým MS'
    },
    {
      sportId: 2,
      specialBetType: 2,
      name: 'Vítěz skupiny MS'
    },
    {
      sportId: 2,
      specialBetType: 2,
      name: 'Postupující ze skupiny MS'
    },
    {
      sportId: 2,
      specialBetType: 1,
      name: 'Nejlepší brankář MS'
    },
    {
      sportId: 2,
      specialBetType: 1,
      name: 'Nejlepší hráč MS'
    },
    {
      sportId: 2,
      specialBetType: 1,
      name: 'Nejlepší střelec MS'
    },
    {
      sportId: 2,
      specialBetType: 3,
      name: 'Celkový počet branek na MS'
    }
  ],

  Sports: [
    {
      name: 'Fotbal'
    },
    {
      name: 'Lední hokej'
    },
    {
      name: 'Házená'
    }
  ],

  Teams: [
    {
      name: 'Montreal',
      nickname: 'Canadiens',
      shortcut: 'MTL',
      sport: 2,
      league: 1
    },
    {
      name: 'New York',
      nickname: 'Islanders',
      shortcut: 'NYI',
      sport: 2,
      league: 1
    },
    {
      name: 'Pittsburgh',
      nickname: 'Penguins',
      shortcut: 'PIT',
      sport: 2,
      league: 1
    },
    {
      name: 'Edmonton',
      nickname: 'Oilers',
      shortcut: 'EDM',
      sport: 2,
      league: 1
    },
    {
      name: 'Brazílie',
      nickname: '',
      shortcut: 'BRA',
      sport: 1,
      league: 2
    },
    {
      name: 'Argentina',
      nickname: 'argentina',
      shortcut: 'ARG',
      sport: 1,
      league: 2
    },
    {
      name: 'Německo',
      nickname: '',
      shortcut: 'GER',
      sport: 1,
      league: 2
    },
    {
      name: 'Pobřeží slonoviny',
      nickname: '',
      shortcut: 'CIV',
      sport: 1,
      league: 2
    }
  ],

  Users: [
    {
      firstName: 'Roman',
      lastName: 'Talaš',
      username: 'admin',
      email: 'rotakt@gmail.com',
      mobileNumber: '724724724',
      password: '12345'
    },
    {
      firstName: 'Petr',
      lastName: 'Novák',
      username: 'user',
      email: 'rotakt@hotmail.com',
      mobileNumber: '724724725',
      password: '12345'
    },
    {
      firstName: 'Martin',
      lastName: 'Nový',
      username: 'user1',
      email: 'ahoj@seznam.com',
      mobileNumber: '724724726',
      password: '12345'
    },
    {
      firstName: 'Miroslav',
      lastName: 'Janíček',
      username: 'user2',
      email: 'ahoj2@seznam.com',
      mobileNumber: '724724727',
      password: '12345'
    },
    {
      firstName: 'Lidumil',
      lastName: 'Lidumilový',
      username: 'user3',
      email: 'ahoj3@seznam.com',
      mobileNumber: '724724728',
      password: '12345'
    },
    {
      firstName: 'Tomas',
      lastName: 'Voslar',
      username: 'tvoslar',
      email: 't.voslar@gmail.com',
      mobileNumber: '-',
      password: 'test'
    }
  ],

  UserBets: [
    {
      matchId: 1,
      leagueUserId: 1,
      dateTime: '2016-08-09 04:05:03',
      homeScore: 5,
      awayScore: 1,
      homeWinner: true,
      scorerId: 1,
    },
    {
      matchId: 2,
      leagueUserId: 1,
      dateTime: '2016-08-09 04:05:03',
      homeScore: 3,
      awayScore: 3,
      homeWinner: true,
      scorerId: 2,
    },
    {
      matchId: 3,
      leagueUserId: 1,
      dateTime: '2016-08-09 04:05:05',
      homeScore: 2,
      awayScore: 3,
      homeWinner: false,
      scorerId: 6,
    },
    {
      matchId: 4,
      leagueUserId: 1,
      dateTime: '2016-08-09 04:05:04',
      homeScore: 5,
      awayScore: 2,
      homeWinner: true,
      scorerId: 7,
    },
    {
      matchId: 5,
      leagueUserId: 1,
      dateTime: '2016-08-09 04:05:02',
      homeScore: 2,
      awayScore: 3,
      homeWinner: false,
      scorerId: 8,
    },

    {
      matchId: 1,
      leagueUserId: 2,
      dateTime: '2016-08-09 04:06:03',
      homeScore: 5,
      awayScore: 1,
      homeWinner: true,
      scorerId: 1,
    },
    {
      matchId: 2,
      leagueUserId: 2,
      dateTime: '2016-08-09 04:05:03',
      homeScore: 2,
      awayScore: 2,
      homeWinner: true,
      scorerId: 2,
    },
    {
      matchId: 3,
      leagueUserId: 2,
      dateTime: '2016-08-09 04:07:05',
      homeScore: 2,
      awayScore: 1,
      homeWinner: true,
      scorerId: 6,
    },
    {
      matchId: 4,
      leagueUserId: 2,
      dateTime: '2016-08-09 04:15:04',
      homeScore: 5,
      awayScore: 5,
      homeWinner: true,
      scorerId: 7,
    },
    {
      matchId: 5,
      leagueUserId: 2,
      dateTime: '2016-08-09 04:11:02',
      homeScore: 2,
      awayScore: 4,
      homeWinner: false,
      scorerId: 8,
    }

  ],

  UserRequests: [
    {
     userId: '1',
     leagueId: '1',
     decided: false,
     accepted: false
    },
    {
      userId: '2',
      leagueId: '1',
      decided: true,
      accepted: true
    },
    {
      userId: '3',
      leagueId: '1',
      decided: true,
      accepted: false
    },
    {
      userId: '4',
      leagueId: '1',
      decided: false,
      accepted: false
    },
    {
      userId: '1',
      leagueId: '3',
      decided: false,
      accepted: false
    },
    {
      userId: '2',
      leagueId: '3',
      decided: true,
      accepted: true
    },
    {
      userId: '3',
      leagueId: '3',
      decided: true,
      accepted: false
    },
    {
      userId: '4',
      leagueId: '3',
      decided: false,
      accepted: false
    }
  ],

  UserSettings: [
    {
      userId: 1,
      leagueUserId: 1,
      emailBetNotification: true,
      emailBetNotificationValue: 1,
      emailRankingNotification: true,
      emailRankingNotificationValue: 1
    },
    {
      userId: 2,
      leagueUserId: 1,
      emailBetNotification: true,
      emailBetNotificationValue: 2,
      emailRankingNotification: false,
      emailRankingNotificationValue: 0
    },
    {
      userId: 3,
      leagueUserId: 2,
      emailBetNotification: false,
      emailBetNotificationValue: 3,
      emailRankingNotification: false,
      emailRankingNotificationValue: 3
    },
    {
      userId: 4,
      leagueUserId: 2,
      emailBetNotification: false,
      emailBetNotificationValue: 4,
      emailRankingNotification: true,
      emailRankingNotificationValue: 0
    },
  ],

  UserSpecialBetSeries: [
    {
      leagueSpecialBetSerieId: 1,
      leagueUserId: 1,
      homeTeamScore: 4,
      awayTeamScore: 2,
      dateTime: '2018-02-03 05:04:02'
    },
    {
      leagueSpecialBetSerieId: 2,
      leagueUserId: 1,
      homeTeamScore: 3,
      awayTeamScore: 4,
      dateTime: '2018-02-03 05:04:03'
    },
    {
      leagueSpecialBetSerieId: 3,
      leagueUserId: 1,
      homeTeamScore: 3,
      awayTeamScore: 4,
      dateTime: '2018-02-03 05:04:04'
    },
    {
      leagueSpecialBetSerieId: 4,
      leagueUserId: 1,
      homeTeamScore: 4,
      awayTeamScore: 2,
      dateTime: '2018-02-03 06:04:02'
    },
    {
      leagueSpecialBetSerieId: 1,
      leagueUserId: 2,
      homeTeamScore: 4,
      awayTeamScore: 2,
      dateTime: '2018-02-03 05:04:02'
    },
    {
      leagueSpecialBetSerieId: 2,
      leagueUserId: 2,
      homeTeamScore: 3,
      awayTeamScore: 4,
      dateTime: '2018-02-03 05:04:03'
    },
    {
      leagueSpecialBetSerieId: 3,
      leagueUserId: 2,
      homeTeamScore: 3,
      awayTeamScore: 4,
      dateTime: '2018-02-03 05:04:04'
    },
    {
      leagueSpecialBetSerieId: 4,
      leagueUserId: 2,
      homeTeamScore: 4,
      awayTeamScore: 2,
      dateTime: '2018-02-03 06:04:02'
    }
  ],

  UserSpecialBetSingles: [
    {
        leagueSpecialBetSingleId: 1,
        leagueUserId: 1,
        bet: 'Pittsburgh Penguins',
        dateTime: '2018-02-02 04:05:02'
    },
    {
        leagueSpecialBetSingleId: 2,
        leagueUserId: 1,
        bet: 'Edmonton Oilers',
        dateTime: '2018-02-02 04:05:02'
    },
    {
        leagueSpecialBetSingleId: 3,
        leagueUserId: 1,
        bet: 'New York Islanders',
        dateTime: '2018-02-02 04:05:02'
    },
    {
        leagueSpecialBetSingleId: 4,
        leagueUserId: 1,
        bet: 'Sidney Crosby',
        dateTime: '2018-02-03 04:05:02'
    },
    {
        leagueSpecialBetSingleId: 1,
        leagueUserId: 2,
        bet: 'Chicago Blackhawks',
        dateTime: '2018-02-02 04:05:02'
    },
    {
        leagueSpecialBetSingleId: 2,
        leagueUserId: 2,
        bet: 'Edmonton Oilers',
        dateTime: '2018-02-02 04:05:02'
    },
    {
        leagueSpecialBetSingleId: 3,
        leagueUserId: 2,
        bet: 'New York Islanders',
        dateTime: '2018-02-02 04:05:02'
    },
    {
        leagueSpecialBetSingleId: 4,
        leagueUserId: 2,
        bet: 'John Tavares',
        dateTime: '2018-02-03 04:05:02'
    },
  ]

}
