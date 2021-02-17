import { newDataBase } from '../../../database'
import { getTagsCatalog } from '../../../output/catalog'
import { readFileSync } from 'fs'
import { join } from 'path'

describe('catalog', () => {
    test('tags', () => {
        const blogDir = './test/samples'
        const db = newDataBase(blogDir)

        expect(db).not.toEqual(undefined)

        if (db) {
            const readmePath = join(blogDir, 'tags/README.md')
            const utf8 = readFileSync(readmePath, 'utf-8')
            const catalog = getTagsCatalog(db)
            expect(catalog).not.toEqual(utf8)
        }
    })
})
