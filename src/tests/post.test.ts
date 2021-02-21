import { newPost } from '../post'

describe('post', () => {
    const spyConsoleError = jest.spyOn(console, 'error').mockImplementation()

    beforeEach(() => {
        spyConsoleError.mockClear()
    })

    afterAll(() => {
        spyConsoleError.mockRestore()
    })

    describe('construction', () => {
        test('empty path', () => {
            const post = newPost('')

            expect(post).toBeFalsy()
        })

        test('random path', () => {
            const post = newPost('samples/posts/this-file-does-not-exist.md')

            expect(post).toBeFalsy()
            expect(console.error).toHaveBeenCalledTimes(1)
            expect(console.error).toHaveBeenCalledWith(
                'Error: Cannot read file. Skipping "samples/posts/this-file-does-not-exist.md"'
            )
        })

        test('valid path', () => {
            const post = newPost('samples/posts/blocking-qobjects-signals.md')

            expect(post).toBeTruthy()
            expect(post?.title).toEqual('Blocking QObjects signals')

            const expectedDate = new Date('2019-11-05')
            expect(post?.date).toEqual(expectedDate)

            const expectedTags = ['C++', 'Qt']
            expect(post?.tags).toEqual(expectedTags)
        })
    })
})
