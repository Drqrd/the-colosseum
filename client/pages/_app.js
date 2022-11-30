import 'styles/globals.scss'

import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import Layout from 'components/Layout'

export default function MyApp({ Component, pageProps }) {

  const httpLink = createHttpLink({
    uri: "http://localhost:4000/",
    credentials: 'include'
  })

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token')

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : 'Bearer null',
      }
    }
  })

  const client = new ApolloClient({
    // uri: "http://localhost:4000/",
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component
          {...pageProps}
        />
      </Layout>
    </ApolloProvider>
  )
}
