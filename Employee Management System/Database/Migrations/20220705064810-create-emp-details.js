'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('emp_details', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
      },
      firstName: {
        type: Sequelize.STRING(50)
      },
      middleName: {
        type: Sequelize.STRING(50)
      },
      lastName: {
        type: Sequelize.STRING(50)
      },
      email: {
        type: Sequelize.STRING(100)
      },
      phone: {
        type: Sequelize.STRING(20)
      },
      dateOfBirth: {
        type: Sequelize.DATEONLY
      },
      image: {
        type: Sequelize.STRING(150)
      },
      presentAddress: Sequelize.STRING(150),
      permanentAddress: Sequelize.STRING(150),
      bankName: {
        type: Sequelize.STRING(150)
      },
      accountName: {
        type: Sequelize.STRING(150)
      },
      accountNumber: {
        type: Sequelize.BIGINT
      },
      IFSCCode: {
        type: Sequelize.STRING(20)
      },
      aadharNumber: {
        type: Sequelize.BIGINT
      },
      panNumber: {
        type: Sequelize.BIGINT
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
    await queryInterface.dropTable('emp_details');
  }
};