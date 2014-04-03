# Tick Tock

> Wrapper around requestAnimationFrame that allows for various helper functions to manage timers.

## Installation

This is a self-registering module so just `require` it to gain access to the singleton that controls timers.

The examples here assume that the module has been assigned to the `raf` variable.

```
var raf = require( 'tick-tock' );
```

## Use

```
var tick = raf
  .register( 'game:tick', function( step ) {
    events.emit( events.APP.TICK, step );
  })
  .start();
```

`Tick-tock` is implemented with a chainable API so registering a new timer will return an instance of itself so that it can be started immediately, which is usually what you want to do.

This instance can be kept as used later on.

```
tick.stop();
```

Or, you can use it to remove itself.

```
raf.remove( tick.id );
```


## API

### Register

```
raf.register( callback );
```

This registers a new timer that will fire the `callback` function each frame. There are a few ways to register a new timer.

The `callback` function will be called with `delta` function that describes the time between frames in ms.

```
raf.register( 'game:tick', callback );
```

This specifies the id of the timer to be `game:tick`. Other `raf` commands can then be specified to run on the timer references by `game:tick`, although `register` will return a pointer to the instance so it can be kept track of that way too.

```
raf.register( 'game:logic', { frameRate: 30 }, callback );
```

Options can also be specified.

`frameRate` defaults to `60`. Determines the frequency of the timer.

`useNative` defaults to `true`. Prefers native methods for requestAnimationFrame.

### Start

```
raf.start( id );
```

Starts the timer referenced by `id`.

### Stop

```
raf.stop( id );
```

Stops the timer referenced by `id`.

### Remove

```
raf.remove( id );
```

Timers that are registered are held in memory, `remove` stops and gets rid of a timer completely.

### Get

```
raf.get( id );
```

Returns an instance of a timer.

### List

```
raf.list();
```

Convenience function which logs a list of registered timers and their current status.
