var expect = require('expect');

var Draft = require('draft-js');
var MultiDecorator = require('../');

describe('MultiDecorator', function() {
    var block = new Draft.ContentBlock({
        text: 'AAA BBB CCC ABC'
    });

    var firstDecorator = new Draft.CompositeDecorator([
        {
            strategy: function(block, callback) {
                callback(0, 3);
                callback(12, 15);
            },
            component: function() { return 'a'; }
        }
    ]);

    var secondDecorator = new Draft.CompositeDecorator([
        {
            strategy: function(block, callback) {
                callback(4, 7);
                callback(12, 15);
            },
            component: function() { return 'b'; }
        }
    ]);

    var thirdDecorator = new Draft.CompositeDecorator([
        {
            strategy: function(block, callback) {
                callback(8, 11);
                callback(12, 15);
            },
            component: function() { return 'c'; }
        }
    ]);

    var decorator = new MultiDecorator([
        firstDecorator,
        secondDecorator,
        thirdDecorator
    ]);

    it('should correctly decorate text', function() {
        var out = decorator.getDecorations(block);

        expect(out.toJS()).toEqual([
            '0-0.0',
            '0-0.0',
            '0-0.0',
            null,
            '1-0.0',
            '1-0.0',
            '1-0.0',
            null,
            '2-0.0',
            '2-0.0',
            '2-0.0',
            null,
            '2-0.1',
            '2-0.1',
            '2-0.1'
        ])
    });

    it('should correctly resolve component', function() {
        var fn = decorator.getComponentForKey('0-0.0');
        expect(fn()).toBe('a');

        var fn = decorator.getComponentForKey('1-0.0');
        expect(fn()).toBe('b');
    });
});

