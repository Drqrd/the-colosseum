import Modal from '@/primitives/Modal'

import styles from '@/scss/modals.module.scss'

import { reactiveState } from 'models/cache'

import { useState } from 'react'

import { gql, useLazyQuery, useQuery } from '@apollo/client'

export function ModalLogin() {

  const [username, modalLogin_setUsername] = useState('')
  const [password, modalLogin_setPassword] = useState('')
  const [rememberMe, modalLogin_setRememberMe] = useState(false)
  
  const description = 'Accessing further features requires a login.\nPlease enter your credentials below!'
  
  const VALIDATE_USERNAME = gql`
    query ValidateUsername($username: String!) {
      usernameExists(username: $username)
    }
  `

  const [validateUsername, {loading, error,data}] = useLazyQuery(VALIDATE_USERNAME, { 
    variables : { username }
  })

  function modalLogin_handleCheckbox() {
    modalLogin_setRememberMe(!rememberMe)
  }

  function modalLogin_formSubmit() {
    validateUsername(username).then((resp) => console.log(resp.data))
  }

  function modalLogin_forgotPassword() {
    modalToModalTransition('FORGOT_PASSWORD')
  }

  return (
    <Modal
      className={styles.login__container}
    >
      <h2 className={styles.login__title}>Login</h2>
      <div className={styles.login__description_container}>
        <div className={styles.login__description}>{description}</div>
      </div>
      
      <form className={styles.login__form}>
        <label className={styles.login__label}>Username or Email Address</label>
        <input className={styles.login__input} type={'text'} onChange={e => {modalLogin_setUsername(e.currentTarget.value)}}></input>
        <label className={styles.login__label}>Password</label>
        <input className={styles.login__input} type={'text'} onChange={e => {modalLogin_setPassword(e.currentTarget.value)}}></input>
        <div className={styles.login__checkbox_container}>
          <input className={styles.login__checkbox} type={'checkbox'} onChange={modalLogin_handleCheckbox}></input>
          <label className={`${styles.login__label} ${styles.login__checkbox_label}`}>Remember Me</label>
        </div>
        <input className={styles.login__form_submit} type={'button'} value={'Login'} onClick={modalLogin_formSubmit}></input>
      </form>

      <button className={`${styles.login__forgot_password} ${styles.login__label}`}
        onClick={modalLogin_forgotPassword}
      >Forgot Password?</button>

    </Modal>
  )
}

export function ModalForgotPassword() {
  return (
    <Modal>

    </Modal>
  )
}

function modalToModalTransition(newModal) {
  setTimeout(() => {
    reactiveState({
      ...reactiveState(),
      active_modal: newModal
    }), 250
  })
}