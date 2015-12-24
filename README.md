# Unblock-us

This is a module to activate your unblock-us account with your current external ip address.

## Usage

```js
var UnblockUs = require('unblock-us').UnblockUs;

var ubClient = new UnblockUs({
    username: 'foo',
    password: 'bar'
});

ubClient.activate()
    .then(function () {
        console.log('Activated')
    })
    .catch(function (err) {
        console.log(err);
    });
```

## Tests

Coming soon

## Contribute

Please only edit the contents of the `src` directory as on publish this will be compiled into the `build` directory.