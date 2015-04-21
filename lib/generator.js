+function(undefined) {
  "use strict";

  var mock       = require("mock-data")
  ,   SyncStream = require("sync-streams");

  function Generator() {
    var args = [].slice.call(arguments)
    ,   options = {};

    if (1 === args.length) {
      options = args[0];
    } else if (2 === args.length) {
      if (typeof args[0] === "number") {
        options.count = args[0];
        options.types = Array.isArray(args[1]) ? args[1] : null;
      } else if (typeof args[1] === "number") {
        options.count = args[1];
        options.types = Array.isArray(args[0]) ? args[0] : null;
      }
    }

    return this._init(options);
  }

  Generator.prototype = {
    _streams: null,
    _output: null,

    _init: function(options) {
      var count = options.count > 0 ? options.count : 10
      ,   types = [];

      if (options.types && options.types.length) {
        types = options.types;
      } else {
        types = ["integer", "date", "ipv4"];
      }

      this._streams = [];
      for (var i = 0; i < types.length; i++) {
        this._streams.push(mock.generate({type: types[i], count: count}));
      }

      this._output = new SyncStream(this._streams);

      return this;
    },

    pipe: function(writable) {
      if (this._output) {
        return this._output.pipe(writable);
      }

      return this;
    }

  };

  module.exports = Generator;

}();
