import { newPost } from '../post'

describe('post', () => {
    describe('construction', () => {
        test('empty path', () => {
            const post = newPost('')

            expect(post).toEqual(undefined)
        })

        test('valid path', () => {
            const post = newPost('samples/posts/blocking-qobjects-signals.md')

            expect(post).not.toEqual(undefined)
            expect(post?.title).toEqual('Blocking QObjects signals')

            const expectedDate = new Date('2019-11-05')
            expect(post?.date).toEqual(expectedDate)

            const expectedTags = ['C++', 'Qt']
            expect(post?.tags).toEqual(expectedTags)
        })
    })
})
