import React from 'react'
import { Link } from 'gatsby'
import { expect } from 'chai'
import 'mocha'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

import { Post as ComponentPost, PostSummary } from './PostSummary'

export namespace Factories {
  export class Post {
    static create(): ComponentPost {
      return {
        id: 'id',
        title: 'title',
        date: 'today',
        slug: 'slug',
        excerpt: 'excerpt',
      }
    }
  }
}

describe('component/PostSummary', () => {
  const postSummary = shallow(<PostSummary post={Factories.Post.create()} />)

  it('is a link', () => {
    expect(postSummary.find(Link)).to.have.lengthOf(1)
  })
})
