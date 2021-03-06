'use strict'

const connectionDb = require('./db')
const { ObjectID } = require('mongodb')
const { errorHandler } = require('./errorHandler')

module.exports = {
  Course: {
    people: async ({ people }) => {
      let db
      let peopleData
      let ids

      try {
        db = await connectionDb()

        ids = people ? people.map(id => ObjectID(id)) : []

        peopleData = ids.length > 0 ? await db.collection('students').find({
          _id: { $in: ids }
        }).toArray() : []
      } catch (error) {
        errorHandler(error)
      }

      return peopleData
    }
  },
  Person: {
    __resolveType: (person, ctx, info) => {
      if (person.phone) return 'Monitor'

      return 'Student'
    }
  },
  GlobalSearch: {
    __resolveType: (item, ctx, info) => {
      if (item.title) return 'Course'
      if (item.phone) return 'Monitor'

      return 'Student'
    }
  }
}
