import React from 'react'
import { Link } from 'gatsby'

import { Layout, navItems } from '../../components/Layout'
import { Resume } from '../../components/pages/Resume'

export default () => (
  <Layout navigationItems={navItems}>
    <Resume />
    <p>
      <Link to="/resume/printable">View printable version</Link>
    </p>
  </Layout>
)
