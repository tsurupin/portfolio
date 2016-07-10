# draft-js-multidecorators

[![Build Status](https://travis-ci.org/SamyPesse/draft-js-multidecorators.png?branch=master)](https://travis-ci.org/SamyPesse/draft-js-multidecorators)
[![NPM version](https://badge.fury.io/js/draft-js-multidecorators.svg)](http://badge.fury.io/js/draft-js-multidecorators)


> Combine multiple Draft's decorators into one.

### Installation

```
$ npm install draft-js-multidecorators
```

### Usage

```js
var Draft = require('draft-js');
var MultiDecorator = require('draft-js-multidecorators');

var decorator = new MultiDecorator([
    new SomeCustomDecorator(),

    // This decorator will have more priority:
    new Draft.CompositeDecorator([ ... ])
]);

var editorState = Draft.EditorState.createEmpty(decorator)
```
