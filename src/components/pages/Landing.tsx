import React from 'react'
import { Link } from 'gatsby'

import styles from './Landing.module.sass'

export const Landing = () => (
  <div className={styles.contents}>
    <h1 className="title">
      Andrew <span className="no-wrap">Chang-DeWitt</span>
    </h1>
    <div className={`${styles.nav} ${styles.tabs}`}>
      <Link to="/hire-me">Hire Me</Link> |<Link to="/blog">Blog</Link> |
      <Link to="/about">About</Link> |<Link to="/contact">Contact</Link>
    </div>
  </div>
)
