'use strict';

var
  extraConfig = {},
  packageConfig = require( './package.json' ).config.postcss;

extraConfig[ 'postcss-import' ] = {
  onImport: function( sources ) {
    global.watchCSS( sources );
  }
};

module.exports = Object.assign( packageConfig, extraConfig );
