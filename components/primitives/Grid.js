import styles from '@/scss/grid.module.scss'

export default function Grid(props) {
  const propStyle = {
    flexDirection: props.layout
  }

  return (
    <div className={styles.grid}
      style={propStyle}
    >
      {props.children}
    </div>
  )
}

export function Row(props) {
  const propStyle = {
    columnGap: props.spaceBetween ? `${props.spaceBetween}rem` : ''
  }

  return( 
    <div className={styles.row}
      style={propStyle}
    >
      {props.children}
    </div>
  )
}

export function Col(props) {
  const propStyle = {
    rowGap: props.spaceBetween ? `${props.spaceBetween}rem` : ''
  }
  return(
    <div className={styles.col}
      style={propStyle}
    >
      {props.children}
    </div>
  )
}