var express = require('express');
var app = express();

var port = process.env.PORT || 3000;
app.use(express.static('./'));
app.get('/', function(req, res) {
    res.render('index.html');
});
app.listen(port, function(err) {
    console.log('running server on: http://localhost:' + port);
})