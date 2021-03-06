import { join } from 'path'
import { Post } from 'post'
import { Context } from './context'

export function getUrl(post: Post, context: Context): string {
    let root = ''

    switch (context) {
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

export function getDate(date: Date, context: Context): string {
    const options = {
        year: context === Context.Years ? undefined : 'numeric',
        month: 'short',
        day: '2-digit',
    }

    return date.toLocaleDateString('en-US', options)
}

export function getEntry(post: Post, context: Context): string {
    const date = getDate(post.date, context)
    const url = getUrl(post, context)
    return `- [${date}] [${post.title}](${url})`
}
