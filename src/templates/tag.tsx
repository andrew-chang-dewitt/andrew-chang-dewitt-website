import React from 'react'
import { graphql } from 'gatsby'

import { Layout, navItems } from '../components/Layout'
import { BlogHome, Post } from '../components/pages/BlogHome'

interface Props {
  pageContext: {
    tag: string
  }
  // FIXME: find out type of graphql data response
  data: any
}

const Tags = ({ pageContext, data }: Props) => {
  const posts = data.posts.edges.map(
    ({ node }: any): Post => {
      return {
        id: node.id,
        title: node.frontmatter.title,
        date: node.frontmatter.date,
        slug: node.fields.slug,
        excerpt: node.excerpt,
        tags: node.frontmatter.tags,
      }
    }
  )

  const tags = data.tags.group.map(
    ({ fieldValue }: { fieldValue: string }) => fieldValue
  )

  return (
    <Layout navigationItems={navItems}>
      <BlogHome posts={posts} tags={tags} currentTag={pageContext.tag} />
    </Layout>
  )
}

export const query = graphql`
  query($tag: String) {
    posts: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            tags
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

// export const query = graphql`
//   query($slug: String!) {
//     markdownRemark(fields: { slug: { eq: $slug } }) {
//       html
//       frontmatter {
//         title
//       }
//     }
//   }
// `

export default Tags
