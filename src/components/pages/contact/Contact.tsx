import React from 'react'

import styles from './Contact.module.sass'

import { Form } from './Form'

const Contact = () => (
  <div>
    <h2 className={`${styles.firstSubtitle} subtitle`}>reach out</h2>
    <p className="indent">
      Do you have questions about me or my work? Maybe some book or article
      suggestions? Or you'd like to talk about what I could do for you? I'd love
      to hear from you! Send me a message using the form or any of the social
      media platforms below, or just send me an email at{' '}
      <a href="mailto:hello@andrew-chang-dewitt.dev">
        hello@andrew-chang-dewitt.dev
      </a>
    </p>
    <Form />
    <div className={styles.iconGrid}>
      <div className={styles.icon}>
        <a
          href="https://github.com/andrew-chang-dewitt"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg>
            <title>GitHub</title>
            <use xlinkHref="icons/icons8/sprite.min.svg#icon-github"></use>
          </svg>
        </a>
      </div>
      <div className={styles.icon}>
        <a
          href="https://stackoverflow.com/users/4642869/andrew-chang-dewitt"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg>
            <title>Stack Overflow</title>
            <use xlinkHref="icons/icons8/sprite.min.svg#icon-stackoverflow"></use>
          </svg>
        </a>
      </div>
      <div className={styles.icon}>
        <a
          href="https://www.linkedin.com/in/adwtt90/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg>
            <title>LinkedIn</title>
            <use xlinkHref="icons/icons8/sprite.min.svg#icon-linkedin"></use>
          </svg>
        </a>
      </div>
      <div className={styles.icon}>
        <a
          href="https://twitter.com/a_chang_dewitt"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg>
            <title>Twitter</title>
            <use xlinkHref="icons/icons8/sprite.min.svg#icon-twitter"></use>
          </svg>
        </a>
      </div>
    </div>
  </div>
)

export default Contact
