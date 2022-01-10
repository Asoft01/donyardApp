const express = require('express');
const path = require('path');

const app = express();


// Serve only the static files from the dist directory
app.use(express.static('./dist/donyard'));
    app.get('/*', function(req, res) {
        res.sendFile('index.html', {root: 'dist/donyard/'}
    );
});

app.listen(process.env.PORT || 8080);

