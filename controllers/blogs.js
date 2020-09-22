const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map((blog) => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const { body } = request
  const { token } = request

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token) {
    return response.status(401).json({ error: 'Unauthorized' })
  }
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'invalid token' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    ...body,
    likes: body.likes || 0,
    user: user._id,
  })
  const newBlog = await blog.save()
  user.blogs = user.blogs.concat(newBlog._id)
  await user.save()
  response.status(201).json(newBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const { token } = request

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(request.params.id)
  if (user.id.toString() === blog.user.toString()) {
    await Blog.findByIdAndRemove(blog.id)
    response.status(204).end()
  }
  return response.status(401).json({ error: 'user not authorised to remove this entry' })
})

blogsRouter.put('/:id', async (request, response) => {
  const { body } = request
  const blog = {
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
  })
  response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter
