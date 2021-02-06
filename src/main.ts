import { DataBase } from './database'
import { writeYearsIndex } from './index'
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
const db = DataBase.create(blogDir)
if (db) writeYearsIndex(db)
