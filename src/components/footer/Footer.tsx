import React from 'react'

import styles from './Footer.module.sass'

import { Hero } from '../Hero'
import { AnchorLink } from '../navigation/AnchorLink'

interface Props {
  topRef: React.RefObject<HTMLDivElement>
}

export const Footer = ({ topRef }: Props) => (
  <Hero id="footer">
    <div className={`${styles.container} standardWidth`}>
      <div className={styles.lists}>
        <ul>
          <li className={styles.name}>Andrew Chang-DeWitt</li>
          <li>
            <a href="mailto:hello@andrew-chang-dewitt.dev">
              hello@andrew-chang-dewitt.dev
            </a>
          </li>
        </ul>

        <ul>
          <li>
            <AnchorLink id="top" to="/#" target={topRef}>
              Return to top
            </AnchorLink>
          </li>
        </ul>
      </div>

      <p className={styles.bottom}>&#169; 2020 Andrew Chang-DeWitt</p>
    </div>
  </Hero>
)
