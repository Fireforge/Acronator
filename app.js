var express = require('express');
var app = express();

app.configure(function(){
    app.use(
        '/',
        express.static(__dirname)
        );
    app.use(express.static('/data'));
    app.use(express.static('/bower_components'));
});

app.listen(3000);
console.log('Listening to port 3000...');