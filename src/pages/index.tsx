import React, { useRef } from 'react'
import { graphql } from 'gatsby'

import { Layout, navItems, mergeRefsToItems } from '../components/Layout'
import { Section } from '../components/Section'
import { Story } from '../components/pages/story/Story'
import { HireMe } from '../components/pages/HireMe'
import {
  FeaturedProjects,
  ProjectType,
  LinkType,
} from '../components/pages/FeaturedProjects'
import { Contact } from '../components/pages/Contact'

interface Props {
  data: {
    posts: {
      edges: Array<ProjectAPI>
    }
  }
}

interface ProjectAPI {
  node: {
    id: string
    fields: {
      slug: string
    }
    frontmatter: {
      title: string
      tags: Array<string>
      description: string
      info: {
        [index: string]: unknown
      }
    }
  }
}

const apiToProjectType = (api: ProjectAPI): ProjectType => ({
  id: api.node.id,
  title: api.node.frontmatter.title,
  slug: api.node.fields.slug,
  tags: api.node.frontmatter.tags,
  description: api.node.frontmatter.description,
  repo: api.node.frontmatter.info.repo as LinkType,
  url: api.node.frontmatter.info.url as LinkType,
})

export default ({ data }: Props) => {
  const storyRef = useRef<HTMLDivElement>(null)
  const projectRef = useRef<HTMLDivElement>(null)
  const hireRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  const navigationRefs = {
    story: storyRef,
    'featured-projects': projectRef,
    'hire-me': hireRef,
    contact: contactRef,
  }

  const merged = mergeRefsToItems(navItems, navigationRefs)

  return (
    <Layout navigationItems={navItems} navigationRefs={navigationRefs} landing>
      <Section ref={storyRef} id="story" title="Story" next={merged[1]}>
        <Story />
      </Section>

      <Section
        id="featured-projects"
        title="Projects"
        ref={projectRef}
        next={merged[2]}
      >
        <FeaturedProjects
          projects={data.posts.edges.map((api) => apiToProjectType(api))}
        />
      </Section>

      <Section id="hire-me" title="Hire Me" ref={hireRef} next={merged[3]}>
        <HireMe />
      </Section>

      <Section id="contact" title="Contact" ref={contactRef}>
        <Contact />
      </Section>
    </Layout>
  )
}

export const query = graphql`
  query {
    posts: allMarkdownRemark(
      filter: { frontmatter: { tags: { in: "featured-project" } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            tags
            description
            info {
              repo {
                href
                display
              }
              url {
                href
                display
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
