import { DataBase } from 'core/database'
import { Post } from 'core/post'
import { join } from 'path'

export enum Format {
    LatestIndex = 'LatestIndex',
    YearIndex = 'YearIndex',
    TagIndex = 'TagIndex',
}

export function getFormattedUrl(post: Post, format = Format.LatestIndex): string {
    let root = ''

    switch (format) {
        case Format.LatestIndex:
            root = 'posts'
            break
        case Format.YearIndex:
        case Format.TagIndex:
            root = '../posts'
            break
    }

    const url = join(root, post.fileName)
    return `${url}#${post.anchor}`
}

export function getFormattedDate(date: Date, format = Format.LatestIndex): string {
    const options: {
        year?: string
        month: string
        day: string
    } = { year: 'numeric', month: 'short', day: '2-digit' }

    switch (format) {
        case Format.YearIndex:
            delete options.year
            break
    }

    return date.toLocaleDateString('en-US', options)
}

export function getEntry(post: Post, format = Format.LatestIndex): string {
    const date = getFormattedDate(post.date, format)
    const url = getFormattedUrl(post, format)
    return `- [${date}] [${post.title}](${url})`
}

export function write(db: DataBase): void {
    const postsByTags = db.postsByTag
    const postsByYear = db.postsByYear

    const years = [...postsByYear.keys()].sort()
    const tags = [...postsByTags.keys()].sort()

    console.log(years)
    console.log(tags)

    for (const year of years) {
        const posts = postsByYear.get(year)
        if (!posts) continue

        for (const post of posts) {
            console.log(getEntry(post))
        }
    }
}
