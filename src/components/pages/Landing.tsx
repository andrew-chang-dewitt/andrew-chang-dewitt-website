import React from 'react'
import { Link } from 'gatsby'

import styles from './Landing.module.sass'

export const Landing = () => (
  <div className={styles.contents}>
    <h1 className="title">
      Andrew <span className="no-wrap">Chang-DeWitt</span>
    </h1>
      <div className={styles.nav}>
        <span className={styles.navOption}>
          <Link to="/hire-me">Hire Me</Link>
        </span>{' '}
        |{' '}
        <span className={styles.navOption}>
          <Link to="/blog">Blog</Link>
        </span>{' '}
        |{' '}
        <span className={styles.navOption}>
          <Link to="/about">About</Link>
        </span>{' '}
        |{' '}
        <span className={styles.navOption}>
          <Link to="/contact">Contact</Link>
        </span>
      </div>
  </div>
)
