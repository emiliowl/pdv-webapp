/**
 * Created by murta on 07/05/15.
 */
var express = require('express');
var cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'msitbrasil',
    api_key: '224195695462522',
    api_secret: 'VmfK4ppoLRuUO8-__31gIlEbINw'
});

var app = express();

app.use(express.static('.'));
app.listen(process.env.PORT || 3000);

app.get("/rest/getenv", function(req, res) {
    var env = process.env.ENV_VARIABLE || 'http://localhost:5000';
    res.json({backend: env});
});

app.delete("/rest/image", function(req, res) {
    cloudinary.uploader.destroy(req.param('imageId'), function(result) { console.log(result) });
});