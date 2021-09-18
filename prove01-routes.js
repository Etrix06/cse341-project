const fs = require('fs');

const usersArray = [];
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
      console.log('Body is '+ body);
      const parsedBody = Buffer.concat(body).toString();
      const userName = parsedBody.split('=')[1];
      console.log('inside req.on data, userName is ' + userName);
    });
    
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const userName = parsedBody.split('=')[1];

      fs.writeFile('message.txt', userName, err => {
        res.statusCode = 302;
        res.setHeader('Location', '/users');
        usersArray.push(userName);
        console.log('Username is ' + userName);
        console.log('in req.on end, usersArray is ' + usersArray);
        return res.end();
      });
    });
          
  }
  if (url === '/users') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Users</title><head>');
    res.write('<body><h1>User List:</h1>');  
    res.write('<ul>');  
    for (const userList of usersArray) {
      res.write(`<li>${userList}</li>`);
    }
    res.write('</ul>');  
    res.write('<br><a href="/">Back to Home</a></br>');
    res.write('</html');
    res.end();
  }
};

module.exports = {
  handler: requestHandler
};