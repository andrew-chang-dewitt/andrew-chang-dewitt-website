import React from 'react'
import { Link } from 'gatsby'

import styles from './PostSummary.module.sass'

export interface Post {
  id: string
  title: string
  date: string
  slug: string
  excerpt: string
  description?: string
  tags: string[] | null
}

interface Props {
  post: Post
}

export const PostSummary = ({ post }: Props) => (
  <Link to={post.slug} className={styles.link}>
    <div>
      <h3 className="title">{post.title}</h3>
      <div className={styles.subtitle}>
        <h6 className={`${styles.regularColor} ${styles.date} subtitle`}>
          {post.date}
          {post.tags ? '; ' : null}
        </h6>
        {post.tags ? (
          <ul className={`${styles.regularColor} ${styles.tags}`}>
            {post.tags.map((tag: string, current: number) => {
              if (post.tags && current === post.tags.length - 1)
                return <li key={current.toString()}>{tag}</li>
              else
                return (
                  <li key={current.toString()}>
                    {tag}
                    <span className={styles.spacer}>|</span>
                  </li>
                )
            })}
          </ul>
        ) : null}
      </div>
      <p className={styles.regularColor}>
        {post.description ? post.description : post.excerpt}
      </p>
    </div>
  </Link>
)
