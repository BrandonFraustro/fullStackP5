import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notifications'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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
      setUsername('')
      setPassword('')
    } catch(exception) {
      //console.log('wrong credentials');
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000);
      //console.log('wrong credentials');
    }
  }

  const handleAddBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: Math.floor((Math.random() * 10) + 1)
    }

    blogService.create(blogObject)
    .then(returnObj => {
      setBlogs(blogs.concat(returnObj))
      setAuthor('')
      setTitle('')
      setUrl('')
    })

    console.log(blogObject);
  }

  const handleLogOut = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload(false)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Log in to application</h2>
        <div>
          username
          <input type="text" 
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input type="text" 
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
  )

  const blogsResult = () => (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
        )}
    </div>
  )

  const blogsForm = () => (
    <form onSubmit={handleAddBlog}>
      <h2>Create new blog</h2>
      <div>
        title:
        <input type="text"
        value={title}
        name='Title'
        onChange={({ target }) => setTitle(target.value)}/>
      </div>
      <div>
        author:
        <input type="text"
        value={author}
        name='Author'
        onChange={({ target }) => setAuthor(target.value)}/>
      </div>
      <div>
        url:
        <input type="text"
        value={url}
        name='Url'
        onChange={({ target }) => setUrl(target.value)}/>
      </div>
      <button>create</button>
    </form>
  )

  return (
    <div>
      <Notification message={errorMessage}/>

      {
        user === null ?
        loginForm() :
        (<div>
          <h2>Blogs</h2>
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