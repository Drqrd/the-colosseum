const typeDefs =`
type User {
  username: String!
  email: String!
  password: String!
  token: String!
}

type Error {
  error: String!
}

input LoginInput {
  usernameOrEmail: String!
  password: String!
}

input RegisterInput {
  username: String!
  password: String!
  email: String!
}

union LoginResult = User | Error

type Query {
  users: [User]
  getUserById(id: ID!): User
  getUserByToken(token: String!): User
}

type Mutation {
  register(registerInput: RegisterInput!): String!
  login(loginInput: LoginInput!): User!
  deleteAccount(email: String!): String!
}
`

export default typeDefs