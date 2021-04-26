import 'mocha'
import { expect, use } from 'chai'
import { default as chaiDom } from 'chai-dom'
use(chaiDom)
import { render, cleanup, screen } from '@testing-library/react'
// import sinon, { SinonSpy, SinonStub } from 'sinon'

import React from 'react'

import { Footer } from './Footer'
// import { AnchorLink } from '../navigation/AnchorLink'

describe('component/Footer', () => {
  const setup = () => {
    let topRef = ('totally a ref' as any) as React.RefObject<HTMLDivElement>

    render(<Footer topRef={topRef} />)
  }

  afterEach(() => {
    cleanup()
  })

  it("includes 'return to top' link", () => {
    setup()

    expect(screen.getByRole('link', { name: /return to top/i }))
      .has.attr('href')
      .satisfy((str: string): boolean => str.endsWith('#'))
  })

  it('includes a mailto link to my default contact email', () => {
    setup()

    expect(screen.getByRole('link', { name: /@/i }))
      .has.attr('href')
      .equal('mailto:hello@andrew-chang-dewitt.dev')
  })

  it('includes a link to my resume', () => {
    setup()

    expect(screen.getByRole('link', { name: /resume/i }))
      .has.attr('href')
      .equal('/resume')
  })
})
