var gulp = require('gulp')
var browserSync = require('browser-sync').create()
var nodemon = require('gulp-nodemon')
const browserInit = cb => {
  // browserSync.init(null, {
  //   proxy: 'localhost:4000',
  //   files: ['public/**/*.*', 'views/*'],
  //   browser: 'google chrome',
  //   port: 3000
  // })
  // return browserSync.watch('app.js', browserSync.reload)
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
      }, 3000)
      started = true
    }
  })
}

exports.default = gulp.series(browserInit)
