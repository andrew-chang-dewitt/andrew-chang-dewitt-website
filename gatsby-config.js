require('ts-node').register({ files: true })

module.exports = {
  siteMetadata: {
    title: 'Andrew Chang-DeWitt',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-sass',
      options: { implementation: require('dart-sass') },
    },
    'gatsby-plugin-typescript',
    'gatsby-transformer-typescript-css-modules',
    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-prismjs',
            options: { inlineCodeMarker: '›' },
          },
        ],
      },
    },
  ],
}
