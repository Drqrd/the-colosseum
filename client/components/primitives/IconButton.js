import styles from '@/scss/iconButton.module.scss'

import { Icon } from '@/primitives/Icon'

import { mdiHelp } from '@mdi/js'

export default function IconButton(props) {
  const buttonStyle = {
    borderRadius: props.round ? props.size + 'rem' : props.rounded ? '.25rem' : 0,
  }

  const iconProps = {
    path: props.icon,
    size: props.size || props.iconSize,
    horizontal: props.iconHorizontal,
    vertical: props.iconVertical,
    rotate: props.iconRotate,
    color: props.iconColor,
  }

  let textLeft, textRight

  textLeft = (props.textLeft) ? <div className={styles.text}>{props.textLeft}</div> : null
  textRight = (props.textRight) ? <div className={styles.text}>{props.textRight}</div> : null

  return (
    <button
      style={buttonStyle}
      className={`${styles.button} ${props.className}`}
      onClick={props.onClick}
    >
      {textLeft}
      <Icon
        {...iconProps}
      />
      {textRight}
    </button>
  )
}

IconButton.defaultProps = {
  size: 2.4,
  round: false,
  rounded: false,
  textLeft: null,
  textRight: null,

  icon: mdiHelp,
  iconSize: 2.4,
  iconHorizontal: false,
  iconVertical: false,
  iconRotate: 0,
  iconColor: '#FFFFFF',
}