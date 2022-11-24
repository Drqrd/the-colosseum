import styles from '@/scss/icon.module.scss'

import Icon from '@mdi/react'

import { mdiHelp } from '@mdi/js'

function C_Icon(props) {
  return ( 
    <Icon
      path={props.path}
      size={props.size / 1.5}
      horizontal={props.horizontal}
      vertical={props.vertical}
      rotate={props.rotation}
      color={props.color}
      className={styles.icon}
    />
  )
}

Icon.defaultProps = {
  path: mdiHelp,
  size: 2.4,
  horizontal: false,
  vertical: false,
  rotate: 0,
  color: '#FFFFFF',
}

export { C_Icon as Icon }