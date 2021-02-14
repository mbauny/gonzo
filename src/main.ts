import * as yargs from 'yargs'
import { write } from './output/write'

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

write(argv.blogDir ?? process.cwd())
