import React from 'react'
import { Link } from 'gatsby'

import styles from './PostSummary.module.sass'

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
  <Link to={post.slug} className={styles.link}>
    <div>
      <h3 className={`${styles.title} title`}>{post.title}</h3>
      <h6 className={`${styles.regularColor} ${styles.date} subtitle`}>
        {post.date}
      </h6>
      <p className={styles.regularColor}>{post.excerpt}</p>
    </div>
  </Link>
)
