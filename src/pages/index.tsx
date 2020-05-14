import React from 'react'

import { Layout } from '../components/Layout'
import { Landing as LandingComponent } from '../components/pages/Landing'

export default function Landing() {
  return (
    <Layout navPanelStyle="landing">
      <LandingComponent />
    </Layout>
  )
}
