var abc = require('./converters/abc'),
  fs = require('fs'),
  p = require('path'),
  converters = { abc: abc };

/**
 * class Playlist
 */
function Playlist() {
  this.songs = [];
}

/**
 * Load all songs stored in data directory.
 *
 * @param {String} dir: data directory
 */
Playlist.prototype.load = function (dir) {
  var files = fs.readdirSync(dir),
    self = this;

  files.forEach(function (file) {
    var type = p.extname(file).replace(/^\./, ''),
      data = fs.readFileSync(p.join(dir, file)).toString();

    if (converters[type]) {
      var song = converters[type].convert(data);
      self.songs.push(song);
    } else {
      console.error('WARN | Unable to convert %s', file);
    }
  });
};

/**
 * Get song from the playlist based on its track number.
 *
 * @param {Number} trackNumber: track number of the song in the playlist
 * @return {Object} the retrieved song, undefined if doesn't exist
 */
Playlist.prototype.getSong = function (trackNumber) {
  return this.songs[trackNumber - 1];
};

/**
 * Display a list of all songs in the playlist.
 * Songs list will be displayed to stdout.
 */
Playlist.prototype.displaySongs = function () {
  for (var i = 0, ln = this.songs.length; i < ln; i += 1) {
    console.log('%d - %s', i + 1, this.songs[i].title);
  }
};

module.exports = Playlist;
