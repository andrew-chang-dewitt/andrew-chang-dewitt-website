import React from 'react'
import { Link } from 'gatsby'

import { Layout, navItems } from '../components/Layout'
// import {Section} from '../components/Section'

import styles from './404.module.sass'

export default function Page404() {
  return (
    <Layout navigationItems={navItems}>
      <div className={`${styles.container} centered`}>
        <h1 className={`${styles.title} title`}>Welp, you're lost...</h1>
        <h2 className="subtitle">
          ...but that's okay, we'll figure it out together
        </h2>
        <p>
          Of course, I'm not sure how you got lost on a single page website
          anyways, but that's beside the point.
        </p>
        <h2 className="subtitle">
          <Link to="/">This way to go home</Link>
        </h2>
      </div>
    </Layout>
  )
}
