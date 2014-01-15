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
      data = fs.readFileSync(p.join(dir, file)).toString();

    if (converters[type]) {
      var song = converters[type].convert(data);
      self.songs.push(song);
    } else {
      console.error('WARN | Unable to convert %s', file);
    }
  });
};

Playlist.prototype.getSong = function (trackNumber) {
  return this.songs[trackNumber - 1];
};

Playlist.prototype.displaySongs = function () {
  for (var i = 0, ln = this.songs.length; i < ln; i += 1) {
    console.log('%d - %s', i + 1, this.songs[i].title);
  }
};

module.exports = Playlist;
