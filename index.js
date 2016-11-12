const unified = require('unified');
const parser = require('remark-parse');
const remark2rehype = require('remark-rehype');
const strip = require('./rehype_strip');

const processor = unified()
    .use(parser)
    .use(remark2rehype)
    .use(strip);

function stripMarkdown(doc) {
    return processor.process(doc).contents;
}

function translateMarkdown(doc) {
    // TODO
    return stripMarkdown(doc);
}

exports.stripMarkdown = stripMarkdown;
exports.translateMarkdown = translateMarkdown;
