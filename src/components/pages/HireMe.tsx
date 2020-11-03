import React from 'react'
import { Link } from 'gatsby'

import styles from './HireMe.module.sass'

export const HireMe = () => (
  <div className="indent">
    <h2 className={`subtitle ${styles.firstSubtitle}`}>why me</h2>

    <p>
      I have experience in web development, IOT microservices, & CLI utilities
      all built with a variety of tools, including Javascript, Typescript,
      Python, React, & others. As a self-taught developer, I have a proven track
      record as an independent & fast learner capable of breaking down large,
      complex problems into easily manageable pieces. Additionally, I have
      extensive practice at identifying when, & how, to seek assistance.
    </p>

    <p>
      Some <Link to="/#featured-projects">examples of my work</Link> can be
      found above. Additionally, <Link to="/resume">my resume</Link> is
      <Link to="/blog">my blog</Link>, containing posts on{' '}
      <Link to="/blog/tags/problem-solution">problem solving</Link>,{' '}
      <Link to="/blog/tags/react">React</Link>,{' '}
      <Link to="/blog/tags/typescript">TypeScript</Link>, and more.
    </p>

    <h2 className="subtitle">why you</h2>

    <p>
      I'm looking for an employer with a commitment to mentorship & employee
      development who's hiring entry-level programmers.
    </p>
  </div>
)
