+function (undefined) {
  "use strict";

  var mock       = require("mock-data")
  ,   SyncStream = require("sync-streams")
  ,   fs         = require("fs")
  ,   path       = require("path")
  ,   util       = require("util");

  var args  = require("./util/argv")(process.argv)
  ,   count = args.rows
  ,   types = args.types
  ,   oFile = args.file ? path.resolve(args.file) : null;

  var Generator = require("./lib/generator")
  ,   Parser    = require("./lib/parser");

  var source = new Generator(count, types)
  ,   parser = new Parser(types.join(','));

  var output;
  if (oFile) {
    output = fs.createWriteStream(oFile);
  } else {
    output = process.stdout;
  }

  source.pipe(parser).pipe(output);

}();
