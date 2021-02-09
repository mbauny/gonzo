import { Post } from './post'
import { join } from 'path'

export enum Format {
    LatestIndex = 'LatestIndex',
    YearIndex = 'YearIndex',
    TagIndex = 'TagIndex',
}

export function getUrl(post: Post, format = Format.LatestIndex): string {
    let root = ''

    switch (format) {
        default:
            break
        case Format.LatestIndex:
            root = 'posts'
            break
        case Format.YearIndex:
            root = ''
            break
        case Format.TagIndex:
            root = '../posts'
            break
    }

    return join(root, post.url)
}

export function getDate(date: Date, format = Format.LatestIndex): string {
    const options = {
        year: format === Format.YearIndex ? undefined : 'numeric',
        month: 'short',
        day: '2-digit',
    }

    return date.toLocaleDateString('en-US', options)
}

export function getEntry(post: Post, format = Format.LatestIndex): string {
    const date = getDate(post.date, format)
    const url = getUrl(post, format)
    return `- [${date}] [${post.title}](${url})`
}
