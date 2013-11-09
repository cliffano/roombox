var events = require('events'),
  Roomba = require('./roomba'),
  roomba = new Roomba(),
  util = require('util');

function Roombox() {
}
util.inherits(Roombox, events.EventEmitter);

var roombox = new Roombox();
roombox.on('power', function (opts, cb) {
  roomba.power(opts, cb);
});
roombox.on('play', function (trackNumber, cb) {
  roomba.play(trackNumber, cb);
});

module.exports = roombox;