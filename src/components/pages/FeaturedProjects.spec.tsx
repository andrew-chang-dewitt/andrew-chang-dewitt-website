import 'mocha'
import { expect, use } from 'chai'
import chaiDom from 'chai-dom'
use(chaiDom)
import { render, cleanup, screen } from '@testing-library/react'

import React from 'react'
import { LocationProvider } from '@reach/router'

import { FeaturedProjects, ProjectType } from './FeaturedProjects'
import LinkType from '../../LinkType'

const Factories = {
  ProjectType: {
    lastID: 0,

    create: (): ProjectType => ({
      id: `${Factories.ProjectType.lastID++}`,
      title: 'title',
      slug: '/slug',
      tags: [],
      description: 'description',
      repo: [
        {
          href: '/repo/link',
          display: 'repo link',
        },
      ],
    }),

    createWithProperites: (properties: {
      id?: string
      title?: string
      slug?: string
      tags?: Array<string>
      description?: string
      repo?: Array<LinkType>
      url?: LinkType
    }): ProjectType => ({
      ...Factories.ProjectType.create(),
      ...properties,
    }),
  },
}

describe('src/components/pages/FeaturedProjects', () => {
  const setup = (projects: Array<ProjectType>) =>
    render(
      <LocationProvider>
        <FeaturedProjects projects={projects} />
      </LocationProvider>
    )

  afterEach(() => {
    cleanup()
  })

  it('displays each of the given projects', () => {
    const projects = [
      Factories.ProjectType.createWithProperites({
        title: 'A project',
      }),
      Factories.ProjectType.createWithProperites({
        title: 'Another project',
      }),
    ]

    setup(projects)

    expect(screen.getByText(/a project/i)).to.exist
    expect(screen.getByText(/another project/i)).to.exist
  })

  describe('each Project', () => {
    it('renders a title as a level 2 heading', () => {
      const projects = [
        Factories.ProjectType.createWithProperites({
          title: 'A title',
        }),
      ]
      setup(projects)

      expect(
        screen.getByRole('heading', {
          name: 'A title',
          level: 2,
        })
      ).to.exist
    })

    it("would take the user to the project's slug when title is clicked on", () => {
      const projects = [
        Factories.ProjectType.createWithProperites({
          title: 'A title',
          slug: '/goes/here',
        }),
      ]
      setup(projects)

      expect(
        screen.getByRole('link', {
          name: 'A title',
        })
      )
        .has.attr('href')
        .equal('/goes/here')
    })

    it('includes a link to a GitHub repo', () => {
      const projects = [
        Factories.ProjectType.createWithProperites({
          repo: [
            {
              href: '/some/repo',
              display: 'Some repo',
            },
          ],
        }),
      ]

      setup(projects)

      expect(screen.getByRole('link', { name: 'Some repo' }))
        .has.attr('href')
        .equal('/some/repo')
    })

    it('can include a link to a demo website', () => {
      const projects = [
        Factories.ProjectType.createWithProperites({
          url: {
            href: '/some/demo',
            display: 'Some demo',
          },
        }),
      ]

      setup(projects)

      expect(screen.getByRole('link', { name: 'Some demo' }))
        .has.attr('href')
        .equal('/some/demo')
    })

    it('renders a description of the project', () => {
      const projects = [
        Factories.ProjectType.createWithProperites({
          description: 'a description',
        }),
      ]
      setup(projects)

      expect(screen.getByRole('article')).to.contain.text('a description')
    })

    it("renders a project's tags", () => {
      const projects = [
        Factories.ProjectType.createWithProperites({
          tags: ['tag', 'another-tag'],
        }),
      ]
      setup(projects)

      expect(screen.getByRole('list', { name: 'skills' }))
        .to.contain.text('tag')
        .and.to.contain.text('another-tag')
    })

    it("won't render some tags", () => {
      // should have a blacklist not allowing any tag containing any
      // of the following words:
      // project, problem, meta, goals
      const projects = [
        Factories.ProjectType.createWithProperites({
          tags: [
            'tag',
            'project',
            'project: a project',
            'featured-project',
            'problem',
            'meta',
            'goals',
          ],
        }),
      ]
      setup(projects)

      expect(screen.getByRole('list', { name: 'skills' }))
        .to.contain.text('tag')
        .and.to.not.contain.text('project')
        .and.to.not.contain.text('problem')
        .and.to.not.contain.text('meta')
        .and.to.not.contain.text('goals')
    })
  })
})
