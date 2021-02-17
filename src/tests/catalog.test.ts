import { newDataBase } from '../database'
import { getTagsCatalog, getYearsCatalog } from '../output/catalog'
import { readFileSync } from 'fs'
import { join } from 'path'

describe('catalog', () => {
    const blogDir = 'test/samples'
    const db = newDataBase(blogDir)

    test('years', () => {
        expect(db).not.toEqual(undefined)

        if (db) {
            const readmePath = join(blogDir, 'posts/README.md')
            const utf8 = readFileSync(readmePath, 'utf-8')
            const catalog = getYearsCatalog(db)
            expect(catalog).not.toEqual(utf8)
        }
    })

    test('tags', () => {
        expect(db).not.toEqual(undefined)

        if (db) {
            const readmePath = join(blogDir, 'tags/README.md')
            const utf8 = readFileSync(readmePath, 'utf-8')
            const catalog = getTagsCatalog(db)
            expect(catalog).not.toEqual(utf8)
        }
    })
})
