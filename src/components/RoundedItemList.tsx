import React from 'react'

import styles from './RoundedItemList.module.sass'

interface Props {
  items: Array<string>
  accessibleName?: string
}

export default ({ items, accessibleName = undefined }: Props) => (
  <ul className={styles.list} aria-label={accessibleName}>
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
)
