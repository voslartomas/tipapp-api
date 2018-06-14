'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn("User", "notifyHours", { type : Sequelize.INTEGER, allowNull : false, defaultValue: 2 } )
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('User', 'notifyHours')
  }
};
