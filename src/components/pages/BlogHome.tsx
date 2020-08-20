import React from 'react'

// import styles from './BlogHome.module.sass'

import { PostSummary, Post } from '../PostSummary'

export { Post }

interface Props {
  posts: Array<Post>
}

// move building of list of PostSummaries to a usePosts hook
// hook accepts input posts array & optional input of
// filter & sort direction variables
//
// filter & sort direction variables are state held in this
// component & passed to a new Filter component that allows
// a user to make some filtering & sorting choices

export const BlogHome = ({ posts }: Props) => (
  <section>
    <h1 className="title">Blog</h1>
    <div>
      {posts.map((post: Post) => (
        <PostSummary key={post.id} post={post} />
      ))}
    </div>
  </section>
)
