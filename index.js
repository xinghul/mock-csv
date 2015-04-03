+function (undefined) {
  "use strict";

  var mock       = require("mock-data")
  ,   syncStream = require("sync-streams")
  ,   stream     = require("stream")
  ,   fs         = require("fs");


  var rInt  = mock.generate({type: "integer", count: 10})
  ,   rDate = mock.generate({type: "date", count: 10})
  ,   rIpv4 = mock.generate({type: "ipv4", count: 10});

  var writeStream = fs.createWriteStream("./output.csv", {objectMode: true})
  ,   readStream  = new stream.Readable();


  syncStream.add(rInt).add(rDate).add(rIpv4);

  syncStream.pipe(readStream);

  readStream.on("data", function (data) {
    console.log(data);
  });

  // syncStream.on("data", function (data) {
  //   console.log(data);
  //   this.write(data.join(',') + "\n");
  // });
  // syncStream.on("end", function() {
  //   console.log("end");
  // });
  // syncStream.on("error", function (error) {
  //
  // });
}();
