import React from 'react'
import { Link } from 'gatsby'

import styles from './FilterControls.module.sass'

import kebabCase from '../../utils/kebabCase'

const spacer = <span className={styles.spacer}>|</span>

const useFilterChoices = (
  tagHandler: () => void,
  sortAscending: boolean,
  sortHandler: () => void,
  tagsOpened: boolean
) => (
  <div className={styles.filterChoices}>
    <button
      className={`${styles.tab} ${styles.tagsTab} ${
        tagsOpened ? styles.open : ''
      }`}
      onClick={tagHandler}
    >
      <svg className={styles.filterIcon}>
        <title>Filter by tag</title>
        <use xlinkHref="/icons/ikonate.svg#hash" />
      </svg>
      <span>Filter by tag</span>
    </button>

    {spacer}

    <button className={styles.tab} onClick={sortHandler}>
      <svg className={styles.filterIcon}>
        <title>
          Sort by date: {sortAscending ? 'Ascending' : 'Descending'}
        </title>
        {sortAscending ? (
          <use xlinkHref="/icons/ikonate.svg#sort-up" />
        ) : (
          <use xlinkHref="/icons/ikonate.svg#sort-down" />
        )}
      </svg>
      <span>Sort by date: {sortAscending ? 'Ascending' : 'Descending'}</span>
    </button>
  </div>
)

interface Props {
  tags: string[]
  currentTag?: string | null
  sortAscending?: boolean
  sortHandler: () => void
}

export const FilterControls = ({
  tags,
  currentTag,
  sortAscending = false,
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
    sortAscending,
    sortHandler,
    tagsOpened
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

      {controlsOpened && tagsOpened ? (
        <ul className={styles.tags}>
          {tags.map((tag: string, current: number) => {
            const link = (
              <Link
                to={`/blog/tags/${kebabCase(tag)}`}
                className={
                  currentTag === tag ? `${styles.currentTag} currentTag` : ''
                }
              >
                {tag}
              </Link>
            )

            if (current === tags.length - 1)
              return <li key={current.toString()}>{link}</li>
            else
              return (
                <li key={current.toString()}>
                  {link}
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
