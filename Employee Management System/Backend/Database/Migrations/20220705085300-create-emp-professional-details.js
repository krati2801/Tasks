'use strict';
const { SKILLS } = require("../../Configs/constants");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('emp_professional_details', {
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
      designation: {
        type: Sequelize.STRING(150)
      },
      department: {
        type: Sequelize.STRING(150)
      },
      expInYears: {
        type: Sequelize.TINYINT
      },
      expInMonths: {
        type: Sequelize.TINYINT
      },
      currentLocation: {
        type: Sequelize.STRING
      },
      skills: {
        type: Sequelize.ENUM,
        values: [SKILLS.ANGULAR, SKILLS.NODE, SKILLS.REACT, SKILLS.VUE]
      },
      resume: {
        type: Sequelize.STRING(150)
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
    await queryInterface.dropTable('emp_professional_details');
  }
};