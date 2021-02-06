import { newPost } from '../post'

describe('post', () => {
    describe('construction', () => {
        test('empty path', () => {
            const post = newPost('')

            expect(post).toEqual(undefined)
        })

        test('valid path', () => {
            const post = newPost('test/samples/posts/blocking-qobjects-signals.md')

            expect(post).not.toEqual(undefined)
            expect(post?.title).toEqual('Blocking QObjects signals')
        })
    })
})
