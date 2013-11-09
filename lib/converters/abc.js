var abcnode = require('abcnode');

// reasonably pleasant Roomba song notes between note numbers 60 - 83
const BASE = 60,
  ROOMBA_NOTES = [
   'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B',
   'c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b' 
  ],
  SANITISE = ['!', '\\\\', 'Z:.+'];

function convert(data) {

  SANITISE.forEach(function (pattern) {
    data = data.replace(new RegExp(pattern), '');
  });

  var parsed = abcnode.parse(data),
    song = {
      title: parsed.header.title,
      by: parsed.header.composer,
      notes: []
    };

  parsed.song.forEach(function (x) {
    x.forEach(function (y) {
      y.forEach(function (z) {
        z.chords.forEach(function (chord) {
          chord.notes.forEach(function (note) {
            var number = ROOMBA_NOTES.indexOf(note.note);
            if (number !== -1) {
              song.notes.push([number + BASE, note.duration]);
            }
          });
        });
      });
    });
  });

  return song;
}

exports.convert = convert;