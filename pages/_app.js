import 'styles/globals.scss'

import Head from 'next/head'

import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider, useReactiveVar } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import { r_token } from 'models/cache'

import Layout from 'components/Layout'

export default function MyApp({ Component, pageProps }) {

  function getValidToken() {
    return r_token()
  }

  const httpLink = createHttpLink({
    uri: "http://localhost:4000",
  })
 

  const authLink = setContext(async (_, { headers }) => {
    const token = await getValidToken()
    
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : 'Bearer null',
      }
    }
  })

  const client = new ApolloClient({
    // uri: "http://localhost:4000",
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Layout>
        <Head>
          <title>The Colosseum</title>
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <Component
          {...pageProps}
        />
      </Layout>
    </ApolloProvider>
  )
}
