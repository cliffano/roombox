var async = require('async'),
  Playlist = require('./playlist'),
  roomba = require('roomba');

function Roomba() {
  this.playlist = new Playlist();
}

Roomba.prototype.power = function (_opts, cb) {
  var opts = {
    sp: {
      path: _opts.path || '/dev/tty.roomba',
      options: {
        baudrate: _opts.baudrate || 57600
      }
    },
    update_freq: 200
  };

  console.log(
    'Starting Roombox with path %s at baudrate %d',
    opts.sp.path,
    opts.sp.options.baudrate);

  var self = this;
  this.bot = new roomba.Roomba(opts);
  this.bot.once('ready', function () {
    console.log('Loading songs on %s', _opts.dir);
    self.playlist.load(_opts.dir);
    cb();
  });
};

Roomba.prototype.play = function (trackNumber, cb) {
  const MAX_SEGMENTS = 4, 
    MAX_NOTES = 16,
    INTERVAL = 3000;

  var song = this.playlist.getSong(trackNumber),
    self = this;
  
  console.log('Preparing track %d: %s - %s',
    trackNumber, song.title, song.by);
  
  var numNotes = song.notes.length,
    numSegments = Math.min(Math.ceil(numNotes / MAX_NOTES), MAX_SEGMENTS),
    segments = [];

  for (var i = 0; i < numSegments; i += 1) {
  
    var start = i * MAX_NOTES,
      end = start + MAX_NOTES,
      segmentNotes = song.notes.slice(start, end);
      data = [i, segmentNotes.length],
      duration = 0;
  
    segmentNotes.forEach(function (note) {
      data = data.concat(note);
      duration += note[1];
    });
    segments.push({ index: i, notes: segmentNotes, duration: duration });
  
    self.bot.send({ cmd: 'SONG', data: data });
  }

  function play(segment, cb) {
    console.log('Playing segment %d with duration %d ms', segment.index, segment.duration * 1000 / 64);
    self.bot.send({ cmd: 'PLAY', data: [segment.index] });
    setTimeout(cb, INTERVAL + (segment.duration * 1000 / 64));
  }

  async.eachSeries(segments, play, cb);
};

module.exports = Roomba;