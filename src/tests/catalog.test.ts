/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { newDataBase } from 'database'
import { readFileSync } from 'fs'
import { getTagsCatalog, getYearsCatalog } from 'markdown/catalog'
import { getLanding } from 'markdown/write'
import { join } from 'path'

describe('catalog', () => {
    const blogDir = 'samples'
    const db = newDataBase(blogDir)

    expect(db).toBeTruthy()

    test('years', () => {
        const readmePath = join(blogDir, 'posts/README.md')
        const utf8 = readFileSync(readmePath, 'utf-8')
        const catalog = getYearsCatalog(db!)

        expect(catalog).not.toEqual(utf8)
    })

    test('tags', () => {
        const readmePath = join(blogDir, 'tags/README.md')
        const utf8 = readFileSync(readmePath, 'utf-8')
        const catalog = getTagsCatalog(db!)

        expect(catalog).not.toEqual(utf8)
    })

    test('landing page', () => {
        const readmePath = join(blogDir, 'README.md')
        const utf8 = readFileSync(readmePath, 'utf-8')
        const catalog = getLanding(db!)

        expect(catalog).not.toEqual(utf8)
    })
})
