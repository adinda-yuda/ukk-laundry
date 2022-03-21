'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_outlet extends Model {
    /**
     *	Helper method for defining associations.
     *	This method is not a part of Sequelize lifecycle.
     *	The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.tb_paket, {
        foreignKey: "id_outlet",
        as: "tb_paket"
      })

      this.hasMany(models.tb_transaksi, {
        foreignKey: "id_outlet",
        as: "tb_transaksi"
      })

      this.hasMany(models.tb_user, {
        foreignKey: "id_outlet",
        as: "tb_user"
      })
    }
  };
  tb_outlet.init({
    nama: DataTypes.STRING,
    alamat: DataTypes.TEXT,
    tlp: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tb_outlet',
    tableName: 'tb_outlet',
  });
  return tb_outlet;
};