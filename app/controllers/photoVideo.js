'user strict'

var mongoose = require('mongoose')
var PhotoVideo = require('../models/photoVideo')
var uuid = require('uuid')
var robot = require('../service/robot')
var utils = require('../service/utils')
var config = require('../../config/config')

// 保存相片或视频
exports.save = function *(next) {
  var photoVideoUrl = this.request.body.photoVideoUrl ? this.request.body.photoVideoUrl.split(',') : ""
  var thumbnailUrl = this.request.body.thumbnailUrl ? this.request.body.thumbnailUrl : ""
  var content = this.request.body.content
  var type = this.request.body.type
  var key = uuid.v4()
  var age = utils.calAge(config.birthday)
  var ageItem = yield PhotoVideo.findOne({age: age})

  // 创建信息
  if (photoVideoUrl) {
    var photoVideo = new PhotoVideo({
      photoVideoUrl: photoVideoUrl,
      thumbnailUrl: thumbnailUrl, 
      type: type,
      id: 'id_'+key,
      content: content,
      age: ageItem ? "" : age
    })
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

// 删除
exports.delete = function *(next) {
  console.log("删除数据")
  var id = this.request.body.id
  var data = yield PhotoVideo.findOne({id:id})
  // var key = data.photoVideoUrl ? data.photoVideoUrl : ''
  // console.log(key)
  // robot.deleteAtQiniu("myphoto",key)

  yield PhotoVideo.remove({id:id})

  this.body = {
    success: true
  }
}