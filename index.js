require('dotenv').config()
const open = require('open')
let express = require('express')
let app = express()
app.set('views', __dirname)
app.set('view engine', 'ejs')
var testEjs = {
  title: 'test',
  superheroes: ['111', '2222', '333', '44444'],
  none: '1234'
}
app.get('/', (req, res) => {
  res.render('test/views/index', testEjs)
})

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}`))

;(async () => {
  await open(`http://localhost:${process.env.PORT}`, { app: ['google chrome', '-incognito'] })
})()
