const graphql = require('graphql')

let fakeDatabase = {
  'a': {
    id: 'a',
    name: 'alice',
  },
  'b': {
    id: 'b',
    name: 'bob',
  },
}

const userType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString }
  }
})

const queryType = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: userType,
      args: {
        id: { type: graphql.GraphQLString }
      },
      resolve: (_, { id }) => fakeDatabase[id]
    }
  }
})

// const mutationType = new graphql.GraphQLObjectType({
//   name: 'Mutation',
//   description: 'jkdjfl',
//   fields: () => ({
//     addUser: {
//       type: userType,
//       description: 'add user',
//       args: {
//         name: { type: graphql.GraphQLNonNull(graphql.GraphQLString)}
//       },
//       resolve: (value, {name}) => {
//         fakeDatabase.c = name
//         return true   
//       }
//     }
//   })
// })

// https://medium.com/@HurricaneJames/graphql-mutations-fb3ad5ae73c4

module.exports = new graphql.GraphQLSchema({ query: queryType })