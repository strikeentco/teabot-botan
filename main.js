'use strict';

var https = require('https');
var qs = require('querystring');

var opts = {
  hostname: 'api.botan.io',
  path: '/',
  method: 'POST',
  headers: {}
};

function request(opts, data) {
  return new Promise(function (resolve, reject) {
    https.request(opts, function (res) {
      var d = '';

      res.on('data', function (chunk) {
        d += chunk;
      });

      res.on('end', function () {
        resolve(d);
      });
    })
    .on('error', reject)
    .end(data);
  });
}

function TeabotBotanPlugin(token, opts) {
  if (!(this instanceof TeabotBotanPlugin)) {
    return new TeabotBotanPlugin(token, opts);
  }

  if (!token) {
    throw new Error('Analytics token not provided!');
  }

  opts || (opts = {});

  this._pluginType = 'analytics';
  this._pluginData = {
    token: token
  };
  this._pluginOptions = {
    manualMode: opts.manualMode || false
  };
}

TeabotBotanPlugin.prototype._getType = function () {
  return this._pluginType;
};

TeabotBotanPlugin.prototype._getData = function (name) {
  return this._pluginData[name] || false;
};

TeabotBotanPlugin.prototype._getOption = function (name) {
  return this._pluginOptions[name] || false;
};

TeabotBotanPlugin.prototype._track = function (uid, data, event) {
  opts.headers['content-type'] = 'application/json';
  opts.path = '/track?' + qs.stringify({ token: this._getData('token'), uid: uid, name: event });

  return request(opts, JSON.stringify(data)).then(JSON.parse);
};

TeabotBotanPlugin.prototype.shortenUrl = function (uid, url) {
  opts.headers['content-type'] = 'application/x-www-form-urlencoded';
  opts.path = '/s/';

  return request(opts, qs.stringify({ token: this._getData('token'), user_ids: uid, url: url }));
};

module.exports = TeabotBotanPlugin;
