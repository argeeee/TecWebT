const http = require('http');
const fs = require('fs');
const process = require('process');
const readline = require('readline');

const hostname = '127.0.0.1';
const port = 3000;

function countWords(str) {
  const arr = str.split(/[ \t\r\n]+/);
  return arr.filter(word => word !== '').length;
}

const server = http.createServer((req, res) => {
  const { method, url } = req;
  console.log(method, url);

  switch (url) {
    case '/':
      return index(req, res); 
    case '/second':
      return second(req, res); 
    case '/third':
      return third(req, res); 
    
    default:
      return index(req, res); 
  }
});

const index = (req, res) => {
  fs.readFile('file.txt', function(err, data) {
    if (err) {
      return res.end('error: unknown');
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.write(countWords(data.toString('utf8')).toString());
    return res.end();
  });
};


const second = async (req, res) => {
  const rl = readline.createInterface({
    input: fs.createReadStream("Sympathy_for_the_Devil.txt"),
    output: process.stdout,
    terminal: false,
  });

  let maxLength = 0;
  let currLine = 1;
  let resultLine = -1;

  for await (const line of rl) {
    const length = countWords(line);
    if (length > maxLength) {
      resultLine = currLine;
      maxLength = length;
    }
    currLine += 1;
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(resultLine.toString());

};



const third = async (req, res) => {

};

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});