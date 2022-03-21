'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_detail_transaksi extends Model {
    /**
     *	Helper method for defining associations.
     *	This method is not a part of Sequelize lifecycle.
     *	The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.tb_transaksi, {
        foreignKey: "id_transaksi",
        as: "tb_transaksi"
      })

      this.belongsTo(models.tb_paket, {
        foreignKey: "id_paket",
        as: "tb_paket"
      })
    }
  };
  tb_detail_transaksi.init({
    id_transaksi: DataTypes.INTEGER,
    id_paket: DataTypes.INTEGER,
    qty: DataTypes.DOUBLE,
    keterangan: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'tb_detail_transaksi',
    tableName: 'tb_detail_transaksi',
  });
  return tb_detail_transaksi;
};