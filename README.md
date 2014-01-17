<img align="right" src="https://raw.github.com/cliffano/roombox/master/avatar.jpg" alt="Avatar"/>

[![Build Status](https://secure.travis-ci.org/cliffano/roombox.png?branch=master)](http://travis-ci.org/cliffano/roombox)
[![Dependencies Status](https://david-dm.org/cliffano/roombox.png)](http://david-dm.org/cliffano/roombox)
[![Coverage Status](https://coveralls.io/repos/cliffano/roombox/badge.png?branch=master)](https://coveralls.io/r/cliffano/roombox?branch=master)
[![Published Version](https://badge.fury.io/js/roombox.png)](http://badge.fury.io/js/roombox)
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

* [Roomba Vacuum Cleaner Playing Rocky Theme Song - Roombox Demo - Team N - nko2013](http://www.youtube.com/watch?v=C20hhCIIHUs)
* [Roombox – Node Knockout 2013](http://blog.cliffano.com/2013/11/25/roombox-node-knockout-2013/)
