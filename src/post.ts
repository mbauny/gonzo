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

interface MetaData {
    readonly title: string
    readonly tags: string[]
    readonly date: Date
}

const regExpTitle = new RegExp('^# (?<title>.*)$')
const regExpDate = new RegExp("^\\[\\/\\/\\]: # 'date (?<date>.*)'$")
const regExpTags = new RegExp("^\\[\\/\\/\\]: # 'tags (?<tags>.*)'$")

function isValid(date: Date): boolean {
    return !isNaN(date.getTime())
}

function extractMetaData(fileContent: string): MetaData | undefined {
    let title: string | undefined
    let date: Date | undefined
    let tags: string[] | undefined

    const lines = fileContent.split(/\r?\n/)
    for (const line of lines) {
        if (!title) {
            const matches = regExpTitle.exec(line)
            if (matches) title = matches.groups?.title
        }

        if (!tags) {
            const matches = regExpDate.exec(line)
            if (matches) {
                const maybeDate = new Date(matches.groups?.date ?? '')
                if (isValid(maybeDate)) date = maybeDate
            }
        }

        if (!tags) {
            const matches = regExpTags.exec(line)
            if (matches) {
                const tagChain = matches.groups?.tags
                tags = tagChain?.split(',').map(tag => tag.trim())
            }
        }
    }

    if (!tags) tags = ['Uncategorized']
    if (!title || !date) return undefined

    return {
        title,
        date,
        tags,
    }
}

export function newPost(file: string): Post | undefined {
    try {
        const utf8 = readFileSync(file, 'utf-8')
        const metaData = extractMetaData(utf8)
        if (!metaData) return undefined

        const anchor = metaData.title.toLowerCase().replaceAll(' ', '-')

        return {
            file,
            fileName: basename(file),
            anchor,
            ...metaData,
        }
    } catch (err) {
        return undefined
    }
}
