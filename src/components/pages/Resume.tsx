import React from 'react'

import styles from '../resume/Resume.module.sass'

import { Header } from '../resume/Header'
import { Experience } from '../resume/Experience'
import { Employment } from '../resume/Employment'
import { Education } from '../resume/Education'
// import { Training } from '../resume/Training'

import data from '../../resume.yaml'

const resume = data.resume

export const Resume = () => (
  <div className={styles.content}>
    <Header data={resume.header} />
    <Education data={resume.education} />
    <Employment data={resume.employment} />
    <Experience data={resume.experience} />
    {/* <Training /> */}
  </div>
)
