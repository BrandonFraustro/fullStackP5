const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { content: 1, date: 1 })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body
  if(!body.username || !body.name || !body.password) {
    return response.status(401).json({ error: 'username, name or password can not be empty' })
  }

  const saltRounds = 10
  try {
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
  
    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })
  
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (error) {
    response.status(500).json(error.message)
  }
})

module.exports = usersRouter