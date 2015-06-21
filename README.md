<img align="right" src="https://raw.github.com/cliffano/roombox/master/avatar.jpg" alt="Avatar"/>

[![Build Status](https://img.shields.io/travis/cliffano/roombox.svg)](http://travis-ci.org/cliffano/roombox)
[![Dependencies Status](https://img.shields.io/david/cliffano/roombox.svg)](http://david-dm.org/cliffano/roombox)
[![Coverage Status](https://img.shields.io/coveralls/cliffano/roombox.svg)](https://coveralls.io/r/cliffano/roombox?branch=master)
[![Published Version](https://img.shields.io/npm/v/roombox.svg)](http://www.npmjs.com/package/roombox)
<br/>
[![npm Badge](https://nodei.co/npm/roombox.png)](http://npmjs.org/package/roombox)

Roombox
-------

Roombox is a Roomba boombox.

This is handy when you want to play some music on a [Roomba vacuum cleaner](http://en.wikipedia.org/wiki/Roomba), turning it into a boombox. Please note that Roomba has a low-quality speaker with a limited pitch range.

Roombox is an entry to node.js knockout 2013 [http://team-n.2013.nodeknockout.com/](http://team-n.2013.nodeknockout.com/) .

Installation
------------

    npm install -g roombox

Usage
-----

Pair your computer with Roomba.
I used a [RooTooth](https://www.google.com.au/search?q=rootooth) [paired to my MacBook Air via bluetooth](http://gicl.cs.drexel.edu/index.php/Connecting_Roomba_to_Your_Computer).

Start Roombox:

    roombox start --path /dev/tty.FireFly-9E56-SPP --baud-rate 57600

A menu prompt will be displayed on the screen, simply select the track number of the song that you want to play.

To add more songs: search for [ABC notation](https://www.google.com.au/search?q=abc+notation) of the songs that you want to play, then place them under data directory of Roombox installation directory (`which roombox`).

Colophon
--------

[Developer's Guide](http://cliffano.github.io/developers_guide.html#nodejs)

Build reports:

* [Code complexity report](http://cliffano.github.io/roombox/complexity/plato/index.html)
* [Unit tests report](http://cliffano.github.io/roombox/test/buster.out)
* [Test coverage report](http://cliffano.github.io/roombox/coverage/buster-istanbul/lcov-report/lib/index.html)
* [Integration tests report](http://cliffano.github.io/roombox/test-integration/cmdt.out)
* [API Documentation](http://cliffano.github.io/roombox/doc/dox-foundation/index.html)

Videos:

* [Roomba Vacuum Cleaner Playing Rocky Theme Song - Roombox Demo - Team N - nko2013](http://www.youtube.com/watch?v=C20hhCIIHUs)

Articles:

* [Roombox – Node Knockout 2013](http://blog.cliffano.com/2013/11/25/roombox-node-knockout-2013/)
