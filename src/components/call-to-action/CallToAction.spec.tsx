import React from 'react'
import { expect } from 'chai'
import 'mocha'
// import sinon, { SinonStub } from 'sinon'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

import { CallToAction } from './CallToAction'
import { Form } from './Form'

describe('components/CallToAction', () => {
  const transition = 'a transition'
  const cta = shallow(<CallToAction transition={transition} />)

  it('renders the given transition at the beginning', () => {
    expect(cta.childAt(0).text()).to.satisfy((text: string) =>
      text.startsWith(transition)
    )
  })

  it('includes a Form', () => {
    expect(cta.find(Form)).to.have.lengthOf(1)
  })
})
