/**
 * Created by murta on 07/05/15.
 */
var express = require('express');
var app = express();
app.use(express.static('.'));
app.listen(process.env.PORT || 3000);

app.get("/rest/getenv", function(req, res) {
    var env = process.env.ENV_VARIABLE || 'http://localhost:5000';
    res.json({backend: env});
});