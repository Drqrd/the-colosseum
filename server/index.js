import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import typeDefs from './graphql/typeDefs.js'
import resolvers from './graphql/resolvers/index.js'

import { userData } from './data.js'

const getUserByToken = (token) => userData.filter((user) => user.token === token)[0]

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const context = {
  context: async ({ req} ) => {
    const token = req.headers.token || ''
    const user = await getUserByToken(token.split('Bearer')[1])

    return { 
      user,
     }
  },
  listen: { port: 4000 },
}

const { url } = await startStandaloneServer(server, context)

console.log(`Server started. Listening at: ${url}`)