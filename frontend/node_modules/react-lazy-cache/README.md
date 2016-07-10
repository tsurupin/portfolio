#react-lazy-cache

[![NPM Version](https://img.shields.io/npm/v/react-lazy-cache.svg?style=flat-square)](https://www.npmjs
.com/package/react-lazy-cache) 
[![NPM Downloads](https://img.shields.io/npm/dm/react-lazy-cache.svg?style=flat-square)](https://www.npmjs.com/package/react-lazy-cache)
[![Build Status](https://img.shields.io/travis/erikras/react-lazy-cache/master.svg?style=flat-square)](https://travis-ci.org/erikras/react-lazy-cache)

`react-lazy-cache` is a utility to lazily calculate and cache values in a React component based on props.

## Installation

```
npm install --save react-lazy-cache
```

## Why?

Ideally, in a React component, you would calculate values that depend on your props inputs every time the component 
is rendered. However, in practice, sometimes these values, either for computational or memory reasons, are better off
cached. When you cache them, however, you need to be constantly watching your props to know if you need to 
invalidate your cache and recalculate those values. _That_ is what `react-lazy-cache` does for you.

## Usage

`react-lazy-cache` could not be simpler to use. You simply need to give it a map of calculations, and let it know 
when your component will receive new props.

```javascript
import React, {Component, PropTypes} from 'react';
import lazyCache from 'react-lazy-cache';

export default class Arithmetic extends Component {
  static propTypes = {
    a: PropTypes.number.isRequired,
    b: PropTypes.number.isRequired
  }
  
  componentWillMount() {
    // create cache
    this.cache = lazyCache(this, {
      sum: {
        params: ['a', 'b'],
        fn: (a, b) => a + b
      },
      difference: {
        params: ['a', 'b'],
        fn: (a, b) => a - b
      },
      product: {
        params: ['a', 'b'],
        fn: (a, b) => a * b
      },
      quotient: {
        params: ['a', 'b'],
        fn: (a, b) => a / b
      },
      sumSquared: {
        params: ['sum'],
        fn: (sum) => sum * sum
      }
    });
  }
  
  componentWillReceiveProps(nextProps) {
    this.cache.componentWillReceiveProps(nextProps);
  }
  
  render() {
    const {sum, difference, product, quotient, sumSquared} = this.cache;
    return (<div>
      <div>Sum: {sum}</div>
      <div>Difference: {difference}</div>
      <div>Product: {product}</div>
      <div>Quotient: {quotient}</div>
      <div>Sum Squared: {sumSquared}</div>
    </div>);
  }
}
```

Two things to notice about the above example:

### Lazy

The values do not get calculated until the properties on the `cache` object get referenced in render(). 
That's why it's "lazy". They will not be calculated again unless one of the props that the calculation depends on
changes.

### Selecting Parameters
 
When you specify your functions to calculate each value, you must specify the `params`, which refer either to props 
given to your React component, _or_ to other calculated values (see: `sumSquared`).

**Be careful to not cause an infinite dependency loop!**

### Internet Explorer 8 support

As this library utilizes Getters, which are not shimmable in IE8 and older, an alternate `noGetters` module is exposed.
This version allows you to cache values, but are not able to inject other values such as `sumSquared`. Usage:

```javascript
import LazyCache from 'react-lazy-cache/noGetters';

const cache = new LazyCache(...) // same signature as normal version

const sum = cache.get('sum');
```

The difference is that it's a class and not a plain function (so you have to `new` it), and properties are accessed
through the `get`-function, instead of as a property.


## Conclusion

That's all you need to know! Go forth and intelligently cache your calculated values!

Feedback welcome.
