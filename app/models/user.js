'use strict'

var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
  authorization: {
    type: Boolean,
    default: false
  },
  openid: String,
  nickname: String,
  age: String,
  accessToken: String,
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

UserSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }

  next()
})

module.exports = mongoose.model('User', UserSchema)
