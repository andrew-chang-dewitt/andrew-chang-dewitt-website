import React from 'react'
import { Link, graphql } from 'gatsby'

import { Layout, navItems } from '../components/Layout'
import { CallToAction } from '../components/call-to-action/CallToAction'
import kebabCase from '../utils/kebabCase'

import styles from './blog-post.module.sass'

interface Props {
  // FIXME: find out type of graphql data response
  data: any
}

const BlogPost = ({ data }: Props) => {
  const post = data.markdownRemark
  const tags = post.frontmatter.tags

  const spacer = <span className={styles.spacer}>|</span>

  return (
    <Layout navigationItems={navItems}>
      <section>
        <h1 className="title">{post.frontmatter.title}</h1>
        <h6 className="subtitle">{post.frontmatter.date}</h6>

        <ul className={styles.tags}>
          {tags.map((tag: string, current: number) => {
            const link = <Link to={`/blog/tags/${kebabCase(tag)}`}>{tag}</Link>

            if (current === tags.length - 1)
              return <li key={current.toString()}>{link}</li>
            else
              return (
                <li key={current.toString()}>
                  {link}
                  {spacer}
                </li>
              )
          })}
        </ul>

        <div
          className={`indent ${styles.content}`}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <h3 className={styles.centered}>~~~</h3>

        <CallToAction transition="Do you have any questions or comments about anything?" />
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
        date(formatString: "DD MMMM, YYYY")
        tags
      }
    }
  }
`

export default BlogPost
