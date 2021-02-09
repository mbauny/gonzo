import { newDataBase } from './database'
import { writeYearsIndex, writeLatestIndex, writeTagsIndex } from './index'
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
const db = newDataBase(blogDir)
if (db) writeYearsIndex(db)
if (db) writeTagsIndex(db)
if (db) writeLatestIndex(db)
