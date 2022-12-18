import styles from '@/scss/pagination.module.scss'

import { useState } from 'react'

/* 

Dynamic Pagination

type: how the pagination component structures its items
  Grid: items are arranged from left to right, until row is filled. then new row is generated.
  Table: items are assumed to fill the row completely, new row for every item.

Items need to have the structure of an object:

  items: [{
    item: <Component>,
    values: {
      'value1': 123567
      'value2': 123124159 
    }
    tags: ['tag1', 'tag2', 'tag3']
  }]

item: the actual component to display, needs to be premade.
values: component will change the order of items depending on values to sort by.
tags: component will filter out items depending on inclusion / exclusion of tags.

*/
export default function Pagination(props) {
  
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState('')
  const [filterBy, setFilterBy] = useState([])

  const [sortOptions, filterOptions] = getOptions(props.items)

  const filteredItems = filterItems(props.items, filterBy)
  const sortedAndFilteredItems = sortItems(filteredItems, sortBy)

  const renderedSortOptions = sortOptions.map((x) => { 
    return (
      <option 
        className={styles.nav_bar__container__select__option}
        value={x}
      >{x}</option>
    )
  })

  const renderedFilterOptions = filterOptions.map((x) => { 
    return (
      <option 
        className={styles.nav_bar__container__select__option}
        value={x}
      >{x}</option>
    )
  })
  
  const pagination = (
    <div className={styles.wrapper}>
      <div className={styles.nav_bar}>
        <div className={styles.nav_bar__container}>
          <div className={styles.nav_bar__container__label}>Sort By</div>
          <select className={styles.nav_bar__container__select}>
            {renderedSortOptions}
          </select>
        </div>
        <div className={styles.nav_bar__container}>
          <div className={styles.nav_bar__container__label}>Filter By</div>
          <select className={styles.nav_bar__container__select}>
            {renderedFilterOptions}
          </select>
        </div>
      </div> 
      <div className={styles.title}></div>
      <div className={styles.item_container}></div>
      <div className={styles.page_bar}></div>
    </div>
  )

  return pagination
}

function getOptions(items) {
  const sort = new Set(), filter = new Set()

  items.forEach((item) => {
    for (let value in item.values) {
      console.log(value)
      sort.add(value)
    }
    item.tags.forEach((tag) => filter.add(tag))
  })
  return [Array.from(sort).sort(), Array.from(filter).sort()]
}

function filterItems(items, filterBy) {

}
function sortItems(items, sortBy) {
  
}