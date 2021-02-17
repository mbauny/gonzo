import { newPost } from '../post'
import { getDate, getEntry, getUrl } from '../output/entry'
import { Format } from '../output/format'

describe('entry', () => {
    const path = 'test/samples/posts/blocking-qobjects-signals.md'
    const post = newPost(path)

    describe('years', () => {
        const expectedUrl = 'blocking-qobjects-signals.md#blocking-qobjects-signals'
        const expectedDate = 'Nov 05'

        test('url', () => {
            expect(post).not.toEqual(undefined)

            if (post) {
                const url = getUrl(post, Format.YearIndex)
                expect(url).toEqual(expectedUrl)
            }
        })

        test('date', () => {
            expect(post).not.toEqual(undefined)

            if (post) {
                const url = getDate(post.date, Format.YearIndex)
                expect(url).toEqual(expectedDate)
            }
        })

        test('entry', () => {
            expect(post).not.toEqual(undefined)

            if (post) {
                const url = getEntry(post, Format.YearIndex)
                const expected = `- [${expectedDate}] [Blocking QObjects signals](${expectedUrl})`
                expect(url).toEqual(expected)
            }
        })
    })

    describe('tags', () => {
        const expectedUrl = '../posts/blocking-qobjects-signals.md#blocking-qobjects-signals'
        const expectedDate = 'Nov 05, 2019'
        test('url', () => {
            expect(post).not.toEqual(undefined)

            if (post) {
                const url = getUrl(post, Format.TagIndex)
                expect(url).toEqual(expectedUrl)
            }
        })

        test('date', () => {
            expect(post).not.toEqual(undefined)

            if (post) {
                const url = getDate(post.date, Format.TagIndex)
                expect(url).toEqual(expectedDate)
            }
        })

        test('entry', () => {
            expect(post).not.toEqual(undefined)

            if (post) {
                const url = getEntry(post, Format.TagIndex)
                const expected = `- [${expectedDate}] [Blocking QObjects signals](${expectedUrl})`
                expect(url).toEqual(expected)
            }
        })
    })

    describe('latest', () => {
        const expectedUrl = 'posts/blocking-qobjects-signals.md#blocking-qobjects-signals'
        const expectedDate = 'Nov 05, 2019'

        test('url', () => {
            expect(post).not.toEqual(undefined)

            if (post) {
                const url = getUrl(post, Format.LatestIndex)
                expect(url).toEqual(expectedUrl)
            }
        })

        test('date', () => {
            expect(post).not.toEqual(undefined)

            if (post) {
                const url = getDate(post.date, Format.LatestIndex)
                expect(url).toEqual(expectedDate)
            }
        })

        test('entry', () => {
            expect(post).not.toEqual(undefined)

            if (post) {
                const url = getEntry(post, Format.LatestIndex)
                const expected = `- [${expectedDate}] [Blocking QObjects signals](${expectedUrl})`
                expect(url).toEqual(expected)
            }
        })
    })
})
