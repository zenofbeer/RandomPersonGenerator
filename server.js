// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const pug = require('pug');
var randomPersonGenerator = require('./public/randomPersonGenerator.js');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.set('json spaces', 2);

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  var generator = randomPersonGenerator.randomPersonGenerator;
  var ssn = generator.getSsn();
  generator.getRandomPerson(function(result){
    var first = result[0][0].first;
    var last = result[0][0].last;
    last = 
        last.charAt(0).toUpperCase() +
        last.slice(1).toLowerCase();
    var gender = result[0][0].gender;
    var email = 
        generator.getEmail(
          first, last, 
          result[1][0], 
          result[2][0].value, 
          result[3][0].value);
    var output = buildResponse(result);
    output.title = 'Random Person Generator!';
    response.render(__dirname + '/views/randomperson.pug',
                   output);
  });
});

app.get('/randomPerson', function(request, response){
  var generator = randomPersonGenerator.randomPersonGenerator;
  generator.getRandomPerson(function(result){
    var output = buildResponse(result);
    response.json(output);
  })
});

var buildResponse = function(rawResult) {
  var generator = randomPersonGenerator.randomPersonGenerator;
  var ssn = generator.getSsn();
  var firstName = rawResult[0][0].first;
  var lastName = rawResult[0][0].last;
    lastName = lastName.charAt(0).toUpperCase() +
      lastName.slice(1).toLowerCase();
  var gender = rawResult[0][0].gender;
  var email =
      generator.getEmail(firstName, lastName, rawResult[1][0],
                        rawResult[2][0].value,
                        rawResult[3][0].value);
  return {
    firstname: firstName,
    lastname: lastName,
    gender: gender,
    email: email,
    ssn: ssn
  }
}

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
