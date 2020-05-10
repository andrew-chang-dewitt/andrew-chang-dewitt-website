import React from 'react'
import { graphql } from 'gatsby'

import { Layout } from '../components/Layout'

interface Props {
  // FIXME: find out type of graphql data response
  data: any
}

const BlogPost = ({ data }: Props) => {
  const post = data.markdownRemark

  return (
    <Layout pageTitle="Blog">
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
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
