const http = require("node:http");
const path = require("node:path");
const fs = require("node:fs");

const server = http.createServer((req, res) => {
  // build the path
  const filePath = path.join(
    __dirname,
    req.url === "/" ? "index.html" : `${req.url}.html`
  );

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        fs.readFile(path.join(__dirname, "404.html"), (err, content) => {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(content, "utf-8");
        });
      } else {
        res.writeHead(500);
        res.end(`server error : ${err.code}`);
      }
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(content, "utf-8");
    }
  });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log("server running on port: " + PORT));
