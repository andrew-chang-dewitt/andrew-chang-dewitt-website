import React from 'react'
import { Link } from 'gatsby'

import { Hero } from '../Hero'
import { AnchorLink } from '../navigation/AnchorLink'
import ExternalLink from '../ExternalLink'
import GitHubIcon from '../icons/GitHubIcon'
import LinkedInIcon from '../icons/LinkedInIcon'

import styles from './Footer.module.sass'

interface Props {
  topRef: React.RefObject<HTMLDivElement>
}

export const Footer = ({ topRef }: Props) => (
  <Hero id="footer" className={styles.footer}>
    <div className={`${styles.container} standardWidth`}>
      <div className={styles.lists}>
        <div>
          <h1 className={styles.name}>Andrew Chang-DeWitt</h1>

          <div className={styles.tagline}>
            <h2>software developer</h2>

            <p>I make web apps, API's, IoT programs, &amp; cli utilities</p>
          </div>
        </div>

        <ul>
          <li className="stroke light">
            <svg>
              <title>Email address:</title>
              <use xlinkHref="/icons/ikonate.svg#envelope"></use>
            </svg>

            <a href="mailto:hello@andrew-chang-dewitt.dev">
              hello@andrew-chang-dewitt.dev
            </a>
          </li>

          <li className="fill light">
            <GitHubIcon />

            <ExternalLink href="https://github.com/andrew-chang-dewitt">
              Github
            </ExternalLink>
          </li>

          <li className="fill light">
            <LinkedInIcon />

            <ExternalLink href="https://www.linkedin.com/in/andrew-chang-dewitt/">
              LinkedIn
            </ExternalLink>
          </li>
        </ul>

        <ul>
          <li>
            <span></span>
            <AnchorLink id="top" to="#" target={topRef}>
              Return to top
            </AnchorLink>
          </li>

          <li>
            <span></span>
            <Link to="/resume">Resume</Link>
          </li>

          <li>
            <span></span>
            <Link to="/#featured-projects">Portfolio</Link>
          </li>
        </ul>
      </div>

      <p className={styles.bottom}>&#169; 2020 Andrew Chang-DeWitt</p>
    </div>
  </Hero>
)
