'use strict'

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
      return [
        {
          _id: 'Any ID',
          title: 'Hey my man',
          teacher: 'Snoop Dog',
          description: 'Brownies',
          topic: 'Life'
        },
        {
          _id: 'Any ID',
          title: 'Hey my man 2',
          teacher: 'Snoop Dog',
          description: 'Brownies',
          topic: 'Life'
        },
        {
          _id: 'Any ID',
          title: 'Hey my man 3',
          teacher: 'Snoop Dog',
          description: 'Brownies',
          topic: 'Life'
        }
      ]
    }
  }
}
