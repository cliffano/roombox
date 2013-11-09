var abc = require('./converters/abc'),
  fs = require('fs'),
  p = require('path'),
  converters = { abc: abc };

function Playlist() {
  this.songs = [];
}

Playlist.prototype.load = function (dir) {
  var files = fs.readdirSync(dir),
    self = this;

  files.forEach(function (file) {
    var type = p.extname(file).replace(/^\./, ''),
      data = fs.readFileSync(file).toString();
    if (converters[type]) {
      var song = converters[type].convert(data)
      self.songs.push(song);
    } else {
      console.error('Unable to convert %s', file);
    }
  });
};

Playlist.prototype.getSong = function (trackNumber) {
  return this.songs[trackNumber - 1];
};

module.exports = Playlist;