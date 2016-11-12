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

    const apikey_idx = argv.indexOf('--apikey');
    let apikey = undefined;
    if (argv.length - 1 > apikey_idx && apikey_idx >= 0) {
        apikey = argv[apikey_idx + 1];
        argv.splice(apikey_idx, 2);
    }

    if (argv.length <= 2) {
        return {
            error: 'You must set the target language as argument of this command (e.g. "en" for English, "ja" for Japanese)'
        };
    }

    return {
        lang: argv[2],
        strip: strip_idx >= 0,
        apikey,
    };
}

const opts = parseArgv();
if (opts.help) {
    process.stderr.write(
`$ translate-markdown [--help|--strip-only|--apikey {key}] {target lang}

    Translate Makrdown document from stdin.

Example:

    Below receive Markdown text (README.md) from stdin and open a browser to
    translate it in Google Translate.

        $ cat README.md | translate-markdown ja

    Note that there is restriction of the number of characters.

Options:

    {target lang}
        Specify target language you want to translate. For example, 'en' is for
        English and 'ja' is for Japanese. The language of markdown text is
        automatically detected.

    --strip-only
        Strip markdown to plain text only. Stripped plain text is output to
        stdout.

    --apikey {key}
        Use Google Translate API isntead of opening a browser. The result text will
        be output to stdout.

    --help
        Show this help.

`
    );
    process.exit(0);
}

if (opts.error) {
    process.stderr.write(opts.error);
    process.exit(125);
}

readFromStdin().then(input => {
    if (opts.strip) {
        process.stdout.write(M.stripMarkdown(input));
        return;
    }

    if (opts.apikey) {
        process.stdout.write(M.translateMarkdownWithApi(input, null, opts.lang, opts.apikey));
        return;
    }

    open(M.translateMarkdownUrl(input, null, opts.lang));
});
