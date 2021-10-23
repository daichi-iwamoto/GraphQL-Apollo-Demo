const { ApolloServer } = require('apollo-server');

const typeDefs = `
  type Query {
    totalMembers: Int!
  }

  type Mutation {
    addMember(name: String! age: Int!): Boolean!
  }
`

let members = []
const resolvers = {
  Query: {
    totalMembers: () => members.length
  },
  
  Mutation: {
    addMember(parent, args) {
      members.push(args)
      return true
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server
  .listen()
  .then(({url}) => console.log(`GraphQL Service running opn ${url}`));