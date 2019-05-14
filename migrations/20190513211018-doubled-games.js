'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Match", "isDoubled", { type : Sequelize.BOOLEAN, allowNull : true } )
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Match', 'isDoubled')
    ])
  }
};
