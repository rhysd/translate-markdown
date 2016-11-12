const toString = require('hast-util-to-string');

function strip(processor, config) {
    processor.Compiler = class Compiler {
        constructor(file, options) {
            this.options = options;
            this.file = file;
        }

        compile(tree) {
            return toString(tree);
        }
    };
}

module.exports = strip;
