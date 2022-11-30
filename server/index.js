import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import typeDefs from './graphql/typeDefs.js'
import resolvers from './graphql/resolvers/index.js'

import { userData } from './data.js'
import jws from 'jsonwebtoken'

// import mongoose from 'mongoose'

// const mongoDB = 'mongodb+srv://Justinm0623:dpYNCFvRbuis81Ki@colosseum-cluster.iye0zem.mongodb.net/test'

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

/*
mongoose.connect(mongoDB, { useNewUrlParser: true})
  .then(() => {
    console.log('MongoDB Connected')
    return server.listen({port: 4000})
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`)
  })
*/

const { url } = await startStandaloneServer(server, context)

console.log(`Server started. Listening at: ${url}`)