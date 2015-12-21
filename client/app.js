
// debug
import grouper from './lib/grouper';

import http from 'http';
import fdapi from './fandive/api';

import React from 'react';
import ReactDOM from 'react-dom';

import components from './components/components';

var div;

grouper( 'http', http );
grouper( 'React', React );
grouper( 'ReactDOM', ReactDOM );

div = document.createElement( 'div' );
div.innerHTML = 'hello sports';
div.style.color = 'white';
document.body.appendChild( div );
