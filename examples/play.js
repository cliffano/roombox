var roombox = require('../lib/roombox');

var opts = {
  path: '/dev/tty.FireFly-9E56-SPP',
  baudrate: 57600,
  dir: 'data/songs'
};

roombox.emit('power', opts, function () {
  
  roombox.emit('play', 1, function () {
  roombox.emit('play', 2, function () {
  roombox.emit('play', 3, function () {
  roombox.emit('play', 4, function () {
  roombox.emit('play', 5, function () {
  roombox.emit('play', 6, function () {
    console.log('done');
  });
  });
  });
  });
  });
  });
  
});
