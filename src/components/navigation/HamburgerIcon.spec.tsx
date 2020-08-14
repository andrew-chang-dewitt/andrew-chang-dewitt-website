import React from 'react'
import { expect } from 'chai'
import 'mocha'
import sinon, { SinonSpy } from 'sinon'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

import { HamburgerIcon } from './HamburgerIcon'

describe('component/navigation/HamburgerIcon', () => {
  let buttonHandlerSpy: SinonSpy

  beforeEach(() => {
    buttonHandlerSpy = sinon.spy()
  })
  afterEach(() => {
    buttonHandlerSpy.resetHistory()
  })

  it('differentiates between an open & closed icon', () => {
    const open = shallow(
      <HamburgerIcon opened={true} buttonHandler={buttonHandlerSpy} />
    )
    const closed = shallow(
      <HamburgerIcon opened={false} buttonHandler={buttonHandlerSpy} />
    )

    expect(open.hasClass('opened')).to.be.true
    expect(closed.hasClass('opened')).to.be.false
  })

  it('requires a handler to be executed when the icon is clicked', () => {
    const handled = shallow(
      <HamburgerIcon opened={true} buttonHandler={buttonHandlerSpy} />
    )

    handled.simulate('click')

    expect(buttonHandlerSpy.calledOnce).to.be.true
  })
})
