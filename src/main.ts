import * as yargs from 'yargs'

const args = yargs
    .scriptName('gonzo')
    .usage('Usage: $0 [options]')
    .version()
    .alias('v', 'version')
    .help()
    .alias('h', 'help')
    .option('input', {
        alias: 'i',
        description: '',
        demandOption: true,
        type: 'string',
    })
    .option('output', {
        alias: 'o',
        default: '<input>',
        description: '',
        type: 'string',
    })
    .option('dry', {
        alias: 'd',
        description: '',
    })

console.log(args.argv)
console.log('hello, world!')
