# graphql-list-fields
[![Build Status](https://travis-ci.org/jakepusateri/graphql-list-fields.svg?branch=master)](https://travis-ci.org/jakepusateri/graphql-list-fields)
[![npm version](https://badge.fury.io/js/graphql-list-fields.svg)](https://badge.fury.io/js/graphql-list-fields)
[![Coverage Status](https://coveralls.io/repos/github/jakepusateri/graphql-list-fields/badge.svg?branch=master)](https://coveralls.io/github/jakepusateri/graphql-list-fields?branch=master)

When implementing a GraphQL server, it can be useful to know the list of fields being queried on
a given type. This module takes a GraphQLResolveInfo object and returns a list of fields.

Supported features
- Basic Fields
- Fragments
- Inline Fragments
- `@skip` and `@include` directives
- Nested fields into dot.notation

```
npm install --save graphql-list-fields
```

## Usage
```javascript
import getFieldNames from 'graphql-list-fields';

// in some resolve function
resolve(parent, args, context, info) {
    const fields = getFieldNames(info);
    return fetch('/someservice/?fields=' + fields.join(','));
}
```