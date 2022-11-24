'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.pluralIdentifyingRootField = pluralIdentifyingRootField;

var _graphql = require('graphql');

function pluralIdentifyingRootField(config) {
  return {
    description: config.description,
    type: new _graphql.GraphQLList(config.outputType),
    args: {
      [config.argName]: {
        type: new _graphql.GraphQLNonNull(
          new _graphql.GraphQLList(
            new _graphql.GraphQLNonNull(
              (0, _graphql.getNullableType)(config.inputType),
            ),
          ),
        ),
      },
    },

    resolve(_obj, args, context, info) {
      const inputs = args[config.argName];
      return inputs.map((input) =>
        config.resolveSingleInput(input, context, info),
      );
    },
  };
}
