'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
var Mixed = Schema.Types.Mixed

var VideoSchema = new Schema({
  author: {
    type: ObjectId,
    ref: 'User'
  },

  qiniu_key: String,
  persistentId: String,
  qiniu_final_key: String,
  qiniu_detail: Mixed,

  public_id: String,
  detail: Mixed,

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

VideoSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }

  next()
})

module.exports = mongoose.model('Video', VideoSchema)
