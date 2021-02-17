import { newDataBase } from 'database'

describe('database', () => {
    describe('construction', () => {
        test('empty path', () => {
            const db = newDataBase('')

            expect(db).toEqual(undefined)
        })

        test('valid path', () => {
            const path = 'test/samples'
            const db = newDataBase(path)

            expect(db).not.toEqual(undefined)
            expect(db?.postsByYear.size).not.toEqual(0)
            expect(db?.postsByTag.size).not.toEqual(0)
        })
    })
})
