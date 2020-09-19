const {
  totalLikes, favoriteBlog, mostBlogs, mostLikes,
} = require('../utils/list_helper')
const listHelper = require('../utils/list_helper')

const noBlogs = []

const oneBlog = [{
  _id: '5a422aa71b54a676234d17f8',
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  likes: 5,
  __v: 0,
}]
const manyBlogs = [{
  _id: '5a422a851b54a676234d17f7',
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
  likes: 7,
  __v: 0,
}, {
  _id: '5a422aa71b54a676234d17f8',
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  likes: 5,
  __v: 0,
}, {
  _id: '5a422b3a1b54a676234d17f9',
  title: 'Canonical string reduction',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
  likes: 12,
  __v: 0,
}, {
  _id: '5a422b891b54a676234d17fa',
  title: 'First class tests',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
  likes: 10,
  __v: 0,
}, {
  _id: '5a422ba71b54a676234d17fb',
  title: 'TDD harms architecture',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
  likes: 0,
  __v: 0,
}, {
  _id: '5a422bc61b54a676234d17fc',
  title: 'Type wars',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
  likes: 2,
  __v: 0,
}]

const twoTopBlogs = [{
  _id: '5a422b891b54a676234d17fa',
  title: 'First class tests',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
  likes: 10,
  __v: 0,
}, {
  _id: '5a422ba71b54a676234d17fb',
  title: 'TDD harms architecture',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
  likes: 0,
  __v: 0,
}, {
  _id: '5a422bc61b54a676234d17fc',
  title: 'Type wars',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
  likes: 10,
  __v: 0,
}]

test('dummy returns one', () => {
  const result = listHelper.dummy(noBlogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(totalLikes(noBlogs)).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    expect(totalLikes(oneBlog)).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    expect(totalLikes(manyBlogs)).toBe(36)
  })
})

describe('favorite blog', () => {
  test('of empty list returns no blog', () => {
    expect(favoriteBlog(noBlogs)).toEqual('no blog')
  })

  test('when list has only one blog it returns that blog', () => {
    expect(favoriteBlog(oneBlog)).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    })
  })

  test('of a bigger list returns right entry', () => {
    expect(favoriteBlog(manyBlogs)).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    })
  })

  test('returns only one blog if there is more than one top blog', () => {
    expect(favoriteBlog(twoTopBlogs)).toEqual({
      title: 'First class tests',
      author: 'Robert C. Martin',
      likes: 10,
    })
  })
})

describe('author with most blogs in the list', () => {
  test('what happens when there are no blogs', () => {
    expect(mostBlogs(noBlogs)).toEqual('no blog')
  })
  test('what happens when there is one blog', () => {
    expect(mostBlogs(oneBlog)).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    })
  })
  test('does it return the author with most blogs?', () => {
    expect(mostBlogs(manyBlogs)).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    })
  })
})

describe('author with most likes', () => {
  test('what happens when there are no blogs', () => {
    expect(mostLikes(noBlogs)).toEqual('no blog')
  })
  test('what happens when there is one blog', () => {
    expect(mostLikes(oneBlog)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5,
    })
  })
  test('most likes', () => {
    expect(mostLikes(manyBlogs)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    })
  })
})
