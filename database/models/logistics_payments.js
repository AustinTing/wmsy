/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('logistics_payments', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    logistics_order_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    comment: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'logistics_payments',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  })
}
