import { useState } from 'react'
import './Blog.css'

const Blog = ({ blog }) => {
  const [dataBlog, setDataBlog] = useState(false)

  const hideWhenVisible = { display: dataBlog ? 'none' : '' }
  const showWhenVisible = { display: dataBlog ? '' : 'none' }

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
          <button className='button-blog' >Like</button>
        </div>
        <p>{blog.author}</p>
        <button className='button-blog' onClick={() => setDataBlog(false)}>Hide</button>
      </div>
    </div>  
  )
}

export default Blog