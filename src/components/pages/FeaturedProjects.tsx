import React from 'react'
// import { Link } from 'gatsby'

// import styles from './HireMe.module.sass'

interface Project {}

interface Props {
  projects: Array<Project>
}

export const FeaturedProjects = ({ projects }: Props) => (
  <div>{projects.map((project) => JSON.stringify(project))}</div>
)
