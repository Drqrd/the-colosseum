import styles from '@/scss/grid.module.scss'

export default function Grid(props) {
  const propStyle = {
    flexDirection: props.layout,
    rowGap: props.layout === 'column' ? props.spaceBetween ? `${props.spaceBetween}rem` : '' : '',
    columnGap: props.layout === 'row' ? props.spaceBetween ? `${props.spaceBetween}rem` : '' : ''
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
    <div className={`${styles.row} ${props.className}`}
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
    <div className={`${styles.col} ${props.className}`}
      style={propStyle}
    >
      {props.children}
    </div>
  )
}