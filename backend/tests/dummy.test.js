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

describe('favorite blog', () => {
  const list = [
    {
      title: 'Hello',
      author: 'Brandon',
      likes: 12
    }
  ]

  test('the liked blog', () => {
    const result = listHelper.favoriteBlog(list)
    expect(result).toEqual(12)
  })
})

describe('most blog', () => {
  const list = [
    {
      author: 'Brandon',
      blogs: 3
    }
  ]

  test('the most blog', () => {
    const result = listHelper.mostBlogs(list)
    expect(result).toEqual({ author: 'Brandon', blogs: 3 })
  })
})

describe('most likes', () => {
    const list = [
      {
        author: 'Brandon',
        likes: 17
      },
      {
        author: 'Alfredo',
        likes: 18
      }
    ]
  
    test('the most liked blog', () => {
      const result = listHelper.mostlikes(list)
      expect(result).toEqual({ author: 'Alfredo', likes: 18 })
    })
  })
