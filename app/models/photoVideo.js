'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
var Mixed = Schema.Types.Mixed

var PhotoVideoSchema = new Schema({
  user: {
    type: ObjectId,
    ref: 'User'
  },

  type: {
    type:String,
    default: 'photo'
  },

  photoVideoUrl: {
    type: String,
    default: ''
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

PhotoVideoSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }

  next()
})

module.exports = mongoose.model('PhotoVideo', PhotoVideoSchema)
