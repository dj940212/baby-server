'use strict'

var mongoose = require('mongoose')
var uuid = require('uuid')
var User = mongoose.model('User')
var robot = require('../service/robot')

exports.signature = function *(next) {
  var body = this.request.body
  var cloud = body.cloud
  var data
  // 获取七牛签名
  data = robot.getQiniuToken(body)

  this.body = {
    success: true,
    data: data
  }
}

exports.hasBody = function *(next) {
  var body = this.request.body || {}

  if (Object.keys(body).length === 0) {
    this.body = {
      success: false,
      err: '是不是漏掉什么了'
    }

    return next
  }

  yield next
}

exports.hasToken = function *(next) {
  var accessToken = this.query.accessToken

  if (!accessToken) {
    accessToken = this.request.body.accessToken
  }

  if (!accessToken) {
    this.body = {
      success: false,
      err: '钥匙丢了'
    }

    return next
  }

  var user = yield User.findOne({
    accessToken: accessToken
  })
  .exec()

  if (!user) {
    this.body = {
      success: false,
      err: '用户没登陆'
    }

    return next
  }

  this.session = this.session || {}
  this.session.user = user

  yield next
}

exports.hasAuthorization = function *(next) {
  var openid = this.body.openid

  if (!accessToken) {
    this.body = {
      success: false,
      err: '钥匙丢了'
    }

    return next
  }
  // 查看是否授权
  var user = yield User.findOne({
    openid: openid,
    authorization: true
  })
  .exec()

  if (!user) {
    this.body = {
      errNum: 0
      msg: "没有权限",
    }

    return next
  }

  this.session = this.session || {}
  this.session.user = user

  yield next
}


