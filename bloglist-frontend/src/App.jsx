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

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    //console.log('logging in with', username, password);
    try {
      const user = await loginService.login({
        username, password
      })
      console.log(user);
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception) {
      console.log('wrong credentials');
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000);
      console.log('wrong credentials');
    }
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

  return (
    <div>
      <Notification message={errorMessage}/>

      {
        user === null ?
        loginForm() :
        <div>
          <h2>Blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
            )}
        </div>
      }
    </div>
  )
}

export default App