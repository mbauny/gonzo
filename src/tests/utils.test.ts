import { isPost } from 'post'
import { compareDates } from '../utils/compareDates'

describe('utils', () => {
    describe('isPostFile', () => {
        test('empty path', () => {
            expect(isPost('')).toEqual(false)
        })

        test('non-post path', () => {
            const path = 'samples/posts/README.md'
            expect(isPost(path)).toEqual(false)
        })

        test('post path', () => {
            const path = 'samples/posts/blocking-qobjects-signals.md'
            expect(isPost(path)).toEqual(true)
        })
    })

    describe('compareDates', () => {
        const date1 = new Date('2019-11-05')
        const date2 = new Date('2020-01-22')

        test('d1 < d2', () => {
            const compared = compareDates(date1, date2)
            expect(compared).toEqual(-1)
        })

        test('d1 == d2', () => {
            const compared = compareDates(date1, date1)
            expect(compared).toEqual(0)
        })

        test('d1 > d2', () => {
            const compared = compareDates(date2, date1)
            expect(compared).toEqual(1)
        })
    })
})
