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
$ translate-markdown [--help|--strip-only|--apikey {key}] {target lang}

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
        be output to stdout. You can also use $TRANSLATE_MARKDOWN_APIKEY environment
        variable to set a API key.

    --help
        Show this help.

```

Features are also available from Node.js program. Please see [APIs in code](index.js).

## Tips

### Use from Vim

```vim
function! s:translate_markdown(lang) abort
    if &filetype !=# 'markdown'
        echoerr 'Not a Markdown buffer!'
    endif

    if !executable('translate-markdown')
        echoerr '`translate-markdown` command is not found!'
    endif

    let start = getpos("'<")
    let end = getpos("'>")

    call setpos('.', start)
    normal! v
    call setpos('.', end)

    let save_reg_g = getreg('g')
    let save_regtype_g = getregtype('g')
    try
        normal! "gy
        let input = getreg('g')
    finally
        call setreg('g', save_reg_g, save_regtype_g)
    endtry

    let result = system('translate-markdown ' . a:lang, input)
    echo result
endfunction
command! -nargs=0 -range=% TranslateMarkdown call <SID>translate_markdown('en')<CR>
```

Copy and paste above code to your `.vimrc`. Now `:TranslateMarkdown` command is available in visual mode and normal mode. Select the range you want to translate and execute `:TranslateMarkdown`, then Google Translate is opened with the selected text in browser.

If you want to map the command to some key sequence, please use `:autocmd` and `:noremap`. Below maps `<Leader>T` to the command.

```vim
autocmd FileType markdown noremap <buffer><Leader>T :TranslateMarkdown<CR>
```

