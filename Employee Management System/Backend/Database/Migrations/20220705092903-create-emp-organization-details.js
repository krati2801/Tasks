'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('emp_organization_details', {
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
      joiningDate: {
        type: Sequelize.DATEONLY
      },
      nextAppraiselDate: {
        type: Sequelize.DATEONLY
      },
      currentCTC: {
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
    await queryInterface.dropTable('emp_organization_details');
  }
};