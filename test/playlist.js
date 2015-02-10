var buster = require('buster-node'),
  fs = require('fs'),
  Playlist = require('../lib/playlist'),
  referee = require('referee'),
  assert = referee.assert;

buster.testCase('playlist - load', {
  setUp: function () {
    this.mockConsole = this.mock(console);
    this.mockFs = this.mock(fs);
  },
  'should add song to playlist': function () {
    var data = new Buffer([
      'X:1',
      'T:Hey Jude',
      'C:The Beatles',
      'L:1/8',
      'Q:140',
      'M:4/4',
      'K:C',
      'z6G2|[E2C,2]C,2[zC,]E[GC,]A|[D2G,2]G,2[z2G,2][DG,]E|[F2G,2][c2G,2]G,c[BG,]G|[AF,]G/F/[E2C,2]C,2[zC,]G|[AF,]AF,A[d/F,/]cB/F,/c/A|[G2C,2]C,2[CC,]D[EC,]A|'
    ].join('\n'));
    this.mockFs.expects('readdirSync').withExactArgs('somedir').returns(['somesong.abc']);
    this.mockFs.expects('readFileSync').withExactArgs('somedir/somesong.abc').returns(data);
    var playlist = new Playlist();
    playlist.load('somedir');
    assert.equals(playlist.songs.length, 1);
    assert.equals(playlist.songs[0].title, 'Hey Jude');
    assert.equals(playlist.songs[0].by, 'The Beatles');
  },
  'should leave playlist empty when songs directory does not contain any file': function () {
    this.mockFs.expects('readdirSync').withExactArgs('somedir').returns([]);
    var playlist = new Playlist();
    playlist.load('somedir');
    assert.equals(playlist.songs.length, 0);
  },
  'should log error message when converter does not exist': function () {
    this.mockConsole.expects('error').withExactArgs('WARN | Unable to convert %s', 'somesong.xyz');
    this.mockFs.expects('readdirSync').withExactArgs('somedir').returns(['somesong.xyz']);
    this.mockFs.expects('readFileSync').withExactArgs('somedir/somesong.xyz').returns('somecontent');
    var playlist = new Playlist();
    playlist.load('somedir');
    assert.equals(playlist.songs.length, 0);
  }
});

buster.testCase('playlist - getSong', {
  setUp: function () {
    this.playlist = new Playlist();
    this.playlist.songs = [
      { title: 'sometitle', by: 'someartist', notes: [[60, 64], [30, 64]] }
    ];
    this.mock({});
  },
  'should return song when song exists': function () {
    var song = this.playlist.getSong(1);
    assert.equals(song.title, 'sometitle');
    assert.equals(song.by, 'someartist');
    assert.equals(song.notes[0], [60, 64]);
    assert.equals(song.notes[song.notes.length - 1], [30, 64]);
  },
  'should return undefined when song does not exist': function () {
    var song = this.playlist.getSong(2000);
    assert.equals(song, undefined);
  }
});

buster.testCase('playlist - displaySongs', {
  setUp: function () {
    this.mockConsole = this.mock(console);
    this.playlist = new Playlist();
    this.playlist.songs = [
      { title: 'sometitle', by: 'someartist', notes: [[60, 64], [30, 64]] }
    ];
  },
  'should log all songs in the playlist': function () {
    this.mockConsole.expects('log').once().withArgs('%d - %s', 1, 'sometitle');
    this.playlist.displaySongs();
  }
});