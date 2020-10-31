import 'mocha'
import { expect } from 'chai'
import { render, cleanup, screen } from '@testing-library/react'

import React from 'react'

import { FeaturedProjects } from './FeaturedProjects'

describe('src/components/pages/FeaturedProjects', () => {
  it('displays each of the given projects', () => {
    const projects = [
      {
        title: 'A project',
      },
      {
        title: 'Another project',
      },
    ]

    render(<FeaturedProjects projects={projects} />)

    expect(screen.getByText(/a project/i)).to.exist
    expect(screen.getByText(/another project/i)).to.exist

    cleanup()
  })
})
