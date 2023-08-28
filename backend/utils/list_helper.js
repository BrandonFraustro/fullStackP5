const dummy = (blogs) => {
  return 1
}

const totalLikes = (lists) => {
    const result = (sum, list) => {
        return sum +  list.likes
    }

    return lists.reduce(result, 0)
}

module.exports = {
  dummy,
  totalLikes
}