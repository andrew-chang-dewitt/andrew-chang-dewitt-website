import React from 'react'

import styles from '../resume/Resume.module.sass'

import { Header } from '../resume/Header'
import { Experience } from '../resume/Experience'
import { Employment } from '../resume/Employment'
import { Education } from '../resume/Education'
// import { Training } from '../resume/Training'

import data from '../../resume.yaml'

export const Resume = () => (
  <div className={styles.content}>
    <Header data={data.header} />
    <Employment data={data.employment} />
    <Experience data={data.experience} />
    <Education data={data.education} />
    {/* <Training /> */}
  </div>
)
