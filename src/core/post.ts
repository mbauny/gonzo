import { readFileSync } from 'fs'

export interface Post {
    readonly file: string
    readonly title: string
    readonly anchor: string
    readonly tags: string[]
    readonly date: Date
}

const regExpTitle = new RegExp('^# (?<title>.*)$', 'm')

export function newPost(file: string): Post | undefined {
    try {
        const utf8 = readFileSync(file, 'utf-8')

        const matches = regExpTitle.exec(utf8)
        if (!matches) return undefined

        const title = matches.groups?.title
        if (!title) return undefined

        const anchor = title.toLowerCase().replaceAll(' ', '-')

        return {
            file,
            title,
            anchor,
            date: new Date(),
            tags: ['Uncategorized'],
        }
    } catch (err) {
        console.error(err)
        return undefined
    }
}
