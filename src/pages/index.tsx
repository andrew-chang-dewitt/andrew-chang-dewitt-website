import React from 'react'

import { Layout } from '../components/Layout'
import { Home as HomeComponent } from '../components/pages/Home'

export default function Home() {
  return (
    <Layout pageTitle="Home">
      <HomeComponent />
    </Layout>
  )
}
