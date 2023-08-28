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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}