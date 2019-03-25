'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn("LeaguePlayer", "secondBestScorer", { type : Sequelize.BOOLEAN, allowNull : true } )
    queryInterface.addColumn("LeaguePlayer", "thirdBestScorer", { type : Sequelize.BOOLEAN, allowNull : true } )
    queryInterface.addColumn("LeaguePlayer", "fourthBestScorer", { type : Sequelize.BOOLEAN, allowNull : true } )
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('LeagueUser', 'secondBestScorer')
    queryInterface.removeColumn('LeagueUser', 'thirdBestScorer')
    queryInterface.removeColumn('LeagueUser', 'fourthBestScorer')
  }
};
