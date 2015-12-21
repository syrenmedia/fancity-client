'use strict';

/***
 * This is a simple shelljs script for cleaning a dir
 * from package.json config block
 */

var
  util = require( 'util' ),
  config = require( '../package.json' ).config,
  shell = require( 'shelljs' ),
  chalk = require( 'chalk' );

// could cause problems
chalk.enabled = true;

util.log( chalk.cyan( 'Starting Clean Task' ));
shell.rm( '-rf', config.cleanDir );
util.log( chalk.green( 'Folder cleaned: ' + config.cleanDir ));
