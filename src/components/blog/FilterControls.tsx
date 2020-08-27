import React from 'react'
import { Link } from 'gatsby'

import { useQueryParam } from '../../utils/queryHooks'

import styles from './FilterControls.module.sass'

import kebabCase from '../../utils/kebabCase'
import { arraysEqual } from '../../utils/comparisons'

interface Props {
  tags: string[]
  currentTag?: string | null
}

const spacer = <span className={styles.spacer}>|</span>

const useFilterChoices = () => {
  const {
    value: sortDirection,
    update: setSortDirection,
  } = useQueryParam('sort', ['descending'])

  const isDescending = (): boolean => arraysEqual(sortDirection, ['descending'])

  const toggleSortDirection = () => {
    setSortDirection(isDescending() ? ['ascending'] : ['descending'])
  }

  return (
    <div className={styles.filterChoices}>
      <button className={styles.tab}>
        <svg className={styles.filterIcon}>
          <title>Filter by tag</title>
          <use xlinkHref="icons/ikonate.svg#hash" />
        </svg>
        <span>Filter by tag</span>
      </button>

      {spacer}

      <button className={styles.tab} onClick={toggleSortDirection}>
        <svg className={styles.filterIcon}>
          <title>Sort by date: {sortDirection}</title>
          {isDescending() ? (
            <use xlinkHref="icons/ikonate.svg#sort-down" />
          ) : (
            <use xlinkHref="icons/ikonate.svg#sort-up" />
          )}
        </svg>
        <span>Sort by date: {sortDirection}</span>
      </button>
    </div>
  )
}

export const FilterControls = ({ tags, currentTag }: Props) => {
  const [controlsOpened, setControlsOpened] = React.useState(false)

  const toggleFilters = () => {
    setControlsOpened(!controlsOpened)
  }

  const filterChoices = useFilterChoices()

  return (
    <div>
      <div className={styles.tabContainer}>
        <button className={styles.tab} onClick={toggleFilters}>
          <svg className={styles.filterIcon}>
            <title>Filter & sort posts</title>
            <use xlinkHref="icons/ikonate.svg#controls-vertical-alt" />
          </svg>
          <h6>Filter & Sort</h6>
        </button>
        {controlsOpened ? (
          <span>
            <h6>:</h6>
            {spacer}
            {filterChoices}
          </span>
        ) : null}
      </div>
      <ul className={styles.tags}>
        {tags.map((tag: string, current: number) => {
          if (current === tags.length - 1)
            return (
              <li
                key={current.toString()}
                className={currentTag === tag ? styles.currentTag : ''}
              >
                <Link to={`/blog/tags/${kebabCase(tag)}`}>{tag}</Link>
              </li>
            )
          else
            return (
              <li
                key={current.toString()}
                className={currentTag === tag ? styles.currentTag : ''}
              >
                <Link to={`/blog/tags/${kebabCase(tag)}`}>{tag}</Link>
                {spacer}
              </li>
            )
        })}
        {currentTag ? (
          <li>
            {spacer}
            <Link to="/blog">all posts</Link>
          </li>
        ) : null}
      </ul>
    </div>
  )
}
