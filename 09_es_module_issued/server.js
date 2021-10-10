import http from 'http';
import app from './app';

const server = http.Server(app);
server.listen(3000, () => {
    return true;
});
