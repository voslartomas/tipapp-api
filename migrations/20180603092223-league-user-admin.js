'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn("LeagueUser", "admin", { type : Sequelize.BOOLEAN, allowNull : false, defaultValue: false } );
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('LeagueUser', 'admin')
  }
};
