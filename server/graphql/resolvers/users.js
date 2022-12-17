import { GraphQLError } from 'graphql'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { userData } from '../../data.js'

const userResolvers = { 
  Query: {
    users: () => userData,
    getUserById: (parent, args) => userData.filter((u) => u.id === args.id)[0],
  },
  Mutation: {
    register: (parent, args) => {
      const {username, password, email} = args.registerInput

      // Check if email exists
      const emailExists = userData.filter((u) => u.email === email).length > 0

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
      const usernameExists = userData.filter((u) => u.username === username).length > 0

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
      newUser.password = bcrypt.hash(password, 10)
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
    login: (parent, args) => {
      const {usernameOrEmail, password} = args.loginInput
      const user = userData.filter((u) => u.username === usernameOrEmail || u.email === usernameOrEmail)
      if (user[0].password && bcrypt.compare(password, user[0].password)) {
        
        const token = jwt.sign(
          { user_id: user.email },
          'THIS IS AN UNSAFE STRING',
          {
            expiresIn: '2h',
          }
        )
        
        const index = userData.findIndex((u) => u.username === user[0].username)
        
        userData[index].token = token

        return userData[index].token
      }
      else return 'error'
    },
  }
}

export default userResolvers