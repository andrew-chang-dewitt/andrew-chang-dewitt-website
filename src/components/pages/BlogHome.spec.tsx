import React from 'react'
import { expect } from 'chai'
import 'mocha'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

import { BlogHome as ComponentBlogHome } from './BlogHome'

import { PostSummary } from '../PostSummary'
import { Factories as PostFactories } from '../PostSummary.spec'

namespace Factories {
  export class BlogHome {
    static createWithOnePost() {
      const posts = [PostFactories.Post.create()]
      return shallow(<ComponentBlogHome postCount={1} posts={posts} />)
    }
  }
}

describe('component/BlogHome', () => {
  const blogHome = Factories.BlogHome.createWithOnePost()

  it('renders the number of posts', () => {
    expect(blogHome.find('.postCount').text()).to.equal('1 Posts')
  })

  it('renders a post summary for each post', () => {
    expect(blogHome.find(PostSummary)).to.have.lengthOf(1)
  })
})
