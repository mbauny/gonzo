import { newDataBase } from '../../../database'
import { getYearsCatalog } from '../../../output/catalog'
import { readFileSync } from 'fs'
import { join } from 'path'

describe('catalog', () => {
    test('years', () => {
        const blogDir = './test/samples'
        const db = newDataBase(blogDir)

        expect(db).not.toEqual(undefined)

        if (db) {
            const readmePath = join(blogDir, 'posts/README.md')
            const utf8 = readFileSync(readmePath, 'utf-8')
            const catalog = getYearsCatalog(db)
            expect(catalog).not.toEqual(utf8)
        }
    })
})
