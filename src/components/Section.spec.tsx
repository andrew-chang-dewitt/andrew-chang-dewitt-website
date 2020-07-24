import React from 'react'
import { expect } from 'chai'
import 'mocha'
import { render } from '@testing-library/react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

import { Section } from './Section'
// import { NextSection } from './navigation/NextSection'

describe('component/Section', () => {
  const id = 'test-id'

  let section = shallow(<Section id={id} />)

  it("forwards a ref to the root element to it's parent component", () => {
    let forwarded: { el: HTMLDivElement | null } = {
      el: null,
    }

    const ParentComponent = () => {
      const forwardedRef = React.useRef<HTMLDivElement>(null)

      React.useEffect(() => {
        if (forwardedRef.current) forwarded.el = forwardedRef.current
      }, [forwardedRef.current])

      return (
        <div>
          <Section ref={forwardedRef} id="" />
        </div>
      )
    }

    // use react testing library here to ensure useRef & useEffect are run
    render(<ParentComponent />)

    expect(forwarded.el).to.not.be.null
  })

  it('can be programatically focused', () => {
    expect(section.props().tabIndex).to.equal(-1)
  })

  it('renders a <section> with a given id from props', () => {
    expect(section.props().id).to.equal('test-id')
  })

  it('can optionally render a given title as an <h1>', () => {
    const titleSection = shallow(<Section id={id} title="A title" />)

    expect(titleSection.find('h1').text()).to.equal('A title')
  })

  it('renders children', () => {
    const child1 = <div>A child</div>
    const child2 = <div>Another child</div>
    const childrenSection = shallow(
      <Section id={id}>
        {child1}
        {child2}
      </Section>
    )
    expect(childrenSection.find('.section-wrapper').contains(child1)).to.be.true
    expect(childrenSection.find('.section-wrapper').contains(child2)).to.be.true
  })

  // it('can include a NextSection navigation button stickied to the bottom of the section', () => {
  //   const TestComponent = () => {
  //     const secondRef = React.useRef<HTMLDivElement>(null)
  //     const secondNavItem = {
  //       to: '/#second',
  //       text: 'second section',
  //       target: secondRef,
  //     }
  //     return (
  //       <div>
  //         <Section id="first" next={secondNavItem} />
  //         <Section id="second" ref={secondRef} />
  //       </div>
  //     )
  //   }

  //   const test = shallow(<TestComponent />)

  //   expect(test.childAt(0).shallow().contains(NextSection)).to.be.true
  // })
})
