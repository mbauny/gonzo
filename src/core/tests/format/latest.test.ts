import { newPost } from '../../post'
import { Format, getFormattedDate, getFormattedEntry, getFormattedUrl } from '../../writer'

describe('post entry format', () => {
    const path = 'test/samples/posts/blocking-qobjects-signals.md'
    const expectedUrl = 'posts/blocking-qobjects-signals.md#blocking-qobjects-signals'
    const expectedDate = 'Nov 05, 2019'

    describe('latest index', () => {
        test('url', () => {
            const post = newPost(path)
            expect(post).not.toEqual(undefined)
            if (post) {
                const url = getFormattedUrl(post, Format.LatestIndex)
                expect(url).toEqual(expectedUrl)
            }
        })

        test('date', () => {
            const post = newPost(path)
            expect(post).not.toEqual(undefined)
            if (post) {
                const url = getFormattedDate(post.date, Format.LatestIndex)
                expect(url).toEqual(expectedDate)
            }
        })

        test('entry', () => {
            const post = newPost(path)
            expect(post).not.toEqual(undefined)
            if (post) {
                const url = getFormattedEntry(post, Format.LatestIndex)
                const expected = `- [${expectedDate}] [Blocking QObjects signals](${expectedUrl})`
                expect(url).toEqual(expected)
            }
        })
    })
})
