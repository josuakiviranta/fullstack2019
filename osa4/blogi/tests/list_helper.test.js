const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('totalLikes', () => {
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

    const listWithThreeBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
          },
          {
              _id: '5a422aa71b54a676234d17f9',
              title: "Testi blogi",
              author: "Josua",
              url: "josu.blogi.fi",
              likes: 42,
              __v: 0
            },
            {
              _id: '5a422aa71b54a676234d12f8',
              title: "Testi blogi",
              author: "Josuaki",
              url: "josuaki.blogi.fi",
              likes: 42,
              __v: 0
            }
    ]
    
      test('of empty list is zero (1ms)', () => {
          expect(listHelper.totalLikes([])).toBe(0)
      })

      test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
      })

      test('of a bigger list is calculated right', () => {
          const result = listHelper.totalLikes(listWithThreeBlogs)
          expect(result).toBe(89)
      })


})