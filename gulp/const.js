'use strict';

import util from 'gulp-util';
import moment from 'moment';
import pkg from '../package.json';

import {ENV} from './utils.js';

var infos = {
  file: '',
  pkg: pkg,
  today: moment(new Date()).format('DD/MM/YYYY'),
  year: new Date().toISOString().substr(0, 4),
  urlToCommit: null
};

//retrieve and reformat repo url from package.json
if (typeof(pkg.repository) === 'string') {
  infos.urlToCommit = pkg.repository;
}
else if (typeof(pkg.repository.url) === 'string') {
  infos.urlToCommit = pkg.repository.url;
}

var tpl = [
  '',
  '<%= pkg.name %>',
  '',
  '<%= pkg.description %>',
  '',
  '@version v<%= pkg.version %> - <%= today %>',
  '@author <%= (pkg.author && pkg.author.name) ? pkg.author.name : pkg.author %>',
  '@copyright <%= year %>(c) <%= (pkg.author && pkg.author.name) ? pkg.author.name : pkg.author %>',
  '@license <%= pkg.license %>'
];

if(ENV === 'test'){
  tpl = [].concat(tpl,
    '',
    'THIS IS A TEST VERSION',
    'This version is not meant for production but for testing purpose only'
  );
}

tpl = tpl.join('\n * ');

/**
 * The banner is the comment that is placed at the top of our compiled
 * source files. It is first processed as a Gulp template, where the `<%=`
 * pairs are evaluated based on this very configuration object.
 */
export const BANNER = util.template(
  '/**' + tpl + '\n */\n', infos);

/**
 * This banner is meant to be put in the html file, at the end
 */
export const BANNER_HTML = util.template(
  '<!--' + tpl + '\n-->\n', infos);
