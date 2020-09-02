import React from 'react'

import queryHooks from '../../utils/queryHooks'
import { arraysEqual } from '../../utils/comparisons'
import arrayReverse from '../../utils/arrayReverse'

// import styles from './BlogHome.module.sass'

import { PostSummary, Post } from '../blog/PostSummary'
import { FilterControls } from '../blog/FilterControls'

export { Post }

interface Props {
  posts: Post[]
  tags: string[]
  currentTag?: string
}

// move building of list of PostSummaries to a usePosts hook
// hook accepts input posts array & optional input of
// filter & sort direction variables
//
// filter & sort direction variables are state held in this
// component & passed to a new Filter component that allows
// a user to make some filtering & sorting choices

const buildPosts = (post: Post) => <PostSummary key={post.id} post={post} />

export const BlogHome = ({ posts, tags, currentTag }: Props) => {
  const {
    value: sortDirection,
    update: setSortDirection,
  } = queryHooks.useQueryParam('sort', ['descending'])

  const isDescending = (): boolean => arraysEqual(sortDirection, ['descending'])

  const toggleSortDirection = () => {
    setSortDirection(isDescending() ? ['ascending'] : ['descending'])
  }

  return (
    <section>
      <h1 className="title">Blog</h1>
      <FilterControls
        tags={tags}
        currentTag={currentTag ? currentTag : null}
        sortAscending={!isDescending()}
        sortHandler={toggleSortDirection}
      />
      <div>
        {isDescending()
          ? posts.map(buildPosts)
          : arrayReverse(posts).map(buildPosts)}
      </div>
    </section>
  )
}
