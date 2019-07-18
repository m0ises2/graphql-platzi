'use strict'
const { MongoClient } = require('mongodb')

const {
  DB_PREFIX,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME
} = process.env

const url = `${DB_PREFIX}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/test?retryWrites=true&w=majority`

let conn

async function connection () {
  if (conn) return conn

  let client

  try {
    client = await MongoClient.connect(url, {
      useNewUrlParser: true
    })

    conn = client.db(DB_NAME)
  } catch (error) {
    console.error('Error connecting DB')
    console.log('%o', error)

    process.exit(1)
  }

  return conn
}

module.exports = connection
