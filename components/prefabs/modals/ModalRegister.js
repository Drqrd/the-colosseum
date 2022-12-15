import Modal from '@/primitives/Modal'
import styles from '@/scss/modals/modalRegister.module.scss'

import { modalToModalTransition } from '@/prefabs/Modals'
import { useMutation, gql } from '@apollo/client'

export default function ModalRegister() {

  let email, username, password, invalidInput = null

  const TRY_REGISTER = gql`
    mutation TryRegister($registerInput: RegisterInput!) {
      register(registerInput: $registerInput)
    }
  `
  const [tryRegister, {data, loading, error}] = useMutation(TRY_REGISTER)

  if (error) { console.log(error) }

  function validateInput() {
    // email regex
    // RFC 5322 compliant regex
    const valid_email_re = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    if (!valid_email_re.test(email.value)) {
      invalidInput = 'Email must be RFC 5322 compliant, e.g. example123@domain.com'
      return true
    }

    // username regex
    // 8 - 20 char long
    // no _ or . at beginning
    // no __ or _. or ._ or .. inside
    // allowed characters [a-zA-Z0-9._]
    // no _ or . at end
    const valid_username_re = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/ 
    if (!valid_username_re.test(username.value)) {
      invalidInput = `
        Username must conform to the following rules:\n
          8 - 20 characters long\n
          No _ or . at the beginning\n
          No __ or . or ._ or .. inside\n
          Characters must be alphanumeric, . or _\n
          No _ or . at the end
      `
      return true
    }

    // password regex
    // Must have at least one uppercase letter
    // Must have at least one special character
    // Must have at least one number
    // Must have at least one lowercase letter
    // Must be 8 - 30 characters in length 
    const valid_password_re = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,30}$/
    if (!valid_password_re.test(password.value)) {
      invalidInput = `
        Password must conform to the following rules:\n
          8 - 30 characters long\n
          At least one:\n
            Lowercase letter
            Uppercase letter
            Number
            Special character (!@#$&*)
      `
      return true
    }
  }

  const registerModal = invalidInput ? 
    (<Modal className={styles.register__container}>
      <h2 className={styles.register__title}>Register</h2>
      
      <div className={styles.register__invalid_register}>
        <div className={styles.register__invalid_register__title}>Error in Input Validation</div>
        <div className={styles.register__invalid_register__description}>{invalidInput}</div>
      </div>

      <form className={styles.register__form}    
        onSubmit= {e => {
          e.preventDefault()

          validateInput()
          
          if (invalidInput === null) {
            tryRegister({
              variables: {
                registerInput: {
                  email: email.value,
                  username: username.value,
                  password: password.value,
                }
              }
            }).then((resp) => {
              console.log(resp.data.register)
            })
          }
        }}
      >
        <label className={styles.register__label}>Email Address</label>
        <input className={styles.register__input} type={'text'} ref = { node => {
          email = node
        }}></input>
        <label className={styles.register__label}>Username</label>
        <input className={styles.register__input} type={'text'} ref= { node => {
          username = node
        }}></input>
        <label className={styles.register__label}>Password</label>
        <input className={styles.register__input} type={'password'} ref= { node => {
          password = node
        }}></input>
        <button className={styles.register__form_submit} type={'submit'}>Register</button>
      </form>
    </Modal>)
  :
    (<Modal className={styles.register__container}>
      <h2 className={styles.register__title}>Register</h2>

      <form className={styles.register__form}    
        onSubmit= {e => {
          e.preventDefault()
          tryRegister({
            variables: {
              registerInput: {
                email: email.value,
                username: username.value,
                password: password.value,
              }
            }
          }).then((resp) => {
            console.log(resp.data.register)
          })
        }}
      >
        <label className={styles.register__label}>Email Address</label>
        <input className={styles.register__input} type={'text'} ref = { node => {
          email = node
        }}></input>
        <label className={styles.register__label}>Username</label>
        <input className={styles.register__input} type={'text'} ref= { node => {
          username = node
        }}></input>
        <label className={styles.register__label}>Password</label>
        <input className={styles.register__input} type={'password'} ref= { node => {
          password = node
        }}></input>
        <button className={styles.register__form_submit} type={'submit'}>Register</button>
      </form>
    </Modal>)

  return registerModal
}