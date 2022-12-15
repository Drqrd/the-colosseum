import styles from '@/scss/layout.module.scss'

import Header from '@/prefabs/Header'
import Footer from '@/prefabs/Footer'

import * as modals from '@/prefabs/Modals'

import { r_activeModal } from 'models/cache'

import { useReactiveVar } from '@apollo/client'

export default function Layout(props) {

  const activeModal = useReactiveVar(r_activeModal)

  const modal = HandleModals(activeModal)

  return (
    <div className={`${styles.container} ${activeModal ? styles.no_click : ''}`}>
      {modal}
      <Header/>
        {props.children}
      <Footer/>
    </div>
  )
}

function HandleModals(activeModal)
{
  if (activeModal === 'LOGIN') {
    return <modals.ModalLogin/>
  }
  else if (activeModal === 'FORGOT_PASSWORD') {
    return <modals.ModalForgotPassword/>
  }
  else if (activeModal === 'REGISTER') {
    return <modals.ModalRegister/>
  }
  else {
    return ''
  }
}