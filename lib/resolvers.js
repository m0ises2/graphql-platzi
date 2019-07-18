'use strict'

const connectionDb = require('./db')
const { ObjectID } = require('mongodb')

module.exports = {
  Query: {
    hello: () => {
      return 'Hola Mundo'
    },
    saludo: () => {
      return 'Hey man, how are you?'
    },
    age: () => {
      return 28
    },
    getCourses: async () => {
      let db
      let courses = []

      try {
        db = await connectionDb()
        courses = await db.collection('courses').find().toArray()
      } catch (error) {
        console.error(error)
      }

      return courses
    },
    getCourse: async (root, args) => {
      let db
      let course

      try {
        db = await connectionDb()
        course = await db.collection('courses').findOne({ _id: ObjectID(args.id) })
      } catch (error) {
        console.error(error)
      }

      return course
    }
  }
}
