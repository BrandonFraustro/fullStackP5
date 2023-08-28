const dummy = (blogs) => {
  return 1
}

const totalLikes = (lists) => {
  const result = (sum, list) => {
      return sum +  list.likes
  }

  return lists.reduce(result, 0)
}

const favoriteBlog = (lists) => {
  let mayor = 0
  for (let i = 0; i < lists.length; i++) {
    if(lists[i].likes > mayor) mayor = lists[i].likes
  }
  return mayor
}

const mostBlogs = (blogs) => {
  let mayor = 0
  let author = ''
  for (let i = 0; i < blogs.length; i++) {
    if(blogs[i].blogs > mayor) {
        mayor = blogs[i].blogs
        author = blogs[i].author
    }
  }

  return { author, blogs: mayor }
}

const mostlikes = (blogs) => {
    let mayor = 0
    let author = ''
    for (let i = 0; i < blogs.length; i++) {
      if(blogs[i].likes > mayor) {
          mayor = blogs[i].likes
          author = blogs[i].author
      }
    }
  
    return { author, likes: mayor }
  }

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostlikes
}