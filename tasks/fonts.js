'use strict';

var
  path = require( 'path' ),
  util = require( 'util' ),
  chalk = require( 'chalk' ),
  shell = require( 'shelljs' ),
  config = require( '../package.json' ).config,
  symlink = require( './symlink' ),
  copyInsteadOfLink = symlink.copyInsteadOfLink,
  destDir = path.join( config.buildDir, 'fonts' ),
  fontsToLink;

if ( require.main === module ) {
  // Get all the Font filenames
  fontsToLink = config.vendorFonts
    .reduce(
      ( files, folder ) => files.concat( symlink.findFilesInDir( folder )),
      []
    )
    .filter( fileName => !config.vendorFonts.some( original => original === fileName ));

  util.log( `${copyInsteadOfLink ? 'copying' : 'linking'} font files` );

  if ( !shell.test( '-d', destDir )) {
    shell.mkdir( '-p', destDir );
    util.log( `creating folder: ${chalk.magenta( destDir )}` );
  }

  fontsToLink.forEach( function( fileName ) {
    var destFileName = path.join( destDir, path.basename( fileName ));

    if ( copyInsteadOfLink ) {
      symlink.copyFile( fileName, destFileName );
    } else {
      symlink.symlinkFile( fileName, destFileName );
    }
  });

  // Done
  util.log( chalk.green( 'symlinking done' ));
}
