/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('genre', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    url: {
      type: DataTypes.STRING(512),
      allowNull: true
    }
  }, {
    tableName: 'genre',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  })
}
