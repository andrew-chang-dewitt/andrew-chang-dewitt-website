import React from 'react'
import { expect } from 'chai'
import 'mocha'
import sinon, { SinonStub } from 'sinon'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

import {
  BlogHome as ComponentBlogHome,
  Post as InterfacePost,
} from './BlogHome'

import { PostSummary } from '../blog/PostSummary'
import { Factories as PostFactories } from '../blog/PostSummary.spec'
import queryHooks from '../../utils/queryHooks'
import { FilterControls } from '../blog/FilterControls'

namespace Factories {
  export class BlogHome {
    static createWithPosts(posts: InterfacePost[]) {
      return shallow(
        <ComponentBlogHome posts={posts} tags={['a tag', 'another tag']} />
      )
    }

    static createWithCurrentTag(tag: string) {
      return shallow(
        <ComponentBlogHome
          posts={[(1 as any) as InterfacePost]}
          tags={[tag, 'another tag']}
          currentTag={tag}
        />
      )
    }
  }

  export class Post {
    static create() {
      return PostFactories.Post.create()
    }
  }
}

describe('component/BlogHome', () => {
  let useQueryParamStub: SinonStub<any, any>

  before(() => {
    useQueryParamStub = sinon.stub(queryHooks, 'useQueryParam')
    useQueryParamStub.callsFake((_: string, defaultValue: string[]) => ({
      value: defaultValue,
      update: (value: any[]) => value,
    }))
  })
  after(() => {
    useQueryParamStub.restore()
  })

  it('renders a post summary for each post', () => {
    const blogHome = Factories.BlogHome.createWithPosts([
      Factories.Post.create(),
    ])

    expect(blogHome.find(PostSummary)).to.have.lengthOf(1)
  })

  it('passes the current tag to Filter Controls, if it exists', () => {
    const blogHome = Factories.BlogHome.createWithCurrentTag('current')

    expect(blogHome.find(FilterControls).get(0).props.currentTag).to.equal(
      'current'
    )
  })

  describe('post sort order', () => {
    const post1 = Factories.Post.create()
    const post2 = Factories.Post.create()

    it('defaults to the original order', () => {
      const blogHome = Factories.BlogHome.createWithPosts([post1, post2])

      const posts = blogHome.find(PostSummary)

      expect(posts.get(0).props.post).to.equal(post1)
      expect(posts.get(1).props.post).to.equal(post2)
    })

    it('switches the sort direction when the sort query param directs it to', () => {
      useQueryParamStub.callsFake((_: string, __: string[]) => ({
        value: ['ascending'],
        update: (value: any[]) => value,
      }))

      const blogHome = Factories.BlogHome.createWithPosts([post1, post2])

      const posts = blogHome.find(PostSummary)

      expect(posts.get(0).props.post).to.equal(post2)
      expect(posts.get(1).props.post).to.equal(post1)
    })

    it('gives filter controls a handler to toggle the sort direction from descending to ascending', () => {
      const updateStub = sinon.stub().callsFake((value: string[]) => value)
      useQueryParamStub.callsFake((_: string, __: string[]) => ({
        value: ['descending'],
        update: updateStub,
      }))

      const blogHome = Factories.BlogHome.createWithPosts([post1, post2])

      // reach into filter controls component & toggle direction with the
      // handler it gets passed
      blogHome.find(FilterControls).get(0).props.sortHandler()
      expect(updateStub.calledOnceWithExactly(['ascending']))
    })

    it('and from ascending to descending', () => {
      const updateStub = sinon.stub().callsFake((value: string[]) => value)
      useQueryParamStub.callsFake((_: string, __: string[]) => ({
        value: ['ascending'],
        update: updateStub,
      }))

      const blogHome = Factories.BlogHome.createWithPosts([post1, post2])

      blogHome.find(FilterControls).get(0).props.sortHandler()
      expect(updateStub.calledOnceWithExactly(['descending']))
    })
  })
})
