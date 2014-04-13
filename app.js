var express = require('express');
var app = express();

app.use('/', express.static(__dirname));
app.use(express.static('/data'));
app.use(express.static('/bower_components'));

var port = Number(process.env.PORT || 8000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
