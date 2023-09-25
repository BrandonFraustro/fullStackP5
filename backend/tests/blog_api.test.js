const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)

test('blogs are returned as json', async () => {
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
});
  
test('testing likes in data', async () => {
  const newBlog = {
    title: 'test 2',
    author: 'Elizabeth',
    url: 'elizabeth.com'
  }
  if(newBlog.likes === undefined) {
    newBlog.likes = 0
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
  expect(response.body.likes).toBe(0);
});

test('property title and url', async () => {
  const newBlog = {
    author: 'Elizabeth',
    likes: 0
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
  
  expect(response.body.error).toContain('content missing');
});


test('a blog can be deleted', async () => {
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

})

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
      name: 'Matti Luukkainen',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
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

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
    mongoose.connection.close()
})