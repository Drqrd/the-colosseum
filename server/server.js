import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

const typeDefs = `
  type User {
    username: String
    password: String
  }

  type Query {
    users: [User]
  }
`

const users = [
  {
    username: 'readmorebooks2',
    password: 'abc123'
  },
  {
    username: 'TheLegend27',
    password: 'undefeated'
  }
]

const resolvers = {
  Query: {
    users: () => users,
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