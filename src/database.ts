import { newPost, Post } from './post'
import { readdirSync } from 'fs'
import { basename, extname, join } from 'path'

export interface DataBase {
    readonly postsByYear: Map<number, Post[]>
    readonly postsByTag: Map<string, Post[]>
    readonly latestPosts: Post[]
}

const latestCount = 5

function comparePosts(post1: Post, post2: Post): number {
    const date1 = post1.date
    const date2 = post2.date

    if (date1 < date2) return -1
    if (date1 > date2) return 1
    return 0
}

function isPostFile(file: string): boolean {
    const md = '.md'
    if (extname(file) === md) {
        const name = basename(file, md)
        return name !== 'README'
    }
    return false
}

export function newDataBase(dir: string): DataBase | undefined {
    const allPosts: Post[] = []
    const postsByYear: Map<number, Post[]> = new Map()
    const postsByTag: Map<string, Post[]> = new Map()

    try {
        const add = function (post: Post): void {
            const year = post.date.getFullYear()
            const postsForYear = [...(postsByYear.get(year) ?? []), post]

            postsByYear.set(year, postsForYear)

            for (const tag of post.tags) {
                const postsForTag = [...(postsByTag.get(tag) ?? []), post]
                postsForTag.sort(comparePosts)

                postsByTag.set(tag, postsForTag)
            }

            allPosts.push(post)
        }

        const posts = join(dir, 'posts')
        const files = readdirSync(posts)

        for (const file of files) {
            if (isPostFile(file)) {
                const path = join(posts, file)
                const post = newPost(path)

                if (post) add(post)
            }
        }

        return {
            postsByYear,
            postsByTag,
            latestPosts: allPosts.sort(comparePosts).slice(0, latestCount),
        }
    } catch (err) {
        return undefined
    }
}
