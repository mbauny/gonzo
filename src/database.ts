import { readdirSync } from 'fs'
import { join } from 'path'
import { newPost, Post } from './post'
import { compareDates } from './utils/compareDates'

export interface DataBase {
    readonly postsByYear: Map<number, Post[]>
    readonly postsByTag: Map<string, Post[]>
    readonly latestPosts: Post[]
}

const latestCount = 5

function comparePosts(post1: Post, post2: Post): number {
    return compareDates(post1.date, post2.date)
}

export function newDataBase(dir: string): DataBase | undefined {
    const allPosts: Post[] = []
    const postsByYear: Map<number, Post[]> = new Map()
    const postsByTag: Map<string, Post[]> = new Map()

    try {
        const add = function (post: Post): void {
            const year = post.date.getFullYear()
            const postsForYear = [...(postsByYear.get(year) ?? []), post]
            postsForYear.sort(comparePosts).reverse()

            postsByYear.set(year, postsForYear)

            for (const tag of post.tags) {
                const postsForTag = [...(postsByTag.get(tag) ?? []), post]
                postsForTag.sort(comparePosts).reverse()

                postsByTag.set(tag, postsForTag)
            }

            allPosts.push(post)
        }

        const posts = join(dir, 'posts')
        const files = readdirSync(posts)

        for (const file of files) {
            const path = join(posts, file)
            const post = newPost(path)

            if (post) add(post)
        }

        return {
            postsByYear,
            postsByTag,
            latestPosts: allPosts.sort(comparePosts).slice(0, latestCount),
        }
    } catch (err) {
        const message = `Error: Cannot find "posts" dir. Aborting parsing of "${dir}"`
        console.error(message)
        return undefined
    }
}
