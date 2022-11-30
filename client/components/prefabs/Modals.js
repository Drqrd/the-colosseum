import Modal from '@/primitives/Modal'

import styles from '@/scss/modals.module.scss'

import { reactiveState } from 'models/cache'

import { useState } from 'react'

import { gql, useLazyQuery } from '@apollo/client'

export function ModalLogin() {

  const [username, modalLogin_setUsername] = useState('')
  const [password, modalLogin_setPassword] = useState('')
  const [rememberMe, modalLogin_setRememberMe] = useState(false)
  const [correctLogin, modalLogin_correctLogin] = useState(null)
  
  const description = 'Accessing further features requires a login.\nPlease enter your credentials below!'
  
  const TRY_LOGIN = gql`
    query TryLogin($username: String!, $password: String!) {
      login(username: $username, password: $password)
    }
  `
  const [tryLogin, {login_loading, login_error, login_data}] = useLazyQuery(TRY_LOGIN, { 
    variables : { username, password },
    /*
    context: {
      headers: {
        authorization: `${
          reactiveState.user.token ? reactiveState.user.token : ''
        }`,
      }
    }
    */
  })

  function modalLogin_handleCheckbox() {
    modalLogin_setRememberMe(!rememberMe)
  }

  function modalLogin_formSubmit() {
    tryLogin(username, password).then((resp) => {
      
      reactiveState({
        ...reactiveState,
        user: {
          ...reactiveState.user,
          logged_in: resp.data
        }
      })

      if (resp.data) {
        localStorage.setItem('token', resp.data.login.token)
        localStorage.setItem('userId', resp.data.login.id)
      }
    })
  }

  function modalLogin_forgotPassword() {
    modalToModalTransition('FORGOT_PASSWORD')
  }

  function modalLogin_incorrectUsernameOrPassword() {

  }

  const modal = correctLogin != null && !correctLogin  ? 
    <Modal
        className={styles.login__container}
    >
      <h2 className={styles.login__title}>Login</h2>
      <div className={styles.login__description_container}>
        <div className={styles.login__description}>{description}</div>
      </div>
      
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
        <input className={styles.login__form_submit} type={'button'} value={'Login'} onClick={modalLogin_formSubmit}></input>
      </form>

      <button className={`${styles.login__forgot_password} ${styles.login__label}`}
        onClick={modalLogin_forgotPassword}
      >Forgot Password?</button>
    </Modal> :
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
        <input className={styles.login__input} type={'password'} onChange={e => {modalLogin_setPassword(e.currentTarget.value)}}></input>
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

  return (
    modal
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