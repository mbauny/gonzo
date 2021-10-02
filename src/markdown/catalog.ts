import { DataBase } from 'database'
import { getEntry } from './entry'

export function getYearsCatalog(db: DataBase): string {
    const content = ['# Posts\n']

    const postsByYear = db.postsByYear

    const years = [...postsByYear.keys()].sort().reverse()

    for (const year of years) {
        const posts = postsByYear.get(year)
        if (posts) {
            content.push(`## ${year}\n`)

            const entries = posts.map(post => getEntry(post, 'years'))
            content.push(...entries)
        }
    }

    return content.join('\n')
}

export function getTagsCatalog(db: DataBase): string {
    const content = ['# Tags\n']

    const postsByTag = db.postsByTag

    const tags = [...postsByTag.keys()].sort((tag1, tag2) =>
        tag1.localeCompare(tag2, 'en-US', { sensitivity: 'base' })
    )

    for (const tag of tags) {
        const posts = postsByTag.get(tag)
        if (posts) {
            content.push(`## ${tag}\n`)

            const entries = posts.map(post => getEntry(post, 'tags'))
            content.push(...entries)
        }
    }

    return content.join('\n')
}

export function getLatestCatalog(db: DataBase): string {
    const content = ['# Latest posts\n']

    const maxSize = 5
    let currentSize = 0

    const postsByYear = db.postsByYear
    const years = [...postsByYear.keys()].sort().reverse()

    for (const year of years) {
        if (currentSize >= maxSize) break

        const posts = postsByYear.get(year)
        if (posts) {
            for (const post of posts) {
                if (currentSize >= maxSize) break

                const entry = getEntry(post, 'main')
                content.push(entry)

                currentSize++
            }
        }
    }

    return content.join('\n')
}
