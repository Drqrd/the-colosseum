import Modal from '@/primitives/Modal'
import styles from '@/scss/modals/modalLogin.module.scss'

import { modalToModalTransition } from '@/prefabs/Modals'

import { useLazyQuery, gql } from "@apollo/client"
import { r_user, r_token } from 'models/cache'
import { useState } from 'react'


export default function ModalLogin() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [incorrectLogin, setIncorrectLogin] = useState(false)

  const description = 'Accessing further features requires a login.\nPlease enter your credentials below!'
  
  const TRY_LOGIN = gql`
    query Login($loginInput: LoginInput!) {
      login(loginInput: $loginInput)
    }
  `

  const USERS = gql`
    query Users {
      users {
        username
        password
        email
      }
    }
  `

  const [getUsers] = useLazyQuery(USERS)

  const [tryLogin] = useLazyQuery(TRY_LOGIN, { 
    variables : { 
      loginInput: {
        username,
        password
      }
    },
  })

  function handleCheckbox() {
    setRememberMe(!rememberMe)
  }

  function register() {
    modalToModalTransition('REGISTER')
  }

  function forgot_password() {
    modalToModalTransition('FORGOT_PASSWORD')
  }

  function handleInput() {
    tryLogin({username, password}).then((resp) => {
      if (resp.data) {
        console.log(resp)
      
        r_user({
          ...r_user(),
          logged_in: resp.data,   
        })
        
        if (resp.data.login !== 'error') {
          console.log(token)
          setIncorrectLogin(false)
          r_token(resp.data.login)
          setTimeout(() => {
            modalToModalTransition('')
          }, 1250)
        }
        else {
          setIncorrectLogin(true)
        }
      }
    })
  }

  const loginModal = (
    <Modal
      className={styles.login__container}
    >
      <h2 className={styles.login__title}>Login</h2>
      <div className={styles.login__description_container}>
        <div className={styles.login__description}>{description}</div>
      </div>
      
      <button className={`${styles.login__register} ${styles.login__label}`}
        onClick={register}
      >Need an Account?</button>

      <ErrorMessage show={incorrectLogin}/>

      <form className={styles.login__form}
        onSubmit={ e => {
          e.preventDefault()
          handleInput()
        }}
      >
        <label className={styles.login__label}>Username or Email Address</label>
        <input className={styles.login__input} type={'text'} onChange={e => {setUsername(e.target.value)}}></input>
        <label className={styles.login__label}>Password</label>
        <input className={styles.login__input} type={'password'} onChange={e => {setPassword(e.target.value)}}></input>
        <div className={styles.login__checkbox_container}>
          <input className={styles.login__checkbox} type={'checkbox'} onChange={handleCheckbox}></input>
          <label className={`${styles.login__label} ${styles.login__checkbox_label}`}>Remember Me</label>
        </div>
        <button className={styles.login__form_submit} type={'submit'}>Login</button>
      </form>

      <button className={`${styles.login__forgot_password} ${styles.login__label}`}
        onClick={forgot_password}
      >Forgot Password?</button>
    </Modal>
  )

  return loginModal
}

function ErrorMessage(props) {
  return ( props.show ? 
    <div className={styles.login__wrong_login}>
      <div className={styles.login__wrong_login__title}>Wrong Credentials</div>
      <div className={styles.login__wrong_login__description}>Incorrect Input</div>
    </div> : 
    ''
  )
}