import { newPost, Post } from './post'
import { readdirSync } from 'fs'
import { basename, extname, join } from 'path'

function isPostFile(file: string): boolean {
    const md = '.md'
    if (extname(file) === md) {
        const name = basename(file, md)
        return name !== 'README'
    }
    return false
}

export class DataBase {
    readonly postsByYear: Map<number, Post[]>
    readonly postsByTag: Map<string, Post[]>

    static create(dir: string): DataBase | undefined {
        const db = new DataBase()

        try {
            const posts = join(dir, 'posts')
            const files = readdirSync(posts)

            for (const file of files) {
                if (isPostFile(file)) {
                    const path = join(posts, file)
                    const post = newPost(path)

                    if (post) db.add(post)
                }
            }
        } catch (err) {
            // console.log(err)
        }

        return db
    }

    private constructor() {
        this.postsByYear = new Map()
        this.postsByTag = new Map()
    }

    add(post: Post): void {
        const year = post.date.getFullYear()
        const postsByYear = [...(this.postsByYear.get(year) ?? []), post]

        this.postsByYear.set(year, postsByYear)

        for (const tag of post.tags) {
            const postsByTag = [...(this.postsByTag.get(tag) ?? []), post]

            this.postsByTag.set(tag, postsByTag)
        }
    }
}
