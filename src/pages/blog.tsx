import React from 'react'
import { graphql } from 'gatsby'

import { Layout, navItems } from '../components/Layout'
import { BlogHome, Post } from '../components/pages/BlogHome'

interface Props {
  // FIXME: find proper type for this
  data: any
}

const Blog = ({ data }: Props) => {
  const posts = data.posts.edges.map(
    ({ node }: any): Post => {
      const post: Post = {
        id: node.id,
        title: node.frontmatter.title,
        date: node.frontmatter.date,
        slug: node.fields.slug,
        excerpt: node.excerpt,
        tags: node.frontmatter.tags,
      }

      if (node.frontmatter.description) {
        post['description'] = node.frontmatter.description
      }

      return post
    }
  )

  const tags = data.tags.group.map(
    ({ fieldValue }: { fieldValue: string }) => fieldValue
  )

  return (
    <Layout navigationItems={navItems}>
      <BlogHome posts={posts} tags={tags} />
    </Layout>
  )
}

export const query = graphql`
  query {
    posts: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            tags
            description
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
    tags: allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
      }
    }
  }
`

export default Blog
