import React from 'react'
import { Link } from 'gatsby'

import styles from './FilterControls.module.sass'

import kebabCase from '../../utils/kebabCase'
import { arraysEqual } from '../../utils/comparisons'

interface Props {
  tags: string[]
  currentTag?: string | null
  sortDirection: string[]
  sortHandler: () => void
}

const spacer = <span className={styles.spacer}>|</span>

const useFilterChoices = (
  tagHandler: () => void,
  sortDirection: string[],
  sortHandler: () => void
) => {
  const isDescending = (): boolean => arraysEqual(sortDirection, ['descending'])

  return (
    <div className={styles.filterChoices}>
      <button className={styles.tab} onClick={tagHandler}>
        <svg className={styles.filterIcon}>
          <title>Filter by tag</title>
          <use xlinkHref="/icons/ikonate.svg#hash" />
        </svg>
        <span>Filter by tag</span>
      </button>

      {spacer}

      <button className={styles.tab} onClick={sortHandler}>
        <svg className={styles.filterIcon}>
          <title>Sort by date: {sortDirection}</title>
          {isDescending() ? (
            <use xlinkHref="/icons/ikonate.svg#sort-down" />
          ) : (
            <use xlinkHref="/icons/ikonate.svg#sort-up" />
          )}
        </svg>
        <span>Sort by date: {sortDirection}</span>
      </button>
    </div>
  )
}

export const FilterControls = ({
  tags,
  currentTag,
  sortDirection,
  sortHandler,
}: Props) => {
  const [controlsOpened, setControlsOpened] = React.useState(false)
  const [tagsOpened, setTagsOpened] = React.useState(false)

  const toggleControls = () => {
    setControlsOpened(!controlsOpened)
  }
  const toggleTagFilters = () => {
    setTagsOpened(!tagsOpened)
  }

  const filterChoices = useFilterChoices(
    toggleTagFilters,
    sortDirection,
    sortHandler
  )

  return (
    <div>
      <div className={styles.tabContainer}>
        <button className={styles.tab} onClick={toggleControls}>
          <svg className={styles.filterIcon}>
            <title>Filter & sort posts</title>
            <use xlinkHref="/icons/ikonate.svg#controls-vertical-alt" />
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
      {tagsOpened ? (
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
      ) : null}
    </div>
  )
}
