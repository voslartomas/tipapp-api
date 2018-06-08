module.exports = {
    Evaluators: [
        {
            name: 'Střelec zápasu (nejlepší střelec týmu)',
            type: 'bestScorer',
            points: 2,
            leagueId: 3,
            entity: 'matches'
        },
        {
            name: 'Střelec zápasu',
            type: 'scorer',
            points: 5,
            leagueId: 3,
            entity: 'matches'
        },
        {
            name: 'Vítěz zápasu',
            type: 'winner',
            points: 3,
            leagueId: 3,
            entity: 'matches'
        },
        {
            name: 'Postupující v playoff',
            type: 'playoffAdvancer',
            points: 3,
            leagueId: 3,
            entity: 'matches'
        },
        {
            name: 'Přesný výsledek',
            type: 'exact',
            points: 6,
            leagueId: 3,
            entity: 'matches'
        },
        {
            name: 'Remíza',
            type: 'draw',
            points: 4,
            leagueId: 3,
            entity: 'matches'
        },
        {
            name: 'Vítěz zápasu + rozdíl ve skóre',
            type: 'scoreDifference',
            points: 4,
            leagueId: 3,
            entity: 'matches'
        },
        {
            name: 'Počet branek jednoho týmu',
            type: 'scoreOneTeam',
            points: 1,
            leagueId: 3,
            entity: 'matches'
        },
    ]
}