import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

const typeDefs = `
  type User {
    id: String!
    username: String!
    password: String!
  }

  type Query {
    users: [User],
    usernames: [String],
    usernameExists(username: String!): Boolean!
  }
`

const users = [
  {
    id: '000',
    username: 'readmorebooks2',
    password: 'abc123'
  },
  {
    id: '001',
    username: 'TheLegend27',
    password: 'undefeated'
  }
]

const resolvers = {
  Query: {
    users: () => users,
    usernames: () => users.map((user) => user.username),
    usernameExists: (parent, args) => users.filter((user) => user.username == args.username).length > 0  
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, 
  {
  listen: { port: 4000 },
});

console.log(`Server started: ${url}`)