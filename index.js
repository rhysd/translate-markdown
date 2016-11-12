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

function buildGoogleTranslateUrl(text, srcLang, distLang) {
    if (!srcLang) {
        srcLang = 'auto';
    }
    const encoded = encodeURIComponent(text);
    return `https://translate.google.com/#${srcLang}/${distLang}/${encoded}`
}

function translateMarkdownUrl(doc, srcLang, distLang) {
    const text = stripMarkdown(doc);
    const url = buildGoogleTranslateUrl(text, srcLang, distLang);
    return url;
}

exports.stripMarkdown = stripMarkdown;
exports.translateMarkdownUrl = translateMarkdownUrl;
