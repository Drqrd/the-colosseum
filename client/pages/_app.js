import 'styles/globals.scss'

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import Layout from 'components/Layout'

export default function MyApp({ Component, pageProps }) {

  const client = new ApolloClient({
    uri: "http://localhost:4000/",
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
