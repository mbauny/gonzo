import { Post } from 'post'
import { join } from 'path'
import { Context } from './context'

export function getUrl(post: Post, format = Context.Latest): string {
    let root = ''

    switch (format) {
        default:
            break
        case Context.Latest:
            root = './posts'
            break
        case Context.Years:
            root = ''
            break
        case Context.Tags:
            root = '../posts'
            break
    }

    return join(root, post.url)
}

export function getDate(date: Date, format = Context.Latest): string {
    const options = {
        year: format === Context.Years ? undefined : 'numeric',
        month: 'short',
        day: '2-digit',
    }

    return date.toLocaleDateString('en-US', options)
}

export function getEntry(post: Post, format = Context.Latest): string {
    const date = getDate(post.date, format)
    const url = getUrl(post, format)
    return `- [${date}] [${post.title}](${url})`
}
