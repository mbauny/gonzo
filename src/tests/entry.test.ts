import { newPost } from 'post'
import { getDate, getEntry, getUrl } from 'output/entry'
import { Context } from 'output/context'

describe('entry', () => {
    const path = 'test/samples/posts/blocking-qobjects-signals.md'
    const post = newPost(path)

    describe('years', () => {
        const expectedUrl = 'blocking-qobjects-signals.md#blocking-qobjects-signals'
        const expectedDate = 'Nov 05'

        test('url', () => {
            expect(post).not.toEqual(undefined)

            if (post) {
                const url = getUrl(post, Context.Years)
                expect(url).toEqual(expectedUrl)
            }
        })

        test('date', () => {
            expect(post).not.toEqual(undefined)

            if (post) {
                const url = getDate(post.date, Context.Years)
                expect(url).toEqual(expectedDate)
            }
        })

        test('entry', () => {
            expect(post).not.toEqual(undefined)

            if (post) {
                const url = getEntry(post, Context.Years)
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
                const url = getUrl(post, Context.Tags)
                expect(url).toEqual(expectedUrl)
            }
        })

        test('date', () => {
            expect(post).not.toEqual(undefined)

            if (post) {
                const url = getDate(post.date, Context.Tags)
                expect(url).toEqual(expectedDate)
            }
        })

        test('entry', () => {
            expect(post).not.toEqual(undefined)

            if (post) {
                const url = getEntry(post, Context.Tags)
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
                const url = getUrl(post, Context.Latest)
                expect(url).toEqual(expectedUrl)
            }
        })

        test('date', () => {
            expect(post).not.toEqual(undefined)

            if (post) {
                const url = getDate(post.date, Context.Latest)
                expect(url).toEqual(expectedDate)
            }
        })

        test('entry', () => {
            expect(post).not.toEqual(undefined)

            if (post) {
                const url = getEntry(post, Context.Latest)
                const expected = `- [${expectedDate}] [Blocking QObjects signals](${expectedUrl})`
                expect(url).toEqual(expected)
            }
        })
    })
})
