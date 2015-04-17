+function (undefined) {
  "use strict";

  var mock       = require("mock-data")
  ,   SyncStream = require("sync-streams")
  ,   stream     = require("stream")
  ,   fs         = require("fs")
  ,   util       = require("util");

  var Transform  = stream.Transform || require("readable-stream").Transform;

  var types = ["integer", "ipv4", "boolean"];

  var Generator = require("./lib/generator")
  ,   Parser    = require("./lib/parser");

  var source = new Generator(10, types)
  ,   parser = new Parser(types.join(','));

  source.pipe(parser).pipe(process.stdout);

}();
