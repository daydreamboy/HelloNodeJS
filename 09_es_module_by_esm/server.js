import http from 'http';
// Note: must append js when set "type": "module" in package.json
// import app from './app.js';
import app from './app';

const server = http.Server(app);
server.listen(3000, () => {
    return true;
});
