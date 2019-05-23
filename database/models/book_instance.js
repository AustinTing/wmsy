/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('book_instance', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    book_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    imprint: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    due_back: {
      type: DataTypes.DATE,
      allowNull: true
    },
    url: {
      type: DataTypes.STRING(512),
      allowNull: true
    }
  }, {
    tableName: 'book_instance',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  })
}
