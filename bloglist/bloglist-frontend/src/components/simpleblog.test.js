import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './simpleblog'

describe.only('<SimpleBlog />', () => {
  it('renders content', () => {
    const blog = {
      title: 'blogtitle',
      author: 'author',
      likes: 0
    }
    const mockHandler = jest.fn()
    const blogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler} />)
    const contentDiv = blogComponent.find('.content')
    const likesDiv = blogComponent.find('.likes')
    
    expect(contentDiv.text()).toContain(blog.title)
    expect(contentDiv.text()).toContain(blog.author)
    expect(likesDiv.text()).toContain(blog.likes.toString())
  })
  it('clicking like works', () => {
    const blog = {
      title: 'blogtitle',
      author: 'author',
      likes: 0
    }
    const mockHandler = jest.fn()
    const blogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler} />)
    const button = blogComponent.find('.button')
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})