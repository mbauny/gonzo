import { readFileSync } from 'fs'

export interface Post {
    readonly file: string
    readonly title?: string
    readonly anchor?: string
    readonly tags?: string[]
    readonly date: Date
}

const regExpTitle = new RegExp('^# (?<title>.*)$', 'm')

export function newPost(file: string): Post | undefined {
    try {
        const utf8 = readFileSync(file, 'utf-8')
        const matches = regExpTitle.exec(utf8)

        if (matches) {
            const title = matches.groups?.title
            const anchor = title?.toLowerCase().replaceAll(' ', '-')

            return {
                file,
                title,
                anchor,
                date: new Date(),
            }
        }
    } catch (err) {
        console.error(err)
        return undefined
    }
}
