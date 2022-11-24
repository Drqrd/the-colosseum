
import { useEffect, useState } from 'react'

import styles from '@/scss/modal.module.scss'

import IconButton from '@/primitives/IconButton'

import { reactiveState } from 'models/cache'

import {mdiClose} from '@mdi/js'

export default function Modal(props) {

  const [open, setOpen] = useState(true)

  useEffect(()=> {
    if (!open) {
      setTimeout(() => {
        CloseModal()
      }, 250)
    }
  },[open])

  return (
    <div className={styles.background}>
      <div className={`${styles.container} ${props.className} ${open ? styles.open : styles.close}`}>
        <IconButton
          icon={mdiClose}
          round={true}
          size={2.4}
          iconColor={'#808080'}
          className={styles.button}
          onClick={() => {
            setOpen(false)
          }}
        />
        {props.children}
      </div>
    </div>
  )
}

function CloseModal() {
  console.log('Closing Modal...')
  reactiveState({
    ...reactiveState(),
    active_modal: null
  })
}