'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn("User", "pushId", { type : Sequelize.TEXT, allowNull : true } )
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('User', 'pushId')
  }
};
