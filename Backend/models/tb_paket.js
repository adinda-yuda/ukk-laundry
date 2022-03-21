'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_paket extends Model {
    /**
     *	Helper method for defining associations.
     *	This method is not a part of Sequelize lifecycle.
     *	The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.tb_outlet, {
        foreignKey: "id_outlet",
        as: "tb_outlet"
      })

      this.hasMany(models.tb_detail_transaksi, {
        foreignKey: "id_paket",
        as: "tb_detail_transaksi"
      })
    }
  };
  tb_paket.init({
    id_outlet: DataTypes.INTEGER,
    jenis: DataTypes.ENUM('kiloan', 'selimut', 'bed_cover', 'kaos', 'lainnya'),
    nama_paket: DataTypes.STRING,
    harga: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tb_paket',
    tableName: 'tb_paket',
  });
  return tb_paket;
};