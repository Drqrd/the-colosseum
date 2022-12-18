import styles from '@/scss/games.module.scss'

import Pagination from '@/primitives/Pagination'

export default function Games() {
  const items = [
    {
      item: 'Chess',
      values: {
        'value1': 20,
        'value2': 1,
      },
      tags: ['tag1', 'tag2', 'tag3'],
    },
    {
      item: 'Checkers',
      values: {
        'value3': 1,
        'value1': 2,
      },
      tags: ['tag2', 'tag4'],
    }
] 
  

  const games = (
    <div className={styles.wrapper}>
      <div className={styles.pagination_container}>
        <Pagination
          items={items}
          siblingCount={2}
        />
      </div>
    </div> 
  )
  return games
}