/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('logistics_orders', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    order_no: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    shipment_no: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    order_status_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    logistics_companies_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    parent_code: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    child_code: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    delivery_type: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    payment_type: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    shipment_store_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    seller_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    sender_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    order_value: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    is_collect: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    collect_amount: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    consignee_name: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    consignee_phone: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    consignee_postcode: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    consignee_address: {
      type: DataTypes.BOOLEAN,
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
    tableName: 'logistics_orders',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  })
}
