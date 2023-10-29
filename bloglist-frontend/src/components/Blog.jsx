import { useState } from 'react'
import './Blog.css'
import blogService from '../services/blogs'

const Blog = ({ blog, handleUpdatedBlog }) => {
  const [dataBlog, setDataBlog] = useState(false)

  const hideWhenVisible = { display: dataBlog ? 'none' : '' }
  const showWhenVisible = { display: dataBlog ? '' : 'none' }

  const handleLiked = async (event) => {
    event.preventDefault()

    const blogObject = {
      likes: blog.likes + 1
    }
    try {
      const res = await blogService.update(blog.id, blogObject)
      handleUpdatedBlog(res)
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <div className="blog-content">
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button className='button-blog' onClick={() => setDataBlog(true)}>View</button>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.title}</p>
        <p>{blog.url}</p>
        <div>
          {blog.likes}
          <button className='button-blog' onClick={handleLiked}>Like</button>
        </div>
        <p>{blog.author}</p>
        <button className='button-blog' onClick={() => setDataBlog(false)}>Hide</button>
      </div>
    </div>  
  )
}

export default Blog