'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.nodeDefinitions = nodeDefinitions;
exports.toGlobalId = toGlobalId;
exports.fromGlobalId = fromGlobalId;
exports.globalIdField = globalIdField;

var _graphql = require('graphql');

var _base = require('../utils/base64');

/**
 * Given a function to map from an ID to an underlying object, and a function
 * to map from an underlying object to the concrete GraphQLObjectType it
 * corresponds to, constructs a `Node` interface that objects can implement,
 * and a field config for a `node` root field.
 *
 * If the typeResolver is omitted, object resolution on the interface will be
 * handled with the `isTypeOf` method on object types, as with any GraphQL
 * interface without a provided `resolveType` method.
 */
function nodeDefinitions(fetchById, typeResolver) {
  const nodeInterface = new _graphql.GraphQLInterfaceType({
    name: 'Node',
    description: 'An object with an ID',
    fields: () => ({
      id: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
        description: 'The id of the object.',
      },
    }),
    resolveType: typeResolver,
  });
  const nodeField = {
    description: 'Fetches an object given its ID',
    type: nodeInterface,
    args: {
      id: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
        description: 'The ID of an object',
      },
    },
    resolve: (_obj, { id }, context, info) => fetchById(id, context, info),
  };
  const nodesField = {
    description: 'Fetches objects given their IDs',
    type: new _graphql.GraphQLNonNull(new _graphql.GraphQLList(nodeInterface)),
    args: {
      ids: {
        type: new _graphql.GraphQLNonNull(
          new _graphql.GraphQLList(
            new _graphql.GraphQLNonNull(_graphql.GraphQLID),
          ),
        ),
        description: 'The IDs of objects',
      },
    },
    resolve: (_obj, { ids }, context, info) =>
      ids.map((id) => fetchById(id, context, info)),
  };
  return {
    nodeInterface,
    nodeField,
    nodesField,
  };
}

/**
 * Takes a type name and an ID specific to that type name, and returns a
 * "global ID" that is unique among all types.
 */
function toGlobalId(type, id) {
  return (0, _base.base64)([type, _graphql.GraphQLID.serialize(id)].join(':'));
}
/**
 * Takes the "global ID" created by toGlobalID, and returns the type name and ID
 * used to create it.
 */

function fromGlobalId(globalId) {
  const unbasedGlobalId = (0, _base.unbase64)(globalId);
  const delimiterPos = unbasedGlobalId.indexOf(':');
  return {
    type: unbasedGlobalId.substring(0, delimiterPos),
    id: unbasedGlobalId.substring(delimiterPos + 1),
  };
}
/**
 * Creates the configuration for an id field on a node, using `toGlobalId` to
 * construct the ID from the provided typename. The type-specific ID is fetched
 * by calling idFetcher on the object, or if not provided, by accessing the `id`
 * property on the object.
 */

function globalIdField(typeName, idFetcher) {
  return {
    description: 'The ID of an object',
    type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
    resolve: (obj, _args, context, info) =>
      toGlobalId(
        typeName !== null && typeName !== void 0
          ? typeName
          : info.parentType.name,
        idFetcher ? idFetcher(obj, context, info) : obj.id,
      ),
  };
}
