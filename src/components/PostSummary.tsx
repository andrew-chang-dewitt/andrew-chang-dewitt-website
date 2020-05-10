import React from 'react'
import { Link } from 'gatsby'

export interface Post {
  id: string
  title: string
  date: string
  slug: string
  excerpt: string
}

interface Props {
  post: Post
}

export const PostSummary = ({ post }: Props) => (
  <Link to={post.slug}>
    <h3>
      {post.title} - {post.date}
    </h3>
    <p>{post.excerpt}</p>
  </Link>
)
