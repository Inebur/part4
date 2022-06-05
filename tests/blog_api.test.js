const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blogs')

/*
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
*/
/*
beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
    })
*/



beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })
/*
describe('when there is initially some notes saved', () => {

    test('all blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        })
    
    test('all blogs are returned', async () => {
            const response = await api.get('/api/blogs')
            
            expect(response.body).toHaveLength(helper.initialBlogs.length)
        })

    test('a specific blog is within the returned blogs', async () => {
            const response = await api.get('/api/blogs')

            const titles = response.body.map(r => r.title)

            expect(titles).toContain(
                'School'
            )
        })

})

describe('viewing a specific blog', () => {
    test('succeeds with a valid id', async () => {
        const blogsAtStart = await helper.blogsInDb()
      
        const blogToView = blogsAtStart[0]
      
        const resultBlog = await api
          .get(`/api/blogs/${blogToView.id}`)
          .expect(200)
          .expect('Content-Type', /application\/json/)
      
        const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
      
        expect(resultBlog.body).toEqual(processedBlogToView)
      })

    test('blog without title is not added', async () => {
    const newBlog = {
        author: "Sophia",
        url: "https://nicodiagsophia.bj",
        likes: 22
    }

        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test('a valid blog can be added', async () => {
        const newBlog = {
            title: "Peace",
            author: "Cameron Diaz",
            url: "https://nicodiag.bj",
            likes: 22
        }
        
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
            
        const response = await api.get('/api/blogs')
        
        const titles = response.body.map(r => r.title)
        
        expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
        expect(titles).toContain(
            'Peace'
        )
        })

    test('a valid blog can be added ', async () => {
    const newBlog = {
        title: "Magic",
        author: "Zara Lucas",
        url: "https://newswheather.fi",
        likes: 20
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain(
      'Magic'
    )
    })

    test('a blog can be deleted', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]
      
        await api
          .delete('/api/blogs/' + blogToDelete.id)
          .expect(204)
      
        const blogsAtEnd = await helper.blogsInDb()
      
        expect(blogsAtEnd).toHaveLength(
          helper.initialBlogs.length - 1
        )
      
        const titles = blogsAtEnd.map(r => r.title)
      
        expect(titles).not.toContain(blogToDelete.title)
      })
    
})
test('all blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)
// -------------------------------------------------------------------------------------

*/  
test('all blogs are returned as json', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
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
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)

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
})

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