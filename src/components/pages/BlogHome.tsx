import React from 'react'

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

export const BlogHome = ({ posts, tags, currentTag }: Props) => (
  <section>
    <h1 className="title">Blog</h1>
    <FilterControls tags={tags} currentTag={currentTag ? currentTag : null} />
    <div>
      {posts.map((post: Post) => (
        <PostSummary key={post.id} post={post} />
      ))}
    </div>
  </section>
)
