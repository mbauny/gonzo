import { newDataBase } from 'database'
import { getLanding } from 'output/write'
import { readFileSync } from 'fs'
import { join } from 'path'

describe('catalog', () => {
    test('landing', () => {
        const blogDir = 'test/samples'
        const db = newDataBase(blogDir)

        expect(db).not.toEqual(undefined)

        if (db) {
            const readmePath = join(blogDir, 'README.md')
            const utf8 = readFileSync(readmePath, 'utf-8')
            const catalog = getLanding(db)
            expect(catalog).not.toEqual(utf8)
        }
    })
})
