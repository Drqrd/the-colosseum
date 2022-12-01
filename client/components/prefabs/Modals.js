import Modal from '@/primitives/Modal'

import styles from '@/scss/modals.module.scss'

import { reactiveState } from 'models/cache'

import { useState } from 'react'

import { gql, useLazyQuery } from '@apollo/client'

export function ModalLogin() {

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
  const [tryLogin, {login_loading, login_error, login_data}] = useLazyQuery(TRY_LOGIN, { 
    variables : { username, password },
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
        reactiveState({
          ...reactiveState,
          user: {
            ...reactiveState.user,
            token: resp.data.login.token
          }
        })
      }
    })
  }

  function modalLogin_forgotPassword() {
    modalToModalTransition('FORGOT_PASSWORD')
  }

  function modalLogin_incorrectUsernameOrPassword() {

  }

  const loginModal = correctLogin != null && !correctLogin  ? 
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

      <button className={`${styles.login__register} ${styles.login__label}`}
        onClick={modalToModalTransition('REGISTER')}
      ></button>
    </Modal>

  return (
    loginModal
  )
}

export function ModalRegister() {

  const [email, modalRegister_setEmail] = useState('')
  const [username, modalRegister_setUsername] = useState('')
  const [password, modalRegister_setPassword] = useState('')

  const TRY_REGISTER = gql`
    query Register($email: String!, $username: String!, $password: String!) {
      register({email: $email, username: $username, password: $password})
    }
  `
  const [tryRegister, {register_loading, register_error, register_data}] = useLazyQuery(TRY_REGISTER, { 
    variables : { email, username, password },
  })


  function modalRegister_formSubmit() {
    tryRegister(email, username, password).then((resp) => {
      if (resp.data) {
        console.log('success')
      }
      else {
        console.log('failure')
      }
    })
  }

  const registerModal = !correctRegister ? 
    <Modal>
      <h2 className={styles.register__title}>Register</h2>

      <div className={styles.login__wrong_login}>
        <div className={styles.login__wrong_login__title}>Wrong Credentials</div>
        <div className={styles.login__wrong_login__description}>Incorrect Username or Password</div>
      </div>

      <form className={styles.register__form}>
      <label className={styles.register__label}>Email Address</label>
        <input className={styles.register__input} type={'text'} onChange={e => {modalRegister_setEmail(e.currentTarget.value)}}></input>
        <label className={styles.register__label}>Username</label>
        <input className={styles.register__input} type={'text'} onChange={e => {modalRegister_setUsername(e.currentTarget.value)}}></input>
        <label className={styles.register__label}>Password</label>
        <input className={styles.register__input} type={'password'} onChange={e => {modalRegister_setPassword(e.currentTarget.value)}}></input>
        <input className={styles.register__form_submit} type={'button'} value={'Register'} onClick={modalRegister_formSubmit}></input>
      </form>
    </Modal> : 
    <Modal>
      <h2 className={styles.register__title}>Register</h2>

      <div className={styles.register__invalid_register}>
        <div className={styles.register__invalid_register__title}>Wrong Credentials</div>
        <div className={styles.register__invalid_register__description}>Incorrect Username or Password</div>
      </div>

      <form className={styles.register__form}>
        <label className={styles.register__label}>Email Address</label>
        <input className={styles.register__input} type={'text'} onChange={e => {modalRegister_setEmail(e.currentTarget.value)}}></input>
        <label className={styles.register__label}>Username</label>
        <input className={styles.register__input} type={'text'} onChange={e => {modalRegister_setUsername(e.currentTarget.value)}}></input>
        <label className={styles.register__label}>Password</label>
        <input className={styles.register__input} type={'password'} onChange={e => {modalRegister_setPassword(e.currentTarget.value)}}></input>
        <input className={styles.register__form_submit} type={'button'} value={'Register'} onClick={modalRegister_formSubmit}></input>
      </form>
    </Modal>

  return (
    registerModal
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