const express = require('express');
const app = express();
const api = require('./api');

app.use(express.static('public'));
app.use(express.static('dist'));

api(app);

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
    console.log('Your app is listening on port ' + listener.address().port);
});
