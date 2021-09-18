const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;


  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Greetings</title><head>');
    res.write('<h1>Welcome to my lesson 1 NodeJS server.</h1>');
    res.write('<h3>Please enter user name</h3>');
    res.write('<body><form action="/create-users" method="POST"><input type="text" name="users"><button type="submit">Send</button></form></body>');
    res.write('</html');
    return res.end(); 
  }
  //found in redirecting Requests video
  if (url === '/create-users' && method === 'POST') { 
    const body= [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const userName = parsedBody.split('=')[1];
      fs.writeFile('message.txt', userName, err => {
        res.statusCode = 302;
        res.setHeader('Location', '/users');
        console.log('Username is ' + userName);
        return res.end();
      });
    });
  }
  if (url === '/users') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Users</title><head>');
    res.write('<body><ul>');  //<li>User 1</li>');
    for (const activity of activities) {
      res.write(`<li>${activity}</li>`);
    }

    res.write('<li>User 2</li></ul></body>');
    res.write('</html');
    res.end();
  }
};

module.exports = {
  handler: requestHandler
};