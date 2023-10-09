const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)

/* test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)
})


test('id is defined', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined();
});

test('insert a new blog', async () => {
  const newBlog = {
    title: 'test 1',
    author: 'Fatima',
    url: 'fatima.com',
    likes: 15
  }
  try {
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const size = response.body.length

    console.log('length', size)
    console.log('data', response.body);
    
    expect(response.body).toHaveLength(size);
  } catch(error) {
    console.log(error)
  }
}); */

/* test('testing likes in data', async () => {
  const newBlog = {
    title: 'test 2',
    author: 'Elizabeth',
    url: 'elizabeth.com'
  }
  if(newBlog.likes === undefined) {
    newBlog.likes = 0
  }

  try{
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    expect(response.body.likes).toBe(0);
  } catch(error){
    console.log(error)
  }
}); */

/* test('property title and url', async () => {
  const newBlog = {
    author: 'Elizabeth',
    likes: 0
  }
  try {
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    expect(response.body.error).toContain('content missing');
  } catch(error){
    console.log(error)
  }
}); */

/* test('a blog can be deleted', async () => {
  const initialResponse = await api.get('/api/blogs')
  const blogToDelete = initialResponse.body[3]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const afterResponse = await api.get('/api/blogs')
  const afterDeleteBlogs = afterResponse.body

  const afterBlogTitle = afterDeleteBlogs.map(r => r.title)
  expect(afterBlogTitle).not.toContain(blogToDelete.title)
})

test('a blog can be updated', async () => {
  const response = await api.get('/api/blogs')
  const blogToUpdate = response.body[3].id
  console.log(blogToUpdate)

  const newLikes = 5

  const responseUpdate = await api
    .put(`/api/blogs/${blogToUpdate}`)
    .send({ likes: newLikes })

  console.log(responseUpdate.body)
  expect(responseUpdate.body.likes).toBe(newLikes)

}) */

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkanen',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen'
    }

    console.log('New User:', newUser)

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(500)
      .expect('Content-Type', /application\/json/)

    //console.log('Result: ', result.text)

    expect(result.text).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation blogs fails if token is not added', async () => {
    const newBlog = {
      title: 'test 6',
      author: 'Token',
      url: 'token.com',
      likes: 15
    }

    const result = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    console.log(result)
  })
})

afterAll(() => {
    mongoose.connection.close()
})