require('ts-node').register({ files: true })
const generateResumeText = require('./generate-resume-text').default
const { writeFile } = require('fs')

function kebabCase(input) {
  return input.split(' ').join('-')
}

const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({
      node,
      getNode,
      basePath: 'src',
      trailingSlash: false,
    })

    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      posts: allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
      tags: allMarkdownRemark {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `)

  result.data.posts.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve('./src/templates/blog-post.tsx'),
      context: {
        slug: node.fields.slug,
      },
    })
  })

  result.data.tags.group.forEach(({ fieldValue }) => {
    createPage({
      path: `/blog/tags/${kebabCase(fieldValue)}/`,
      component: path.resolve('./src/templates/tag.tsx'),
      context: {
        tag: fieldValue,
      },
    })
  })
}

exports.onPostBuild = async ({ graphql, reporter }) => {
  const result = await graphql(`
    query {
      srcYaml {
        resume {
          about_me

          header {
            name
            email
            phone
            website
            github
            title
          }

          education {
            school
            degree
            major
            minor
            location
            date
          }

          experience {
            title
            description
            summary
            stack
            repo {
              href
              display
            }
            moreInfo {
              href
              display
            }
          }

          employment {
            title
            summary
            skills
            positions {
              employer
              end
              job_title
              start
            }
          }
        }
      }
    }
  `)

  console.log('result:', JSON.stringify(result, null, 2))
  const resumeData = result.data.srcYaml.resume
  const resumeMd = generateResumeText(resumeData)
  const resumeFileName = './public/resume/resume_Andrew_Chang-DeWitt.md'

  writeFile(resumeFileName, resumeMd, (err) => {
    if (err) {
      reporter.err(`Error encountered while writing ${resumeFileName}`)
      reporter.err(err)
    }

    reporter.info(`Resume written to ${resumeFileName}`)
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }
    type Frontmatter {
      title: String!
      date: Date @dateformat(formatString: "DD-MM-YYYY")
      tags: [String!]!
      description: String
      info: FeaturedPostInfo
    }
    type FeaturedPostInfo {
      repo: [Link]!
      url: Link
    }
    type Link {
      href: String!
      display: String!
    }
  `
  createTypes(typeDefs)
}
