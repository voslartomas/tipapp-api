'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn("LeaguePlayer", "playoffGames", { type : Sequelize.INTEGER, allowNull : true } )
    queryInterface.addColumn("LeaguePlayer", "playoffGoals", { type : Sequelize.INTEGER, allowNull : true } )
    queryInterface.addColumn("LeaguePlayer", "playoffAssists", { type : Sequelize.INTEGER, allowNull : true } )
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('LeaguePlayer', 'playoffGames')
    queryInterface.removeColumn('LeaguePlayer', 'playoffGoals')
    queryInterface.removeColumn('LeaguePlayer', 'playoffAssists')
  }
};
