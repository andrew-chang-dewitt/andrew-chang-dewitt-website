import 'mocha'
import { expect } from 'chai'

import kebabCase from './kebabCase'

describe('utils/kebabCase', () => {
  it('converts spaces to dashes', () => {
    expect(kebabCase('two words')).to.equal('two-words')
  })

  it('converts upper case letters to lower case', () => {
    expect(kebabCase('UPPER')).to.equal('upper')
  })
})
