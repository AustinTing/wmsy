/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('author', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    family_name: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: true
    },
    date_of_death: {
      type: DataTypes.DATE,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    lifespan: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    url: {
      type: DataTypes.STRING(512),
      allowNull: true
    }
  }, {
    tableName: 'author',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  })
}
