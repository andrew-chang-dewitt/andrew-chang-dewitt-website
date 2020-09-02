import 'mocha'
import { expect } from 'chai'

import { arraysEqual } from './comparisons'

describe('utils/comparisons', () => {
  describe('arraysEqual()', () => {
    it('returns true if two arrays have the same elements in the same order', () => {
      const sym = Symbol('symbol')

      const a = [1, 'a', true, undefined, null, sym]
      const b = [1, 'a', true, undefined, null, sym]

      expect(arraysEqual(a, b)).to.be.true
    })

    it('otherwise returns false', () => {
      const a = [1, 2]
      const b = [2, 1]

      expect(arraysEqual(a, b)).to.be.false
    })
  })
})
