import jsdom from 'jsdom';
global.document = jsdom.jsdom('<html><body></body></html>');
global.window = global.document.defaultView;
const Chrome49 = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2454.85 Safari/537.36';
global.navigator = { userAgent: Chrome49 };
global.__REACT_DEVTOOLS_GLOBAL_HOOK__ = {};
// these make same functions as real localStorage
global.localStorage = global.window.sessionStorage = {
  getItem(key) {
    return this[key];
  },
  setItem(key, value) {
    this[key] = value;
  },
  removeItem(key) {
    delete this[key];
  },
};

localStorage.setItem('accessToken', 'test');

