'use strict';

var uppercasePattern = /[A-Z]/g;
var msPattern = /^ms-/;

function hyphenateStyleName(string) {
    return string
        .replace(uppercasePattern, '-$&')
        .toLowerCase()
        .replace(msPattern, '-ms-');
}

module.exports = hyphenateStyleName;
