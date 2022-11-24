# ampersand-state

Lead Maintainer: [Philip Roberts](https://github.com/latentflip)

[![Coverage Status](https://coveralls.io/repos/AmpersandJS/ampersand-state/badge.svg?branch=master&service=github)](https://coveralls.io/github/AmpersandJS/ampersand-state?branch=master)

<!-- starthide -->
Part of the [Ampersand.js toolkit](http://ampersandjs.com) for building clientside applications.
<!-- endhide -->

An observable, extensible state object with derived watchable properties.

Ampersand-state serves as a base object for [ampersand-model](http://github.com/ampersandjs/ampersand-model) but is useful any time you want to track complex state.

[ampersand-model](https://github.com/ampersandjs/ampersand-model) extends ampersand-state to include assumptions that you'd want if you're using models to model data from a REST API. But by itself ampersand-state is useful for anytime you want something to model state, that fires events for changes and lets you define and listen to derived properties.

For further explanation see the [learn ampersand-state](http://ampersandjs.com/learn/state) guide.

## Install

```
npm install ampersand-state --save
```

## API Reference

### extend `AmpersandState.extend({ })`

To create a **State** class of your own, you extend **AmpersandState** and provide instance properties and options for your class. Typically, this is when you'll define the properties (`props`, `session`, and `derived`) of your state class, and any instance methods to be attached to instances of your class.

**extend** correctly sets up the prototype chain, so that subclasses created with **extend** can be further extended as many times as you like.

Definitions like `props`, `session`, `derived`, etc. will be merged with superclass definitions.

```javascript
var Person = AmpersandState.extend({
    props: {
        firstName: 'string',
        lastName: 'string'
    },
    session: {
        signedIn: ['boolean', true, false],
    },
    derived: {
        fullName: {
            deps: ['firstName', 'lastName'],
            fn: function () {
                return this.firstName + ' ' + this.lastName;
            }
        }
    }
});
```

`AmpersandState.extend` does more than just copy attributes from one prototype to another. As such, it is incompatible with CoffeeScript's class-based extend. TypeScript users may have similar issues.

For instance, this will not work (since it never actually calls `AmpersandState.extend`):

```javascript
// don't do this!
class Foo extends AmpersandView
     constructor: (options)->
         @special = options.special
         super
```


### constructor/initialize `new AmpersandState([attrs], [options])`

When creating an instance of a state object, you can pass in the initial values of the **attributes** which will be [set](#ampersand-state-set) on the state. Unless [extraProperties](#amperand-state-extra-properties) is set to `allow`, you will need to have defined these attributes in `props` or `session`.

If you have defined an `initialize` function for your subclass of `State`, it will be invoked at creation time.

```javascript
var me = new Person({
    firstName: 'Phil',
    lastName: 'Roberts'
});

me.firstName //=> Phil
```

Available options:

* `[parse]` {Boolean} - whether to call the class's [parse](#ampersand-state-parse) function with the initial attributes. _Defaults to `false`_.
* `[parent]` {AmpersandState} - pass a reference to a state's parent to store on the state.

### idAttribute `state.idAttribute`

The attribute that should be used as the unique id of the state. `getId` uses this to determine the `id` for use when constructing a model's `url` for saving to the server.

Defaults to `'id'`.

```javascript
var Person = AmpersandModel.extend({
    idAttribute: 'personId',
    urlRoot: '/people',
    props: {
        personId: 'number',
        name: 'string'
    }
});

var me = new Person({ personId: 123 });

console.log(me.url()) //=> "/people/123"
```

### getId `state.getId()`

Gets the state's ID, per `idAttribute` configuration. Should *always* be how ID is determined by other code.

### namespaceAttribute `state.namespaceAttribute`

The property name that should be used as a namespace. Namespaces are completely optional, but exist in case you need to make an additional distinction between states, that may be of the same type, with potentially conflicting IDs but are in fact different.

Defaults to `'namespace'`.

### getNamespace `state.getNamespace()`

Get namespace of state per `namespaceAttribute` configuration. Should *always* be how namespace is determined by other code.

### typeAttribute

The property name that should be used to specify what type of state this is. This is optional, but specifying a state type types provides a standard, yet configurable way to determine what type of state it is.

Defaults to `'modelType'`.

### getType `state.getType()`

Get type of state per `typeAttribute` configuration. Should *always* be how type is determined by other code.

### extraProperties `AmpersandState.extend({ extraProperties: 'allow' })`

Determines how properties that aren't defined in `props`, `session` or `derived` are handled. May be set to `'allow'`, `'ignore'`, or `'reject'`.

Defaults to `'ignore'`.

```javascript
var StateA = AmpersandState.extend({
    extraProperties: 'allow',
});

var stateA = new StateA({ foo: 'bar' });
stateA.foo === 'bar' //=> true


var StateB = AmpersandState.extend({
    extraProperties: 'ignore',
});

var stateB = new StateB({ foo: 'bar' });
stateB.foo === undefined //=> true


var stateC = AmpersandState.extend({
    extraProperties: 'reject'
});

var stateC = new StateC({ foo: 'bar' })
//=> TypeError('No foo property defined on this state and extraProperties not set to "ignore" or "allow".');
```

### collection `state.collection`

A reference to the collection a state is in, if in a collection.

This is used for building the default `url` property, etc.

Which is why you can do this:

```js
// some ampersand-rest-collection instance
// with a `url` property
widgets.url //=> '/api/widgets'

// get a widget from our collection
var badWidget = widgets.get('47');

// Without a `collection` reference, this
// widget wouldn't know what URL to build
// when calling destroy
badWidget.destroy(); // does a DELETE /api/widgets/47
```

### cid `state.cid`

A special property of states, the **`cid`** (or <dfn>client id</dfn>) is a unique identifier automatically assigned to all states when they are first created. Client IDs are handy when the state has not been saved to the server, and so does not yet have its true `id`, but still needs a unique id (for rendering in the UI, and so on).

```javascript
var userA = new User();
console.log(userA.cid) //=> "state-1"

var userB = new User();
console.log(userB.cid) //=> "state-2"
```

### isNew `state.isNew()`

Has this state been saved to the server yet? If the state does not yet have an `id` (using `getId()`), it is considered to be new.

### escape `state.escape()`

Similar to `get`, but returns the HTML-escaped version of a state's attribute. If you're interpolating data from the state into HTML, use `escape` when retrieving attributes to help prevent XSS attacks.

```javascript
var hacker = new PersonModel({
    name: "<script>alert('xss')</script>"
});

document.body.innerHTML = hacker.escape('name');
```

### isValid `state.isValid()`

Check if the state is currently valid. It does this by calling the state's `validate` method (if you've provided one).


### dataTypes  `AmpersandState.extend({ datatypes: myCustomTypes })`

ampersand-state defines several built-in datatypes: 

- `string`
- `number`
- `boolean`
- `array`
- `object`
- `date`
- `state`
- `any`

Of these, `object`, `array`, and `any` allow for a lot of extra flexibility.  

However, sometimes it's useful to define your own custom datatypes. Doing so allows you to use them in the `props` below, along with all their features (like `required`, `default`, etc).

Setting `type` is required. A `typeError` will be thrown if it's missing or has not been chosen (either from default types or your custom ones).

To define a type, you generally will provide an object with 4 member functions (though only 2 are usually necessary)  `get`, `set`, `default`, and `compare`.

| FUNCTION                                                      | RETURNS                       | DESCRIPTION |
| --------                                                      | --------                      | ----------- |
| `set : function(newVal){}`                                    | `{type : type, val : newVal}` | Called on every set. Should return an object with two members: `val` and `type`.  If the `type` value does not equal the name of the dataType you defined, a `TypeError` should be thrown. |
| `compare : function(currentVal, newVal, attributeName){}`     | `boolean`                     | Called on every `set`. Should return `true` if `oldVal` and `newVal` are equal.  Non-equal values will eventually trigger `change` events, unless the state's `set` (not the dataTypes's!) is called with the option `{silent : true}`. |
| `onChange : function (value, previousValue, attributeName){}` | …                             | Called after the value changes. Useful for automatically setting up or tearing down listeners on properties. | 
| `get : function(val){}`                                       | `val`                         | Overrides the default getter of this type.  Useful if you want to make defensive copies.  For example, the `date` dataType returns a clone of the internally saved `date` to keep the internal state consistent. |
| `default : function(){}`                                      | `val`                         | Returns the default value for this type. |


For example, let's say your application uses a special type of date: `JulianDate`.  You'd like to define this as a `type` in state, but don't want to just use `any` or `object` as the type.  

To define it:
```javascript
// Julian Date is a 'class' defined elsewhere:
// it has an 'equals' method and takes `{julianDays : number}` as a constructor

var Person = AmpersandState.extend({
   dataTypes : {
        julianDate : {
           // set called every time someone tried to set a property of this datatype
           set : function(newVal){
               if(newVal instanceof JulianDate){
                   return {
                       val : newVal,
                       type : 'julianDate'
                   };
               }
               try{
                   // try to parse it from passed in value:
                   var newDate = new JulianDate(newVal);

                   return {
                       val : newDate,
                       type : 'julianDate'
                   };
               }catch(parseError){
                   // return the value with what we think its type is
                   return {
                       val : newVal,
                       type : typeof newVal
                   };
               }
           },
           compare : function(currentVal, newVal, attributeName){
               return currentVal.equals(newVal);
           }
       }

   }
   props : {
       bornOn : 'julianDate',
       retiresOn : {
           type : 'julianDate',
           required : 'true',
           default : function(){
                  // assuming an 'add' function on julian date which returns a new JulianDate
                  return this.bornOn.add('60','years');
               }
           }
   }
});

var person = new Person({ bornOn : new JulianDate({julianDays : 1000}); }
// this will also work and will build a new JulianDate
var person = new Person({bornOn : {julianDays : 1000}});

// will construct a new julian date for us
// and will also trigger a change event
person.bornOn = {julianDays : 1001};

// but this will not trigger a change event since the equals method would return true
person.bornOn = {julianDays : 1001};

```


### props `AmpersandState.extend({ props: { name: 'string' } })`

The **`props`** object describes the observable properties of your state class. 

Always pass `props` to `extend`! Never set it on an instance, as it won't define new properties.

Properties can be defined in three different ways:

1. As a string with the expected dataType
  - One of `string`, `number`, `boolean`, `array`, `object`, `date`, or `any`. (Example: `name: 'string'`.) 
  - Can also be set to the name of a custom `dataTypes`, if the class defines any.
2. An array of `[dataType, required, default]`
3. An object `{ type: 'string', required: true, default: '' , values: [], allowNull: false, setOnce: false }`
  - _`default`_: the value that the property will be set to if it is `undefined` (either by not being set during initialization, or by being explicit set to `undefined`).
  - If _`required`_ is `true`:
    - If the property has a `default`, it will start with that value, and revert to it after a call to `unset(propertyName)`
    - Otherwise, calls to `unset(propertyName)` throw an error
  - If `values` array is passed, then you'll be able to change the property to one of those values only.
  - If `setOnce` is `true`, then you'll be able to set property only once.
    - If the property has a `default`, and you don't set the value initially, the property will be permanently set to the default value.
    - Otherwise, if you don't set the value initially, it can be set later, but only once.
  - If `test` function is passed, then a negative validation test will be executed every time this property is about to be set. 
    - If the validation passes, the function must return `false` to tell **State** to go ahead and set the value. 
    - Otherwise, it should return a `string` with the error message describing the validation failure. (In this case, **State** will throw a `TypeError` with `"Property '<property>' failed validation with error: <errorMessage>"`.)

Trying to set a property to an invalid type will throw an error.

See [get](#ampersand-state-get) and [set](#ampersand-state-set) for more information about getting and setting properties.

```javascript
var Person = AmpersandState.extend({
    props: {
        name: 'string',
        age: 'number',
        paying: ['boolean', true, false], // required attribute, defaulted to false
        type: {
            type: 'string',
            values: ['regular-hero', 'super-hero', 'mega-hero']
        },
        numberOfChildren: {
            type: 'number',
            test: function(value){
                if (value < 0) {
                    return "Must be a positive number";
                }
                return false;
            }
        },
    }
});
```


#### reserved prop, session names

The following should not be used as `prop` names for any state object. This of course includes things based on state such as `ampersand-model` and `ampersand-view`.

If you're consuming an API you don't control, you can rename keys by overwriting `parse` and `serialize` methods.

`bind`, `changedAttributes`, `cid`, `clear`, `collection`, `constructor`, `createEmitter`, `escape`, `extraProperties`, `get`, `getAttributes`, `getId`, `getNamespace`, `getType`, `hasChanged`, `idAttribute`, `initialize`, `isNew`, `isValid`, `listenTo`, `listenToAndRun`, `listenToOnce`, `namespaceAttribute`, `off`, `on`, `once`, `parent`, `parse`, `previous`, `previousAttributes`, `serialize`, `set`, `stopListening`, `toJSON`, `toggle`, `trigger`, `typeAttribute`, `unbind`, `unset`, `url`

#### defaulting to objects/arrays

You will get an error if you try to set the default of any property as either an object or array.  This is because those two dataTypes are mutable and passed by reference.  (Thus, if you _did_ set a property's default to `['a','b']`, it would return *the same array* on every new instantiation of the state.)

Instead, if you want a property to default to an array or an object, just set `default` to a function, like this:

```javascript
AmpersandModel.extend({
    props: {
        checkpoints: {
            type: 'array',
            default: function () { return []; }
        }
    }
});
```

**NOTE:** Both `array` and `object` have this behavior built-in: they default to empty versions of themselves.  You would only need to do this if you wanted to default to an array/object that wasn't empty.

### session `AmpersandState.extend({ session: { name: 'string' } })`

Session properties are defined and work in exactly the same way as [props](#ampersand-state-props), but generally only exist for the lifetime of the page. They would not typically be persisted to the server, and are not returned by calls to `toJSON()` or `serialize()`.

```javascript
var Person = AmpersandState.extend({
    props: {
        name: 'string',
    },
    session: {
        isLoggedIn: 'boolean'
    }
);
```

### derived `AmpersandState.extend({ derived: { derivedProperties }})`

Derived properties (also known as computed properties) are properties of the state object that depend on other properties to determine their value. They may depend on properties defined in `props`, `session`,  or even `derived`&mdash;as well as the same from state props or children.

Best demonstrated with an example:

```javascript
var Address = AmpersandState.extend({
  props: {
    'street': 'string',
    'city': 'string',
    'region': 'string',
    'postcode': 'string'
  }
});

var Person = AmpersandState.extend({
    props: {
        firstName: 'string',
        lastName: 'string',
        address: 'state'
    },
    derived: {
        fullName: {
            deps: ['firstName', 'lastName'],
            fn: function () {
                return this.firstName + ' ' + this.lastName;
            }
        },
        mailingAddress: {
            deps: ['address.street', 'address.city', 'address.region', 'address.postcode'],
            fn: function () {
                var self = this;
                return ['street','city','region','postcode'].map(function (prop) {
                    var val = self.address[prop];
                    if (!val) return val;
                    return (prop === 'street' || prop === 'city') ? val + ',' : val;
                }).filter(function (val) {
                    return !!val;
                }).join(' ');
            }
        }
    }
});

var person = new Person({
    firstName: 'Phil',
    lastName: 'Roberts',
    address: new Address({
        street: '123 Main St',
        city: 'Anyplace',
        region: 'BC',
        postcode: 'V6A 2S5'
    })
});
console.log(person.fullName) //=> "Phil Roberts"
console.log(person.mailingAddress) //=> "123 Main St, Anyplace, BC V6A 2S5"

person.firstName = 'Bob';
person.address.street = '321 St. Charles Pl'
console.log(person.fullName) //=> "Bob Roberts"
console.log(person.mailingAddress) //=> "321 St. Charles Pl, Anyplace, BC V6A 2S5"
```

See working example at [RequireBin](http://requirebin.com/?gist=c496f0d33f32527fe1ca)

Each derived property is defined as an object with the following properties:

* `deps` {Array} - An array of property names which the derived property depends on.
* `fn` {Function} - A function which returns the value of the computed property. It is called in the context of the current object, so that `this` is set correctly.
* `cache` {Boolean} - Whether to cache the property. Uncached properties are computed every time they are accessed. Useful if it depends on the current time for example. _Defaults to `true`_.

Derived properties are retrieved and fire `change` events just like any other property. However, they cannot be set directly. Caching ensures that the `fn` function is only run when any of the dependencies change, and `change` events are only fired if the result of calling `fn()` has actually changed.

### children `AmpersandState.extend({ children: { profile: Profile } })`

Define child state objects to attach to the object. Attributes passed to the constructor or to `set()` will be proxied to the `children`/`collection`. Children's `change` events are proxied to the parent.

```javascript
var AmpersandState = require('ampersand-state');
var Hat = AmpersandState.extend({
    props: {
        color: 'string'
    }
});

var Person = AmpersandState.extend({
    props: {
        name: 'string'
    },
    children: {
        hat: Hat
    }
});

var me = new Person({ name: 'Phil', hat: { color: 'red' } });

me.on('all', function (eventName) {
    console.log('Got event: ', eventName);
});

console.log(me.hat) //=> Hat{color: 'red'}

me.set({ hat: { color: 'green' } });
//-> "Got event: change:hat.color"
//-> "Got event: change"

console.log(me.hat) //=> Hat{color: 'green'}
```

**NOTE:** If you want to be able to swap out and get a `change` event from a child model, don't use `children`. Instead, define a prop in `props` of type `state`.

`children` and `collections` are not just a property of the parent; they're _part_ of the parent. When you create the parent, an instance of any children or collections will be instantiated _as part of_ instantiating the parent, whether they have any data or not.

Calling `.set()` on the parent with a nested object will automatically `set()` them on children and collections, too. This is super handy for APIs [like this one](https://developer.github.com/v3/repos/#response) that return nested JSON structures.

Also, there will be no `change` events triggered if you replace a child with something else after you've instantiated the parent, because it's not a true property in the `props` sense. If you need a prop that stores a state instance, define it as such&mdash;don't use `children`.

The distinction is important! Without it, the following would be problematic:

```javascript
var Person = State.extend({
    props: {
        child: {
            type: 'state'
        }
    }
});

var person = new Person()

// throws type error because `{}` isn't a state object
person.child = {};
// should this work? What should happen if the `child` prop isn't defined yet?
person.set({child: {name: 'mary'}});
```

So, while having `children` in addition to props of type `state` may feel redundant, they both exist to help disambiguate how they're meant to be used.

### collections `AmpersandState.extend({ collections: { widgets: Widgets } })`

Define child collection objects to attach to the object. Attributes passed to the constructor or to `set()` will be proxied to the collections.

**NOTE:** Currently, events _don't_ automatically proxy from collections to parent. This is for efficiency reasons. But there are ongoing discussions about how to best handle this.

```javascript
var State = require('ampersand-state');
var Collection = require('ampersand-collection');

var Widget = State.extend({
    props: {
        name: 'string',
        funLevel: 'number'
    }
});

var WidgetCollection = Collection.extend({
    model: Widget
});

var Person = State.extend({
    props: {
        name: 'string'
    },
    collections: {
        widgets: WidgetCollection
    }
});

var me = new Person({
    name: 'Henrik',
    widgets: [
        { name: 'rc car', funLevel: 8 },
        { name: 'skis', funLevel: 11 }
    ]
});

console.log(me.widgets.length); //=> 2
console.log(me.widgets instanceof WidgetCollection); //=> true
```


### parse

**parse** is called when the state is initialized, allowing the attributes to be modified, remapped, renamed, etc., before they are actually applied to the state. 

In `ampersand-state`, `parse` is only called when the state is initialized, and _only_ if `{ parse: true }` is passed to the constructor's options. 

```javascript
var Person = AmpersandState.extend({
    props: {
        id: 'number',
        name: 'string'
    },

    parse: function (attrs) {
        attrs.id = attrs.personID; //remap an oddly named attribute
        delete attrs.personID;

        return attrs;
    }
});

var me = new Person({ personID: 123, name: 'Phil' },{ parse: true});

console.log(me.id) //=> 123
console.log(me.personID) //=> undefined
```

(**parse** is arguably more useful in `ampersand-model`, where data typically comes from the server.)

### serialize `state.serialize([options])`

Serialize the state object into a plain object, ready for sending to the server (typically called via [`toJSON`](#ampersand-state-tojson)). 

By default, this returns only properties defined in `props`, omitting properties in `session` and `derived`.  To also serialize `session` or `derived` attributes, you can pass in a options object.  The options object should match that accepted by `.getAttributes(...)`. 

This method will also serialize any `children` or `collections` by calling their `serialize` methods.


### get `state.get(attribute); state[attribute]; state.firstName`

Get the current value of an attribute from the state object. Attributes can be accessed directly, or a call to the Backbone style `get`.

```javascript
// these are all equivalent
person.get('firstName');
person['firstName'];
person.firstName
```

Get will retrieve `props`, `session`, or `derived` properties all in the same way.

### set `state.set(attributes, [options]); state.firstName = 'Henrik';`

Sets an attribute, or multiple attributes, on the state object. If any of the state object's attributes change, it will trigger a `"change"` event. 

Change events for specific attributes are also triggered, which you can listen for as well. For example: `"change:firstName"` and `"change:content"`. If the update affects any `derived` properties, their values will be updated and fire `"change"` events as well.

Attributes can be set directly, or via a call to the backbone style `set` (useful if you wish to update multiple attributes at once):

```javascript
person.set({firstName: 'Phil', lastName: 'Roberts'});
person.set('firstName', 'Phil');
person.firstName = 'Phil';
```

Possible options (when using `state.set()`):

* `silent` {Boolean} - prevents triggering of any change events as a result of the set operation.
* `unset` {Boolean} - `unset` the attributes keyed in the attributes object instead of setting them.

**NOTE:** When passing an object as the `attributes` argument, only that object's own enumerable properties (i.e. those that can be accessed with `Object.keys(object)`) are read and set. This behaviour is new as of v5.0.0. (Prior version relied on `for...in` to access an object's properties, both owned by that object and those inherited through the prototypal chain.)

### unset `state.unset(attribute|attributes[], [options])`

Clear the named attribute, or an array of named attributes, from the state object. Fires a `"change"` event and a `"change:attributeName"` event unless `silent` is passed as an option.

If the attribute being unset is `required` and has a `default` value as defined in either `props` or `session`, it will be set to that value, otherwise it will be `undefined`.

```javascript
// unset a single attribute
person.unset('firstName')
```

```javascript
// unset multiple attributes
person.unset(['firstName', 'lastName'])
```

### clear `state.clear([options])`

Clear all the attributes from the state object, by calling the `unset` function for each attribute, with the options provided.

```javascript
person.clear()
```

### toggle `state.toggle('a')`

Shortcut to toggle boolean properties, _or_ to cycle through array of specified property's `values`. (See the `values` option and example, below.)

When you reach the last available value from given array, `toggle` will go back to the beginning and use first one.

Fires `"change"` events, as you would expect from `set()`.

```javascript
var Person = AmpersandState.extend({
    props: {
        active: 'boolean',
        color: {
            type: 'string',
            values: ['red', 'green', 'blue']
        }
    }
});

var me = new Person({ active: true, color: 'green' });

me.toggle('active');
console.log(me.active) //=> false

me.toggle('color');
console.log(me.color) //=> 'blue'

me.toggle('color');
console.log(me.color) //=> 'red'
```


### previousAttributes `state.previousAttributes()`

Return a copy of the object's previous attributes (the state before the last `"change"` event). Useful for getting a diff between versions of a state, or getting back to a valid state after an error occurs.


### hasChanged `state.hasChanged([attribute])`

Determine if the state has been modified since the last `"change"` event. If an attribute name is passed, determine if that one attribute has changed.

**NOTE:** This will only be `true` if checked inside a handler while the various `change` events are firing. Once the change events are done, this will always return `false`. This has nothing to do with determining whether a property has changed since the last time it was saved to the server.

### changedAttributes `state.changedAttributes([objectToDiff])`

Return an object containing all the attributes that have changed, or `false` if there are no changed attributes. Useful for determining what parts of a view need to be updated and/or what attributes need to be persisted to the server. Unset attributes will be set to `undefined`.  You can also pass an attributes object to diff against the state, determining if there _would_ be a change.

**NOTE:** When passing an attributes object to diff against, only changes to properties defined on the model will be detected. This means that changes to children or collections will _not_ be returned as changes by this method.

**NOTE:** This will only return values if checked inside a handler for `"change"` events (i.e. while the events are firing). Once the change events are done, this will always return an empty object. This has nothing to do with determining which properties have been changed since the last time it was saved to the server.

### toJSON `state.toJSON()`

Return a shallow copy of the state's attributes for JSON stringification. This can be used for persistence, serialization, or augmentation, before being sent to the server. 

(The name of this method is a bit confusing, as it doesn't actually return a JSON string&mdash;but I'm afraid that it's the way that the JavaScript API for `JSON.stringify` works.)

Calls [`serialize`](#ampersand-state-serialize) to determine which values to return in the object. Will be called implicitly by `JSON.stringify`.

```javascript
var me = new Person({ firstName: 'Phil', lastName: 'Roberts' });

me.toJSON() //=> { firstName: 'Phil', lastName: 'Roberts' }

//JSON.stringify implicitly calls toJSON:
JSON.stringify(me) //=> "{\"firstName\":\"Phil\",\"lastName\":\"Roberts\"}"
```

### getAttributes `state.getAttributes([options, raw])`

Returns a shallow copy of the state's attributes while only including the types (`props`, `session`, `derived`) specified by the `options` parameter. The desired keys should be set to `true` on `options` (`props`, `session`, `derived`) if attributes of that type should be returned by `getAttributes`.

The second parameter, `raw`, is a boolean that specifies whether returned values should be the raw value or should instead use the getter associated with its dataType. If you are using `getAttributes` to pass data to a template, most of the time you will not want to use the `raw` parameter, since you will want to take advantage of any built-in and custom dataTypes on your state instance.

```javascript
var Person = AmpersandState.extend({
  props: {
      firstName: 'string',
      lastName: 'string'
  },
  session: {
    lastSeen: 'date',
    active: 'boolean'
  },
  derived: {
    fullName: {
      deps: ['firstName', 'lastName'],
      fn: function () {
        return this.firstName + ' ' + this.lastName;
      }
    }
  }
});

var me = new Person({ firstName: 'Luke', lastName: 'Karrys', active: true, lastSeen: 1428430444479 });

me.getAttributes({derived: true}) //=> { fullName: 'Luke Karrys' }

me.getAttributes({session: true}) //=> { active: true, lastSeen: Tue Apr 07 2015 11:14:04 GMT-0700 (MST) }
me.getAttributes({session: true}, true) //=> { active: true, lastSeen: 1428430444479 }

me.getAttributes({
  props: true,
  session: true,
  derived: true
}) //=> { firstName: 'Luke', lastName: 'Karrys', active: true, lastSeen: Tue Apr 07 2015 11:14:04 GMT-0700 (MST), fullName: 'Luke Karrys' }
```

<!-- starthide -->
## Credits

[@HenrikJoreteg](http://twitter.com/henrikjoreteg)

## License

MIT
<!-- endhide -->

## changelog

- 5.0.2 - use lodash/xzy pkg requires (@samhashemi)
