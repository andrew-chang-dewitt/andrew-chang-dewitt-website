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
        tags: ['tag1', 'tag2'],
      }
    }
  }
}

describe('component/PostSummary', () => {
  const postSummary = shallow(<PostSummary post={Factories.Post.create()} />)

  it('is a link', () => {
    expect(postSummary.find(Link)).to.have.lengthOf(1)
  })

  it("renders the post's title", () => {
    expect(postSummary.find('h3').text()).to.equal('title')
  })

  it("renders the post's date", () => {
    expect(postSummary.find('h6').text()).to.have.string('today')
  })

  it('renders an excerpt', () => {
    expect(postSummary.find('p').text()).to.equal('excerpt')
  })

  it("renders a post's tags", () => {
    expect(postSummary.find('ul').childAt(0).text()).to.have.string('tag1')
    expect(postSummary.find('ul').childAt(1).text()).to.have.string('tag2')
  })

  it('guards against no tags for the post', () => {
    const post = Factories.Post.create()
    post.tags = null

    const noTags = shallow(<PostSummary post={post} />)

    expect(noTags.find('ul')).to.have.lengthOf(0)
  })
})
