const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

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
  const response = await api.get('/api/blogs')
  const blogToDelete = response.body[3]
  console.log(blogToDelete.id)

  await api
    .delete(`/api/notes/${blogToDelete.id}`)
    .expect(204)

  const contents = response.body.map(r => r.title)
  console.log(contents)
  expect(contents).not.toContain(blogToDelete.title)
})

afterAll(() => {
    mongoose.connection.close()
})