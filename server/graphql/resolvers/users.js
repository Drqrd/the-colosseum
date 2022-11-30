import { GraphQLError } from 'graphql'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { userData } from '../../data.js'

const userResolvers = { 
  Query: {
    users: () => userData,
    getUserById: (parent, args) => userData.filter((u) => u.id === args.id)[0],
    login: (parent, args) => { 
      const user = userData.filter((u) => u.username === args.username)[0]
      if (user && user.password === args.password) {
        return true
      }
      else return false
    },
  },
  Mutation: {
    register: (parent, args) => {
      const {username, password, email} = args.registerInput
      // Check if user exists
      const userExists = userData.filter((u) => u.email === email || u.username === username) > 0
      
      const newUser = {}

      // If already exists, throw error
      if (userExists) return false 
      /*
      throw new GraphQLError('Username / Email already exists', {
        extensions: {
          code: 'BAD_USER_INPUT',
        }
      })
      */

      // Else generate user given input
      //  Username
      //  email
      //  bcrypted password
      //  jwt token
      
      newUser.username = username
      newUser.email = email
      newUser.password = bcrypt.hash(password, 10)
      newUser.token = jwt.sign(
        { user_id: newUser.id, email },
        'THIS IS AN UNSAFE STRING',
        {
          expiresIn: '2h',
        }
      )
      
      // Add user to db
      userData.push(newUser)

      // return true on success
      return newUser
    },
  }
}

export default userResolvers