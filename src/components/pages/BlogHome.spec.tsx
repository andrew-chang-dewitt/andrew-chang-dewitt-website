import React from 'react'
import { expect } from 'chai'
import 'mocha'
import sinon, { SinonStub } from 'sinon'
import { shallow, configure, ShallowWrapper } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

import { BlogHome as ComponentBlogHome } from './BlogHome'

import { PostSummary } from '../blog/PostSummary'
import { Factories as PostFactories } from '../blog/PostSummary.spec'
import queryHooks from '../../utils/queryHooks'

namespace Factories {
  export class BlogHome {
    static createWithOnePost() {
      const posts = [PostFactories.Post.create()]
      return shallow(
        <ComponentBlogHome posts={posts} tags={['a tag', 'another tag']} />
      )
    }
  }
}

describe('component/BlogHome', () => {
  let useQueryParamStub: SinonStub<any, any>
  let blogHome: ShallowWrapper

  beforeEach(() => {
    useQueryParamStub = sinon.stub(queryHooks, 'useQueryParam')
    useQueryParamStub.returns({ value: [1], update: (value: any[]) => value })
    blogHome = Factories.BlogHome.createWithOnePost()
  })
  afterEach(() => {
    useQueryParamStub.restore()
  })

  it('renders a post summary for each post', () => {
    expect(blogHome.find(PostSummary)).to.have.lengthOf(1)
  })
})
