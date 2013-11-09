var roombox = require('../lib/roombox');

var opts = {
  path: '/dev/tty.FireFly-9E56-SPP',
  baudrate: 57600,
  dir: 'data/songs'
};

roombox.emit('power', opts, function () {
  
  roombox.emit('play', 1, function () {
    console.log('done');
  });
  
});
