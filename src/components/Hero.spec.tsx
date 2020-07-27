import React from 'react'
import { expect } from 'chai'
import 'mocha'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

import { Hero, Colors } from './Hero'

describe('component/Hero', () => {
  const id = 'test-id'
  const title = 'Test Title'
  const hero = shallow(<Hero id={id} title={title} />)

  it('renders a <section> with an id attribute from props', () => {
    expect(hero.find(`#${id}`)).to.exist
  })

  it('and renders a title as an <h1> in the <section>', () => {
    expect(hero).to.exist
  })

  it('can set a default background & text color', () => {
    // use shallow().get(index) to have access to a rendered ReactElement
    // where inline styles is set as an attribute on the props property
    const style = (hero.get(0).props as any).style

    expect(style).to.have.property('backgroundColor', Colors.Dark)
    expect(style).to.have.property('color', Colors.Light)
  })

  it('can set a custom background color from an enum of options', () => {
    // use shallow().get(index) to have access to a rendered ReactElement
    // where inline styles is set as an attribute on the props property
    const style = (shallow(
      <Hero id="id" title="title" color={Colors.Blue} />
    ).get(0).props as any).style

    expect(style).to.have.property('backgroundColor', Colors.Blue)
  })

  it('will automatically change the font color to maintain contrast based on the choice of background color', () => {
    // use shallow().get(index) to have access to a rendered ReactElement
    // where inline styles is set as an attribute on the props property
    const style = (shallow(
      <Hero id="id" title="title" color={Colors.Light} />
    ).get(0).props as any).style

    expect(style).to.have.property('color', Colors.Dark)
  })

  it('can add additional classes from props as a space-delimited string', () => {
    const className = shallow(
      <Hero title="Title" id="id" className="another class" />
    )

    expect(className.hasClass('another')).to.be.true
    expect(className.hasClass('class')).to.be.true
  })
})
