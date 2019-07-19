'use strict'

const connectionDb = require('./db')

module.exports = {
    createCourse: async (root, {input}) => {
        const defaults = {
            teacher: '',
            topic: ''
        }
        let db 
        let newCourse = Object.assign(defaults, input)
        let savedCourse

        try {
            db = await connectionDb()

            // insertion:
            savedCourse = await db.collection('courses').insertOne(newCourse)
            
            newCourse._id = savedCourse.insertedId
        } catch (error) {
            console.log(error)
        }

        return newCourse
    },
    createStudent: async (root, {input}) => {
        let db 
        let savedStudent
        
        try {
            db = await connectionDb()

            // insertion:
            savedStudent = await db.collection('students').insertOne(input)
            
            input._id = savedStudent.insertedId
        } catch (error) {
            console.log(error)
        }

        return input
    }
}
