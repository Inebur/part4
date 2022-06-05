const Blog = require('../models/blogs')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
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

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}
const newUser = {
  username: 'root',
  password: 'sekret'
}
const token = async () => {
  const result = await api
    .post('/api/login')
    .send(newUser)
    .expect(200)

  return result.body.token
}
module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
  token }