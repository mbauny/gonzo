import { newDataBase } from 'database'

describe('database', () => {
    describe('construction', () => {
        const spyConsoleError = jest.spyOn(console, 'error').mockImplementation()

        beforeEach(() => {
            spyConsoleError.mockClear()
        })

        afterAll(() => {
            spyConsoleError.mockRestore()
        })

        test('empty path', () => {
            const db = newDataBase('')

            expect(db).toBeFalsy()
            expect(console.error).toHaveBeenCalledTimes(1)
            expect(console.error).toHaveBeenCalledWith(
                'Error: Cannot find "posts" dir. Aborting parsing of ""'
            )
        })

        test('valid path', () => {
            const path = 'samples'
            const db = newDataBase(path)

            expect(db).not.toEqual(undefined)
            expect(db?.postsByYear.size).not.toEqual(0)
            expect(db?.postsByTag.size).not.toEqual(0)
        })
    })
})
