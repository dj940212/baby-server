'use strict'

var xss = require('xss')
var mongoose = require('mongoose')
var User = mongoose.model('User')
var uuid = require('uuid')
var sms = require('../service/sms')
var axios = require('axios')

// 注册，填手机号
exports.signup = function *(next) {
  var phoneNumber = xss(this.request.body.phoneNumber.trim())

  var user = yield User.findOne({
    phoneNumber: phoneNumber
  }).exec()

  var verifyCode = sms.getCode()

  if (!user) {
    var accessToken = uuid.v4()

    user = new User({
      nickname: '小狗宝',
      avatar: 'http://res.cloudinary.com/gougou/image/upload/mooc1.png',
      phoneNumber: xss(phoneNumber),
      verifyCode: verifyCode,
      accessToken: accessToken
    })
  }
  else {
    user.verifyCode = verifyCode
  }

  try {
    user = yield user.save()
  }
  catch (e) {
    this.body = {
      success: false
    }

    return next
  }

  var msg = '您的注册验证码是：' + user.verifyCode

  try {
    sms.send(user.phoneNumber, msg)
  }
  catch (e) {
    console.log(e)

    this.body = {
      success: false,
      err: '短信服务异常'
    }

    return next
  }

  this.body = {
    success: true
  }
}

// 验证码验证
exports.verify = function *(next) {
  var verifyCode = this.request.body.verifyCode
  var phoneNumber = this.request.body.phoneNumber

  if (!verifyCode || !phoneNumber) {
    this.body = {
      success: false,
      err: '验证没通过'
    }

    return next
  }

  var user = yield User.findOne({
    phoneNumber: phoneNumber,
    verifyCode: verifyCode
  }).exec()

  if (user) {
    user.verified = true
    user = yield user.save()

    this.body = {
      success: true,
      data: {
        nickname: user.nickname,
        accessToken: user.accessToken,
        avatar: user.avatar,
        _id: user._id
      }
    }
  }
  else {
    this.body = {
      success: false,
      err: '验证未通过'
    }
  }
}

// 注册
exports.register = function *(next) {
  var jscode = this.request.body.jscode
  var nickname = this.request.body.nickname

  axios.get('https://api.weixin.qq.com/sns/jscode2session',{
    params: {
      appid: 'wx0cabd8483ff83d59',
      secret: '67095a452704f90ce9d890c269ebac72',
      js_code: jscode,
      grant_type: authorization_code
    }
  }).then(function(res){
    'use strict'

    console.log(res)
    var openid = res.openid
    var user =  User.findOne({ openid: openid}).exec()

    if (!user) {
      user = new User({
        openid: openid,
        nickname: nickname,
        authorization: false
      })
    }else {

    }
    try {
      user = user.save()
    }
    catch (e) {
      this.body = {
        success: false
      }
      return next
    }

    this.body = {
      success: true
    }
  })
}

// 更新用户信息
exports.update = function *(next) {
  var body = this.request.body
  var user = this.session.user
  var fields = 'avatar,gender,age,nickname,breed'.split(',')

  fields.forEach(function(field) {
    if (body[field]) {
      user[field] = xss(body[field].trim())
    }
  })

  user = yield user.save()

  this.body = {
    success: true,
    data: {
      nickname: user.nickname,
      accessToken: user.accessToken,
      avatar: user.avatar,
      age: user.age,
      breed: user.breed,
      gender: user.gender,
      _id: user._id
    }
  }
}

