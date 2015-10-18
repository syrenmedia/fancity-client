

import http from 'http';
import alert from './fandive/api';

import React from 'react';
import ReactDOM from 'react-dom';

var grouper = function( name, dir ) {
  console.group( `${name}:` );
  console.dir( dir );
  console.groupEnd();
};

grouper('http:', http);
grouper('React:', React);
grouper('ReactDOM:', ReactDOM);

var div;
document.body.appendChild( div = document.createElement( 'div' ) );
div.innerHTML = 'hello sports';
div.style.color = 'white';
