/**
 * Created by murta on 07/05/15.
 */
var express = require('express');
var app = express();
app.use(express.static('.'));
app.listen(process.env.PORT || 3000);