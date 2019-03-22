'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.changeColumn("Player", "lastName", { type : Sequelize.TEXT, allowNull : true } )
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.changeColumn("Player", "lastName", { type : Sequelize.TEXT, allowNull : false } )
  }
};
