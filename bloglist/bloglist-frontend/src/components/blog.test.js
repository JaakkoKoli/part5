import React from 'react'
import { shallow } from 'enzyme'
import Blog from './blog'

describe.only('<Blog />', () => {
  it('renders name and author is not clicked', () => {
    const blog = {
      _id: "321",
      title: 'blogtitle',
      author: 'author',
      likes: 0,
      user: {
          username: "username",
          name: "name",
          _id: "123"

      }
    }
    const mockHandler = jest.fn()
    const blogComponent = shallow(<Blog blog={blog} delete={mockHandler} user={blog.user} />)
    const contentDiv = blogComponent.find('.content')

    
    expect(contentDiv.text()).toContain(blog.title)
    expect(contentDiv.text()).toContain(blog.author)
  })
  it('renders all when clicked', () => {
    const blog = {
        _id: "321",
        title: 'blogtitle',
        author: 'author',
        likes: 0,
        user: {
            username: "username",
            name: "name",
            _id: "123"
  
        }
    }
    const mockHandler = jest.fn()
    const blogComponent = shallow(<Blog blog={blog} delete={mockHandler} user={blog.user} ref={r => refC = r} />)
    
    const contentDiv = blogComponent.find('.content')
    contentDiv.simulate('click')
    const content = blogComponent.find('.content')

    expect(content.text()).toContain(blog.title)
    expect(content.text()).toContain(blog.author)
    expect(content.text()).toContain(blog.likes)
    expect(content.text()).toContain(blog.user.name)
  })
})