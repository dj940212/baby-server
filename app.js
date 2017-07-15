'use strict'

var fs = require('fs')
var path = require('path')
var mongoose = require('mongoose')
var cors = require('koa-cors')
var db = 'mongodb://localhost:27017/pic-app'

mongoose.Promise = require('bluebird')
mongoose.connect(db)
mongoose.connection.on("connected",function(){
  console.log("数据库连接成功")
})
var models_path = path.join(__dirname, '/app/models')

var walk = function(modelPath) {
  fs
    .readdirSync(modelPath)
    .forEach(function(file) {
      var filePath = path.join(modelPath, '/' + file)
      var stat = fs.statSync(filePath)

      if (stat.isFile()) {
        if (/(.*)\.(js|coffee)/.test(file)) {
          require(filePath)
        }
      }
      else if (stat.isDirectory()) {
        walk(filePath)
      }
    })
}

walk(models_path)

var koa = require('koa')
var logger = require('koa-logger')
var session = require('koa-session')
var bodyParser = require('koa-bodyparser')
var app = koa()

app.keys = ['imooc']
app.use(logger())
app.use(session(app))
app.use(bodyParser())

// 解决跨域问题
app.use(cors())

var router = require('./config/routes')()

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(1234)
console.log('Listening: 1234')
