Translate Markdown document on [Google Translate](https://translate.google.com/)
================================================================================

`translate-markdown` is a command line tool to translate your Markdown document on [Google Translate](https://translate.google.com/). It receives Markdown document from stdin and strips it to plain text, then open Google Translate with the plain text on a browser.

## Install

```
$ npm install -g translate-markdown
```

## Usage

Please see `translate-markdown --help`.

![screen shot](https://github.com/rhysd/ss/blob/master/translate-markdown/main.gif?raw=true)

```
$ translate-markdown [--help|--strip-only] {target lang}

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

    --help
        Show this help.
```

