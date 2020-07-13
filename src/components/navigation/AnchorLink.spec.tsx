import { expect } from 'chai'
import 'mocha'

import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon'

import React, { MutableRefObject } from 'react'
import { Link } from 'gatsby'
// import * as router from '@reach/router'

configure({ adapter: new Adapter() })

import { AnchorLink } from './AnchorLink'

describe('component/navigation/AnchorLink', () => {
  it("wraps Gatsby's Link component", () => {
    const ref = ('a ref' as any) as MutableRefObject<any>
    const link = shallow(<AnchorLink to="" id="" className="" target={ref} />)

    expect(link.find(Link)).to.have.lengthOf(1)
  })

  it('gives focus (e.g. document.activeElement) to a `target` DOM node', () => {
    // mocking a ref by creating the needed `current` property, which has a `focus()` method
    // & then creating a spy on the `focus()` method to moniter if it is called or not
    const stubFocus = sinon.spy()
    const targetNode = { focus: stubFocus }
    const targetRef = ({ current: targetNode } as any) as MutableRefObject<any>

    // shallow render the AnchorLink with the mocked ref
    const link = shallow(
      <AnchorLink to="" id="" className="" target={targetRef} />
    )
    // simulate a click
    link.simulate('click')
    // wait > 500 seconds before running the test, otherwise focus still won't have been
    // given see hacky fix in AnchorLink
    setTimeout(() => {
      // and expect the mocked `focus()` method to have been called once
      expect(stubFocus.calledOnce).to.be.true
    }, 501)
  })

  it('does nothing if the ref is null at the time of the click event', () => {
    const stubFocus = sinon.spy()
    const targetRef = ({ current: null } as any) as MutableRefObject<any>

    const link = shallow(
      <AnchorLink to="" id="" className="" target={targetRef} />
    )
    link.simulate('click')

    expect(stubFocus.called).to.be.false
  })
})
