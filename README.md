teabot-botan  [![License](https://img.shields.io/github/license/strikeentco/teabot-botan.svg)](https://github.com/strikeentco/teabot-botan/blob/master/LICENSE) [![npm](https://img.shields.io/npm/v/teabot-botan.svg)](https://www.npmjs.com/package/teabot-botan) [![npm](https://img.shields.io/badge/teabot-plugin-blue.svg)](https://github.com/strikeentco/teabot/tree/master/docs/PLUGINS.md)
==========
[![Build Status](https://travis-ci.org/strikeentco/teabot-botan.svg)](https://travis-ci.org/strikeentco/teabot-botan) [![node](https://img.shields.io/node/v/teabot-botan.svg)](https://www.npmjs.com/package/teabot-botan) [![Test Coverage](https://codeclimate.com/github/strikeentco/teabot-botan/badges/coverage.svg)](https://codeclimate.com/github/strikeentco/teabot-botan/coverage) [![bitHound Score](https://www.bithound.io/github/strikeentco/teabot-botan/badges/score.svg)](https://www.bithound.io/github/strikeentco/teabot-botan)

`teabot-botan` a Botan.io analytics [plugin](https://github.com/strikeentco/teabot/tree/master/docs/PLUGINS.md) for [TeaBot](https://github.com/strikeentco/teabot).

# Usage

```sh
$ npm install teabot-botan --save
```

You also should install [TeaBot](https://github.com/strikeentco/teabot).

```js
var TeaBot = require('teabot')('TELEGRAM_BOT_TOKEN', 'TELEGRAM_BOT_NAME');

TeaBot.use('analytics', require('teabot-botan')('BOTAN_TOKEN'));

TeaBot.defineCommand(function(dialog, message) {
  dialog.sendMessage('Echo: ' + message.text); // all message events will be sent directly to botan.io
});

TeaBot.startPolling();
```
By default analytics is disabled for `inline mode`, but you can enable it with `allowQuery` option.

You can use `teabot-botan` in manual mode with `TeaBot.track()` method and `manualMode` option:
```js
TeaBot.use('analytics', require('teabot-botan')('BOTAN_TOKEN', {manualMode: true}));

TeaBot.defineCommand(function(dialog, message) {
  dialog.sendMessage('Echo: ' + message.text);
  TeaBot.track(dialog.userId, message, message.getCommand());
});
```

Also you can use `shortenUrl` method, it will create shortened url. `shortenUrl` is external method for `TeaBot`, so you should use it by using `TeaBot.getPlugin()` method:
```js
TeaBot.use('analytics', require('teabot-botan')('BOTAN_TOKEN'));

TeaBot
  .defineCommand('/shortenurl', function(dialog, message) {
    TeaBot.getPlugin('analytics').shortenUrl(dialog.userId, message.text).then(function(url) {
      dialog.sendMessage('Url:', url);
    });
  })
  .defineCommand(function(dialog, message) {
    dialog.sendMessage('Echo: ' + message.text);
  });
```
# License

The MIT License (MIT)<br/>
Copyright (c) 2016 Alexey Bystrov
