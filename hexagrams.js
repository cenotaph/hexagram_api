const Koa = require('koa')
const cors = require('@koa/cors')
const Router = require('koa-router')
const app = new Koa()
const logger = require('koa-logger')
const views = require('koa-views')
app.use(cors())
app.use(views(__dirname + '/views', {
  map: {
    haml: 'haml'
  }
}))

const router = new Router()

router.get('/', (ctx, next) => {
 ctx.body = 'Hello World!'
})


router.get('/hexagram/random', (ctx, next) => {
  // "toss your coins"
  let hexNum = parseInt(Math.random() * 64) + 1

  // load the json data
  let theHexagram = require("./data/" + hexNum + ".json")
  ctx.body = theHexagram
  // return ctx.render('hexagram.haml', {
  //   number: hexNum,
  //   title: theHexagram.title,
  //   above: theHexagram.above,
  //   below: theHexagram.below,
  //   content: theHexagram.text
  // })
})

app.use(logger())
app.use(router.routes())
app.use(router.allowedMethods())
const server = app.listen(8082)

module.exports = server