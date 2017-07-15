'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
var Mixed = Schema.Types.Mixed

var CreationSchema = new Schema({
  author: {
    type: ObjectId,
    ref: 'User'
  },

  video: {
    type: ObjectId,
    ref: 'Video'
  },

  audio: {
    type: ObjectId,
    ref: 'Audio'
  },

  title: String,


  qiniu_thumb: String,
  qiniu_video: String,

  cloudinary_thumb: String,
  cloudinary_video: String,

  finish: {
    type: Number,
    default: 0
  },

  votes: [String],
  up: {
    type: Number,
    default: 0
  },

  meta: {
    createAt: {
      type: Date,
      dafault: Date.now()
    },
    updateAt: {
      type: Date,
      dafault: Date.now()
    }
  }
})

CreationSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }

  next()
})

module.exports = mongoose.model('Creation', CreationSchema)
