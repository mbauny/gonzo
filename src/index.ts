import { DataBase } from './database'
import { Format, getEntry } from './entry'

export function writeLatestIndex(db: DataBase): void {}

export function writeYearsIndex(db: DataBase): void {
    const postsByYear = db.postsByYear

    const years = [...postsByYear.keys()].sort()

    for (const year of years) {
        const posts = postsByYear.get(year)
        if (posts) {
            for (const post of posts) {
                console.log(getEntry(post, Format.YearIndex))
            }
        }
    }
}

export function writeTagsIndex(db: DataBase): void {
    const postsByTag = db.postsByTag

    const tags = [...postsByTag.keys()].sort()

    for (const tag of tags) {
        const posts = postsByTag.get(tag)
        if (posts) {
            for (const post of posts) {
                console.log(getEntry(post, Format.TagIndex))
            }
        }
    }
}
