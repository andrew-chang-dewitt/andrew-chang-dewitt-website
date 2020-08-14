import { expect } from 'chai'
import 'mocha'

import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
// import sinon from 'sinon'

configure({ adapter: new Adapter() })

import React, { RefObject } from 'react'

import { NextSection } from './NextSection'
import { AnchorLink } from './AnchorLink'

describe('component/navigation/NextSection', () => {
  const mockTarget = ('totally a ref' as any) as RefObject<HTMLDivElement>
  const next = shallow(<NextSection to="\to" id="id" target={mockTarget} />)

  it('renders an AnchorLink', () => {
    expect(next.find(AnchorLink)).to.have.lengthOf(1)
  })

  it('renders only one child element in the AnchorLink', () => {
    expect(next.find(AnchorLink).children()).to.have.lengthOf(1)
  })

  it('and that one child is an svg icon', () => {
    expect(next.find(AnchorLink).childAt(0).type()).to.equal('svg')
  })

  it('includes accessible titles for screen readers & alt text', () => {
    expect(
      next.find('svg').childAt(0).find('title').childAt(0).text()
    ).to.equal('Go to next section')
  })
})
