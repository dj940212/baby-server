'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
var Mixed = Schema.Types.Mixed
var config = require('../../config/config')

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
  text: {
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
  console.log(this)
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = new Date(Date.now())
    // var birthdayDate = new Date(config.birthday)
    // var year = this.meta.createAt.getFullYear() - birthday.getFullYear()
    // var month = this.meta.createAt.getMonth() - birthdayDate.getMonth()
    // var date = timestamp.getDate()
    // this.age = year+'岁'
  }
  else {
    this.meta.updateAt = Date.now()
  }

  next()
})

module.exports = mongoose.model('PhotoVideo', PhotoVideoSchema)
