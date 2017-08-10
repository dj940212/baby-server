'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
var Mixed = Schema.Types.Mixed
var config = require('../../config/config')
var utils = require('../service/utils')

var PhotoVideoSchema = new Schema({
  user: {
    type: ObjectId,
    ref: 'User'
  },
  id: {
    type:String,
    default: ''
  },
  type: {
    type:String,
    default: 'photo'
  },
  photoVideoUrl: {
    type: Array,
    default: []
  },
  thumbnailUrl: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default: ''
  },
  height: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  age: {
    type: String,
    default: ''
  },
  meta: {
    createAt: String,
    updateAt: String
  }
})

PhotoVideoSchema.pre('save', function(next) {
  console.log(this)
  if (this.isNew) {
    this.meta.createAt = utils.formatTime(new Date()) 
    console.log("创建时间",this.meta.createAt)
  }
  else {
    this.meta.updateAt = utils.formatTime(new Date()) 
  }

  next()
})

module.exports = mongoose.model('PhotoVideo', PhotoVideoSchema)
