const BlogForm = ({ 
    handleAddBlog,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange,
    title,
    author,
    url
 }) => {
  return (
    <div>
        <h2>Create new blog</h2>
        <form onSubmit={handleAddBlog}>
          <div>
            title:
            <input type="text"
            id="title"
            value={title}
            name='Title'
            onChange={handleTitleChange}/>
          </div>
          <div>
            author:
            <input type="text"
            id="author"
            value={author}
            name='Author'
            onChange={handleAuthorChange}/>
          </div>
          <div>
            url:
            <input type="text"
            id="url"
            value={url}
            name='Url'
            onChange={handleUrlChange}/>
          </div>
          <button id="createBlogForm_button" type='submit'>Create</button>
        </form>
    </div>
  )
}

export default BlogForm