const mysql = require('mysql');
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true
});

var randomPersonGenerator = (function(){
  var 
    getRandomPerson = function(callback) {
      // put this in a stored procedure. 
      var nameGender =
          'SELECT first_name.name first, ' +
          '(SELECT last_name.name ' +
          'FROM last_name ' +
          'WHERE RAND()<=(5/(SELECT COUNT(name) FROM last_name))LIMIT 1) last, ' +
          'first_name.gender gender ' +
          'FROM first_name WHERE RAND()<=(5/(SELECT COUNT(name) FROM first_name)) LIMIT 1;';
      var template = 'SELECT type, value FROM email_name_template ORDER BY RAND() LIMIT 1;';
      var emailServer = 'SELECT value FROM email_server ORDER BY RAND() LIMIT 1;';
      var tld = 'SELECT value FROM top_level_domain ORDER BY RAND() LIMIT 1;';
      
      pool.query(nameGender + template + emailServer + tld, 
                 function(err, result, fields){
        return callback(result)
      });
    },
    getSsn = function() {
      var area = getRandomNumber(100, 1000);
      var group = getRandomNumber(10, 100);
      var sn = getRandomNumber(1000, 10000);
      
      return area + '-' + group + '-' + sn;
    },
    getEmail = function(firstName, lastName, nameTemplate, server, topLevelDomain) {
      // break domain into server/domain in the database to randomize a little more.
      var address;
      if (nameTemplate.type == 'SUFFIX') {
        address = firstName + nameTemplate.value;
      } else if (nameTemplate.type == 'PREFIX') {
        address = nameTemplate.value + firstName;
      } else if (nameTemplate.type == 'INTERFIX') {
        if (useFullName()) {
          address = firstName + nameTemplate.value + lastName;
        } else {
          address = firstName.charAt(0) + nameTemplate.value + lastName;
        }
      }
      address += '@';
      address += server;
      address += '.' + topLevelDomain;
      
      return address;
    },
    useFullName = function() {
      var value = getRandomNumber(0, 20);
      return (value % 2 == 0);
    },
    getRandomNumber = function(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    init = function() {
    };
  
  return {
    init: init,
    getRandomPerson: getRandomPerson,
    getSsn: getSsn,
    getEmail: getEmail
  };
})();

exports.randomPersonGenerator = randomPersonGenerator;