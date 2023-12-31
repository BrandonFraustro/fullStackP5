import PropTypes from 'prop-types'

const LoginForm = ({ 
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
 }) => {
  return (
    <div>
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <div>
            username
            <input type="text"
              id='username'
              value={username}
              name="Username"
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            password
            <input type="text"
              id='password' 
              value={password}
              name="Password"
              onChange={handlePasswordChange}
            />
          </div>
          <button id='login_button' type='submit'>login</button>
        </form>
    </div>
  )
}

LoginForm.displayName = 'LoginForm'

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm