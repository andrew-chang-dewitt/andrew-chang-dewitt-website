import React from 'react'

import { Hero } from '../Hero'

import styles from './Landing.module.sass'

export const Landing = () => (
  <Hero id="home" title="Andrew Chang-DeWitt" className={styles.container}>
    <section className={styles.contents}>
      <div className={styles.tagline}>
        <h2 className={`${styles.subtitle} subtitle`}>software developer</h2>
        <p>I make web apps, API's, IoT programs, &amp; cli utilities</p>
      </div>
    </section>
  </Hero>
)
