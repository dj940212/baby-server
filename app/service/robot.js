'use strict'

var qiniu = require('qiniu')
var cloudinary = require('cloudinary')
var Promise = require('bluebird')
var sha1 = require('sha1')
var uuid = require('uuid')
var config = require('../../config/config')

qiniu.conf.ACCESS_KEY = config.qiniu.AK
qiniu.conf.SECRET_KEY = config.qiniu.SK

cloudinary.config(config.cloudinary)

// 获取七牛签名
exports.getQiniuToken = function(body) {
  var type = body.type
  var key = uuid.v4()
  var putPolicy
  var options = {
    persistentNotifyUrl: config.notify
  }

  if (type === 'photo') {
    // putPolicy.callbackUrl = 'http://your.domain.com/callback'
    // putPolicy.callbackBody = 'filename=$(fname)&filesize=$(fsize)'
    // key += '.jpeg'
    putPolicy = new qiniu.rs.PutPolicy('myphoto')
  }
  else if (type === 'video') {
    key += '.mp4'
    options.scope = 'myphoto'
    options.persistentOps = 'vframe/jpg/offset/0/rotate/auto'
    putPolicy = new qiniu.rs.PutPolicy2(options)
  }

  var token = putPolicy.token()

  return {
    // key: key,
    uptoken: token
  }
}
// 
exports.saveToQiniu = function(url, key) {
  var client = new qiniu.rs.Client()

  return new Promise(function(resolve, reject) {
    client.fetch(url, 'gougouvideo', key, function(err, ret) {
      if (!err) {
        resolve(ret)
      }
      else {
        reject(err)
      }
    })
  })
}

exports.uploadToCloudinary = function(url) {
  return new Promise(function(resolve, reject) {
    cloudinary.uploader.upload(url, function(result) {
      if (result && result.public_id) {
        resolve(result)
      }
      else {
        reject(result)
      }
    }, {
      resource_type: 'video',
      folder: 'video'
    })
  })
}


exports.getCloudinaryToken = function(body) {
  var type = body.type
  var timestamp = body.timestamp
  var folder
  var tags

  if (type === 'avatar') {
    folder = 'avatar'
    tags = 'app,avatar'
  }
  else if (type === 'video') {
    folder = 'video'
    tags = 'app,video'
  }
  else if (type === 'audio') {
    folder = 'audio'
    tags = 'app,audio'
  }

  // data.data
  var signature = 'folder=' + folder + '&tags=' + tags + '&timestamp=' + timestamp + config.cloudinary.api_secret
  var key = uuid.v4()

  signature = sha1(signature)

  return {
    token: signature,
    key: key
  }
}

