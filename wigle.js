'use strict';

var validator = require('validator');
var request = require('request');
request = request.defaults({jar: true});

exports.login = function (username, password, callback) {
  var options;
  if(username instanceof Object && typeof(password) === 'function') {
    options = username;
    callback = password;
  }
  if(typeof(callback) !== 'function') {
    throw new Error('Missing callback function.');
  }
  options = {
    credential_0: username,
    credential_1: password,
    destination: '/',
    noexpire: 'on'
  };
  request.post('https://wigle.net/site/site/login', {form: options}, function (error, resp, body) {
    if(error) {
      return callback(error);
    }
    if(resp.statusCode === 200 && resp.headers['set-cookie'].length > 0) {
      return callback(null, 'Successful login.');
    } else {
      return callback('Login failed, status code was: ' + resp.statusCode);
    }
  });
};

exports.getUser = function (callback) {
  if(typeof(callback) !== 'function') {
    throw new Error('Missing callback function.');
  }
  request.post('https://wigle.net/api/v1/jsonUser', function (error, resp, body) {
    if(error) {
      return callback(error);
    }
    if(resp.statusCode === 200) {
      body = JSON.parse(body);
      if(body.success) {
        return callback(null, body);
      } else {
        return callback(body);
      }
    } else {
      return callback('Get user failed, status code was: ' + resp.statusCode);
    }
  });
};

exports.search = function (options, callback) {
  if(!options instanceof Object) {
    throw new Error('Missing options object.');
  }
  if(typeof(callback) !== 'function') {
    throw new Error('Missing callback function.');
  }
  if(!options.page) {
    options.page = 1;
  }
  options.first = options.page * 100;
  options.last = options.first + 100;
  delete options.page;
  options.Query = 'Query';
  request.post('https://wigle.net/api/v1/jsonSearch', {form: options}, function (error, resp, body) {
    if(error) {
      return callback(error);
    }
    if(resp.statusCode === 200) {
      body = JSON.parse(body);
      if(body.success) {
        return callback(null, body);
      } else {
        return callback(body);
      }
    } else {
      return callback('Search failed, status code was: ' + resp.statusCode);
    }
  });
};

exports.location = function (options, callback) {
  if(!options instanceof Object) {
    throw new Error('Missing options object.');
  }
  if(typeof(callback) !== 'function') {
    throw new Error('Missing callback function.');
  }
  if(!options.netid) {
    return callback('Missing network id.');
  }
  request.post('https://wigle.net/api/v1/jsonLocation', {form: options}, function (error, resp, body) {
    if(error) {
      return callback(error);
    }
    if(resp.statusCode === 200) {
      body = JSON.parse(body);
      if(body.success) {
        return callback(null, body);
      } else {
        return callback(body);
      }
    } else {
      return callback('Location lookup failed, status code was: ' + resp.statusCode);
    }
  });
};