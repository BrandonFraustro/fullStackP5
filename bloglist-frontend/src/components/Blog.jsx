import { useState } from 'react'
//import './Blog.css'
import blogService from '../services/blogs'

const Blog = ({ blog, handleUpdatedBlog, handleDeletedBlogs }) => {
  const [dataBlog, setDataBlog] = useState(false)

  const hideWhenVisible = { display: dataBlog ? 'none' : '' }
  const showWhenVisible = { display: dataBlog ? '' : 'none' }


  const canBeDeleted = { display: blog.user ? '' : 'none' }
  //console.log(canBeDeleted);

  const handleLiked = async (event) => {
    event.preventDefault()

    const blogObject = {
      likes: blog.likes + 1
    }
    try {
      const res = await blogService.update(blog.id, blogObject)
      //console.log('handleLiked is called ',res);
      handleUpdatedBlog(res)
    } catch(error) {
      console.log(error);
    }
  }

  const handleRemove = async (event) => {
    event.preventDefault()

    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        const res = await blogService.deleteBlog(blog.id)
        handleDeletedBlogs(blog)
      }
    } catch(error) {
      //console.log('Blog:',error.response.data);
      handleDeletedBlogs(error)
    }
  }

  return (
    <div className="blog-content">
      <div style={hideWhenVisible} className='blog-test'>
        {blog.title} {blog.author}
        <button className='button-blog' id='viewBlog_button' onClick={() => setDataBlog(true)}>View</button>
      </div>
      <div style={showWhenVisible} className='togglableContent'>
        <div>
          {blog.title}
          <button className='button-blog' onClick={() => setDataBlog(false)}>Hide</button>
        </div>
        <p>{blog.url}</p>
        <div>
          {blog.likes}
          <button className='button-blog' id='likeBlog_button' onClick={handleLiked}>Like</button>
        </div>
        <p>{blog.author}</p>
        <div style={canBeDeleted}>
          <button className='button-blog' id='removeBlog_button' onClick={handleRemove}>Remove</button>
        </div>
      </div>
    </div>  
  )
}

export default Blog