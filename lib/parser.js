+function (undefined) {
  "use strict";

  var stream     = require("stream")
  ,   util       = require("util");

  var Transform  = stream.Transform || require("readable-stream").Transform;

  function Parser(header) {
    var options = {};
    options.objectMode = true;

    this.header = header;

    Transform.call(this, options);
  };
  util.inherits(Parser, Transform);

  Parser.prototype._transform = function(chunk, encoding, __callback) {
    if (chunk) {
      if (this.header) {
        this.push(this.header + "\n");
        this.header = null;
      }
      this.push(chunk.join(",") + "\n");
    } else {
      this.push(null);
    }
    __callback();
  };

  module.exports = Parser;

}();
