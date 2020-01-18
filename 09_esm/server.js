import express from 'express';
const app = express();

// respond with "Hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
    res.send('Hello, world');
});

app.listen(3000, () => console.log('Example app listening on port 3000! Open http://localhost:3000/'));
