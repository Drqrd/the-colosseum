// cache.tsx

import { makeVar, InMemoryCache } from '@apollo/client'

// initialization
export const reactiveState = makeVar({})

// default values
reactiveState({
  user: {
    logged_in: false,
  },
  current_page: 'HOME',
  active_modal: null
})

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      field: {
        reactiveState: {
          read() {
            return reactiveState()
          }
        }
      }
    }
  }
})