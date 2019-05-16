/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('logistics_shipment_numbers', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    logistics_companies_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    parent_code: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    child_code: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    shipment_no: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    logistics_order_id: {
      type: DataTypes.BIGINT,
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
    tableName: 'logistics_shipment_numbers',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  })
}
