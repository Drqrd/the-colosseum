const typeDefs =`
type User {
  username: String!
  email: String!
  password: String!
  token: String!
}

input LoginInput {
  username: String!
  password: String!
}

input RegisterInput {
  username: String!
  password: String!
  email: String!
}

type Query {
  users: [User]
  getUserById(id: ID!): User,
  login(loginInput: LoginInput): Boolean!
}

type Mutation {
  register(registerInput: RegisterInput): User
}
`

export default typeDefs