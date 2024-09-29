const http = require('http');
const fs = require('fs');
const url = require('url');
const Utils = require('./modules/utils');
const en = require('./lang/en/en');  

class Server {
    constructor() {
        this.port = process.env.PORT || 3000;
    }

    start() {
        http.createServer((req, res) => {
            const q = url.parse(req.url, true);
            const path = q.pathname;
            const query = q.query;

            if (path === "/COMP4537/labs/3/getDate") {
                this.handleGetDate(query.name, res);
            } else if (path === "/COMP4537/labs/3/writeFile") {
                this.handleWriteFile(query.text, res);
            } else if (path.startsWith("/COMP4537/labs/3/readFile")) {
                this.handleReadFile(res);
            } else {
                this.handleNotFound(res);
            }
        }).listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }

    // Part B: API Call to Get Date
    handleGetDate(name, res) {
        const userName = name || "Guest";
        const currentTime = Utils.getDate();
        const message = `${en.greeting(userName)} ${en.serverTime(currentTime)}`;
        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(message);
    }

    // Part C.1: Write to File
    handleWriteFile(text, res) {
        const filePath = 'file.txt';
        const fileText = text || '';

        fs.appendFile(filePath, fileText + '\n', (err) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('<h1>Error writing to file</h1>');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end('<h1>Successfully appended to file.txt</h1>');
            }
        });
    }

    // Part C.2: Read from File
    handleReadFile(res) {
        const filePath = './file.txt';

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Error: File not found</h1>');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(`<pre>${data}</pre>`);
            }
        });
    }

    handleNotFound(res) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
    }
}


const server = new Server();
server.start();