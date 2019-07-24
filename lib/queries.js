'use strict'
const connectionDb = require('./db')
const { ObjectID } = require('mongodb')
const { errorHandler } = require('./errorHandler')

module.exports = {
  hello: (root, args) => {
    return `Hola mundo. Argumento es: ${args.variable1}`
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
      errorHandler(error)
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
      errorHandler(error)
    }

    return course
  },
  getPeople: async () => {
    let db
    let courses = []

    try {
      db = await connectionDb()
      courses = await db.collection('students').find().toArray()
    } catch (error) {
      errorHandler(error)
    }

    return courses
  },
  getPerson: async (root, args) => {
    let db
    let student

    try {
      db = await connectionDb()
      student = await db.collection('students').findOne({ _id: ObjectID(args.id) })
    } catch (error) {
      errorHandler(error)
    }

    return student
  },
  searchItems: async (root, { keyword }) => {
    let db
    let searchItems
    let courses
    let people

    try {
      db = await connectionDb()

      people = await db.collection('students').find({
        $text: { $search: keyword }
      }).toArray()

      courses = await db.collection('courses').find({
        $text: { $search: keyword }
      }).toArray()

      searchItems = [...courses, ...people]
    } catch (error) {
      errorHandler(error)
    }

    return searchItems
  }
}
