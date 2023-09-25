const Blog = require('../models/blog')
const User = require('../models/user')

/* const initialBlogs = [
  {
    title: 'test 1',
    author: 'Fatima',
    url: 'fatima.com',
    likes: 15
  },
  {
    title: 'test 2',
    author: 'Elizabeth',
    url: 'elizabeth.com'
  },
  {
    author: 'Elizabeth',
    likes: 0
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon'})
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
} */

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
    /* initialBlogs, 
    nonExistingId, 
    blogsInDb,  */
    usersInDb
}