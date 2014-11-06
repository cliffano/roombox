var bag = require('bagofcli'),
  buster = require('buster-node'),
  cli = require('../lib/cli'),
  prompt = require('prompt'),
  referee = require('referee'),
  Roombox = require('../lib/roombox'),
  assert = referee.assert;

buster.testCase('cli - exec', {
  'should contain commands with actions': function (done) {
    var mockCommand = function (base, actions) {
      assert.defined(base);
      assert.defined(actions.commands.start.action);
      done();
    };
    this.stub(bag, 'command', mockCommand);
    cli.exec();
  }
});

buster.testCase('cli - start', {
  setUp: function () {
    this.mockProcess = this.mock(process);
    this.mockPrompt = this.mock(prompt);
  },
  'should prompt for track number ': function () {
    this.stub(bag, 'command', function (base, actions) {
      actions.commands.start.action({ baudRate: 57600, path: '/dev/tty' });
    });
    this.mockPrompt.expects('start').twice().withExactArgs();
    this.mockPrompt.expects('get').once().withArgs(['Select track']).callsArgWith(1, null, { 'Select track': 123 });
    this.mockPrompt.expects('get').once().withArgs(['Select track']).callsArgWith(1, null, { 'Select track': 'e' });
    this.mockProcess.expects('exit').once().withExactArgs(0);
    this.stub(Roombox.prototype, 'play', function (answer, cb) {
      cb();
    });
    this.stub(Roombox.prototype, 'start', function (opts, cb) {
      assert.equals(opts, { baudrate: 57600, dir: "data/", path: '/dev/tty' });
      cb();
    });
    cli.exec();
  }
});