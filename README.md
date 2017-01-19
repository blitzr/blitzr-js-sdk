Blitzr Official Javascript SDK
==============================

A Javascript API client for the [Blitzr API](https://blitzr.io).

To use this client you will need an API key, you can request it at : [https://blitzr.io](https://blitzr.io/#contact).


----------

Documentation
-------------

You can find the [complete package documentation](http://blitzr.github.io/blitzr-js-sdk/).

You can also refer to the official [Blitzr API reference](https://blitzr.io/doc) to have more informations.
----------


Installation
------------

This can be installed via our [npm package](https://www.npmjs.com/package/blitzr-js-sdk) using:

```
npm install blitzr-js-sdk
```

----------

Getting Started
---------------

#### Create a instance and call API
```javascript
const Blitzr = require('blitzr-js-sdk')

const blitzr = new Blitzr('myAPIKey')

blitzr.search.artist({ query: 'myArtist' }).then(result => {
    // do something with result
}, err => {
    // error callback
})
```
