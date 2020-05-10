import React from 'react'

import { PostSummary, Post } from './PostSummary'

export { Post }

interface Props {
  postCount: number
  posts: Array<Post>
}

export const BlogHome = (props: Props) => (
  <div>
    <h4>{props.postCount} Posts</h4>
    {props.posts.map((post: Post) => (
      <PostSummary key={post.id} post={post} />
    ))}
  </div>
)
