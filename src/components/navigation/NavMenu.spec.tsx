import React from 'react'
import { expect } from 'chai'
import 'mocha'
import { render, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon'

import * as router from '@reach/router'

configure({ adapter: new Adapter() })

// import { NavMenu as ActualNavMenu } from './NavMenu'
import { NavMenu, MenuItem } from './NavMenu'

// before(() => {
//   global.__PATH_PREFIX__ = ``
// })

const testBuilder = (item: MenuItem): JSX.Element => (
  <p key={item.key}>{item.toString()}</p>
)

describe('component/navigation/NavMenu', () => {
  beforeEach(() => {
    const mockLocation = ({
      hash: '',
      pathname: '/blog',
    } as any) as router.WindowLocation

    sinon.stub(router, 'useLocation').returns(mockLocation)
  })
  afterEach(() => {
    sinon.restore()
  })

  const items: MenuItem[] = [
    { text: 'Text', to: '/#destination', key: '1' },
    { text: 'Text', to: '/#destination', key: '2' },
    { text: 'Text', to: '/#destination', key: '3' },
  ]
  it('should render a list of menu items', () => {
    const menu = render(<NavMenu items={items} itemBuilder={testBuilder} />)

    expect(menu.children()).to.have.lengthOf(3)
  })
})
