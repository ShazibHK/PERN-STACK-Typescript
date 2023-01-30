'use strict';
module.exports = {
  /**
   * @param {{ createTable: (arg0: string, arg1: { id: { allowNull: boolean; autoIncrement: boolean; primaryKey: boolean; type: any; }; name: { type: any; }; email: { type: any; }; password: { type: any; }; createdAt: { allowNull: boolean; type: any; }; updatedAt: { allowNull: boolean; type: any; }; }) => any; }} queryInterface
   * @param {{ INTEGER: any; STRING: any; DATE: any; }} Sequelize
   */
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Customers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  /**
   * @param {{ dropTable: (arg0: string) => any; }} queryInterface
   * @param {any} Sequelize
   */
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Customers');
  }
};