import React from 'react'
import { expect } from 'chai'
import 'mocha'
import { render, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

// import { NavMenu as ActualNavMenu } from './NavMenu'
import { NavMenu, MenuItem } from './NavMenu'

// before(() => {
//   global.__PATH_PREFIX__ = ``
// })

const testBuilder = (item: MenuItem): JSX.Element => <p>{item.toString()}</p>

describe('component/navigation/NavMenu', () => {
  const items: MenuItem[] = [
    { text: 'Text', to: '/#destination', key: '1' },
    { text: 'Text', to: '/#destination', key: '2' },
    { text: 'Text', to: '/#destination', key: '3' },
  ]
  const menu = render(<NavMenu items={items} itemBuilder={testBuilder} />)

  console.log(menu.html())

  it('should render a list of menu items', () => {
    expect(menu.children()).to.have.lengthOf(3)
  })
})
