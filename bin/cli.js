#! /usr/bin/env node

const open = require('open');
const M = require('..');

process.on('unhandledRejection', reason => {
    throw new Error('Fatal: Unhandled Rejection: ' + reason);
});

function readFromStdin() {
    return new Promise((resolve, reject) => {
        let buffer = '';
        process.stdin.on('data', chunk => {
            buffer += chunk;
        });
        process.stdin.on('end', () => {
            resolve(buffer);
        });
        process.stdin.on('error', e => {
            reject(e);
        });
    });
}

function parseArgv() {
    const argv = process.argv;

    const help_idx = argv.indexOf('--help');
    if (help_idx !== -1) {
        return {
            help: true
        };
    }

    const strip_idx = argv.indexOf('--strip-only');
    if (strip_idx >= 0) {
        argv.splice(strip_idx, 1);
    }

    if (strip_idx === -1 && argv.length <= 2) {
        throw new Error('You must set the target language as argument of this command (e.g. "en" for English, "ja" for Japanese)');
    }
    return {
        lang: argv[2],
        strip: strip_idx >= 0
    };
}

const opts = parseArgv();
if (opts.help) {
    console.log('TODO: HELP');
    process.exit(0);
}

readFromStdin().then(input => {
    if (opts.strip) {
        process.stdout.write(M.stripMarkdown(input));
        return;
    }

    open(M.translateMarkdownUrl(input, null, opts.lang));
});
