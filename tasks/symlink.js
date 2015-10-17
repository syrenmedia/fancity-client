'use strict';

/*
 * This is a shelljs script for symlinking or copying files
 * that do not need a more complex build step.
 * Configuration is done from package.json config block
 */

// Import packages and create module vars
var
  path = require( 'path' ),
  util = require( 'util' ),
  config = require( '../package.json' ).config,
  chalk = require( 'chalk' ),
  shell = require( 'shelljs' ),
  // config vars
  sourceDir = config.srcDir,
  buildDir = config.buildDir,
  symlinkExpression = config.symlinkExpression,
  // script args
  copyInsteadOfLink = process.argv.some( arg => arg.match( /^copy$/ )),
  // script vars (functions)
  findFilesInDir,
  symlinkFile,
  copyFile,
  filesToLink,
  logDebug = false;

// force chalk to color output
// could cause problems
chalk.enabled = true;

/**
 * Use shelljs.find to find all files in a dir
 * filter those files by the symlinkExpression in package.json config
 *
 * @param {String} dir - the directory to start searching from
 * @param {RegExp} [matchExpression] - a regular expression to filter file names against with `fileName.match( matchExpression )`
 * @returns {Array.<string>} - an array of string file names
 */
findFilesInDir = function( dir, matchExpression ) {
  if ( matchExpression == null ) {
    return shell.find( dir );
  }

  return shell.find( dir ).filter( fileName => fileName.match( matchExpression ));
};

/**
 * Use shelljs.ln to symlink a file from source to dest
 * this is used for dev tasks so that extra watchers are not needed
 * to create a smooth dev refresh process
 *
 * @param {string} source - the source file name
 * @param {string} dest - the destination file name
 * @returns {*} - whatever shell.ln returns
 */
symlinkFile = function( source, dest ) {
  util.log( `making symlink\n\tfrom: ${chalk.cyan( source )}\n\tto: ${chalk.magenta( dest )}` );
  return shell.ln( '-s', source, dest );
};

/**
 * Use shelljs.cp to copy a file from source to dest
 * this is used for production builds.
 *
 * @param {string} source - the source file name
 * @param {string} dest - the destination file name
 * @returns {*} - whatever shell.cp returns
 */
copyFile = function( source, dest ) {
  util.log( `making copy\n\tfrom: ${chalk.cyan( source )}\n\tto: ${chalk.magenta( dest )}` );
  return shell.cp( source, dest );
};

// Export for use by another task?
module.exports = {
  copyInsteadOfLink: copyInsteadOfLink,
  findFilesInDir: findFilesInDir,
  symlinkFile: symlinkFile,
  copyFile: copyFile
};

/*
  START PROCESSING
   - only if called directly
*/
if ( require.main === module ) {
  // Find files to symlink or copy and log result
  filesToLink = findFilesInDir( sourceDir, symlinkExpression );
  util.log( `${copyInsteadOfLink ? 'copying' : 'linking'} files: `, filesToLink );

  // process files
  filesToLink.forEach( function( fileName ) {
    var
      destFileName = fileName.replace( sourceDir, buildDir ),
      folder = path.dirname( destFileName );

    if ( logDebug ) {
      util.log({
        fileName: fileName,
        destFileName: destFileName,
        folder: folder
      });
    }

    // add directories as needed
    if ( !shell.test( '-d', folder )) {
      shell.mkdir( '-p', folder );
      util.log( `creating folder: ${chalk.magenta( folder )}` );
    }

    if ( copyInsteadOfLink ) {
      copyFile( fileName, fileName.replace( sourceDir, buildDir ));
    } else {
      symlinkFile( fileName, fileName.replace( sourceDir, buildDir ));
    }
  });

  // Done
  util.log( chalk.green( 'symlinking done' ));
}
