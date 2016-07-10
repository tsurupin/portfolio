# attr-accept
JavaScript implementation of the "accept" attribute for HTML5 `<input type="file">`

[![Build Status](https://travis-ci.org/okonet/attr-accept.svg?branch=master)](https://travis-ci.org/okonet/attr-accept)

See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input#Attributes for more information.

Installation
=====
```sh
npm install --save attr-accept
```

Usage
=====
```javascript
var accept = require('attr-accept');
accept({
    name: 'my file.png',
    type: 'image/png'
}, 'image/*') // => true

accept({
    name: 'my file.json',
    type: 'application/json'
}, 'image/*') // => false
```
