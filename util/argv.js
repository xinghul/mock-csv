+function(undefined) {
    "use strict";

    var program = require("commander");

    function collect(str, arr) {
      if (typeof str === "string") {
        arr = str.split(',');
      }

      return arr;
    }

    program
      .version("2.1.0")
      .usage("[-r <rows>][-f <file>]")
      .option("-r, --rows <rows>", "Specify how many rows of records to generate", parseInt, 10)
      .option("-f, --file <file>", "Specify the output file")
      .option("-t, --types <type1,type2,...>", "Specify the type of columns", collect, []);

    program.on("--help", function(){
      console.log("  Examples:");
      console.log("");
      console.log("    $ node index -r 100");
      console.log("    $ node index --rows 100");
      console.log("");
    });

    module.exports = function(argv) {
      program.parse(argv);

      return program;
    };

}();
