'use strict'

const connectionDb = require('./db')
const { ObjectID } = require('mongodb')
const { errorHandler } = require('./errorHandler')

module.exports = {
  createCourse: async (root, { input }) => {
    const defaults = {
      teacher: '',
      topic: ''
    }
    let db
    const newCourse = Object.assign(defaults, input)
    let savedCourse

    try {
      db = await connectionDb()

      // insertion:
      savedCourse = await db.collection('courses').insertOne(newCourse)

      newCourse._id = savedCourse.insertedId
    } catch (error) {
      errorHandler(error)
    }

    return newCourse
  },
  editCourse: async (root, { id, input }) => {
    let db
    let course

    try {
      db = await connectionDb()

      // Updation:
      await db.collection('courses').updateOne({ _id: ObjectID(id) }, { $set: input })

      course = await db.collection('courses').findOne({ _id: ObjectID(id) })
    } catch (error) {
      errorHandler(error)
    }

    return course
  },
  deleteCourse: async (root, { id }) => {
    let db
    let course

    try {
      db = await connectionDb()
      course = await db.collection('courses').findOne({ _id: ObjectID(id) })

      // Deletion:
      await db.collection('courses').deleteOne({ _id: ObjectID(id) })
    } catch (error) {
      errorHandler(error)
    }

    return course
  },
  createPerson: async (root, { input }) => {
    let db
    let savedStudent

    try {
      db = await connectionDb()

      // insertion:
      savedStudent = await db.collection('students').insertOne(input)

      input._id = savedStudent.insertedId
    } catch (error) {
      errorHandler(error)
    }

    return input
  },
  editPerson: async (root, { id, input }) => {
    let db
    let student

    try {
      db = await connectionDb()

      // Updation:
      await db.collection('students').updateOne({ _id: ObjectID(id) }, { $set: input })

      student = await db.collection('students').findOne({ _id: ObjectID(id) })
    } catch (error) {
      errorHandler(error)
    }

    return student
  },
  deletePerson: async (root, { id }) => {
    let db
    let person

    try {
      db = await connectionDb()
      person = await db.collection('students').findOne({ _id: ObjectID(id) })

      // Deletion:
      await db.collection('students').deleteOne({ _id: ObjectID(id) })
    } catch (error) {
      errorHandler(error)
    }

    return person
  },
  addPeople: async (root, { courseId, personId }) => {
    let db
    let person
    let course

    try {
      db = await connectionDb()

      person = await db.collection('students').findOne({ _id: ObjectID(personId) })
      course = await db.collection('courses').findOne({ _id: ObjectID(courseId) })

      if (!course || !person) throw new Error('Course or person not found.')

      await db.collection('courses').updateOne({ _id: ObjectID(courseId) }, {
        $addToSet: { people: ObjectID(personId) }
      })
    } catch (error) {
      console.error(error)
    }

    return course
  }
}
