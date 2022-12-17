const typeDefs =`
type User {
  username: String!
  email: String!
  password: String!
  token: String!
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

type Query {
  users: [User]
  getUserById(id: ID!): User
  
}

type Mutation {
  register(registerInput: RegisterInput!) : String!
  login(loginInput: LoginInput!): String!
}
`

export default typeDefs