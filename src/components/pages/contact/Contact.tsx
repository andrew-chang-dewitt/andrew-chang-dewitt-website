import React from 'react'

import styles from './Contact.module.sass'

import { CallToAction } from '../../CallToAction'

export const Contact = () => (
  <div>
    <h2 className={`${styles.firstSubtitle} subtitle`}>reach out</h2>

    <CallToAction transition="Do you have questions about me or my work? Maybe some book or article suggestions? Or you'd like to talk about what I could do for you?" />
  </div>
)
