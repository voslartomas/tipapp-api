'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn("LeaguePlayer", "clubName", { type : Sequelize.TEXT, allowNull : true } )
    queryInterface.addColumn("LeagueTeam", "group", { type : Sequelize.TEXT, allowNull : true } )
    queryInterface.addColumn("Player", "position", { type : Sequelize.TEXT, allowNull : true } )
    queryInterface.addColumn("Team", "flagIcon", { type : Sequelize.TEXT, allowNull : true } )
    queryInterface.changeColumn("Player", "firstName", { type : Sequelize.TEXT, allowNull : true } )
    queryInterface.changeColumn("Player", "lastName", { type : Sequelize.TEXT, allowNull : false } )
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('LeaguePlayer', 'clubName')
    queryInterface.removeColumn('LeagueTeam', 'group')
    queryInterface.removeColumn('Player', 'position')
    queryInterface.removeColumn('Team', 'flagIcon')
    queryInterface.changeColumn("Player", "firstName", { type : Sequelize.TEXT, allowNull : false } )
    queryInterface.changeColumn("Player", "lastName", { type : Sequelize.TEXT, allowNull : true } )
  }
};
