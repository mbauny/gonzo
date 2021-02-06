import { newPost } from '../../post'
import { Format, getFormattedDate, getFormattedUrl } from '../../writer'

describe('post entry format', () => {
    const path = 'test/samples/posts/blocking-qobjects-signals.md'

    describe('tags index', () => {
        test('url', () => {
            const post = newPost(path)
            expect(post).not.toEqual(undefined)
            if (post) {
                const url = getFormattedUrl(post, Format.TagIndex)
                const expected = '../posts/blocking-qobjects-signals.md#blocking-qobjects-signals'
                expect(url).toEqual(expected)
            }
        })

        test('date', () => {
            const post = newPost(path)
            expect(post).not.toEqual(undefined)
            if (post) {
                const url = getFormattedDate(post.date, Format.TagIndex)
                const expected = 'Nov 05, 2019'
                expect(url).toEqual(expected)
            }
        })
    })
})
