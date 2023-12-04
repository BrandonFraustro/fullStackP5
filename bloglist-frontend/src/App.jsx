import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notifications'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [createBlogVisible, setCreateBlogVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    //console.log('logging in with', username, password);
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      //console.log(user);
      blogService.setToken(user.token)
      setUser(user)
      setNotification(`Welcome ${user.username}!`)
      setTimeout(() => {
        setNotification('')
      }, 5000);
      setUsername('')
      setPassword('')
    } catch(exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000);
    }
  }

  const handleAddBlog = (event) => {
    event.preventDefault()

    if (!title || !author || !url) {
      setErrorMessage('Please fill in all required fields')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000);
      return ;
    }

    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: 0
    }

    blogService.create(blogObject)
    .then(returnObj => {
      setBlogs(blogs.concat(returnObj))
      setNotification(`A new blog ${blogObject.title} by ${blogObject.author} added`)
      setTimeout(() => {
        setNotification('')
      }, 5000);
      setAuthor('')
      setTitle('')
      setUrl('')
    })
    .catch(error => {
      setErrorMessage(error)
      setTimeout(() => {
        setErrorMessage('')
      }, 5000);
    })

    //console.log(blogObject);
  }

  const handleLogOut = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload(false)
  }

  const loginForm = () => {
    return (
      <div>
        <div>
          <Notification message={[errorMessage, notification]}/>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </div>
      </div>
    )
  }

  const handleUpdatedBlog = (updatedBlog) => {
    const newBlogs = blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
    setBlogs(newBlogs)
  }

  const handleDeletedBlogs = (updatedBlog) => {
    if (updatedBlog instanceof Error) {
      //console.log('App Error:', updatedBlog);
      setErrorMessage(updatedBlog.response.data)
      setTimeout(() => {
        setErrorMessage('')
      }, 5000);
    } else if(updatedBlog) {
      const updatedBlogs = blogs.filter((blog) => (blog.id !== updatedBlog.id))
      setBlogs(updatedBlogs)
    }
  }
  
  const blogsResult = () => {
    const sortedBlogs = [...blogs]
    sortedBlogs.sort((a, b) => b.likes - a.likes)
    return (
    <div>
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleUpdatedBlog={handleUpdatedBlog} handleDeletedBlogs={handleDeletedBlogs}/>
        )}
    </div>
    )
  }

  const blogsForm = () => {
    const hideWhenVisible = { display: createBlogVisible ? 'none' : '' }
    const showWhenVisible = { display: createBlogVisible ? '' : 'none' }
    
    return (
      <div>
        <div style={hideWhenVisible}>
          <button id='createBlog_button' onClick={() => setCreateBlogVisible(true)}>Create</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm
            title={title}
            author={author}
            url={url}
            handleTitleChange={({ target }) => setTitle(target.value)}
            handleAuthorChange={({ target }) => setAuthor(target.value)}
            handleUrlChange={({ target }) => setUrl(target.value)}
            handleAddBlog={handleAddBlog}
          />
          <button onClick={() => setCreateBlogVisible(false)}>Cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {
        user === null ?
        loginForm() :
        (<div>
          <h2>Blogs</h2>
          <Notification message={[errorMessage, notification]}/>
          <p>{user.username} logged in</p>
          <button onClick={handleLogOut}>logout</button>
          {blogsForm()}
          {blogsResult()}
        </div>)
      }
    </div>
  )
}

export default App