const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const Blog = require('../models/blogs')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects=helper.initialBlogs.
    map(blog => new Blog(blog))
  const promiseArray =blogObjects. map(blog => blog.save())
  await Promise.all(promiseArray)
})



describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)


  test('there are three blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  }, 100000)

  test('the unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    response.body.map(blog => expect(blog.id).toBeDefined())
  }, 100000)
})



describe('addition of a new blog',  () => {
  test('a valid blog can be added', async () => {
      const token=await helper.token()
      const newBlog = {
      title: 'School',
      author: 'Oliver Atom',
      url: '"https://olivieratom.fi',
      likes: 10,
    }


    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)


    const titles=blogsAtEnd.map(b => b.title)
    expect(titles).toContain('School')
  })



  
  test('blog without likes can be added', async () => {
    const newBlog = {
      title: 'School',
      author: 'Oliver Atom',
      url: '"https://olivieratom.fi',
    }

    const token=await helper.token()
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map(b => b.title)

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain('School')
  })

})




test('blog without title and url is not added', async () => {
    const newBlog = {
      author: 'Oliver Atom'
    }
    const token=await helper.token()

    if(  newBlog.title===undefined || newBlog.url===undefined){
      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(400)
    }

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

  })




describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {

    //Adding blog to have user set
    const newBlog = {
      title: 'School To delete',
      author: 'Oliver Atom',
      url: '"https://olivieratom.fi',
      likes: 10,
    }

    const token=await helper.token()
    

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(201)

    //Deleting this blog
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[2]


    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length-1)

    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})


describe('update of a blog', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const newBlog = {
      ...blogToUpdate,
      likes: 10
    }
    const token=await helper.token()

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length
    )
    expect(blogsAtEnd[0].likes).toBe(10)
  })
})


afterAll(() => {
  mongoose.connection.close()
})