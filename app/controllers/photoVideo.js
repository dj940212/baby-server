'user strict'

var mongoose = require('mongoose')
var PhotoVideo = require('../models/photoVideo')

// 保存相片或视频
exports.save = function *(next) {
  var photoVideoUrl = this.request.body.photoVideoUrl
  var type = this.request.body.type

  // 创建信息
  if (photoVideoUrl) {
    if (type === 'video') {
      var photoVideo = new PhotoVideo({
        photoVideoUrl: photoVideoUrl,
        type: 'video'
      })
    }else{
      var photoVideo = new PhotoVideo({
        photoVideoUrl: photoVideoUrl,
        type: 'photo'
      })
    }
    
  }

  try {
    photoVideo = yield photoVideo.save()
  }
  catch (e) {
    this.body = {
      success: '保存失败'
    }

    return next
  }

  this.body = {
    success: '保存成功',
    photoVideoUrl: photoVideoUrl
  }
}

// 获取列表
exports.find = function *(next) {
  var queryArray = [PhotoVideo.find({})]

  data = yield queryArray

  this.body = {
    success: true,
    data: data[0],
    total: data[1]
  }

}