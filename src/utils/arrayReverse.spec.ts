import 'mocha'
import { expect } from 'chai'

import arrayReverse from './arrayReverse'

describe('utils/arrayReverse', () => {
  let arr: number[]

  before(() => {
    arr = [1, 2, 3]
  })

  it('returns a reversed version of the given array', () => {
    expect(arrayReverse(arr)).to.deep.equal([3, 2, 1])
  })

  it("doesn't modify the original array", () => {
    expect(arr).to.deep.equal([1, 2, 3])
  })
})
