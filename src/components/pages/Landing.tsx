import React from 'react'
// import { Link } from 'gatsby'

import { Hero } from '../Hero'

import styles from './Landing.module.sass'

export const Landing = () => (
  <Hero id="home" title="Andrew Chang-DeWitt" className={styles.container}>
    <div>
      <section className={styles.contents}>
        <div className={styles.tagline}>
          <h2 className={`${styles.subtitle} subtitle`}>software developer</h2>
          <p>I make websites, applications, API's, &amp; utilities</p>
        </div>
      </section>
    </div>
  </Hero>
)
