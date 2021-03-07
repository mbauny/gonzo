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
            const post = newPost('samples/posts/package-tidiness-prettier-simple.md')

            expect(post).toBeTruthy()

            expect(post?.title).toEqual("Cleaning your package's root: Prettier (The basic case)")

            expect(post?.date).toEqual(new Date('2020-05-01'))

            expect(post?.tags).toEqual(['JavaScript', 'NodeJS', 'Prettier', 'VSCode'])

            expect(post?.url).toEqual(
                'package-tidiness-prettier-simple.md#cleaning-your-packages-root-prettier-the-basic-case'
            )
        })
    })
})
