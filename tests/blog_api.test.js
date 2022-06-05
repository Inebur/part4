const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blogs')

const initialBlogs = [
    {
        title: "Magic",
        author: "Zara Lucas",
        url: "https://newswheather.fi",
        likes: 20
    },
    {
        title: "Planet",
        author: "Nicolas Teslath",
        url: "https://nico.bj",
        likes: 14
    },
  ]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
    })
/*
test('all blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)
*/  
test('all blogs are returned as json', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
})

test('the unique identifier property of blogs posts is named id', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body[0]
    expect(blogs.id).toBeDefined()
})
  

test("new blog has been added successfully (size increased and database's content has been updated)", async () => {
    const newBlog = {
        title: "Ships",
        author: "Jack Oneil",
        url: "https://nicollll.bj",
        likes: 19
    }
    
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)


    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length + 1)

    const titles = response.body.map(r => r.title)
    expect(titles).toContain(
        'Ships'
        )
    const authors = response.body.map(r => r.author)
    expect(authors).toContain(
        'Jack Oneil'
        )
    const urls = response.body.map(r => r.url)
    expect(urls).toContain(
        'https://nicollll.bj'
        )
    const likes_a = response.body.map(r => r.likes)
    expect(likes_a).toContain(
        19
        )
}, 100000)

test("likes value is missing and put 0 by default", async() => {
    const newBlog = {
        title: "Travels",
        author: "Samantha Carter",
        url: "https://nico.bj"
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        
})

test("blog with title and url properties missing are not added", async() => {
    const newBlog = {
        
        author: "Tilk",
        likes: 34
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        
})

test("delete a blog", async() => {
    const response = await api.get('/api/blogs')
    const blogToDelete = response.body[0]

    await api
        .delete('/api/blogs/' +blogToDelete.id)
        .expect(204)
        
})

test("delete a blog", async() => {
    const response = await api.get('/api/blogs')
    const blogToDelete = response.body[0]

    await api
        .delete('/api/blogs/' +blogToDelete.id)
        .expect(204)
        
})

test("update a blog likes", async() => {
    const response = await api.get('/api/blogs')
    const blogToUpdate = response.body[0]
    const lastBlogLikes = blogToUpdate.likes


    await api
        .put('/api/blogs/' +blogToUpdate.id)
        .send({...blogToUpdate, likes: 5})
        .expect('Content-Type', /application\/json/)

    const finalResponse = await api.get("/api/blogs/" + blogToUpdate.id)
    
    //const finalBlog = finalResponse.map(rep => rep.id === blogToUpdate.id)
    expect(finalResponse.body.likes).toEqual(5)
        
})

afterAll(() => {
    mongoose.connection.close()
})