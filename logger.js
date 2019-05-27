const log4js = require('log4js')
// trace, debug, info, warn, error, fatal
if (process.env.STATE === 'production') {
  log4js.configure({
    appenders: {
      file: { type: 'dateFile', layout: { type: 'colored' }, filename: `./log/${(new Date()).getFullYear()}.log`, keepFileExt: true, pattern: '-MM-dd' },
      console: { type: 'stdout', layout: { type: 'colored' } }
    },
    categories: {
      default: { appenders: ['file', 'console'], level: process.env.LOG_LEVEL }
    }
  })
} else {
  log4js.configure({
    appenders: {
      console: { type: 'stdout', layout: { type: 'colored' } }
    },
    categories: {
      default: { appenders: ['console'], level: process.env.LOG_LEVEL }
    }
  })
}

module.exports.getLogger = (wherejs) => {
  const logger = log4js.getLogger(wherejs)
  return logger
}
