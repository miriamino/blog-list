const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [{
  _id: '5f687a11198adedffe32d781',
  title: 'The polyvagal theory for PTSD',
  author: 'Theresa',
  url: 'https://www.dis-sos.com/polyvagal-theory/',
  likes: '5',
  user: '5f687829bac131db46b243a4',
  __v: '0',
}, {
  _id: '5f687b74728ddee3b69190e3',
  title: 'The Distant Observer (Mindfulness)',
  author: 'Theresa',
  url: 'https://www.dis-sos.com/distant-observer/',
  likes: '9',
  user: '5f687829bac131db46b243a4',
  __v: '0',
}, {
  _id: '5f687ba4728ddee3b69190e4',
  title: '20 Jahre Indymedia – Ein anderes Internet schien möglich',
  author: 'Anne Roth',
  url: 'https://annalist.noblogs.org/post/2019/11/26/20-jahre-indymedia-ein-anderes-internet-schien-moeglich/',
  likes: '7',
  user: '5f687829bac131db46b243a4',
  __v: '0',
}, {
  _id: '5f68af55bbc89218c64a181d',
  title: 'Was PoC, Schwarze Menschen und Weiße jetzt konkret tun können',
  author: 'Noah Sow',
  url: 'https://www.noahsow.de/blog/was-poc-schwarze-menschen-und-weisse-jetzt-konkret-tun-koennen/',
  likes: '10',
  user: '5f687829bac131db46b243a4',
  __v: '0',
}]

const initialUsers = [{
  _id: '5f687801bac131db46b243a3',
  username: 'root',
  name: 'Superuser',
  passwordHash: '$2b$10$wbKR3ciwZQR8SqMVWkN6lesemXIOjitDfczkU/wlc0ZgfCXvwnaxW',
  __v: '0',
}, {
  _id: '5f687829bac131db46b243a4',
  username: 'mino',
  name: 'Mino Mino',
  passwordHash: '$2b$10$Pj4ETNOoIquqtlfirHTYt.QlIcQ3to.kqIgFB6ckwp54uVe/2S69e',
  __v: '7',
  blogs: ['5f687a11198adedffe32d781',
    '5f687b74728ddee3b69190e3',
    '5f687ba4728ddee3b69190e4',
    '5f687ff24732f0ea0dc74a72',
    '5f68af55bbc89218c64a181d',
    '5f68ee6ed20d244a186eeab4',
    '5f68ef59d20d244a186eeab5',
  ],
}, {
  _id: '5f68a1c10123f70d4e1a043f',

  blogs: [],
  username: 'tino',
  name: 'Test',
  passwordHash: '$2b$10$DY5eMrXj6YwHrVnXkKwCneQk71jXW8C/6UH5WhjgAeaQkpFeuIcWW',
  __v: '0',
}]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'bla',
    author: 'someone',
    url: 'something',
    likes: 0,
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

module.exports = {
  initialBlogs,
  initialUsers,
  nonExistingId,
  blogsInDb,
  usersInDb,

}
