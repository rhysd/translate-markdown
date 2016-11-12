#! /usr/bin/env node

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

readFromStdin().then(input => {
    console.log(M.translateMarkdown(input));
});
