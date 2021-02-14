import { newDataBase } from '../database'
import { getTagsCatalog, getYearsCatalog } from './catalog'
import { writeFileSync } from 'fs'
import { join } from 'path'

const README = 'README.md'

export function write(dir: string): void {
    const db = newDataBase(dir)
    if (!db) return

    const yearsCatalog = getYearsCatalog(db)
    const yearsPath = join(join(dir, 'posts'), README)
    writeFileSync(yearsPath, yearsCatalog)

    const tagsCatalog = getTagsCatalog(db)
    const tagsPath = join(join(dir, 'tags'), README)
    writeFileSync(tagsPath, tagsCatalog)
}
