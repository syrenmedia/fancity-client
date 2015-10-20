/**
 * Log helper
 */
var grouper;

export default grouper = function( name, ...dirs ) {
  console.group( `${name}:` );
  dirs.forEach( dir => console.dir( dir ));
  console.groupEnd();
};
