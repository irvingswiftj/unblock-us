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

### The UnblockUs class

```
var UnblockUs = require('unblock-us').UnblockUs;

var ubClient = new UnblockUs({
    username: 'foo', //String (default '')
    password: 'bar', //String (default '')
    secure: false, // Boolean (default false) this is not tested yet. If true, the curl calls to unblock us will over port 443
    logLevel: 'error', //String (default 'error') this should a bunyan log level 
});
```


## Tests

Coming soon

## Contribute

Please only edit the contents of the `src` directory as on publish this will be compiled into the `build` directory.