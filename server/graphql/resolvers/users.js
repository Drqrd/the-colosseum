import { GraphQLError } from 'graphql'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { userData } from '../../data.js'

const userResolvers = { 
  Query: {
    users: () => userData,
    getUserById: (parent, args) => userData.filter((u) => u.id === args.id)[0],
    getUserByToken: (parent, args) => userData.filter((u) => u.token === args.token)[0]
  },
  Mutation: {
    register: (parent, args) => {
      const {username, password, email} = args.registerInput

      // Check if email exists
      const emailExists = userData.find((u) => u.email === email)

      // If already exists, throw error
      if (emailExists) return 'Email already exists'
      /*
      if (emailExists) {
        throw new GraphQLError('Email already exists', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      */

      // Check if username exists
      const usernameExists = userData.find((u) => u.username === username)

      // If already exists, throw error
      if (usernameExists) return 'Username already exists'
      /*
      if (usernameExists) {
        throw new GraphQLError('Username already exists', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      */


      const newUser = {}

      // Else generate user given input
      //  Username
      //  email
      //  bcrypted password
      //  jwt token
      
      newUser.username = username
      newUser.email = email
      bcrypt.hash(password, 10, function (err, hash) {
        newUser.password = hash
      })
      newUser.token = jwt.sign(
        { user_id: email },
        'THIS IS AN UNSAFE STRING',
        {
          expiresIn: '2h',
        }
      )
      
      // Add user to db
      userData.push(newUser)

      // return on success
      return 'success'
    },

    login: async (parent, args) => {
      const {usernameOrEmail, password} = args.loginInput
      const user = userData.find((u) => u.username === usernameOrEmail || u.email === usernameOrEmail)
      if (user === undefined) return 'error'

      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
          { user_id: user.email },
          'THIS IS AN UNSAFE STRING',
          {
            expiresIn: '2h',
          }
        )
        
        const index = userData.findIndex((u) => u.username === user.username)
        
        userData[index].token = token

        return userData[index]
      }
      
      return null
    },
  }
}

export default userResolvers