const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map((blog) => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const { body } = request

  const blog = new Blog({
    ...body,
    likes: body.likes || 0,
  })
  if (body.title && body.url) {
    const newBlog = await blog.save()
    response.status(201).json(newBlog)
  } else {
    response.status(400).end()
  }
})

module.exports = blogsRouter
