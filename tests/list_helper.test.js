const listHelper = require('../utils/list_helper')


test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]

    const listWithZeroBlog = []

    const listWithSeveralBlog = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        }, 
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 15,
            __v: 0
        }, 
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 10,
            __v: 0
        }
      ]

    test('of empty list is zero', () => {
        const result = listHelper.totalLikes(listWithZeroBlog)
        expect(result).toBe(0)
    })
  
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(listWithSeveralBlog)
        expect(result).toBe(10+15+5)
    })

  })

  describe('favorite blog', () => {
    const listWithOneBlog = [
      {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        likes: 5
      }
    ]

    const listWithZeroBlog = []

    const listWithSeveralBlog = [
        {
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          likes: 5
        }, 
        {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 15
        }, 
        {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 10
        }
      ]

    test('of empty list does not exist', () => {
        const result = listHelper.favoriteBlog(listWithZeroBlog)
        expect(result).toEqual({})
    })
  
    test('when list has only one blog, equals to itself', () => {
      const result = listHelper.favoriteBlog(listWithOneBlog)
      expect(result).toEqual({
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        likes: 5
      })
    })

    test('of a bigger list is find out right', () => {
        const result = listHelper.favoriteBlog(listWithSeveralBlog)
        expect(result).toEqual({
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          likes: 15
      })
    })

  })