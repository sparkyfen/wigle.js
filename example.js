var wigle = require('./index.js');

// Get your user information
wigle.login('testUser', 'testPassword', function (error, results) {
  if(error) {
    return console.log(error);
  }
  console.log(results);
  wigle.getUser(function (error, results) {
    if(error) {
      return console.log(error);
    }
    console.log(results);
  });
});

// Search for a network
wigle.login('testUser', 'testPassword', function (error, results) {
  if(error) {
    return console.log(error);
  }
  console.log(results);
  wigle.search({
    latrange1: '',
    latrange2: '',
    longrange1: '',
    longrange2: '',
    variance: '0.010',
    netid: 'XX:XX:XX:XX:XX:XX', // Can also be first 3 octets (XX:XX:XX)
    ssid: 'mySSID',
    lastupdt: '',
    addresscode: '',
    statecode: '',
    zipcode: '',
    page: 1
  }, function (error, results) {
    if(error) {
      return console.log(error);
    }
    console.log(results);
  });
});

// Get data about a particular network
wigle.login('testUser', 'testPassword', function (error, results) {
  if(error) {
    return console.log(error);
  }
  console.log(results);
  wigle.location({
    netid: 'XX:XX:XX:XX:XX:XX',
    operator: '',
    lac: '',
    cid: '',
    system: '',
    network: '',
    basestation: ''
  }, function (error, results) {
    if(error) {
      return console.log(error);
    }
    console.log(results);
  });
});