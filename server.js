const express = require('express');
const app = express();
const axios = require('axios');

app.use(express.static('public'));
app.use(express.static('dist'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
    response.sendFile(__dirname + '/dist/index.html');
});

app.get('/board', async (request, response) => {
    const { data } = await axios.get(`https://00000000.atlassian.net/rest/agile/1.0/board/52/configuration`, {
        auth: {
            username: 'test',
            password: 'Admin123'
        }
    });
    response.send(data);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
    console.log('Your app is listening on port ' + listener.address().port);
});
