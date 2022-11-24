# ampersand-events

<!-- starthide -->
Part of the [Ampersand.js toolkit](http://ampersandjs.com) for building clientside applications.
<!-- endhide -->

A module that can be mixed into any object to make it able to trigger events and be listened to. This is heavily based on Backbone Events with a few modifications.

## Install

```
npm install ampersand-events
```

## Example usage

`ampersand-events` is simply an object of methods. So you can easily add those to any object using any of the following techniques.


### Adding events to a constructor or "class"

```javascript
var Events = require('ampersand-events');
var assign = require('lodash.assign');

// Create some constructor
var MyConstructor = function () {};

// Extend the prototype with the event methods and your own:
assign(MyConstructor.prototype, Events, {
    myOtherMethods: function () {}
});

// Now we can trigger and listen for events on
// any instances created with our constructor.
var myObj = new MyConstructor();
```

### Using with plain objects

```javascript
var Events = require('ampersand-events');

// Events has an `createEmitter` helper that you can pass
// any object to to add event methods to.
var myObj = {};
Events.createEmitter(myObj);

// it now has event methods
myObj.trigger('some event');
```

### Using as an event bus / or pubsub channel

You can call `Event.createEmitter()` without any arguments to create an "empty" event emitter.

This can be really useful for creating what you might call an "event bus" or "pubsub" mechanism for things like application events, or whatnot.

Say you created a module like this:

```
var Events = require('ampersand-events');

module.exports = Events.createEmitter();
```

Any module in your app could now require this module and trigger events that other modules in your app could listen for.

## API Reference

### createEmitter `Events.createEmitter([object])`

Modifies any passed object to add event capabilities to it. If you don't pass any object, it simply creates and returns a new object with event capabilities.

* `object` {Object} [Optional] Any object you want to add event capabilities to.

It simply adds the event methods to the passed in object.

```javascript
var myObj = {};
Events.createEmitter(myObj);

myObj.on('customEvent', function () {
    // handle event
});
myObj.trigger('customEvent');
```

### on `eventObj.on(eventName, callback, [context])`

(aliased as `bind` for backwards compatibility)

Bind a function to be called each time the `eventName` is triggered on that object.

* `eventName` {String} The name of the event to listen for. Can also be `"all"` which will call your callback no matter what event is triggered.
* `callback` {Function} The function to call when the event is triggered.
* `context` {Object}[optional] If you provide an object here it will be the value of `this` inside your callback function.

```javascript
myObj.on('anything', function () {
    console.log('I can handle anything!');
});
```

### once `eventObj.once(eventName, callback, [context])`

Exactly like `on` but removes itself after getting called once no matter how many times the event is triggered.

### off `eventObj.off([eventName], [callback], [context])`

(aliased as `unbind` for backwards compatibility)

Remove previously bound callback(s) from the object. If no context is specified all versions of callback no matter what context was given will be removed. If no callback was specified, all callbacks for that given `eventName` will be removed. If no `eventName` was specified callbacks for all events are removed.

* `eventName` {String} The name of the event to remove. Pass `null` to "leave blank". 
* `callback` {Function} The function to remove or pass `null` to "leave blank".
* `context` {Object} Remove all callbacks with this context.


These can be used in any combination as shown below:

```javascript
// Removes the `onChange` callback
eventObj.off('change', onChange);

// Removes all callbacks listening for 'change' events
eventObj.off('change');

// Removes the `onChange` callback for any event
eventObj.off(null, onChange);

// Removes all callbacks for a given `context`
eventObj.off(null, null, context);

// Removes all callbacks no matter what
eventObj.off();
```

### trigger `eventObj.trigger(eventName, [argsToPassOn])`

Triggers all the callbacks for the given `eventName`.

* `eventName` {String} Name of event, or space-delimited list of events.
* `argsToPassOn` { ... } Any additional arguments will simply be used to call the callbacks that are listening for this event.

```javascript
eventObj.on('change', function (payload) {
    // `payload` will be the `{some: 'object'}` instance
    // from below.
});
eventObj.trigger('change', {some: 'object'});
```

### listenTo `eventObj.listenTo(otherEventObj, eventName, callback)`

Tell an `eventObject` to listen to `eventName` on another object. This is another form of `on` that makes it easier to create an object that listens to events from other objects and keep track of them. This makes it so we can easily listen to several different events from several different objects but make it simple to remove them all at once. 

For example, if we use `.listenTo` to listen to model changes it cares about in an ampersand-view the view will know what callbacks it needs to unregister if it gets removed.

* `otherEventObj` {Event object} The other object to listen to.
* `eventName` {String} Event to listen to (can also be space delimited list of events).
* `callback` {Function} The function to call when event occurs.

**Note:** the callback will always be called with the `eventObj` as the `this` value.

```javascript
view.listenTo(model, 'change', view.render);
// when `view.render` is called `this` will be `view`
```

### listenToOnce `eventObj.listenToOnce(otherEventObj, eventName, callback)`

Same as `listenTo` but it unregisters itself after getting called once no matter how many times the events is triggered.

### listenToAndRun `eventObj.listenToAndRun(otherEventObj, eventName, callback)`

Same as `listenTo` but also immediately executes the registered callback once right away. This can be useful for things like methods that re-calculate totals, but that also need to be run once to calculate the initial value.

### stopListening `eventObj.stopListening([otherEventObj], [eventName], [callback])`

Tells the `eventObj` to stop listening to events. Most commonly it's used without arguments to remove all callbacks an object registered before destroying the object. For example `ampersand-view` calls `this.stopListening()` as part of `.remove()`. 

However, you can also use `stopListening` with specific objects, events or callbacks.

* `otherEventObj` {Event object} The other object being listened to.
* `eventName` {String} A specific string or space-delimited list of events to stop listening to.
* `callback` {Function} A specific callback to remove.

These can be used in any combination as shown below:

```javascript
// Stops listening to everything
eventObj.stopListening();

// Stop listening to a specific object
eventObj.stopListening(object);

// Stop listening to all 'change' events from any model
eventObj.stopListening(null, 'change');

// Remove just a specific `callback`
eventObj.stopListening(null, null, callback);
```

### changelog
- 2.0.0 - switch to lodash v4

## license

MIT

