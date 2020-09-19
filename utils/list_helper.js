const _ = require('lodash')
const blog = require('../models/blog')

const dummy = () => 1

const totalLikes = (blogs) => {
  const reducer = (sum, item) => sum + item
  return blogs.map((b) => b.likes).reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const maxLikes = Math.max(...(blogs.map((b) => b.likes)))
  const favBlog = blogs.find(({ likes }) => likes === maxLikes)
  return blogs.length === 0
    ? 'no blog'
    : {
      title: favBlog.title,
      author: favBlog.author,
      likes: favBlog.likes,
    }
}

const mostBlogs = (blogs) => {
  const authors = _.countBy(blogs.map((b) => b.author))
  const maxValue = Math.max(...Object.values(authors))
  const maxAuthor = Object.keys(authors).find((key) => authors[key] === maxValue)
  return blogs.length === 0
    ? 'no blog'
    : {
      author: maxAuthor,
      blogs: maxValue,
    }
}

const mostLikes = (blogs) => {
  const groupBy = _(blogs)
    .groupBy('author')
    .map((objs, key) => ({
      author: key,
      likes: _.sumBy(objs, 'likes'),
    }))
    .value()
  const maxLikes = _.maxBy(groupBy, 'likes')
  return blogs.length === 0
    ? 'no blog'
    : maxLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
