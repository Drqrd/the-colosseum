import 'styles/globals.scss'

import Head from 'next/head'

import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider, useReactiveVar } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import { reactiveState } from 'models/cache'

import Layout from 'components/Layout'

export default function MyApp({ Component, pageProps }) {

  const httpLink = createHttpLink({
    uri: "http://localhost:4000/",
    credentials: 'include'
  })

  const authLink = setContext((_, { headers }) => {
    const token = useReactiveVar(reactiveState).user.token

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
        <Head>
          <title>The Colosseum</title>
          <link rel="shortcut icon" href="/favicons/favicon.ico" />
        </Head>
        <Component
          {...pageProps}
        />
      </Layout>
    </ApolloProvider>
  )
}
