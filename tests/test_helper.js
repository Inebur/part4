const Blog = require('../models/blogs')

const initialBlogs = [
    {
        title: "School",
        author: "Oliver Atom",
        url: "https://olivieratom.fi",
        likes: 20
    },
    {
        title: "Working",
        author: "Lucas Aldi",
        url: "https://lucasaldi.fi",
        likes: 27
    }
  ]

const nonExistingId = async () => {
  const blog = new Blog({ title: "Unit tests",
  author: "Ludivine Alta",
  url: "https://ludivinealta.fi",
  likes: 37 })

  await blog.save()
  await blog.remove()

  return blog.id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }

  module.exports = {
    initialBlogs, nonExistingId, blogsInDb
  }