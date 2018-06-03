'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const a = queryInterface.changeColumn("User", "email", { type : Sequelize.STRING, allowNull : true } )
    const b = queryInterface.changeColumn("User", "mobileNumber", { type : Sequelize.STRING, allowNull : true } )
  },

  down: (queryInterface, Sequelize) => {
    const a = queryInterface.changeColumn("User", "email", { type : Sequelize.STRING, allowNull : false } )
    const b = queryInterface.changeColumn("User", "mobileNumber", { type : Sequelize.STRING, allowNull : false } )
  }
};
