const http = require('http');
const hostname = 'localhost';
const port = 8080;
const server = http.createServer((req, res) => {
    res.end('Welcome to node!');
});
server.listen(port, hostname, () => {
    console.log(`Server running at ${hostname}:${port}`)
});