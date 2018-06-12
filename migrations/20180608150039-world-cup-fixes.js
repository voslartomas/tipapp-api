'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn("Match", "isPlayoffGame", { type : Sequelize.BOOLEAN, allowNull : false } )
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Match', 'isPlayoffGame')
  }
};
