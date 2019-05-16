/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('logistics_events', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    shipment_no: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    order_source_code: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    order_no: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    logistics_companies_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    state: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    order_status_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    external_state_code: {
      type: DataTypes.STRING(50),
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
    tableName: 'logistics_events',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  })
}
