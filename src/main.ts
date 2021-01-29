import { DataBase } from './core/database'
import * as yargs from 'yargs'

const argv = yargs
    .scriptName('gonzo')
    .usage('Usage: $0 [options]')
    .version()
    .alias('v', 'version')
    .help()
    .alias('h', 'help')
    .option('blogDir', {
        alias: 'b',
        description: '',
        default: '/Users/mbauny/sources/gonzo/test/samples',
        type: 'string',
    })

    .option('dry', {
        alias: 'd',
        description: '',
    }).argv

const blogDir = argv.blogDir ?? process.cwd()

console.log(DataBase.create(blogDir))
