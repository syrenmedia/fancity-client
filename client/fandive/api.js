
import grouper from '../lib/grouper';
import Firebase from 'firebase';

var fdb = new Firebase( 'https://flickering-heat-1417.firebaseio.com/' );

grouper( 'fdb', fdb );


export default ( ...args ) => alert( ...args );
