const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const logger = require('../../logger').getLogger('database/models')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
const db = {}

const sequelize = new Sequelize(
  process.env.DB_SCHEMA,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: JSON.parse(process.env.DB_IS_LOGGING) ? console.log : false,
    timezone: '+08:00', // for writing to database
    dialectOptions: {
      // for reading from database
      dateStrings: true,
      typeCast: true
    },
    pool: {
      max: 5,
      idle: 30000,
      acquire: 60000
    }
  }
)

;(async () => {
  try {
    await sequelize.authenticate()
    logger.info(`${process.env.DB_SCHEMA} database sequelize connection has been established successfully.`)
  } catch (err) {
    logger.error(`Unable to connect to ${process.env.DB_SCHEMA} database:`, err)
  }
})()

const files = fs.readdirSync(__dirname)
const models = _.filter(files, file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
_.each(models, file => {
  const model = sequelize['import'](path.join(__dirname, file))
  logger.info(`model: ${file} imported`)
  db[model.name] = model
})

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    logger.info(`modelName: ${modelName}, asscoiate:${modelName}`)
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
