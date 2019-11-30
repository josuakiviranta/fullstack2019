const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('totalLikes', () => {

    test('of empty list is zero', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes([listHelper.initialBlogs[0]])
        expect(result).toBe(5)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(listHelper.initialBlogs)
        expect(result).toBe(132)
    })
})

describe('favouriteBlog', () => {

    test('of empty list is {}', () => {
        expect(listHelper.favoriteBlog([])).toEqual({})
    })

    test('when list has only one blog equal object of that', () => {
        const result = listHelper.favoriteBlog([listHelper.initialBlogs[0]])
        expect(result).toEqual(
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0
            }
        )
    })

    test('of a bigger list gives a right blog', () => {
        const result = listHelper.favoriteBlog(listHelper.initialBlogs)
        expect(result).toEqual(
            {
                _id: '5a422aa71b54a676234d12f8',
                title: "Testi blogi",
                author: "Josuaki",
                url: "josuaki.blogi.fi",
                likes: 43,
                __v: 0
            }
        )
    })
})

describe('Most blogs by author', () => {

    test('of empty list is {}', () => {
        expect(listHelper.mostBlogs([])).toEqual({})
    })

    test('when list of one then equal to only objec in there', () => {
        const result = listHelper.mostBlogs([listHelper.initialBlogs[0]])
        expect(result).toEqual(
            { author: 'Edsger W. Dijkstra', blogs: 1 }
        )
    })

    test('of a bigger list gives a right result', () => {
        const result = listHelper.mostBlogs(listHelper.initialBlogs)
        expect(result).toEqual(
            { author: 'Josua', blogs: 2 }
        )
    })
})

describe('Most likes by author', () => {

    test('of empty list is {}', () => {
        expect(listHelper.mostLikes([])).toEqual({})
    })

    test('when list of one then equal to only object in there', () => {
        const result = listHelper.mostLikes([listHelper.initialBlogs[0]])
        expect(result).toEqual(
            { author: 'Edsger W. Dijkstra', likes: 5 }
        )
    })

    test('of a bigger list gives a right result', () => {
        const result = listHelper.mostLikes(listHelper.initialBlogs)
        expect(result).toEqual(
            { author: 'Josua', likes: 84 }
        )
    })
})