'use strict'

const { graphql, buildSchema } = require('graphql');
const express = require('express');
const express_gql = require('express-graphql');

const app = express();

// Definir schema:
const schema = buildSchema(`
    type Query {
        "Retorna un saludo al mundo"
        hello: String
        "Retorna un saludo a ti directamente"
        saludo: String
        "Te dice la edad"
        age: Int
    }
`);

// Definir Resolvers:
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

app.use('/api', express_gql({
    schema,
    rootValue: resolvers,
    graphiql: true,
}));

app.listen(3000, () => {
    console.log('Server Up at the port 3000');
});
