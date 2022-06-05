const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
                .find({})
                .populate('user', {username : 1, name : 1})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {
 
    const blog = await Blog.findById(request.params.id)
    
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
 

  /*
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
    */
})

blogsRouter.post('/', middleware.userExtractor,  async (request, response, next) => {
  const body = request.body

  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  
  const savedBlog = await blog.save()
 
 
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()
  response.status(201).json(savedBlog)
  /*
  blog.save()
    .then(savedBlog => {
      response.json(savedBlog)
    })
    .catch(error => next(error))
    */
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {

  const blog = await Blog.findById(request.params.id)
  const user = request.user
 
  
  if(user.id.toString() === blog.user.toString()){
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }else{
    response.status(404).json({ error: 'user not authorized' })
  }

  /** before async/await
   * Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
   */
  
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = request.body

  if(!request.token) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const updatedBlog = await Blog
    .findByIdAndUpdate(
      request.params.id,
      blog,
      { new: true, runValidators: true, context: 'query' }
    )

  response.status(200).json(updatedBlog)
  

})

module.exports = blogsRouter