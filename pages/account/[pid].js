import styles from '@/scss/account.module.scss'

import { useMutation, useReactiveVar, gql } from '@apollo/client'

import {r_user} from 'models/cache'

export default function Account() {

  const userInfo = useReactiveVar(r_user)

  const DELETE_ACCOUNT = gql`
    mutation DeleteAccount($email: String!) {
      deleteAccount(email: $email)
    }
  `

  const [deleteAccount] = useMutation(DELETE_ACCOUNT, {
    variables: {
      email: userInfo.email
    }
  })

  function handleDeleteAccount() {
    deleteAccount(userInfo.email).then((resp) => {
      console.log(resp)
    })
  }

  return (
    <div className={styles.body}>
      <div className={styles.banner}/>
      
      <div className={styles.title_container}><h2>Account Page</h2></div>

      <div className={styles.user_info__container}>
        <div className={styles.user_info__icon__container}>
          <div className={styles.user_info__icon__background}></div>
        </div>
        <div className={styles.user_info__data__container}>
          <div className={styles.user_info__data__username}>{userInfo.username}</div>
          <div className={styles.user_info__data__email}>{userInfo.email}</div>
          <div>advert</div>
        </div>
      </div>

      <button 
        className={styles.delete_account}
        onClick={handleDeleteAccount}
      >Delete Account</button>
    </div> 
  )
}