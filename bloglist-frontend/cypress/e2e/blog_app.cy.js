describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'brandon',
      name: 'Brandon',
      password: 'brandon'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://127.0.0.1:5173/')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('brandon')
      cy.get('#password').type('brandon')
      cy.get('#login_button').click()

      cy.contains('Welcome brandon!')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('brandon')
      cy.get('#password').type('alfredo')
      cy.get('#login_button').click()

      cy.contains('Wrong username or password')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('brandon')
      cy.get('#password').type('brandon')
      cy.get('#login_button').click()
    })

    it('A blog can be created', function() {
      cy.get('#createBlog_button').click()

      cy.get('#title').type('Creating blog by cypress')
      cy.get('#author').type('Brandon')
      cy.get('#url').type('www.cypres.com')

      cy.get('#createBlogForm_button').click()

      cy.contains('Creating blog by cypress')
    })
  })
})