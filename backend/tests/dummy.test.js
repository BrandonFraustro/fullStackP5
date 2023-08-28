const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []  

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithBlogs = [
    {
      _id: '5afhdhgetdghst',
      title: 'Go To Statement',
      author: 'Edsger W.',
      url: 'www.edsgerw.com',
      likes: 5,
      __v: 0
    },
    {
      _id: '5afhdhgetdghst',
      title: 'Go To Statement',
      author: 'Edsger W.',
      url: 'www.edsgerw.com',
      likes: 5,
      __v: 0
    },
  ]

  test('when list has onle one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithBlogs)
    expect(result).toBe(10)
  })
})