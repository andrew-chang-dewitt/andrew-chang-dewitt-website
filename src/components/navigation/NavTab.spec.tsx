// import React from 'react'
// import { expect } from 'chai'
// import 'mocha'
// import { shallow, configure } from 'enzyme'
// import Adapter from 'enzyme-adapter-react-16'
//
// configure({ adapter: new Adapter() })
//
// import { NavTab as ActualNavTab } from './NavTab'
//
// namespace Factories {
//   export class NavTab {
//     static create() {
//       return shallow(
//         <ActualNavTab destination="destination">Inactive tab</ActualNavTab>
//       )
//     }
//   }
// }
//
// describe('component/navigation/NavTab', () => {
//   it('knows if it is an "active" tab', () => {
//     const inactive = Factories.NavTab.create()
//
//     expect(inactive.hasClass('active')).to.be.false
//     expect(active.hasClass('active')).to.be.true
//   })
// })
