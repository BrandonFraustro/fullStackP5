require('dotenv').config()
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB', error.message);
  })

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 4,
    required: true,
  },
  author: {
    type: String,
    minlength: 5,
    required: true,
  },
  url: {
    type: String,
    minlength: 5,
    required: true,
  },
  likes: {
    type: Number,
    minlength: 1,
    required: true
  }
})

const Blog = mongoose.model('Blog', blogSchema)

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
    .catch((error) => {
      console.log(error.message)
      response.status(500).send("Internal Server Error");
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
        response.status(201).json(result)
    })
    .catch((error) => console.log(error.message))
})

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})