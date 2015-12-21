

import http from 'http';
//import alert from './fandive/api';

import React from 'react';
import ReactDOM from 'react-dom';

var grouper, div;

grouper = function( name, ...dirs ) {
  console.group( `${name}:` );
  dirs.forEach( dir => console.dir( dir ));
  console.groupEnd();
};

grouper( 'http', http );
grouper( 'React', React );
grouper( 'ReactDOM', ReactDOM );

div = document.createElement( 'div' );
div.innerHTML = 'hello sports';
div.style.color = 'white';
document.body.appendChild( div );
