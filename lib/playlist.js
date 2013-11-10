var abc = require('./converters/abc'),
  fs = require('fs'),
  p = require('path'),
  spl = require('./converters/spl'),
  converters = { abc: abc, spl: spl };

function Playlist() {
  this.songs = [];
}

Playlist.prototype.load = function (dir) {
  var files = fs.readdirSync(dir),
    self = this;

  files.forEach(function (file) {
    console.log('Converting %s', file);

    var type = p.extname(file).replace(/^\./, ''),
      data = fs.readFileSync(p.join(dir, file)).toString();

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