Blitzr Official Javascript SDK
======================

This client makes it easy to deal with Blitzr API and create player.

To use this client you will need an API key, you can request it at : [developer.blitzr.com](http://developer.blitzr.com/).

Install
-----
```
npm i blitzr-js-sdk --save-dev
```

Usage
----
#### Create a insantence and call API
```javascript
const Blitzr = require('blitzr-js-sdk')

const blitzr = new Blitzr('myAPIKey')

blitzr.search.artist({ query: 'myArtist' }).then(result => {
    // do something whit result
}, err => {
    // error callback
})
```
You can find the document of all methods to call API [here](#).

#### Player
The player provide methods to control playlists.
 - load
 - play
 - pause
 - stop
 - seekTo  
 - volume  

First, create in your html a tag with an id.
```html
<div id="player"></div>
```

Then create an instance of Player and load an track by UUID
```javascript
const player = Blitzr.player('player', options)

player.load('uuid')

player.pause()

player.play()

player.seekTo(200) // time in second

player.volume = 50 // volume in percentage

player.currentTime // time of current track in seconds

player.duration // duration of current track is seconds

player.stop()
```

You can provide options
```javascript
const options = {
    width: 200, // width of player in px
    height: 200, // height of player in px
    initVolume: 100, // volume initial in percentage
    /* Hooks */
    onPlay(data) {},
    onPlaying(data) {},
    onPause(data) {},
    onLoad() {},
    onSeekTo(time) {}, // Time is a new time
    onSetVolume(volume) {}, // Volume is a new volume
    onStop() {},
    onEnd(data) {}
};

const player = Blitzr.player('player', options)
```

In hooks,
 - `this` is the player instance
 - `data` is an object provided by iframe it look like this

```javascript
{
    status: 'blitzr_playing', // name of event ('blitzr_playing', 'blitzr_paused', 'blitzr_ended')
    time: 0.0, // current time of track in seconds
    duration: 300.181, // duration of track in seconds
    source_provider: 'youtube',
    identifier: 1464170877082 // identifier for iframe of player
}
```
