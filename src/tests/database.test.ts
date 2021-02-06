import { DataBase } from '../database'

describe('database', () => {
    describe('construction', () => {
        test('empty path', () => {
            const db = DataBase.create('')

            expect(db).not.toEqual(undefined)
            expect(db?.postsByYear.size).toEqual(0)
            expect(db?.postsByTag.size).toEqual(0)
        })

        test('valid path', () => {
            const path = '/Users/mbauny/sources/gonzo/test/samples'
            const db = DataBase.create(path)

            expect(db).not.toEqual(undefined)
            expect(db?.postsByYear.size).not.toEqual(0)
            expect(db?.postsByTag.size).not.toEqual(0)
        })
    })
})
