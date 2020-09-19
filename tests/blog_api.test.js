const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('id variable to be defined', async () => {
  const response = await api.get('/api/blogs')

  response.body.map((blog) => expect(blog.id).toBeDefined())
})

test('a valid blog can be added ', async () => {
  const newBlog = new Blog({
    title: '20 Jahre Indymedia – Ein anderes Internet schien moeglich',
    author: 'Anne Roth',
    url: 'https://annalist.noblogs.org/post/2019/11/26/20-jahre-indymedia-ein-anderes-internet-schien-moeglich',
    likes: 4,
  })

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
})

test('blog likes default to 0', async () => {
  const newBlog = new Blog({
    title: '20 Jahre Indymedia – Ein anderes Internet schien moeglich',
    author: 'Anne Roth',
    url: 'https://annalist.noblogs.org/post/2019/11/26/20-jahre-indymedia-ein-anderes-internet-schien-moeglich',
  })

  await api
    .post('/api/blogs')
    .send(newBlog)

  const blogs = await helper.blogsInDb()
  blogs.map((blog) => expect(blog.likes).toBeDefined())
  const listOfLikes = blogs.map((blog) => blog.likes)
  expect(listOfLikes).toContain(0)
})

test('blog added without url 400 response', async () => {
  const newBlog = new Blog({
    author: 'Anne Roth',
    likes: 4,
  })

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})
