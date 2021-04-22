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
    <p>
      <Link to="/resume/resume_Andrew_Chang-DeWitt.pdf">Download as pdf</Link>
    </p>
    <p>
      <Link to="/resume/resume_Andrew_Chang-DeWitt.docx">
        Download as Word document
      </Link>
    </p>
    <p>
      <Link to="/resume/resume_Andrew_Chang-DeWitt.text">
        Download as plain text
      </Link>
    </p>
  </Layout>
)
