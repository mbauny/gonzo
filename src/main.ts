import * as yargs from 'yargs'
import { write } from './markdown/write'

const argv = yargs
    .scriptName('gonzo')
    .usage('Usage: $0 [options]')
    .version()
    .alias('v', 'version')
    .help()
    .alias('h', 'help')
    .option('dir', {
        alias: 'd',
        description: 'Blog root directory',
        type: 'string',
    }).argv

write(argv.dir ?? process.cwd())
