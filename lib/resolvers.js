'use strict'

const courses =  [
  {
    _id: '1',
    title: 'Hey my man',
    teacher: 'Snoop Dog',
    description: 'Brownies',
    topic: 'Life'
  },
  {
    _id: '2',
    title: 'Hey my man 2',
    teacher: 'Snoop Dog',
    description: 'Brownies',
    topic: 'Life'
  },
  {
    _id: '3',
    title: 'Hey my man 3',
    teacher: 'Snoop Dog',
    description: 'Brownies',
    topic: 'Life'
  }
]

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
    getCourses: () => {
      return courses
    },
    getCourse: (root, args) => {
      console.log(`El argumento es ${args.id}`)
      const course = courses.filter(course => course._id === args.id)

      return course.pop()
    }
  }
}
