import { newPost } from '../../post'
import { Format, getDate, getEntry, getUrl } from '../../entry'

describe('post entry format', () => {
    const path = 'test/samples/posts/blocking-qobjects-signals.md'
    const expectedUrl = '../posts/blocking-qobjects-signals.md#blocking-qobjects-signals'
    const expectedDate = 'Nov 05'

    describe('years index', () => {
        test('url', () => {
            const post = newPost(path)
            expect(post).not.toEqual(undefined)
            if (post) {
                const url = getUrl(post, Format.YearIndex)
                expect(url).toEqual(expectedUrl)
            }
        })

        test('date', () => {
            const post = newPost(path)
            expect(post).not.toEqual(undefined)
            if (post) {
                const url = getDate(post.date, Format.YearIndex)
                expect(url).toEqual(expectedDate)
            }
        })

        test('entry', () => {
            const post = newPost(path)
            expect(post).not.toEqual(undefined)
            if (post) {
                const url = getEntry(post, Format.YearIndex)
                const expected = `- [${expectedDate}] [Blocking QObjects signals](${expectedUrl})`
                expect(url).toEqual(expected)
            }
        })
    })
})
