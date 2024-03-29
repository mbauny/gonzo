import { writeFileSync } from 'fs'
import { join } from 'path'
import { format as prettierFormat } from 'prettier'
import { DataBase, newDataBase } from '../database'
import { getLatestCatalog, getTagsCatalog, getYearsCatalog } from './catalog'

const README = 'README.md'

function format(str: string): string {
    return prettierFormat(str, {
        parser: 'markdown',
        tabWidth: 4,
        useTabs: true,
    })
}

export function getLanding(db: DataBase): string {
    const header = [
        '# Meet the engineer',
        '',
        "## :house: Matthieu Bauny's page",
        '',
        'Hi, welcome to my homepage.',
        '',
        'I blog a little and my latest posts can be found bellow. You can also read a little more about me [here](./pages/about.md "About").',
        '',
        'Cheers :metal:',
    ].join('\n')

    const olderCatalog = [
        '## :date: Older posts',
        '',
        '- [Browse by date](./posts#posts "Posts")',
        '- [Browse by topic](./tags#tags "Tags")',
    ].join('\n')

    const latestCatalog = getLatestCatalog(db)

    return [header, latestCatalog, olderCatalog].join('\n\n')
}

export function write(dir: string): void {
    const db = newDataBase(dir)
    if (!db) return

    const yearsCatalog = format(getYearsCatalog(db))
    const yearsPath = join(join(dir, 'posts'), README)
    writeFileSync(yearsPath, yearsCatalog)

    const tagsCatalog = format(getTagsCatalog(db))
    const tagsPath = join(join(dir, 'tags'), README)
    writeFileSync(tagsPath, tagsCatalog)
}
