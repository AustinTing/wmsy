/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('book', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    author_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    summary: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    isbn: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    genre: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    url: {
      type: DataTypes.STRING(512),
      allowNull: true
    }
  }, {
    tableName: 'book',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  })
}
