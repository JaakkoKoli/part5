import React from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blog: props.blog,
      full: false,
      delete: props.delete,
      user: props.user
    }
  }

  toggle = () => {
    this.setState({full: !this.state.full})
  }

  like = () =>{
    let newBlog = this.state.blog
    newBlog.likes++
    this.setState({blog: newBlog})
    blogService.update(this.state.blog._id, this.state.blog)
  }

  render(){
    if(this.state.full){
      return(
        <div style={blogStyle} className="content" onClick={this.toggle}>
          {this.state.blog.title} {this.state.blog.author}<br />
          <a href={this.state.blog.url}>{this.state.blog.url}</a><br />
          {this.state.blog.likes} likes <button onClick={this.like}>like</button><br />
          {this.state.blog.user ? 'added by '+this.state.blog.user.name:''}<br />
          {this.state.user&&((!this.state.blog.user)||(this.state.blog.user.username===this.state.user.username)) ? <button onClick={this.state.delete}>delete</button> : ''}
        </div>  
      )
    }else{
      return(
        <div style={blogStyle} className="content" onClick={this.toggle} >
          {this.state.blog.title} {this.state.blog.author}
        </div>  
      )
    }
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  delete: PropTypes.func.isRequired
}

export default Blog