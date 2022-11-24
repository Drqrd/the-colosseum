import styles from '@/scss/underConstruction.module.scss'

import { Icon } from '@/primitives/Icon'

import { mdiWrenchOutline } from '@mdi/js'

export default function UnderConstruction(props) {
  const propStyle = {
    width: props.width,
    height: props.height,
    ...props.style
  }

  return (
    <div className={`${styles.container} ${props.className}`}
      style={propStyle}
    >
      <div>
        <Icon
          path={mdiWrenchOutline}
          size={7.5}
        />
      </div>
      <div>
        <h4 className={styles.text}>This section is under construction...</h4>
      </div>
    </div>
  )
}