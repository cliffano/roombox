var buster = require('buster-node'),
  referee = require('referee'),
  Playlist = require('../lib/playlist'),
  roomba = require('roomba'),
  Roombox = require('../lib/roombox'),
  assert = referee.assert;

buster.testCase('roombox - start', {
  setUp: function () {
    this.mockConsole = this.mock(console);
    this.mockRoomba = this.mock(roomba);

    var mockBot = {
      once: function (event, cb) {
        assert.equals(event, 'ready');
        cb();
      }
    };
    this.mockRoomba.expects('Roomba').once().returns(mockBot);

    this.stub(Playlist.prototype, 'load', function (dir) {
      assert.equals(dir, 'somedir');
    });

    this.roombox = new Roombox();
  },
  'should ready roomba and display songs on playlist': function (done) {
    this.mockConsole.expects('log').once().withExactArgs('Loading songs on %s', 'somedir');
    this.mockConsole.expects('log').once().withExactArgs('Starting Roombox with path %s at baudrate %d', '/dev/tty.roomba', 57600);

    var displaySongsIsCalled = false;
    this.stub(Playlist.prototype, 'displaySongs', function () {
      displaySongsIsCalled = true;
    });

    this.roombox.start({ dir: 'somedir' }, function () {
      assert.equals(displaySongsIsCalled, true);
      done();
    });
  },
  'should log custom opts': function (done) {
    this.mockConsole.expects('log').once().withExactArgs('Loading songs on %s', 'somedir');
    this.mockConsole.expects('log').once().withExactArgs('Starting Roombox with path %s at baudrate %d', '/somepath', 30000);

    var displaySongsIsCalled = false;
    this.stub(Playlist.prototype, 'displaySongs', function () {
      displaySongsIsCalled = true;
    });

    this.roombox.start({ dir: 'somedir', path: '/somepath', baudrate: 30000 }, function () {
      assert.equals(displaySongsIsCalled, true);
      done();
    });
  }
});

buster.testCase('roombox - play', {
  setUp: function () {
    this.mockConsole = this.mock(console);

    this.stub(Playlist.prototype, 'getSong', function (trackNumber) {
      assert.equals(trackNumber, 888);
      return {
        title: 'some title',
        by: 'some singer',
        notes: [
          [67, 64], [67, 64], [67, 64], [67, 64],
          [67, 64], [67, 64], [67, 64], [67, 64],
          [67, 64], [67, 64], [67, 64], [67, 64],
          [67, 64], [67, 64], [67, 64], [67, 64]
        ]
      };
    });

    this.roombox = new Roombox();
    this.timeout = 10000;
  },
  'should convert song into segments and send them to bot': function (done) {
    this.mockConsole.expects('log').once().withExactArgs('Preparing track %d: %s - %s', 888, 'some title', 'some singer');
    this.mockConsole.expects('log').once().withExactArgs('Playing segment %d with duration %d ms', 0, 9500);

    var self = this;
    this.botData = [];
    this.roombox.bot = {
      send: function (data) {
        self.botData.push(data);
      }
    };

    this.roombox.play(888, function () {
      assert.equals(self.botData[0].cmd, 'SONG');
      assert.equals(self.botData[1].cmd, 'PLAY');
      done();
    });
  }
});