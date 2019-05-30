var gulp = require('gulp')
var browserSync = require('browser-sync')
var nodemon = require('gulp-nodemon')

const browserInit = cb => {
  console.log(`browserInit`)
  browserSync.init(null, {
    proxy: 'http://localhost:4000',
    files: ['public/**/*.*', 'views/*'],
    browser: 'google chrome',
    port: 3000
  })
  cb()
}
const nodemonStart = cb => {
  var started = false
  console.log(`nodemonStart`)
  nodemon({
    script: './bin/www'
  }).on('start', function () {
    // to avoid nodemon being started multiple times
    // thanks @matthisk
    if (!started) {
      setTimeout(() => {
        cb()
      }, 1000)
      started = true
    }
  })
}

exports.default = gulp.series(nodemonStart, browserInit)
