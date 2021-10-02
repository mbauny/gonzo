/* eslint-disable @typescript-eslint/no-non-null-assertion */
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
            const url = getUrl(post!, 'years')

            expect(url).toEqual(expectedUrl)
        })

        test('date', () => {
            const url = getDate(post!.date, 'years')

            expect(url).toEqual(expectedDate)
        })

        test('entry', () => {
            const url = getEntry(post!, 'years')
            const expected = `- [${expectedDate}] [Blocking QObjects signals](${expectedUrl})`

            expect(url).toEqual(expected)
        })
    })

    describe('tags', () => {
        const expectedUrl = '../posts/blocking-qobjects-signals.md#blocking-qobjects-signals'
        const expectedDate = 'Nov 05, 2019'

        test('url', () => {
            const url = getUrl(post!, 'tags')

            expect(url).toEqual(expectedUrl)
        })

        test('date', () => {
            const url = getDate(post!.date, 'tags')

            expect(url).toEqual(expectedDate)
        })

        test('entry', () => {
            const url = getEntry(post!, 'tags')
            const expected = `- [${expectedDate}] [Blocking QObjects signals](${expectedUrl})`

            expect(url).toEqual(expected)
        })
    })

    describe('main', () => {
        const expectedUrl = 'posts/blocking-qobjects-signals.md#blocking-qobjects-signals'
        const expectedDate = 'Nov 05, 2019'

        test('url', () => {
            const url = getUrl(post!, 'main')

            expect(url).toEqual(expectedUrl)
        })

        test('date', () => {
            const url = getDate(post!.date, 'main')

            expect(url).toEqual(expectedDate)
        })

        test('entry', () => {
            const url = getEntry(post!, 'main')
            const expected = `- [${expectedDate}] [Blocking QObjects signals](${expectedUrl})`

            expect(url).toEqual(expected)
        })
    })
})
