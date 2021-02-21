import * as yargs from 'yargs'
import { write } from './output/write'

const argv = yargs
    .scriptName('gonzo')
    .usage('Usage: $0 [options]')
    .version()
    .alias('v', 'version')
    .help()
    .alias('h', 'help')
    .option('dir', {
        alias: 'd',
        description: '',
        default: 'samples',
        type: 'string',
    })

    .option('dry', {
        alias: 'd',
        description: '',
    }).argv

write(argv.dir ?? process.cwd())
