'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tb_detail_transaksi', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_transaksi: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "tb_transaksi",
          key: "id"
        }
      },
      id_paket: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "tb_paket",
          key: "id"
        }
      },
      qty: {
        type: Sequelize.DOUBLE
      },
      keterangan: {
        type: Sequelize.TEXT
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tb_detail_transaksi');
  }
};