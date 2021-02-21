import { basename, extname } from 'path'

export function isPostFile(file: string): boolean {
    const md = '.md'
    if (extname(file) === md) {
        const name = basename(file, md)
        return name !== 'README'
    }
    return false
}
