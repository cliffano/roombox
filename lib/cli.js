var async = require('async'),
  bag = require('bagofcli'),
  prompt = require('prompt'),
  Roombox = require('./roombox');

function _start(args) {

  var opts = {
    path: args.path,
    baudrate: args.baudRate,
    dir: 'data/'
  };

  var roombox = new Roombox();
  roombox.start(opts, function () {
    async.whilst(_check, _prompt, bag.exit);
  });

  var input;
  function _check() {
    return input === undefined && input !== 'e';
  }
  function _prompt(cb) {
    prompt.start();
    prompt.get(['Select track'], function (err, result) {
      var answer = result['Select track'];
      if (answer !== 'e') {
        roombox.play(answer, cb);
      } else {
        cb();
      }
    });
  }
}

/**
 * Execute Roombox CLI.
 */
function exec() {

  var actions = {
    commands: {
      start: { action: _start }
    }
  };

  bag.command(__dirname, actions);
}

exports.exec = exec;