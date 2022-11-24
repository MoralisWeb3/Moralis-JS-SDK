'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.connectionDefinitions = connectionDefinitions;
exports.connectionArgs =
  exports.backwardConnectionArgs =
  exports.forwardConnectionArgs =
    void 0;

var _graphql = require('graphql');

/**
 * Returns a GraphQLFieldConfigArgumentMap appropriate to include on a field
 * whose return type is a connection type with forward pagination.
 */
const forwardConnectionArgs = Object.freeze({
  after: {
    type: _graphql.GraphQLString,
    description:
      'Returns the items in the list that come after the specified cursor.',
  },
  first: {
    type: _graphql.GraphQLInt,
    description: 'Returns the first n items from the list.',
  },
});
/**
 * Returns a GraphQLFieldConfigArgumentMap appropriate to include on a field
 * whose return type is a connection type with backward pagination.
 */

exports.forwardConnectionArgs = forwardConnectionArgs;
const backwardConnectionArgs = Object.freeze({
  before: {
    type: _graphql.GraphQLString,
    description:
      'Returns the items in the list that come before the specified cursor.',
  },
  last: {
    type: _graphql.GraphQLInt,
    description: 'Returns the last n items from the list.',
  },
});
/**
 * Returns a GraphQLFieldConfigArgumentMap appropriate to include on a field
 * whose return type is a connection type with bidirectional pagination.
 */

exports.backwardConnectionArgs = backwardConnectionArgs;
const connectionArgs = { ...forwardConnectionArgs, ...backwardConnectionArgs };
/**
 * A type alias for cursors in this implementation.
 */

exports.connectionArgs = connectionArgs;

/**
 * Returns a GraphQLObjectType for a connection with the given name,
 * and whose nodes are of the specified type.
 */
function connectionDefinitions(config) {
  var _config$name;

  const { nodeType } = config;
  const name =
    (_config$name = config.name) !== null && _config$name !== void 0
      ? _config$name
      : (0, _graphql.getNamedType)(nodeType).name;
  const edgeType = new _graphql.GraphQLObjectType({
    name: name + 'Edge',
    description: 'An edge in a connection.',
    fields: () => {
      var _config$edgeFields;

      return {
        node: {
          type: nodeType,
          resolve: config.resolveNode,
          description: 'The item at the end of the edge',
        },
        cursor: {
          type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
          resolve: config.resolveCursor,
          description: 'A cursor for use in pagination',
        },
        ...(0, _graphql.resolveObjMapThunk)(
          (_config$edgeFields = config.edgeFields) !== null &&
            _config$edgeFields !== void 0
            ? _config$edgeFields
            : {},
        ),
      };
    },
  });
  const connectionType = new _graphql.GraphQLObjectType({
    name: name + 'Connection',
    description: 'A connection to a list of items.',
    fields: () => {
      var _config$connectionFie;

      return {
        pageInfo: {
          type: new _graphql.GraphQLNonNull(pageInfoType),
          description: 'Information to aid in pagination.',
        },
        edges: {
          type: new _graphql.GraphQLList(edgeType),
          description: 'A list of edges.',
        },
        ...(0, _graphql.resolveObjMapThunk)(
          (_config$connectionFie = config.connectionFields) !== null &&
            _config$connectionFie !== void 0
            ? _config$connectionFie
            : {},
        ),
      };
    },
  });
  return {
    edgeType,
    connectionType,
  };
}
/**
 * A type designed to be exposed as a `Connection` over GraphQL.
 */

/**
 * The common page info type used by all connections.
 */
const pageInfoType = new _graphql.GraphQLObjectType({
  name: 'PageInfo',
  description: 'Information about pagination in a connection.',
  fields: () => ({
    hasNextPage: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLBoolean),
      description: 'When paginating forwards, are there more items?',
    },
    hasPreviousPage: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLBoolean),
      description: 'When paginating backwards, are there more items?',
    },
    startCursor: {
      type: _graphql.GraphQLString,
      description: 'When paginating backwards, the cursor to continue.',
    },
    endCursor: {
      type: _graphql.GraphQLString,
      description: 'When paginating forwards, the cursor to continue.',
    },
  }),
});
/**
 * A type designed to be exposed as `PageInfo` over GraphQL.
 */
