import minimist from 'minimist';
import Mocha from 'mocha';
import glob from 'glob';

import {
  jsdom,
} from 'jsdom';

global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;
global.Node = global.window.Node;

const argv = minimist(process.argv.slice(2), {
  alias: {
    c: 'component',
    g: 'grep',
  },
});

const mocha = new Mocha({
  grep: argv.grep ? argv.grep : undefined,
});

glob(`src/**/${argv.component ? argv.component : '*'}.spec.js`, {}, (err, files) => {
  files.forEach((file) => mocha.addFile(file));

  mocha.run((failures) => {
    process.on('exit', () => {
      /* eslint-disable no-process-exit */
      process.exit(failures);
    });
  });
});
