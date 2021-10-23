const { ApolloServer } = require('apollo-server');

const typeDefs = `
  type Query {
    totalMembers: Int!
    getMembers: [Member!]!
  }

  type Mutation {
    addMember(name: String! age: Int!): Member!
  }

  type Member {
    id: ID!
    name: String!
    age: Int!
  }
`

let _id = 0
let members = []

const resolvers = {
  Query: {
    totalMembers: () => members.length,
    getMembers: () => members
  },
  
  Mutation: {
    addMember(parent, args) {

      let newMember = {
        id: _id++,
        ...args
      }
      members.push(newMember)

      return newMember
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