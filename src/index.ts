import { DataBase } from './database'
import { Format, getEntry } from './entry'

export function writeYearsIndex(db: DataBase): void {
    const content = ['# Posts\n']

    const postsByYear = db.postsByYear

    const years = [...postsByYear.keys()].sort()

    for (const year of years) {
        const posts = postsByYear.get(year)
        if (posts) {
            content.push(`## ${year}\n`)

            for (const post of posts) {
                const entry = getEntry(post, Format.YearIndex)
                content.push(entry)
            }
        }
    }

    console.log(content.join('\n'))
}

export function writeTagsIndex(db: DataBase): void {
    const content = ['# Tags\n']

    const postsByTag = db.postsByTag

    const tags = [...postsByTag.keys()].sort()

    for (const tag of tags) {
        const posts = postsByTag.get(tag)
        if (posts) {
            content.push(`## ${tag}\n`)

            for (const post of posts) {
                const entry = getEntry(post, Format.TagIndex)
                content.push(entry)
            }
        }
    }

    console.log(content.join('\n'))
}

export function writeLatestIndex(db: DataBase): void {
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

                const entry = getEntry(post, Format.LatestIndex)
                content.push(entry)

                currentSize++
            }
        }
    }

    console.log(content.join('\n'))
}
