var async = require('async'),
  Playlist = require('./playlist'),
  roomba = require('roomba');

/**
 * class Roombox
 */
function Roombox() {
  this.playlist = new Playlist();
}

/**
 * Start Roombox, load songs, and connect to Roomba.
 *
 * @param {Object} _opts: optional
 * - dir: song data directory
 * - path: serial port path
 * - baudrate: baud rate, default: 57600
 * @param {Function} cb: standard cb(err, result) callback
 */
Roombox.prototype.start = function (_opts, cb) {

  console.log('Loading songs on %s', _opts.dir);
  this.playlist.load(_opts.dir);

  var opts = {
      sp: {
        path: _opts.path || '/dev/tty.roomba',
        options: {
          baudRate: _opts.baudrate ? parseInt(_opts.baudrate, 10) : 57600
        }
      },
      update_freq: 200
    },
    self = this;

  console.log(
    'Starting Roombox with path %s at baudrate %d',
    opts.sp.path,
    opts.sp.options.baudRate);

  this.bot = new roomba.Roomba(opts);
  this.bot.once('ready', function () {
    self.playlist.displaySongs();
    cb();
  });
};

/**
 * Play a song on the Roomba.
 * Parse through the notes, break it down into Roomba structure (a segment containing 16 notes max)
 *
 * @param {Number} trackNumber: song track number on the playlist
 * @param {Function} cb: standard cb(err, result) callback
 */
Roombox.prototype.play = function (trackNumber, cb) {
  const MAX_SEGMENTS = 4,
    MAX_NOTES = 16,
    INTERVAL = 200;

  var song = this.playlist.getSong(trackNumber),
    self = this;

  console.log('Preparing track %d: %s - %s',
    trackNumber, song.title, song.by);

  var numNotes = song.notes.length,
    numSegments = Math.min(Math.ceil(numNotes / MAX_NOTES), MAX_SEGMENTS),
    segments = [],
    data,
    duration;

  // Speed up song playing by dividing the duration by 1.7,
  // otherwise it would sound too slow.
  function _processSegmentNote(note) {
    note[1] = Math.ceil(note[1] / 1.7);
    data = data.concat(note);
    duration += note[1];
  }

  for (var i = 0; i < numSegments; i += 1) {

    var start = i * MAX_NOTES,
      end = start + MAX_NOTES,
      segmentNotes = song.notes.slice(start, end);

    data = [i, segmentNotes.length];
    duration = 0;
    segmentNotes.forEach(_processSegmentNote);
    segments.push({ index: i, notes: segmentNotes, duration: duration });

    self.bot.send({ cmd: 'SONG', data: data });
  }

  function play(segment, cb) {
    // Duration value 1/64 represents a second
    var duration = segment.duration * 1000 / 64;
    console.log('Playing segment %d with duration %d ms', segment.index, duration);
    self.bot.send({ cmd: 'PLAY', data: [segment.index] });
    setTimeout(cb, INTERVAL + duration);
  }

  async.eachSeries(segments, play, cb);
};

module.exports = Roombox;
