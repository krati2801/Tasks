'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('emp_experience_details', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
      },
      empId: {
        type: Sequelize.UUID,
        references: {
          model: "emp_details",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      companyName: {
        type: Sequelize.STRING(150)
      },
      position: {
        type: Sequelize.STRING(100)
      },
      totalYear: {
        type: Sequelize.FLOAT
      },
      lastCTC: {
        type: Sequelize.INTEGER
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('emp_experience_details');
  }
};