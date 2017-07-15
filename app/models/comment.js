'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var CommentSchema = new Schema({
  creation: {type: ObjectId, ref: 'Creation'},

  content: String,

  replyBy: {
    type: ObjectId,
    ref: 'User'
  },

  replyTo: {
    type: ObjectId,
    ref: 'User'
  },

  reply: [{
    from: {type: ObjectId, ref: 'User'},
    to: {type: ObjectId, ref: 'User'},
    content: String
  }],

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

CommentSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }

  next()
})

module.exports = mongoose.model('Comment', CommentSchema)
