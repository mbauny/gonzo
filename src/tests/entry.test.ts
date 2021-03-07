/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Context } from 'markdown/context'
import { getDate, getEntry, getUrl } from 'markdown/entry'
import { newPost } from 'post'

describe('entry', () => {
    const path = 'samples/posts/blocking-qobjects-signals.md'
    const post = newPost(path)

    expect(post).toBeTruthy()

    describe('years', () => {
        const expectedUrl = 'blocking-qobjects-signals.md#blocking-qobjects-signals'
        const expectedDate = 'Nov 05'

        test('url', () => {
            const url = getUrl(post!, Context.Years)

            expect(url).toEqual(expectedUrl)
        })

        test('date', () => {
            const url = getDate(post!.date, Context.Years)

            expect(url).toEqual(expectedDate)
        })

        test('entry', () => {
            const url = getEntry(post!, Context.Years)
            const expected = `- [${expectedDate}] [Blocking QObjects signals](${expectedUrl})`

            expect(url).toEqual(expected)
        })
    })

    describe('tags', () => {
        const expectedUrl = '../posts/blocking-qobjects-signals.md#blocking-qobjects-signals'
        const expectedDate = 'Nov 05, 2019'

        test('url', () => {
            const url = getUrl(post!, Context.Tags)

            expect(url).toEqual(expectedUrl)
        })

        test('date', () => {
            const url = getDate(post!.date, Context.Tags)

            expect(url).toEqual(expectedDate)
        })

        test('entry', () => {
            const url = getEntry(post!, Context.Tags)
            const expected = `- [${expectedDate}] [Blocking QObjects signals](${expectedUrl})`

            expect(url).toEqual(expected)
        })
    })

    describe('latest', () => {
        const expectedUrl = 'posts/blocking-qobjects-signals.md#blocking-qobjects-signals'
        const expectedDate = 'Nov 05, 2019'

        test('url', () => {
            const url = getUrl(post!, Context.Latest)

            expect(url).toEqual(expectedUrl)
        })

        test('date', () => {
            const url = getDate(post!.date, Context.Latest)

            expect(url).toEqual(expectedDate)
        })

        test('entry', () => {
            const url = getEntry(post!, Context.Latest)
            const expected = `- [${expectedDate}] [Blocking QObjects signals](${expectedUrl})`

            expect(url).toEqual(expected)
        })
    })
})
