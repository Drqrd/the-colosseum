import { r_activeModal } from 'models/cache'

import ModalRegister from '@/modals/ModalRegister'
import ModalLogin from '@/modals/ModalLogin'
import ModalForgotPassword from '@/modals/ModalForgotPassword'

export function modalToModalTransition(newModal) {
  setTimeout(() => { r_activeModal(newModal), 250 })
}

export { ModalRegister, ModalLogin, ModalForgotPassword}