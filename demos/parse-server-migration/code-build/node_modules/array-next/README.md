# array-next

Super tiny module that returns the `next` item in an array when given an item in the array.

If you give it the last item in the array and call `next` it will loop around and give you the first.


## installing

```
npm install array-next
```

## how to use

```js
var next = require('array-next');

// our demo array
var arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

// if none specified next should return first
next(arr); // returns 'a'

// when given an item in the array it returns the next one
next(arr, 'a'); // returns 'b'

// it also loops if you give it the last item
next(arr, 'c'); // returns 'a'
```


## credits

If you like this, follow [@HenrikJoreteg](http://twitter.com/henrikjoreteg) on twitter.

Check out similar resources at: http://resources.humanjavascript.com.

And check out my book: http://humanjavascript.com


## unit tests? 

run them with `npm test`

read them here: [test.js](test.js)

## license

MIT
