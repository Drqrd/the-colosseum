import Modal from '@/primitives/Modal'

import styles from '@/scss/modals.module.scss'

import { reactiveState } from 'models/cache'

import { useReactiveVar } from '@apollo/client'

export function ModalLogin() {

  const r_state = useReactiveVar(reactiveState)

  const description = 'Accessing further features requires a login.\nPlease enter your credentials below!'
  
  function modalLogin_formSubmit() {
    console.log('Working')
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
        <input className={styles.login__input} type={'text'}></input>
        <label className={styles.login__label}>Password</label>
        <input className={styles.login__input} type={'text'}></input>
        <div className={styles.login__checkbox_container}>
          <input className={styles.login__checkbox} type={'checkbox'}></input>
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