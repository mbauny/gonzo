import { isPostFile } from './utils/isPostFile'
import { readFileSync } from 'fs'
import { basename } from 'path'

export interface Post {
    readonly title: string
    readonly url: string
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

function extractMetaData(file: string): MetaData | undefined {
    let title: string | undefined
    let date: Date | undefined
    let tags: string[] | undefined

    let fileContent: string
    try {
        fileContent = readFileSync(file, 'utf-8')
    } catch (err) {
        const message = `Error: Cannot read file. Skipping "${file}"`
        console.error(message)
        return undefined
    }

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

    if (!title) {
        const message = `Warning: Cannot find post title. Skipping "${file}"`
        console.warn(message)
        return undefined
    }

    if (!date) {
        const message = `Warning: Cannot find post date. Skipping "${file}"`
        console.warn(message)
        return undefined
    }

    if (!tags) tags = ['Uncategorized']

    return {
        title,
        date,
        tags,
    }
}

export function newPost(file: string): Post | undefined {
    if (!isPostFile(file)) return undefined

    const metaData = extractMetaData(file)
    if (!metaData) return undefined

    const fileName = basename(file)
    const anchor = metaData.title.toLowerCase().replaceAll(' ', '-')
    const url = `${fileName}#${anchor}`

    return {
        url,
        ...metaData,
    }
}
