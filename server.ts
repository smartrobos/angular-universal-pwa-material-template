import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import {enableProdMode} from '@angular/core';
// Express Engine
import {ngExpressEngine} from '@nguniversal/express-engine';
// Import module map for lazy loading
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
import {join} from 'path';
import * as compression from 'compression';

import {readFileSync} from 'fs';
import * as domino from 'domino';
const MockBrowser = require('mock-browser').mocks.MockBrowser;
const mock = new MockBrowser();

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 5100;
const DIST_FOLDER = join(process.cwd(), 'dist');


// Our index.html we'll use as our template
const template = readFileSync(join(DIST_FOLDER, 'browser', 'index.html')).toString();

const win = domino.createWindow(template);

global['window'] = win;
Object.defineProperty(win.document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true
    };
  },
});

global['document'] = win.document;
global['CSS'] = null;
//global['Prism'] = null;
//global['navigator'] = null;

global['navigator'] = mock.getNavigator();
// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./dist/server/main');
//?? Check const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./dist/server/main.bundle');


// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));
app.use(compression({filter: shouldCompress}));

function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }

  // fallback to standard filter function
  return compression.filter(req, res)
}


// Server static files from /browser

app.get('*.*', express.static(join(DIST_FOLDER, 'browser'), {
  maxAge: '1y', index: false
}));

// ALl regular routes use the Universal engine
app.get('/ngsw_worker.es6.js.map', (req, res) => {
  console.log("Serving Route: ",req.originalUrl)
  console.log("This is invalid request- beacuase of .map file request generated as part of prod");

  res.status(404);
  // !!! this is the important part
    res.flush()
});


// ALl regular routes use the Universal engine
app.get('*', (req, res) => {
  console.log("Serving Route: ",req.originalUrl)
  res.render('index', { req });
  // !!! this is the important part
  res.flush()
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
