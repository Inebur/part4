const dummy = (blogs) => {
   return 1
  }

const totalLikes = (blogs) =>{
    if(blogs.length === 0)
        return 0
    else if(blogs.length === 1)
        return Number(blogs[0].likes)
    else{
        const reducer = (sum, item) => {
            return sum + Number(item.likes)
          }

        return blogs.reduce(reducer, 0)
    }
}

const favoriteBlog = (blogs) => {
    if(blogs.length === 0)
        return {}
    else if(blogs.length === 1)
        return {title: blogs[0].title, author: blogs[0].author, likes: blogs[0].likes}
    else {
        var temp = blogs[0].likes
        blogs.map(blog => {
            blog.likes > temp ? temp = blog.likes : temp = temp
        })

        const max = blogs.find(blog => blog.likes = temp)

        return max
    }
}
  
  module.exports = {
    dummy, 
    totalLikes, 
    favoriteBlog
  }