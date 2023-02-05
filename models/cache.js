// cache.tsx
import { makeVar, InMemoryCache } from '@apollo/client'

// initialization
export const r_user = makeVar({})
export const r_token = makeVar('')
export const r_currentPage = makeVar('')
export const r_activeModal = makeVar('')

// default values
r_token(null)

r_currentPage('HOME')

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      field: {
        r_user: {
          read() {
            return r_user()
          }
        },
        r_token: {
          read() {
            return r_token()
          }
        },
        r_currentPage: {
          read() {
            return r_currentPage()
          }
        },
        r_activeModal: {
          read() {
            return r_activeModal()
          }
        }
      }
    }
  }
})