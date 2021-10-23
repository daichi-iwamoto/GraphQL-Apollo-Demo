const { ApolloServer } = require('apollo-server');

const typeDefs = `
  type Query {
    totalMembers: Int!
    getMembers: [Member!]!
  }

  enum Role {
    president
    manager
    employee
  }

  type Member {
    id: ID!
    name: String!
    age: Int!
    role: Role!
  }

  input addMemberInput {
    name: String!
    age: Int!
    role: Role=employee
  }

  type Mutation {
    addMember(input: addMemberInput): Member!
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
        ...args.input
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