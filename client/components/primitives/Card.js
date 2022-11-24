import styles from '@/scss/card.module.scss'

import UnderConstruction from '@/prefabs/cards/UnderConstruction'

export default function Card(props) {
  const propStyle = {
    width: props.width,
    height: props.height,
    ...props.style
  }

  const children = props.children || (<UnderConstruction/>)

  return (
    <div className={`${styles.container} ${props.className}`}
      style={propStyle}
    >
      {children}
    </div>
  )
}