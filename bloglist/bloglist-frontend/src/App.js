import React from 'react'
import Blog from './components/Blog'
import Togglable from './components/togglable'
import Notification from './components/notification'
import blogService from './services/blogs'
import loginService from './services/login'


const LoginForm = ({username, password, handleFieldChange, login}) => (
  <div>
    <h2>Log in</h2>

    <form onSubmit={login}>
      <div>
        username
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleFieldChange}
        />
      </div>
      <div>
        password
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleFieldChange}
        />
      </div>
      <button>log in</button>
    </form>
  </div>
)

const BlogForm = ({addBlog,title,author,url,handleFieldChange, blogsVisible}) => {
  const showWhenVisible = { display: blogsVisible ? '' : 'none' }

  return(
  
  <div style={showWhenVisible}>
    <h2>Create new</h2>

    <form onSubmit={addBlog}>
    title:
      <input
        type="text"
        name="title"
        value={title}
        onChange={handleFieldChange}
      />
      author:
      <input
        type="text"
        name="author"
        value={author}
        onChange={handleFieldChange}
      />
      url:
      <input
        type="text"
        name="url"
        value={url}
        onChange={handleFieldChange}
      />
      <button type="submit">Create</button>
    </form>
  </div>
)}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      author: '',
      title: '',
      url: '',
      user: null,
      username: '',
      password: '',
      error: null,
      success: null,
      userdata: null,
      blogsVisible: false
    }
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  componentWillMount() {
    blogService
      .getAll()
      .then(blogs => {
        this.setState({ blogs })
      })

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user:user.token, userdata:user.user, blogsVisible: true })
      blogService.setToken(user.token)
    }    
  }

  componentDidMount() {
    blogService.getAll().then(blogs => {
      blogs.sort((a,b)=>b.likes-a.likes)
      this.setState({ blogs })
    })
  } 

  logout = () => {
    this.setState({
      user: null,
      userdata: null,
      blogsVisible: false
    })
    window.localStorage.removeItem('loggedBlogappUser')
    this.setState({
      success: 'Logged out succesfully.',
    })
    setTimeout(() => {
      this.setState({ success: null })
    }, 5000)

  }

  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      this.setState({
        success: 'Logged in as '+this.state.username,
        userdata: {
          name: user.name,
          username: user.username
        },
        blogsVisible: true
      })
      blogService.setToken(user.token)
      setTimeout(() => {
        this.setState({ success: null })
      }, 5000)
      this.setState({ username: '', password: '', user: user.token})
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify({user: this.state.userdata, token: this.state.user}))
    } catch(exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen'
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  deleteBlog = (blog) => () => {
    if(window.confirm("Are you sure you want to permanently delete blog "+blog.title+' by '+blog.author+'?')){
      blogService.remove(blog._id)
      this.setState({blogs: this.state.blogs.filter(b => b._id !== blog._id)})
    }
  }

  addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url,
      like: 0
    }

    blogService
      .create(blogObject)
      .then(newBlog => {
        this.setState({
          success: 'Blog '+newBlog.title+' by '+newBlog.author+' added succesfully!'
        })
        setTimeout(() => {
          this.setState({ success: null })
        }, 5000)
        this.setState({
          blogs: this.state.blogs.concat(newBlog).sort((a,b)=>b.likes-a.likes),
          title: '',
          author: '',
          url: ''
        })
      })
  }

  render() {
    const showWhenVisible = { display: this.state.blogsVisible ? '' : 'none' }
    return (
      <div>
        <h1>Blogs</h1>

        <Notification message={this.state.error} type="error" />
        <Notification message={this.state.success} type="success" />

        {this.state.user === null ?
          <Togglable buttonLabel="Log in"><LoginForm username={this.state.username} password={this.state.password} handleFieldChange={this.handleFieldChange} login={this.login} /></Togglable> :
          <div>
            <p>{this.state.userdata.username} logged in <button onClick={this.logout} >log out</button></p>
            <BlogForm blogsVisible={this.state.blogsVisible} addBlog={this.addBlog} title={this.state.title} author={this.state.author} url={this.state.url} handleFieldChange={this.handleFieldChange}  />
          </div>
        }

        <ul style={showWhenVisible} className="blogs">
          {this.state.blogs.map((blog, index) =>
              <Blog 
              key={index} 
              blog={blog}
              user={this.state.userdata}
              delete={this.deleteBlog(blog)}
            />)}
        </ul>
      </div>
    )
  }
}

export default App;
