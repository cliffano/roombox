var buster = require('buster-node'),
  abc = require('../../lib/converters/abc'),
  referee = require('referee'),
  assert = referee.assert;

buster.testCase('abc - convert', {
  'should convert abc notation to Roomba song data': function () {
    var data = [
      'X:1',
      'T:Hey Jude',
      'C:The Beatles',
      'L:1/8',
      'Q:140',
      'M:4/4',
      'K:C',
      'z6G2|[E2C,2]C,2[zC,]E[GC,]A|[D2G,2]G,2[z2G,2][DG,]E|[F2G,2][c2G,2]G,c[BG,]G|[AF,]G/F/[E2C,2]C,2[zC,]G|[AF,]AF,A[d/F,/]cB/F,/c/A|[G2C,2]C,2[CC,]D[EC,]A|'
    ];
    var song = abc.convert(data.join('\n'));
    assert.equals(song.title, 'Hey Jude');
    assert.equals(song.by, 'The Beatles');
    assert.equals(song.notes, [67, 64, 64, 64, 64, 32, 67, 32, 69, 32, 62, 64, 62, 32, 64, 32, 65, 64, 72, 64, 72, 32, 71, 32, 67, 32, 69, 32, 67, 16, 65, 16, 64, 64, 67, 32, 69, 32, 69, 32, 69, 32, 74, 16, 72, 32, 71, 16, 72, 16, 69, 32, 67, 64, 60, 32, 62, 32, 64, 32, 69, 32]);
  },
  'should sanitise invalid ABC 1.6 data': function () {
    var data = [
      'X:1',
      'T:Hey Jude!',
      'C:The Beatles',
      'L:1/8',
      'Q:140',
      'M:4/4',
      'K:C',
      'z6G2|[E2C,2]C,2[zC,]E[GC,]A|[D2G,2]G,2[z2G,2][DG,]E|[F2G,2][c2G,2]G,c[BG,]G|[AF,]G/F/[E2C,2]C,2[zC,]G|[AF,]AF,A[d/F,/]cB/F,/c/A|[G2C,2]C,2[CC,]D[EC,]A|\\',
      'Z: edited by'
    ];
    var song = abc.convert(data.join('\n'));
    assert.equals(song.title, 'Hey Jude');
    assert.equals(song.by, 'The Beatles');
    assert.equals(song.notes, [67, 64, 64, 64, 64, 32, 67, 32, 69, 32, 62, 64, 62, 32, 64, 32, 65, 64, 72, 64, 72, 32, 71, 32, 67, 32, 69, 32, 67, 16, 65, 16, 64, 64, 67, 32, 69, 32, 69, 32, 69, 32, 74, 16, 72, 32, 71, 16, 72, 16, 69, 32, 67, 64, 60, 32, 62, 32, 64, 32, 69, 32]);
  },
  'should throw error when there is invalid syntax': function () {
    var data = [
      'X:1',
      'T:Hey Jude!',
      'C:The Beatles',
      'L:1/8',
      'Q:140',
      'M:4/4',
      'K:C',
      'z6G2|[E2C,|\\'
    ];
    try {
      abc.convert(data.join('\n'));
    } catch (e) {
      assert.match(e, 'SyntaxError');
    }
  }
});