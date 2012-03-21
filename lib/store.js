var fs = require('fs');

var hashes = {};
var urls = {};

var file = 'links.txt';

var links = fs.readFileSync( file, 'ascii' ).trim().split("\n");

links.forEach(function(row){
  var parts = row.split("\t");
  hashes[ parts[0] ] = parts[1];
  urls[ parts[1] ] = parts[0];
});

var log = fs.createWriteStream(file, { flags: 'a',
  encoding: null,
  mode: 0666 }
);

var save = exports.save = function( longUrl, hash ){
  hashes[ hash ] = longUrl;
  urls[ longUrl ] = hash;
  log.write([ hash, longUrl ].join("\t") + "\n" );
};

var findHash = exports.findHash = function( longUrl, handle ){
  var hash = urls[ longUrl ];
  if( hash === undefined ) {
    hash = handle( longUrl );
    save( longUrl, hash );
  }
  return hash;
};

var findUrl = exports.findUrl = function( hash ){
  return hashes[ hash ];
};
