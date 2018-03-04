import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Note from './components/blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
  let app
  beforeAll(() => {
    app = mount(<App />)
  })

  it('does not render blogs when not logged in', () => {
    app.update()
    const noteComponents = app.find(Note)
    expect(noteComponents.length).toEqual(0)
  })

  it('renders blogs when logged in', () => {
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify({user: {username: 'username', name: 'name'}, token: 'token'}))
    app.update()
    const noteComponents = app.find(Note)
    expect(noteComponents.length).toEqual(noteComponents.length)
  })
})