import React from 'react'

import { Layout } from '../components/Layout'
import { About as AboutComponent } from '../components/pages/About'

export default function About() {
  return (
    <Layout childClassPrefix="landing">
      <AboutComponent />
    </Layout>
  )
}
