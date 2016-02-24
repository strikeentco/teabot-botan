'use strict';

var should = require('should/as-function');
var token = process.env.BOTAN_TOKEN;
var botan = require('../main')(token);

describe('teabot-botan()', function () {
  it('should throw Error', function () {
    should(require('../main')).throw('Analytics token not provided!');
  });

  describe('._getType()', function () {
    it('should be equal analytics', function () {
      should(botan._getType()).be.eql('analytics');
    });
  });

  describe('._getData()', function () {
    it('should be equal token', function () {
      should(botan._getData('token')).be.eql(token);
    });

    it('should be false', function () {
      should(botan._getData()).be.false();
    });
  });

  describe('._getOption()', function () {
    it('should be false', function () {
      should(botan._getOption('manualMode')).be.false();
    });

    it('should be false', function () {
      should(botan._getOption()).be.false();
    });
  });

  describe('._track()', function () {
    it('should be ok', function () {
      return botan._track(100000, { text: 'test' }, 'Test event').then(function (res) {
        should(res).be.eql({ status: 'accepted' });
      });
    });
  });

  describe('.shortenUrl()', function () {
    it('should be url', function () {
      return botan.shortenUrl(100000, 'https://github.com/strikeentco/teabot').then(function (res) {
        should(res).startWith('https://telgr.me/');
      });
    });
  });
});
