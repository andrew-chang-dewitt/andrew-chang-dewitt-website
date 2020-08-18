import React from 'react'
import 'mocha'
import {
  expect,
  //use
} from 'chai'
import { shallow, configure, ShallowWrapper } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

//import { default as chaiDom } from 'chai-dom'
// import {
//   render,
//   cleanup,
//   screen,
//   act,
//   // fireEvent,
//   // waitFor
// } from '@testing-library/react'
// import sinon, { SinonSpy, SinonStub } from 'sinon'

// configure chai to use chai-dom plugin
// use(chaiDom)

configure({ adapter: new Adapter() })

import { Footer } from './Footer'
import { AnchorLink } from '../navigation/AnchorLink'

describe('component/Footer', () => {
  let footer: ShallowWrapper

  beforeEach(() => {
    let topRef = ('totally a ref' as any) as React.RefObject<HTMLDivElement>

    footer = shallow(<Footer topRef={topRef} />)
  })

  it('includes an AnchorLink that takes the user back to the top of the current page', () => {
    expect(footer.find(AnchorLink)).to.have.lengthOf(1)
  })
})
