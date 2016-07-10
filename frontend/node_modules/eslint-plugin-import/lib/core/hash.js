'use strict';

exports.__esModule = true;
exports.default = hashify;
exports.hashArray = hashArray;
exports.hashObject = hashObject;
/**
 * utilities for hashing config objects.
 * basically iteratively updates hash with a JSON-like format
 */

var stringify = JSON.stringify;

function hashify(hash, value) {
  if (value instanceof Array) {
    hashArray(hash, value);
  } else if (value instanceof Object) {
    hashObject(hash, value);
  } else {
    hash.update(stringify(value) || 'undefined');
  }

  return hash;
}

function hashArray(hash, array) {
  hash.update('[');
  for (var i = 0; i < array.length; i++) {
    hashify(hash, array[i]);
    hash.update(',');
  }
  hash.update(']');

  return hash;
}

function hashObject(hash, object) {
  hash.update('{');
  Object.keys(object).sort().forEach(function (key) {
    hash.update(stringify(key));
    hash.update(':');
    hashify(hash, object[key]);
    hash.update(',');
  });
  hash.update('}');

  return hash;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvaGFzaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7a0JBT3dCLE87UUFZUixTLEdBQUEsUztRQVdBLFUsR0FBQSxVOzs7Ozs7QUF6QmhCLElBQU0sWUFBWSxLQUFLLFNBQXZCOztBQUVlLFNBQVMsT0FBVCxDQUFpQixJQUFqQixFQUF1QixLQUF2QixFQUE4QjtBQUMzQyxNQUFJLGlCQUFpQixLQUFyQixFQUE0QjtBQUMxQixjQUFVLElBQVYsRUFBZ0IsS0FBaEI7QUFDRCxHQUZELE1BRU8sSUFBSSxpQkFBaUIsTUFBckIsRUFBNkI7QUFDbEMsZUFBVyxJQUFYLEVBQWlCLEtBQWpCO0FBQ0QsR0FGTSxNQUVBO0FBQ0wsU0FBSyxNQUFMLENBQVksVUFBVSxLQUFWLEtBQW9CLFdBQWhDO0FBQ0Q7O0FBRUQsU0FBTyxJQUFQO0FBQ0Q7O0FBRU0sU0FBUyxTQUFULENBQW1CLElBQW5CLEVBQXlCLEtBQXpCLEVBQWdDO0FBQ3JDLE9BQUssTUFBTCxDQUFZLEdBQVo7QUFDQSxPQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksTUFBTSxNQUExQixFQUFrQyxHQUFsQyxFQUF1QztBQUNyQyxZQUFRLElBQVIsRUFBYyxNQUFNLENBQU4sQ0FBZDtBQUNBLFNBQUssTUFBTCxDQUFZLEdBQVo7QUFDRDtBQUNELE9BQUssTUFBTCxDQUFZLEdBQVo7O0FBRUEsU0FBTyxJQUFQO0FBQ0Q7O0FBRU0sU0FBUyxVQUFULENBQW9CLElBQXBCLEVBQTBCLE1BQTFCLEVBQWtDO0FBQ3ZDLE9BQUssTUFBTCxDQUFZLEdBQVo7QUFDQSxTQUFPLElBQVAsQ0FBWSxNQUFaLEVBQW9CLElBQXBCLEdBQTJCLE9BQTNCLENBQW1DLGVBQU87QUFDeEMsU0FBSyxNQUFMLENBQVksVUFBVSxHQUFWLENBQVo7QUFDQSxTQUFLLE1BQUwsQ0FBWSxHQUFaO0FBQ0EsWUFBUSxJQUFSLEVBQWMsT0FBTyxHQUFQLENBQWQ7QUFDQSxTQUFLLE1BQUwsQ0FBWSxHQUFaO0FBQ0QsR0FMRDtBQU1BLE9BQUssTUFBTCxDQUFZLEdBQVo7O0FBRUEsU0FBTyxJQUFQO0FBQ0QiLCJmaWxlIjoiY29yZS9oYXNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiB1dGlsaXRpZXMgZm9yIGhhc2hpbmcgY29uZmlnIG9iamVjdHMuXG4gKiBiYXNpY2FsbHkgaXRlcmF0aXZlbHkgdXBkYXRlcyBoYXNoIHdpdGggYSBKU09OLWxpa2UgZm9ybWF0XG4gKi9cblxuY29uc3Qgc3RyaW5naWZ5ID0gSlNPTi5zdHJpbmdpZnlcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaGFzaGlmeShoYXNoLCB2YWx1ZSkge1xuICBpZiAodmFsdWUgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgIGhhc2hBcnJheShoYXNoLCB2YWx1ZSlcbiAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgIGhhc2hPYmplY3QoaGFzaCwgdmFsdWUpXG4gIH0gZWxzZSB7XG4gICAgaGFzaC51cGRhdGUoc3RyaW5naWZ5KHZhbHVlKSB8fCAndW5kZWZpbmVkJylcbiAgfVxuXG4gIHJldHVybiBoYXNoXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNoQXJyYXkoaGFzaCwgYXJyYXkpIHtcbiAgaGFzaC51cGRhdGUoJ1snKVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgaGFzaGlmeShoYXNoLCBhcnJheVtpXSlcbiAgICBoYXNoLnVwZGF0ZSgnLCcpXG4gIH1cbiAgaGFzaC51cGRhdGUoJ10nKVxuXG4gIHJldHVybiBoYXNoXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNoT2JqZWN0KGhhc2gsIG9iamVjdCkge1xuICBoYXNoLnVwZGF0ZSgneycpXG4gIE9iamVjdC5rZXlzKG9iamVjdCkuc29ydCgpLmZvckVhY2goa2V5ID0+IHtcbiAgICBoYXNoLnVwZGF0ZShzdHJpbmdpZnkoa2V5KSlcbiAgICBoYXNoLnVwZGF0ZSgnOicpXG4gICAgaGFzaGlmeShoYXNoLCBvYmplY3Rba2V5XSlcbiAgICBoYXNoLnVwZGF0ZSgnLCcpXG4gIH0pXG4gIGhhc2gudXBkYXRlKCd9JylcblxuICByZXR1cm4gaGFzaFxufVxuIl19