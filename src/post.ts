import { readFileSync } from 'fs'
import { basename } from 'path'

export interface Post {
    readonly file: string
    readonly fileName: string
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
            fileName: basename(file),
            title,
            anchor,
            date: new Date('Nov 05, 2019'),
            tags: ['Uncategorized'],
        }
    } catch (err) {
        // console.error(err)
        return undefined
    }
}
