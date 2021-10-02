import { join } from 'path'
import { Post } from 'post'

export type Context = 'main' | 'years' | 'tags'

export function getUrl(post: Post, context: Context): string {
    let root = ''

    switch (context) {
        default:
            break
        case 'main':
            root = './posts'
            break
        case 'years':
            root = ''
            break
        case 'tags':
            root = '../posts'
            break
    }

    return join(root, post.url)
}

export function getDate(date: Date, context: Context): string {
    const options = {
        year: context === 'years' ? undefined : ('numeric' as const),
        month: 'short' as const,
        day: '2-digit' as const,
    }

    return date.toLocaleDateString('en-US', options)
}

export function getEntry(post: Post, context: Context): string {
    const date = getDate(post.date, context)
    const url = getUrl(post, context)
    return `- [${date}] [${post.title}](${url})`
}
