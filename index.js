'use strict'

require('dotenv').config()

const { makeExecutableSchema } = require('graphql-tools')
const express = require('express')
const expressGraphql = require('express-graphql')
const { readFileSync } = require('fs')
const { join } = require('path')
const resolvers = require('./lib/resolvers')
const cors = require('cors')

const app = express()

// Definir schema:
const schema = makeExecutableSchema({
  typeDefs: readFileSync(join(__dirname, 'lib', 'schema.graphql'), 'utf-8'),
  resolvers
})

app.use(cors())

app.use('/api', expressGraphql({
  schema,
  rootValue: resolvers,
  graphiql: true
}))

app.listen(3000, () => {
  console.log('Server Up at the port 3000')
})
