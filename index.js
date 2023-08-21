const http = require("node:http");
const path = require("node:path");
const fs = require("node:fs");

const server = http.createServer((req, res) => {
  fs.readFile(path.join(__dirname, "index.html"), (err, content) => {
    if (err) throw err;
    res.writeHead(200, { "Content-type": "text/html" });
    res.end(content);
  });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log("server running on port: " + PORT));
