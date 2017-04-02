const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./data/schema')
const cors = require('cors')

let app = express()
app.use('*', cors({ origin: 'http://localhost:3000' }))
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}))
app.listen(4000)
console.log('Running a GraphQL API server at localhost:4000/graphql')