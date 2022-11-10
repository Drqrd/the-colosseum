import styles from '@/scss/layout.module.scss'

import Header from '@/prefabs/Header'
import Footer from '@/prefabs/Footer'

import {ModalForgotPassword, ModalLogin} from '@/prefabs/Modals'

import { reactiveState } from 'models/cache'

import { useReactiveVar } from '@apollo/client'

export default function Layout(props) {

  const r_state = useReactiveVar(reactiveState)

  const modal = HandleModals(r_state)

  return (
    <div className={`${styles.container} ${r_state.active_modal ? styles.no_click : ''}`}>
      {modal}
      <Header/>
        {props.children}
      <Footer/>
    </div>
  )
}

function HandleModals(r_state)
{
  if (r_state.active_modal === 'LOGIN') {
    return <ModalLogin/>
  }
  else if (r_state.active_modal === 'FORGOT_PASSWORD') {
    return <ModalForgotPassword/>
  }
  else {
    return ''
  }
}