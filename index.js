'use strict'

const { graphql, buildSchema } = require('graphql');

// Definir schema:
const schema= buildSchema(`
    type Query {
        hello: String
        saludo: String
        age: Int
    }
`);

// Definir Resolver:
const resolvers = {
    hello: () => {
        return 'Hola Mundo';
    },
    saludo: () => {
        return 'Hey man, how are you?';
    },
    age: () => {
        return 28;
    }
}

// execute query
graphql(schema, '{ hello saludo age }', resolvers).then(data => {
    console.log(data);
});
