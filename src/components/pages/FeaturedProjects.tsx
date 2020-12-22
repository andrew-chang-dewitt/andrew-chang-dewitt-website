import React from 'react'
import { Link } from 'gatsby'

import LinkList, { LinkType } from '../LinkList'
import RoundedItemList from '../RoundedItemList'

import styles from './FeaturedProjects.module.sass'

export interface ProjectType {
  id: string
  title: string
  slug: string
  tags: Array<string>
  description: string
  repo: Array<LinkType>
  url?: LinkType
}

interface ProjectProps {
  project: ProjectType
}

const filterTags = (tags: Array<string>): Array<string> => {
  const blacklist = ['project', 'problem', 'meta', 'goals']

  return tags.reduce((allowed, tag) => {
    // if any one of the blacklist words shows up in a tag,
    // it isn't allowed
    blacklist.some((blocked) => tag.includes(blocked))
      ? null
      : allowed.push(tag)

    return allowed
  }, [] as Array<string>)
}

const Project = ({ project }: ProjectProps) => (
  <>
    <Link
      className={`${styles.linkWrapsEl} ${styles.discreteLink}`}
      to={project.slug}
    >
      <h2 className="subtitle">{project.title}</h2>
    </Link>

    <ul className={styles.infoList} aria-label="links">
      <LinkList url={project.url} repo={project.repo} />
    </ul>

    <RoundedItemList items={filterTags(project.tags)} accessibleName="skills" />

    <Link
      className={`${styles.linkWrapsEl} ${styles.discreteLink}`}
      to={project.slug}
    >
      <article>{project.description}</article>
    </Link>

    <Link className={styles.linkWrapsEl} to={project.slug}>
      <p>Read more...</p>
    </Link>
  </>
)

interface FeaturedProjectsProps {
  projects: Array<ProjectType>
}

export const FeaturedProjects = ({ projects }: FeaturedProjectsProps) => (
  <div className={styles.projects}>
    {projects.map((project) => (
      <Project key={project.id} project={project} />
    ))}
  </div>
)
