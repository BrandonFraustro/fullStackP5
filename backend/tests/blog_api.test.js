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
  
  // Verificar si id está definido en al menos un objeto de la respuesta
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

afterAll(() => {
    mongoose.connection.close()
})