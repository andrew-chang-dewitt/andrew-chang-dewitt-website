import React from 'react'
import { graphql } from 'gatsby'

import { Layout, navItems } from '../components/Layout'

interface Props {
  // FIXME: find out type of graphql data response
  data: any
}

const BlogPost = ({ data }: Props) => {
  const post = data.markdownRemark

  return (
    <Layout navigationItems={navItems}>
      <section>
        <h1 className="title">{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </section>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`

export default BlogPost
