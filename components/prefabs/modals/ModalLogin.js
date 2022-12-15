import Modal from '@/primitives/Modal'
import styles from '@/scss/modals/modalLogin.module.scss'

import { modalToModalTransition } from '@/prefabs/Modals'

import { useLazyQuery, gql } from "@apollo/client"
import { r_user, r_token } from 'models/cache'
import { useState } from 'react'


export default function ModalLogin() {

  const [username, modalLogin_setUsername] = useState('')
  const [password, modalLogin_setPassword] = useState('')
  const [rememberMe, modalLogin_setRememberMe] = useState(false)
  const [correctLogin, modalLogin_setCorrectLogin] = useState(null)

  const description = 'Accessing further features requires a login.\nPlease enter your credentials below!'
  
  const TRY_LOGIN = gql`
    query Login($username: String!, $password: String!) {
      login(username: $username, password: $password)
    }
  `
  const [tryLogin] = useLazyQuery(TRY_LOGIN, { 
    variables : { username, password },
  })

  function modalLogin_handleCheckbox() {
    modalLogin_setRememberMe(!rememberMe)
  }

  function modalLogin_forgotPassword() {
    modalToModalTransition('FORGOT_PASSWORD')
  }

  function modalLogin_register() {
    modalToModalTransition('REGISTER')
  }
  function modalLogin_incorrectUsernameOrPassword() {

  }

  console.log(tryLogin)

  const loginModal = correctLogin !== null && !correctLogin  ? 
    (<Modal
        className={styles.login__container}
    >
      <h2 className={styles.login__title}>Login</h2>
      <div className={styles.login__description_container}>
        <div className={styles.login__description}>{description}</div>
      </div>
      
      <button className={`${styles.login__register} ${styles.login__label}`}
        onClick={modalLogin_register}
      >Need an Account?</button>

      <div className={styles.login__wrong_login}>
        <div className={styles.login__wrong_login__title}>Wrong Credentials</div>
        <div className={styles.login__wrong_login__description}>Incorrect Username or Password</div>
      </div>

      <form className={styles.login__form}>
        <label className={styles.login__label}>Username or Email Address</label>
        <input className={styles.login__input} type={'text'} onChange={e => {modalLogin_setUsername(e.currentTarget.value)}}></input>
        <label className={styles.login__label}>Password</label>
        <input className={styles.login__input} type={'password'} onChange={e => {modalLogin_setPassword(e.currentTarget.value)}}></input>
        <div className={styles.login__checkbox_container}>
          <input className={styles.login__checkbox} type={'checkbox'} onChange={modalLogin_handleCheckbox}></input>
          <label className={`${styles.login__label} ${styles.login__checkbox_label}`}>Remember Me</label>
        </div>
        <input className={styles.login__form_submit} type={'button'} value={'Login'} onClick={(e) => {
          e.preventDefault()
          tryLogin(username, password).then((resp) => {
            r_user({
              ...r_user(),
              logged_in: resp.data,   
            })
      
            if (resp.data) {
              r_token(resp.data.login.token)
            }
          })
        }}></input>
      </form>

      <button className={`${styles.login__forgot_password} ${styles.login__label}`}
        onClick={modalLogin_forgotPassword}
      >Forgot Password?</button>
    </Modal>) :
    (<Modal
      className={styles.login__container}
    >
      <h2 className={styles.login__title}>Login</h2>
      <div className={styles.login__description_container}>
        <div className={styles.login__description}>{description}</div>
      </div>
      
      <button className={`${styles.login__register} ${styles.login__label}`}
        onClick={modalLogin_register}
      >Need an Account?</button>

      <form className={styles.login__form}>
        <label className={styles.login__label}>Username or Email Address</label>
        <input className={styles.login__input} type={'text'} onChange={e => {modalLogin_setUsername(e.currentTarget.value)}}></input>
        <label className={styles.login__label}>Password</label>
        <input className={styles.login__input} type={'password'} onChange={e => {modalLogin_setPassword(e.currentTarget.value)}}></input>
        <div className={styles.login__checkbox_container}>
          <input className={styles.login__checkbox} type={'checkbox'} onChange={modalLogin_handleCheckbox}></input>
          <label className={`${styles.login__label} ${styles.login__checkbox_label}`}>Remember Me</label>
        </div>
        <input className={styles.login__form_submit} type={'button'} value={'Login'} onClick={(e) => {
          e.preventDefault()
          tryLogin(username, password).then((resp) => {
            r_user({
              ...r_user(),
              logged_in: resp.data,   
            })
      
            if (resp.data) {
              r_token(resp.data.login.token)
            }
          })
        }}></input>
      </form>

      <button className={`${styles.login__forgot_password} ${styles.login__label}`}
        onClick={modalLogin_forgotPassword}
      >Forgot Password?</button>
    </Modal>)

  return (
    loginModal
  )
}