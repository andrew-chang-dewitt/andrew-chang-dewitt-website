import React from 'react'

import { Layout, navItems } from '../components/Layout'
import { Resume } from '../components/pages/Resume'

export default () => (
  <Layout navigationItems={navItems}>
    <Resume />
  </Layout>
)
