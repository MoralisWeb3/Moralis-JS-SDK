"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "extractKeysAndInclude", {
  enumerable: true,
  get: function () {
    return _parseGraphQLUtils.extractKeysAndInclude;
  }
});
exports.load = void 0;

var _graphql = require("graphql");

var _graphqlRelay = require("graphql-relay");

var _graphqlListFields = _interopRequireDefault(require("graphql-list-fields"));

var defaultGraphQLTypes = _interopRequireWildcard(require("./defaultGraphQLTypes"));

var objectsQueries = _interopRequireWildcard(require("../helpers/objectsQueries"));

var _ParseGraphQLController = require("../../Controllers/ParseGraphQLController");

var _className = require("../transformers/className");

var _inputType = require("../transformers/inputType");

var _outputType = require("../transformers/outputType");

var _constraintType = require("../transformers/constraintType");

var _parseGraphQLUtils = require("../parseGraphQLUtils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const getParseClassTypeConfig = function (parseClassConfig) {
  return parseClassConfig && parseClassConfig.type || {};
};

const getInputFieldsAndConstraints = function (parseClass, parseClassConfig) {
  const classFields = Object.keys(parseClass.fields).concat('id');
  const {
    inputFields: allowedInputFields,
    outputFields: allowedOutputFields,
    constraintFields: allowedConstraintFields,
    sortFields: allowedSortFields
  } = getParseClassTypeConfig(parseClassConfig);
  let classOutputFields;
  let classCreateFields;
  let classUpdateFields;
  let classConstraintFields;
  let classSortFields; // All allowed customs fields

  const classCustomFields = classFields.filter(field => {
    return !Object.keys(defaultGraphQLTypes.PARSE_OBJECT_FIELDS).includes(field) && field !== 'id';
  });

  if (allowedInputFields && allowedInputFields.create) {
    classCreateFields = classCustomFields.filter(field => {
      return allowedInputFields.create.includes(field);
    });
  } else {
    classCreateFields = classCustomFields;
  }

  if (allowedInputFields && allowedInputFields.update) {
    classUpdateFields = classCustomFields.filter(field => {
      return allowedInputFields.update.includes(field);
    });
  } else {
    classUpdateFields = classCustomFields;
  }

  if (allowedOutputFields) {
    classOutputFields = classCustomFields.filter(field => {
      return allowedOutputFields.includes(field);
    });
  } else {
    classOutputFields = classCustomFields;
  } // Filters the "password" field from class _User


  if (parseClass.className === '_User') {
    classOutputFields = classOutputFields.filter(outputField => outputField !== 'password');
  }

  if (allowedConstraintFields) {
    classConstraintFields = classCustomFields.filter(field => {
      return allowedConstraintFields.includes(field);
    });
  } else {
    classConstraintFields = classFields;
  }

  if (allowedSortFields) {
    classSortFields = allowedSortFields;

    if (!classSortFields.length) {
      // must have at least 1 order field
      // otherwise the FindArgs Input Type will throw.
      classSortFields.push({
        field: 'id',
        asc: true,
        desc: true
      });
    }
  } else {
    classSortFields = classFields.map(field => {
      return {
        field,
        asc: true,
        desc: true
      };
    });
  }

  return {
    classCreateFields,
    classUpdateFields,
    classConstraintFields,
    classOutputFields,
    classSortFields
  };
};

const load = (parseGraphQLSchema, parseClass, parseClassConfig) => {
  const className = parseClass.className;
  const graphQLClassName = (0, _className.transformClassNameToGraphQL)(className);
  const {
    classCreateFields,
    classUpdateFields,
    classOutputFields,
    classConstraintFields,
    classSortFields
  } = getInputFieldsAndConstraints(parseClass, parseClassConfig);
  const {
    create: isCreateEnabled = true,
    update: isUpdateEnabled = true
  } = (0, _parseGraphQLUtils.getParseClassMutationConfig)(parseClassConfig);
  const classGraphQLCreateTypeName = `Create${graphQLClassName}FieldsInput`;
  let classGraphQLCreateType = new _graphql.GraphQLInputObjectType({
    name: classGraphQLCreateTypeName,
    description: `The ${classGraphQLCreateTypeName} input type is used in operations that involve creation of objects in the ${graphQLClassName} class.`,
    fields: () => classCreateFields.reduce((fields, field) => {
      const type = (0, _inputType.transformInputTypeToGraphQL)(parseClass.fields[field].type, parseClass.fields[field].targetClass, parseGraphQLSchema.parseClassTypes);

      if (type) {
        return _objectSpread(_objectSpread({}, fields), {}, {
          [field]: {
            description: `This is the object ${field}.`,
            type: className === '_User' && (field === 'username' || field === 'password') || parseClass.fields[field].required ? new _graphql.GraphQLNonNull(type) : type
          }
        });
      } else {
        return fields;
      }
    }, {
      ACL: {
        type: defaultGraphQLTypes.ACL_INPUT
      }
    })
  });
  classGraphQLCreateType = parseGraphQLSchema.addGraphQLType(classGraphQLCreateType);
  const classGraphQLUpdateTypeName = `Update${graphQLClassName}FieldsInput`;
  let classGraphQLUpdateType = new _graphql.GraphQLInputObjectType({
    name: classGraphQLUpdateTypeName,
    description: `The ${classGraphQLUpdateTypeName} input type is used in operations that involve creation of objects in the ${graphQLClassName} class.`,
    fields: () => classUpdateFields.reduce((fields, field) => {
      const type = (0, _inputType.transformInputTypeToGraphQL)(parseClass.fields[field].type, parseClass.fields[field].targetClass, parseGraphQLSchema.parseClassTypes);

      if (type) {
        return _objectSpread(_objectSpread({}, fields), {}, {
          [field]: {
            description: `This is the object ${field}.`,
            type
          }
        });
      } else {
        return fields;
      }
    }, {
      ACL: {
        type: defaultGraphQLTypes.ACL_INPUT
      }
    })
  });
  classGraphQLUpdateType = parseGraphQLSchema.addGraphQLType(classGraphQLUpdateType);
  const classGraphQLPointerTypeName = `${graphQLClassName}PointerInput`;
  let classGraphQLPointerType = new _graphql.GraphQLInputObjectType({
    name: classGraphQLPointerTypeName,
    description: `Allow to link OR add and link an object of the ${graphQLClassName} class.`,
    fields: () => {
      const fields = {
        link: {
          description: `Link an existing object from ${graphQLClassName} class. You can use either the global or the object id.`,
          type: _graphql.GraphQLID
        }
      };

      if (isCreateEnabled) {
        fields['createAndLink'] = {
          description: `Create and link an object from ${graphQLClassName} class.`,
          type: classGraphQLCreateType
        };
      }

      return fields;
    }
  });
  classGraphQLPointerType = parseGraphQLSchema.addGraphQLType(classGraphQLPointerType) || defaultGraphQLTypes.OBJECT;
  const classGraphQLRelationTypeName = `${graphQLClassName}RelationInput`;
  let classGraphQLRelationType = new _graphql.GraphQLInputObjectType({
    name: classGraphQLRelationTypeName,
    description: `Allow to add, remove, createAndAdd objects of the ${graphQLClassName} class into a relation field.`,
    fields: () => {
      const fields = {
        add: {
          description: `Add existing objects from the ${graphQLClassName} class into the relation. You can use either the global or the object ids.`,
          type: new _graphql.GraphQLList(defaultGraphQLTypes.OBJECT_ID)
        },
        remove: {
          description: `Remove existing objects from the ${graphQLClassName} class out of the relation. You can use either the global or the object ids.`,
          type: new _graphql.GraphQLList(defaultGraphQLTypes.OBJECT_ID)
        }
      };

      if (isCreateEnabled) {
        fields['createAndAdd'] = {
          description: `Create and add objects of the ${graphQLClassName} class into the relation.`,
          type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(classGraphQLCreateType))
        };
      }

      return fields;
    }
  });
  classGraphQLRelationType = parseGraphQLSchema.addGraphQLType(classGraphQLRelationType) || defaultGraphQLTypes.OBJECT;
  const classGraphQLConstraintsTypeName = `${graphQLClassName}WhereInput`;
  let classGraphQLConstraintsType = new _graphql.GraphQLInputObjectType({
    name: classGraphQLConstraintsTypeName,
    description: `The ${classGraphQLConstraintsTypeName} input type is used in operations that involve filtering objects of ${graphQLClassName} class.`,
    fields: () => _objectSpread(_objectSpread({}, classConstraintFields.reduce((fields, field) => {
      if (['OR', 'AND', 'NOR'].includes(field)) {
        parseGraphQLSchema.log.warn(`Field ${field} could not be added to the auto schema ${classGraphQLConstraintsTypeName} because it collided with an existing one.`);
        return fields;
      }

      const parseField = field === 'id' ? 'objectId' : field;
      const type = (0, _constraintType.transformConstraintTypeToGraphQL)(parseClass.fields[parseField].type, parseClass.fields[parseField].targetClass, parseGraphQLSchema.parseClassTypes, field);

      if (type) {
        return _objectSpread(_objectSpread({}, fields), {}, {
          [field]: {
            description: `This is the object ${field}.`,
            type
          }
        });
      } else {
        return fields;
      }
    }, {})), {}, {
      OR: {
        description: 'This is the OR operator to compound constraints.',
        type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(classGraphQLConstraintsType))
      },
      AND: {
        description: 'This is the AND operator to compound constraints.',
        type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(classGraphQLConstraintsType))
      },
      NOR: {
        description: 'This is the NOR operator to compound constraints.',
        type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(classGraphQLConstraintsType))
      }
    })
  });
  classGraphQLConstraintsType = parseGraphQLSchema.addGraphQLType(classGraphQLConstraintsType) || defaultGraphQLTypes.OBJECT;
  const classGraphQLRelationConstraintsTypeName = `${graphQLClassName}RelationWhereInput`;
  let classGraphQLRelationConstraintsType = new _graphql.GraphQLInputObjectType({
    name: classGraphQLRelationConstraintsTypeName,
    description: `The ${classGraphQLRelationConstraintsTypeName} input type is used in operations that involve filtering objects of ${graphQLClassName} class.`,
    fields: () => ({
      have: {
        description: 'Run a relational/pointer query where at least one child object can match.',
        type: classGraphQLConstraintsType
      },
      haveNot: {
        description: 'Run an inverted relational/pointer query where at least one child object can match.',
        type: classGraphQLConstraintsType
      },
      exists: {
        description: 'Check if the relation/pointer contains objects.',
        type: _graphql.GraphQLBoolean
      }
    })
  });
  classGraphQLRelationConstraintsType = parseGraphQLSchema.addGraphQLType(classGraphQLRelationConstraintsType) || defaultGraphQLTypes.OBJECT;
  const classGraphQLOrderTypeName = `${graphQLClassName}Order`;
  let classGraphQLOrderType = new _graphql.GraphQLEnumType({
    name: classGraphQLOrderTypeName,
    description: `The ${classGraphQLOrderTypeName} input type is used when sorting objects of the ${graphQLClassName} class.`,
    values: classSortFields.reduce((sortFields, fieldConfig) => {
      const {
        field,
        asc,
        desc
      } = fieldConfig;

      const updatedSortFields = _objectSpread({}, sortFields);

      const value = field === 'id' ? 'objectId' : field;

      if (asc) {
        updatedSortFields[`${field}_ASC`] = {
          value
        };
      }

      if (desc) {
        updatedSortFields[`${field}_DESC`] = {
          value: `-${value}`
        };
      }

      return updatedSortFields;
    }, {})
  });
  classGraphQLOrderType = parseGraphQLSchema.addGraphQLType(classGraphQLOrderType);

  const classGraphQLFindArgs = _objectSpread(_objectSpread({
    where: {
      description: 'These are the conditions that the objects need to match in order to be found.',
      type: classGraphQLConstraintsType
    },
    order: {
      description: 'The fields to be used when sorting the data fetched.',
      type: classGraphQLOrderType ? new _graphql.GraphQLList(new _graphql.GraphQLNonNull(classGraphQLOrderType)) : _graphql.GraphQLString
    },
    skip: defaultGraphQLTypes.SKIP_ATT
  }, _graphqlRelay.connectionArgs), {}, {
    options: defaultGraphQLTypes.READ_OPTIONS_ATT
  });

  const classGraphQLOutputTypeName = `${graphQLClassName}`;
  const interfaces = [defaultGraphQLTypes.PARSE_OBJECT, parseGraphQLSchema.relayNodeInterface];

  const parseObjectFields = _objectSpread({
    id: (0, _graphqlRelay.globalIdField)(className, obj => obj.objectId)
  }, defaultGraphQLTypes.PARSE_OBJECT_FIELDS);

  const outputFields = () => {
    return classOutputFields.reduce((fields, field) => {
      const type = (0, _outputType.transformOutputTypeToGraphQL)(parseClass.fields[field].type, parseClass.fields[field].targetClass, parseGraphQLSchema.parseClassTypes);

      if (parseClass.fields[field].type === 'Relation') {
        const targetParseClassTypes = parseGraphQLSchema.parseClassTypes[parseClass.fields[field].targetClass];
        const args = targetParseClassTypes ? targetParseClassTypes.classGraphQLFindArgs : undefined;
        return _objectSpread(_objectSpread({}, fields), {}, {
          [field]: {
            description: `This is the object ${field}.`,
            args,
            type: parseClass.fields[field].required ? new _graphql.GraphQLNonNull(type) : type,

            async resolve(source, args, context, queryInfo) {
              try {
                const {
                  where,
                  order,
                  skip,
                  first,
                  after,
                  last,
                  before,
                  options
                } = args;
                const {
                  readPreference,
                  includeReadPreference,
                  subqueryReadPreference
                } = options || {};
                const {
                  config,
                  auth,
                  info
                } = context;
                const selectedFields = (0, _graphqlListFields.default)(queryInfo);
                const {
                  keys,
                  include
                } = (0, _parseGraphQLUtils.extractKeysAndInclude)(selectedFields.filter(field => field.startsWith('edges.node.')).map(field => field.replace('edges.node.', '')).filter(field => field.indexOf('edges.node') < 0));
                const parseOrder = order && order.join(',');
                return objectsQueries.findObjects(source[field].className, _objectSpread({
                  $relatedTo: {
                    object: {
                      __type: 'Pointer',
                      className: className,
                      objectId: source.objectId
                    },
                    key: field
                  }
                }, where || {}), parseOrder, skip, first, after, last, before, keys, include, false, readPreference, includeReadPreference, subqueryReadPreference, config, auth, info, selectedFields, parseGraphQLSchema.parseClasses);
              } catch (e) {
                parseGraphQLSchema.handleError(e);
              }
            }

          }
        });
      } else if (parseClass.fields[field].type === 'Polygon') {
        return _objectSpread(_objectSpread({}, fields), {}, {
          [field]: {
            description: `This is the object ${field}.`,
            type: parseClass.fields[field].required ? new _graphql.GraphQLNonNull(type) : type,

            async resolve(source) {
              if (source[field] && source[field].coordinates) {
                return source[field].coordinates.map(coordinate => ({
                  latitude: coordinate[0],
                  longitude: coordinate[1]
                }));
              } else {
                return null;
              }
            }

          }
        });
      } else if (parseClass.fields[field].type === 'Array') {
        return _objectSpread(_objectSpread({}, fields), {}, {
          [field]: {
            description: `Use Inline Fragment on Array to get results: https://graphql.org/learn/queries/#inline-fragments`,
            type: parseClass.fields[field].required ? new _graphql.GraphQLNonNull(type) : type,

            async resolve(source) {
              if (!source[field]) return null;
              return source[field].map(async elem => {
                if (elem.className && elem.objectId && elem.__type === 'Object') {
                  return elem;
                } else {
                  return {
                    value: elem
                  };
                }
              });
            }

          }
        });
      } else if (type) {
        return _objectSpread(_objectSpread({}, fields), {}, {
          [field]: {
            description: `This is the object ${field}.`,
            type: parseClass.fields[field].required ? new _graphql.GraphQLNonNull(type) : type
          }
        });
      } else {
        return fields;
      }
    }, parseObjectFields);
  };

  let classGraphQLOutputType = new _graphql.GraphQLObjectType({
    name: classGraphQLOutputTypeName,
    description: `The ${classGraphQLOutputTypeName} object type is used in operations that involve outputting objects of ${graphQLClassName} class.`,
    interfaces,
    fields: outputFields
  });
  classGraphQLOutputType = parseGraphQLSchema.addGraphQLType(classGraphQLOutputType);
  const {
    connectionType,
    edgeType
  } = (0, _graphqlRelay.connectionDefinitions)({
    name: graphQLClassName,
    connectionFields: {
      count: defaultGraphQLTypes.COUNT_ATT
    },
    nodeType: classGraphQLOutputType || defaultGraphQLTypes.OBJECT
  });
  let classGraphQLFindResultType = undefined;

  if (parseGraphQLSchema.addGraphQLType(edgeType) && parseGraphQLSchema.addGraphQLType(connectionType, false, false, true)) {
    classGraphQLFindResultType = connectionType;
  }

  parseGraphQLSchema.parseClassTypes[className] = {
    classGraphQLPointerType,
    classGraphQLRelationType,
    classGraphQLCreateType,
    classGraphQLUpdateType,
    classGraphQLConstraintsType,
    classGraphQLRelationConstraintsType,
    classGraphQLFindArgs,
    classGraphQLOutputType,
    classGraphQLFindResultType,
    config: {
      parseClassConfig,
      isCreateEnabled,
      isUpdateEnabled
    }
  };

  if (className === '_User') {
    const viewerType = new _graphql.GraphQLObjectType({
      name: 'Viewer',
      description: `The Viewer object type is used in operations that involve outputting the current user data.`,
      fields: () => ({
        sessionToken: defaultGraphQLTypes.SESSION_TOKEN_ATT,
        user: {
          description: 'This is the current user.',
          type: new _graphql.GraphQLNonNull(classGraphQLOutputType)
        }
      })
    });
    parseGraphQLSchema.addGraphQLType(viewerType, true, true);
    parseGraphQLSchema.viewerType = viewerType;
  }
};

exports.load = load;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9HcmFwaFFML2xvYWRlcnMvcGFyc2VDbGFzc1R5cGVzLmpzIl0sIm5hbWVzIjpbImdldFBhcnNlQ2xhc3NUeXBlQ29uZmlnIiwicGFyc2VDbGFzc0NvbmZpZyIsInR5cGUiLCJnZXRJbnB1dEZpZWxkc0FuZENvbnN0cmFpbnRzIiwicGFyc2VDbGFzcyIsImNsYXNzRmllbGRzIiwiT2JqZWN0Iiwia2V5cyIsImZpZWxkcyIsImNvbmNhdCIsImlucHV0RmllbGRzIiwiYWxsb3dlZElucHV0RmllbGRzIiwib3V0cHV0RmllbGRzIiwiYWxsb3dlZE91dHB1dEZpZWxkcyIsImNvbnN0cmFpbnRGaWVsZHMiLCJhbGxvd2VkQ29uc3RyYWludEZpZWxkcyIsInNvcnRGaWVsZHMiLCJhbGxvd2VkU29ydEZpZWxkcyIsImNsYXNzT3V0cHV0RmllbGRzIiwiY2xhc3NDcmVhdGVGaWVsZHMiLCJjbGFzc1VwZGF0ZUZpZWxkcyIsImNsYXNzQ29uc3RyYWludEZpZWxkcyIsImNsYXNzU29ydEZpZWxkcyIsImNsYXNzQ3VzdG9tRmllbGRzIiwiZmlsdGVyIiwiZmllbGQiLCJkZWZhdWx0R3JhcGhRTFR5cGVzIiwiUEFSU0VfT0JKRUNUX0ZJRUxEUyIsImluY2x1ZGVzIiwiY3JlYXRlIiwidXBkYXRlIiwiY2xhc3NOYW1lIiwib3V0cHV0RmllbGQiLCJsZW5ndGgiLCJwdXNoIiwiYXNjIiwiZGVzYyIsIm1hcCIsImxvYWQiLCJwYXJzZUdyYXBoUUxTY2hlbWEiLCJncmFwaFFMQ2xhc3NOYW1lIiwiaXNDcmVhdGVFbmFibGVkIiwiaXNVcGRhdGVFbmFibGVkIiwiY2xhc3NHcmFwaFFMQ3JlYXRlVHlwZU5hbWUiLCJjbGFzc0dyYXBoUUxDcmVhdGVUeXBlIiwiR3JhcGhRTElucHV0T2JqZWN0VHlwZSIsIm5hbWUiLCJkZXNjcmlwdGlvbiIsInJlZHVjZSIsInRhcmdldENsYXNzIiwicGFyc2VDbGFzc1R5cGVzIiwicmVxdWlyZWQiLCJHcmFwaFFMTm9uTnVsbCIsIkFDTCIsIkFDTF9JTlBVVCIsImFkZEdyYXBoUUxUeXBlIiwiY2xhc3NHcmFwaFFMVXBkYXRlVHlwZU5hbWUiLCJjbGFzc0dyYXBoUUxVcGRhdGVUeXBlIiwiY2xhc3NHcmFwaFFMUG9pbnRlclR5cGVOYW1lIiwiY2xhc3NHcmFwaFFMUG9pbnRlclR5cGUiLCJsaW5rIiwiR3JhcGhRTElEIiwiT0JKRUNUIiwiY2xhc3NHcmFwaFFMUmVsYXRpb25UeXBlTmFtZSIsImNsYXNzR3JhcGhRTFJlbGF0aW9uVHlwZSIsImFkZCIsIkdyYXBoUUxMaXN0IiwiT0JKRUNUX0lEIiwicmVtb3ZlIiwiY2xhc3NHcmFwaFFMQ29uc3RyYWludHNUeXBlTmFtZSIsImNsYXNzR3JhcGhRTENvbnN0cmFpbnRzVHlwZSIsImxvZyIsIndhcm4iLCJwYXJzZUZpZWxkIiwiT1IiLCJBTkQiLCJOT1IiLCJjbGFzc0dyYXBoUUxSZWxhdGlvbkNvbnN0cmFpbnRzVHlwZU5hbWUiLCJjbGFzc0dyYXBoUUxSZWxhdGlvbkNvbnN0cmFpbnRzVHlwZSIsImhhdmUiLCJoYXZlTm90IiwiZXhpc3RzIiwiR3JhcGhRTEJvb2xlYW4iLCJjbGFzc0dyYXBoUUxPcmRlclR5cGVOYW1lIiwiY2xhc3NHcmFwaFFMT3JkZXJUeXBlIiwiR3JhcGhRTEVudW1UeXBlIiwidmFsdWVzIiwiZmllbGRDb25maWciLCJ1cGRhdGVkU29ydEZpZWxkcyIsInZhbHVlIiwiY2xhc3NHcmFwaFFMRmluZEFyZ3MiLCJ3aGVyZSIsIm9yZGVyIiwiR3JhcGhRTFN0cmluZyIsInNraXAiLCJTS0lQX0FUVCIsImNvbm5lY3Rpb25BcmdzIiwib3B0aW9ucyIsIlJFQURfT1BUSU9OU19BVFQiLCJjbGFzc0dyYXBoUUxPdXRwdXRUeXBlTmFtZSIsImludGVyZmFjZXMiLCJQQVJTRV9PQkpFQ1QiLCJyZWxheU5vZGVJbnRlcmZhY2UiLCJwYXJzZU9iamVjdEZpZWxkcyIsImlkIiwib2JqIiwib2JqZWN0SWQiLCJ0YXJnZXRQYXJzZUNsYXNzVHlwZXMiLCJhcmdzIiwidW5kZWZpbmVkIiwicmVzb2x2ZSIsInNvdXJjZSIsImNvbnRleHQiLCJxdWVyeUluZm8iLCJmaXJzdCIsImFmdGVyIiwibGFzdCIsImJlZm9yZSIsInJlYWRQcmVmZXJlbmNlIiwiaW5jbHVkZVJlYWRQcmVmZXJlbmNlIiwic3VicXVlcnlSZWFkUHJlZmVyZW5jZSIsImNvbmZpZyIsImF1dGgiLCJpbmZvIiwic2VsZWN0ZWRGaWVsZHMiLCJpbmNsdWRlIiwic3RhcnRzV2l0aCIsInJlcGxhY2UiLCJpbmRleE9mIiwicGFyc2VPcmRlciIsImpvaW4iLCJvYmplY3RzUXVlcmllcyIsImZpbmRPYmplY3RzIiwiJHJlbGF0ZWRUbyIsIm9iamVjdCIsIl9fdHlwZSIsImtleSIsInBhcnNlQ2xhc3NlcyIsImUiLCJoYW5kbGVFcnJvciIsImNvb3JkaW5hdGVzIiwiY29vcmRpbmF0ZSIsImxhdGl0dWRlIiwibG9uZ2l0dWRlIiwiZWxlbSIsImNsYXNzR3JhcGhRTE91dHB1dFR5cGUiLCJHcmFwaFFMT2JqZWN0VHlwZSIsImNvbm5lY3Rpb25UeXBlIiwiZWRnZVR5cGUiLCJjb25uZWN0aW9uRmllbGRzIiwiY291bnQiLCJDT1VOVF9BVFQiLCJub2RlVHlwZSIsImNsYXNzR3JhcGhRTEZpbmRSZXN1bHRUeXBlIiwidmlld2VyVHlwZSIsInNlc3Npb25Ub2tlbiIsIlNFU1NJT05fVE9LRU5fQVRUIiwidXNlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOztBQVVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7OztBQUVBLE1BQU1BLHVCQUF1QixHQUFHLFVBQVVDLGdCQUFWLEVBQXNEO0FBQ3BGLFNBQVFBLGdCQUFnQixJQUFJQSxnQkFBZ0IsQ0FBQ0MsSUFBdEMsSUFBK0MsRUFBdEQ7QUFDRCxDQUZEOztBQUlBLE1BQU1DLDRCQUE0QixHQUFHLFVBQ25DQyxVQURtQyxFQUVuQ0gsZ0JBRm1DLEVBR25DO0FBQ0EsUUFBTUksV0FBVyxH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aFFMSUQsXG4gIEdyYXBoUUxPYmplY3RUeXBlLFxuICBHcmFwaFFMU3RyaW5nLFxuICBHcmFwaFFMTGlzdCxcbiAgR3JhcGhRTElucHV0T2JqZWN0VHlwZSxcbiAgR3JhcGhRTE5vbk51bGwsXG4gIEdyYXBoUUxCb29sZWFuLFxuICBHcmFwaFFMRW51bVR5cGUsXG59IGZyb20gJ2dyYXBocWwnO1xuaW1wb3J0IHsgZ2xvYmFsSWRGaWVsZCwgY29ubmVjdGlvbkFyZ3MsIGNvbm5lY3Rpb25EZWZpbml0aW9ucyB9IGZyb20gJ2dyYXBocWwtcmVsYXknO1xuaW1wb3J0IGdldEZpZWxkTmFtZXMgZnJvbSAnZ3JhcGhxbC1saXN0LWZpZWxkcyc7XG5pbXBvcnQgKiBhcyBkZWZhdWx0R3JhcGhRTFR5cGVzIGZyb20gJy4vZGVmYXVsdEdyYXBoUUxUeXBlcyc7XG5pbXBvcnQgKiBhcyBvYmplY3RzUXVlcmllcyBmcm9tICcuLi9oZWxwZXJzL29iamVjdHNRdWVyaWVzJztcbmltcG9ydCB7IFBhcnNlR3JhcGhRTENsYXNzQ29uZmlnIH0gZnJvbSAnLi4vLi4vQ29udHJvbGxlcnMvUGFyc2VHcmFwaFFMQ29udHJvbGxlcic7XG5pbXBvcnQgeyB0cmFuc2Zvcm1DbGFzc05hbWVUb0dyYXBoUUwgfSBmcm9tICcuLi90cmFuc2Zvcm1lcnMvY2xhc3NOYW1lJztcbmltcG9ydCB7IHRyYW5zZm9ybUlucHV0VHlwZVRvR3JhcGhRTCB9IGZyb20gJy4uL3RyYW5zZm9ybWVycy9pbnB1dFR5cGUnO1xuaW1wb3J0IHsgdHJhbnNmb3JtT3V0cHV0VHlwZVRvR3JhcGhRTCB9IGZyb20gJy4uL3RyYW5zZm9ybWVycy9vdXRwdXRUeXBlJztcbmltcG9ydCB7IHRyYW5zZm9ybUNvbnN0cmFpbnRUeXBlVG9HcmFwaFFMIH0gZnJvbSAnLi4vdHJhbnNmb3JtZXJzL2NvbnN0cmFpbnRUeXBlJztcbmltcG9ydCB7IGV4dHJhY3RLZXlzQW5kSW5jbHVkZSwgZ2V0UGFyc2VDbGFzc011dGF0aW9uQ29uZmlnIH0gZnJvbSAnLi4vcGFyc2VHcmFwaFFMVXRpbHMnO1xuXG5jb25zdCBnZXRQYXJzZUNsYXNzVHlwZUNvbmZpZyA9IGZ1bmN0aW9uIChwYXJzZUNsYXNzQ29uZmlnOiA/UGFyc2VHcmFwaFFMQ2xhc3NDb25maWcpIHtcbiAgcmV0dXJuIChwYXJzZUNsYXNzQ29uZmlnICYmIHBhcnNlQ2xhc3NDb25maWcudHlwZSkgfHwge307XG59O1xuXG5jb25zdCBnZXRJbnB1dEZpZWxkc0FuZENvbnN0cmFpbnRzID0gZnVuY3Rpb24gKFxuICBwYXJzZUNsYXNzLFxuICBwYXJzZUNsYXNzQ29uZmlnOiA/UGFyc2VHcmFwaFFMQ2xhc3NDb25maWdcbikge1xuICBjb25zdCBjbGFzc0ZpZWxkcyA9IE9iamVjdC5rZXlzKHBhcnNlQ2xhc3MuZmllbGRzKS5jb25jYXQoJ2lkJyk7XG4gIGNvbnN0IHtcbiAgICBpbnB1dEZpZWxkczogYWxsb3dlZElucHV0RmllbGRzLFxuICAgIG91dHB1dEZpZWxkczogYWxsb3dlZE91dHB1dEZpZWxkcyxcbiAgICBjb25zdHJhaW50RmllbGRzOiBhbGxvd2VkQ29uc3RyYWludEZpZWxkcyxcbiAgICBzb3J0RmllbGRzOiBhbGxvd2VkU29ydEZpZWxkcyxcbiAgfSA9IGdldFBhcnNlQ2xhc3NUeXBlQ29uZmlnKHBhcnNlQ2xhc3NDb25maWcpO1xuXG4gIGxldCBjbGFzc091dHB1dEZpZWxkcztcbiAgbGV0IGNsYXNzQ3JlYXRlRmllbGRzO1xuICBsZXQgY2xhc3NVcGRhdGVGaWVsZHM7XG4gIGxldCBjbGFzc0NvbnN0cmFpbnRGaWVsZHM7XG4gIGxldCBjbGFzc1NvcnRGaWVsZHM7XG5cbiAgLy8gQWxsIGFsbG93ZWQgY3VzdG9tcyBmaWVsZHNcbiAgY29uc3QgY2xhc3NDdXN0b21GaWVsZHMgPSBjbGFzc0ZpZWxkcy5maWx0ZXIoZmllbGQgPT4ge1xuICAgIHJldHVybiAhT2JqZWN0LmtleXMoZGVmYXVsdEdyYXBoUUxUeXBlcy5QQVJTRV9PQkpFQ1RfRklFTERTKS5pbmNsdWRlcyhmaWVsZCkgJiYgZmllbGQgIT09ICdpZCc7XG4gIH0pO1xuXG4gIGlmIChhbGxvd2VkSW5wdXRGaWVsZHMgJiYgYWxsb3dlZElucHV0RmllbGRzLmNyZWF0ZSkge1xuICAgIGNsYXNzQ3JlYXRlRmllbGRzID0gY2xhc3NDdXN0b21GaWVsZHMuZmlsdGVyKGZpZWxkID0+IHtcbiAgICAgIHJldHVybiBhbGxvd2VkSW5wdXRGaWVsZHMuY3JlYXRlLmluY2x1ZGVzKGZpZWxkKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBjbGFzc0NyZWF0ZUZpZWxkcyA9IGNsYXNzQ3VzdG9tRmllbGRzO1xuICB9XG4gIGlmIChhbGxvd2VkSW5wdXRGaWVsZHMgJiYgYWxsb3dlZElucHV0RmllbGRzLnVwZGF0ZSkge1xuICAgIGNsYXNzVXBkYXRlRmllbGRzID0gY2xhc3NDdXN0b21GaWVsZHMuZmlsdGVyKGZpZWxkID0+IHtcbiAgICAgIHJldHVybiBhbGxvd2VkSW5wdXRGaWVsZHMudXBkYXRlLmluY2x1ZGVzKGZpZWxkKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBjbGFzc1VwZGF0ZUZpZWxkcyA9IGNsYXNzQ3VzdG9tRmllbGRzO1xuICB9XG5cbiAgaWYgKGFsbG93ZWRPdXRwdXRGaWVsZHMpIHtcbiAgICBjbGFzc091dHB1dEZpZWxkcyA9IGNsYXNzQ3VzdG9tRmllbGRzLmZpbHRlcihmaWVsZCA9PiB7XG4gICAgICByZXR1cm4gYWxsb3dlZE91dHB1dEZpZWxkcy5pbmNsdWRlcyhmaWVsZCk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgY2xhc3NPdXRwdXRGaWVsZHMgPSBjbGFzc0N1c3RvbUZpZWxkcztcbiAgfVxuICAvLyBGaWx0ZXJzIHRoZSBcInBhc3N3b3JkXCIgZmllbGQgZnJvbSBjbGFzcyBfVXNlclxuICBpZiAocGFyc2VDbGFzcy5jbGFzc05hbWUgPT09ICdfVXNlcicpIHtcbiAgICBjbGFzc091dHB1dEZpZWxkcyA9IGNsYXNzT3V0cHV0RmllbGRzLmZpbHRlcihvdXRwdXRGaWVsZCA9PiBvdXRwdXRGaWVsZCAhPT0gJ3Bhc3N3b3JkJyk7XG4gIH1cblxuICBpZiAoYWxsb3dlZENvbnN0cmFpbnRGaWVsZHMpIHtcbiAgICBjbGFzc0NvbnN0cmFpbnRGaWVsZHMgPSBjbGFzc0N1c3RvbUZpZWxkcy5maWx0ZXIoZmllbGQgPT4ge1xuICAgICAgcmV0dXJuIGFsbG93ZWRDb25zdHJhaW50RmllbGRzLmluY2x1ZGVzKGZpZWxkKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBjbGFzc0NvbnN0cmFpbnRGaWVsZHMgPSBjbGFzc0ZpZWxkcztcbiAgfVxuXG4gIGlmIChhbGxvd2VkU29ydEZpZWxkcykge1xuICAgIGNsYXNzU29ydEZpZWxkcyA9IGFsbG93ZWRTb3J0RmllbGRzO1xuICAgIGlmICghY2xhc3NTb3J0RmllbGRzLmxlbmd0aCkge1xuICAgICAgLy8gbXVzdCBoYXZlIGF0IGxlYXN0IDEgb3JkZXIgZmllbGRcbiAgICAgIC8vIG90aGVyd2lzZSB0aGUgRmluZEFyZ3MgSW5wdXQgVHlwZSB3aWxsIHRocm93LlxuICAgICAgY2xhc3NTb3J0RmllbGRzLnB1c2goe1xuICAgICAgICBmaWVsZDogJ2lkJyxcbiAgICAgICAgYXNjOiB0cnVlLFxuICAgICAgICBkZXNjOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGNsYXNzU29ydEZpZWxkcyA9IGNsYXNzRmllbGRzLm1hcChmaWVsZCA9PiB7XG4gICAgICByZXR1cm4geyBmaWVsZCwgYXNjOiB0cnVlLCBkZXNjOiB0cnVlIH07XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGNsYXNzQ3JlYXRlRmllbGRzLFxuICAgIGNsYXNzVXBkYXRlRmllbGRzLFxuICAgIGNsYXNzQ29uc3RyYWludEZpZWxkcyxcbiAgICBjbGFzc091dHB1dEZpZWxkcyxcbiAgICBjbGFzc1NvcnRGaWVsZHMsXG4gIH07XG59O1xuXG5jb25zdCBsb2FkID0gKHBhcnNlR3JhcGhRTFNjaGVtYSwgcGFyc2VDbGFzcywgcGFyc2VDbGFzc0NvbmZpZzogP1BhcnNlR3JhcGhRTENsYXNzQ29uZmlnKSA9PiB7XG4gIGNvbnN0IGNsYXNzTmFtZSA9IHBhcnNlQ2xhc3MuY2xhc3NOYW1lO1xuICBjb25zdCBncmFwaFFMQ2xhc3NOYW1lID0gdHJhbnNmb3JtQ2xhc3NOYW1lVG9HcmFwaFFMKGNsYXNzTmFtZSk7XG4gIGNvbnN0IHtcbiAgICBjbGFzc0NyZWF0ZUZpZWxkcyxcbiAgICBjbGFzc1VwZGF0ZUZpZWxkcyxcbiAgICBjbGFzc091dHB1dEZpZWxkcyxcbiAgICBjbGFzc0NvbnN0cmFpbnRGaWVsZHMsXG4gICAgY2xhc3NTb3J0RmllbGRzLFxuICB9ID0gZ2V0SW5wdXRGaWVsZHNBbmRDb25zdHJhaW50cyhwYXJzZUNsYXNzLCBwYXJzZUNsYXNzQ29uZmlnKTtcblxuICBjb25zdCB7XG4gICAgY3JlYXRlOiBpc0NyZWF0ZUVuYWJsZWQgPSB0cnVlLFxuICAgIHVwZGF0ZTogaXNVcGRhdGVFbmFibGVkID0gdHJ1ZSxcbiAgfSA9IGdldFBhcnNlQ2xhc3NNdXRhdGlvbkNvbmZpZyhwYXJzZUNsYXNzQ29uZmlnKTtcblxuICBjb25zdCBjbGFzc0dyYXBoUUxDcmVhdGVUeXBlTmFtZSA9IGBDcmVhdGUke2dyYXBoUUxDbGFzc05hbWV9RmllbGRzSW5wdXRgO1xuICBsZXQgY2xhc3NHcmFwaFFMQ3JlYXRlVHlwZSA9IG5ldyBHcmFwaFFMSW5wdXRPYmplY3RUeXBlKHtcbiAgICBuYW1lOiBjbGFzc0dyYXBoUUxDcmVhdGVUeXBlTmFtZSxcbiAgICBkZXNjcmlwdGlvbjogYFRoZSAke2NsYXNzR3JhcGhRTENyZWF0ZVR5cGVOYW1lfSBpbnB1dCB0eXBlIGlzIHVzZWQgaW4gb3BlcmF0aW9ucyB0aGF0IGludm9sdmUgY3JlYXRpb24gb2Ygb2JqZWN0cyBpbiB0aGUgJHtncmFwaFFMQ2xhc3NOYW1lfSBjbGFzcy5gLFxuICAgIGZpZWxkczogKCkgPT5cbiAgICAgIGNsYXNzQ3JlYXRlRmllbGRzLnJlZHVjZShcbiAgICAgICAgKGZpZWxkcywgZmllbGQpID0+IHtcbiAgICAgICAgICBjb25zdCB0eXBlID0gdHJhbnNmb3JtSW5wdXRUeXBlVG9HcmFwaFFMKFxuICAgICAgICAgICAgcGFyc2VDbGFzcy5maWVsZHNbZmllbGRdLnR5cGUsXG4gICAgICAgICAgICBwYXJzZUNsYXNzLmZpZWxkc1tmaWVsZF0udGFyZ2V0Q2xhc3MsXG4gICAgICAgICAgICBwYXJzZUdyYXBoUUxTY2hlbWEucGFyc2VDbGFzc1R5cGVzXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAodHlwZSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgLi4uZmllbGRzLFxuICAgICAgICAgICAgICBbZmllbGRdOiB7XG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IGBUaGlzIGlzIHRoZSBvYmplY3QgJHtmaWVsZH0uYCxcbiAgICAgICAgICAgICAgICB0eXBlOlxuICAgICAgICAgICAgICAgICAgKGNsYXNzTmFtZSA9PT0gJ19Vc2VyJyAmJiAoZmllbGQgPT09ICd1c2VybmFtZScgfHwgZmllbGQgPT09ICdwYXNzd29yZCcpKSB8fFxuICAgICAgICAgICAgICAgICAgcGFyc2VDbGFzcy5maWVsZHNbZmllbGRdLnJlcXVpcmVkXG4gICAgICAgICAgICAgICAgICAgID8gbmV3IEdyYXBoUUxOb25OdWxsKHR5cGUpXG4gICAgICAgICAgICAgICAgICAgIDogdHlwZSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmaWVsZHM7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgQUNMOiB7IHR5cGU6IGRlZmF1bHRHcmFwaFFMVHlwZXMuQUNMX0lOUFVUIH0sXG4gICAgICAgIH1cbiAgICAgICksXG4gIH0pO1xuICBjbGFzc0dyYXBoUUxDcmVhdGVUeXBlID0gcGFyc2VHcmFwaFFMU2NoZW1hLmFkZEdyYXBoUUxUeXBlKGNsYXNzR3JhcGhRTENyZWF0ZVR5cGUpO1xuXG4gIGNvbnN0IGNsYXNzR3JhcGhRTFVwZGF0ZVR5cGVOYW1lID0gYFVwZGF0ZSR7Z3JhcGhRTENsYXNzTmFtZX1GaWVsZHNJbnB1dGA7XG4gIGxldCBjbGFzc0dyYXBoUUxVcGRhdGVUeXBlID0gbmV3IEdyYXBoUUxJbnB1dE9iamVjdFR5cGUoe1xuICAgIG5hbWU6IGNsYXNzR3JhcGhRTFVwZGF0ZVR5cGVOYW1lLFxuICAgIGRlc2NyaXB0aW9uOiBgVGhlICR7Y2xhc3NHcmFwaFFMVXBkYXRlVHlwZU5hbWV9IGlucHV0IHR5cGUgaXMgdXNlZCBpbiBvcGVyYXRpb25zIHRoYXQgaW52b2x2ZSBjcmVhdGlvbiBvZiBvYmplY3RzIGluIHRoZSAke2dyYXBoUUxDbGFzc05hbWV9IGNsYXNzLmAsXG4gICAgZmllbGRzOiAoKSA9PlxuICAgICAgY2xhc3NVcGRhdGVGaWVsZHMucmVkdWNlKFxuICAgICAgICAoZmllbGRzLCBmaWVsZCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHR5cGUgPSB0cmFuc2Zvcm1JbnB1dFR5cGVUb0dyYXBoUUwoXG4gICAgICAgICAgICBwYXJzZUNsYXNzLmZpZWxkc1tmaWVsZF0udHlwZSxcbiAgICAgICAgICAgIHBhcnNlQ2xhc3MuZmllbGRzW2ZpZWxkXS50YXJnZXRDbGFzcyxcbiAgICAgICAgICAgIHBhcnNlR3JhcGhRTFNjaGVtYS5wYXJzZUNsYXNzVHlwZXNcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmICh0eXBlKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAuLi5maWVsZHMsXG4gICAgICAgICAgICAgIFtmaWVsZF06IHtcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogYFRoaXMgaXMgdGhlIG9iamVjdCAke2ZpZWxkfS5gLFxuICAgICAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmllbGRzO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIEFDTDogeyB0eXBlOiBkZWZhdWx0R3JhcGhRTFR5cGVzLkFDTF9JTlBVVCB9LFxuICAgICAgICB9XG4gICAgICApLFxuICB9KTtcbiAgY2xhc3NHcmFwaFFMVXBkYXRlVHlwZSA9IHBhcnNlR3JhcGhRTFNjaGVtYS5hZGRHcmFwaFFMVHlwZShjbGFzc0dyYXBoUUxVcGRhdGVUeXBlKTtcblxuICBjb25zdCBjbGFzc0dyYXBoUUxQb2ludGVyVHlwZU5hbWUgPSBgJHtncmFwaFFMQ2xhc3NOYW1lfVBvaW50ZXJJbnB1dGA7XG4gIGxldCBjbGFzc0dyYXBoUUxQb2ludGVyVHlwZSA9IG5ldyBHcmFwaFFMSW5wdXRPYmplY3RUeXBlKHtcbiAgICBuYW1lOiBjbGFzc0dyYXBoUUxQb2ludGVyVHlwZU5hbWUsXG4gICAgZGVzY3JpcHRpb246IGBBbGxvdyB0byBsaW5rIE9SIGFkZCBhbmQgbGluayBhbiBvYmplY3Qgb2YgdGhlICR7Z3JhcGhRTENsYXNzTmFtZX0gY2xhc3MuYCxcbiAgICBmaWVsZHM6ICgpID0+IHtcbiAgICAgIGNvbnN0IGZpZWxkcyA9IHtcbiAgICAgICAgbGluazoge1xuICAgICAgICAgIGRlc2NyaXB0aW9uOiBgTGluayBhbiBleGlzdGluZyBvYmplY3QgZnJvbSAke2dyYXBoUUxDbGFzc05hbWV9IGNsYXNzLiBZb3UgY2FuIHVzZSBlaXRoZXIgdGhlIGdsb2JhbCBvciB0aGUgb2JqZWN0IGlkLmAsXG4gICAgICAgICAgdHlwZTogR3JhcGhRTElELFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIGlmIChpc0NyZWF0ZUVuYWJsZWQpIHtcbiAgICAgICAgZmllbGRzWydjcmVhdGVBbmRMaW5rJ10gPSB7XG4gICAgICAgICAgZGVzY3JpcHRpb246IGBDcmVhdGUgYW5kIGxpbmsgYW4gb2JqZWN0IGZyb20gJHtncmFwaFFMQ2xhc3NOYW1lfSBjbGFzcy5gLFxuICAgICAgICAgIHR5cGU6IGNsYXNzR3JhcGhRTENyZWF0ZVR5cGUsXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICByZXR1cm4gZmllbGRzO1xuICAgIH0sXG4gIH0pO1xuICBjbGFzc0dyYXBoUUxQb2ludGVyVHlwZSA9XG4gICAgcGFyc2VHcmFwaFFMU2NoZW1hLmFkZEdyYXBoUUxUeXBlKGNsYXNzR3JhcGhRTFBvaW50ZXJUeXBlKSB8fCBkZWZhdWx0R3JhcGhRTFR5cGVzLk9CSkVDVDtcblxuICBjb25zdCBjbGFzc0dyYXBoUUxSZWxhdGlvblR5cGVOYW1lID0gYCR7Z3JhcGhRTENsYXNzTmFtZX1SZWxhdGlvbklucHV0YDtcbiAgbGV0IGNsYXNzR3JhcGhRTFJlbGF0aW9uVHlwZSA9IG5ldyBHcmFwaFFMSW5wdXRPYmplY3RUeXBlKHtcbiAgICBuYW1lOiBjbGFzc0dyYXBoUUxSZWxhdGlvblR5cGVOYW1lLFxuICAgIGRlc2NyaXB0aW9uOiBgQWxsb3cgdG8gYWRkLCByZW1vdmUsIGNyZWF0ZUFuZEFkZCBvYmplY3RzIG9mIHRoZSAke2dyYXBoUUxDbGFzc05hbWV9IGNsYXNzIGludG8gYSByZWxhdGlvbiBmaWVsZC5gLFxuICAgIGZpZWxkczogKCkgPT4ge1xuICAgICAgY29uc3QgZmllbGRzID0ge1xuICAgICAgICBhZGQ6IHtcbiAgICAgICAgICBkZXNjcmlwdGlvbjogYEFkZCBleGlzdGluZyBvYmplY3RzIGZyb20gdGhlICR7Z3JhcGhRTENsYXNzTmFtZX0gY2xhc3MgaW50byB0aGUgcmVsYXRpb24uIFlvdSBjYW4gdXNlIGVpdGhlciB0aGUgZ2xvYmFsIG9yIHRoZSBvYmplY3QgaWRzLmAsXG4gICAgICAgICAgdHlwZTogbmV3IEdyYXBoUUxMaXN0KGRlZmF1bHRHcmFwaFFMVHlwZXMuT0JKRUNUX0lEKSxcbiAgICAgICAgfSxcbiAgICAgICAgcmVtb3ZlOiB7XG4gICAgICAgICAgZGVzY3JpcHRpb246IGBSZW1vdmUgZXhpc3Rpbmcgb2JqZWN0cyBmcm9tIHRoZSAke2dyYXBoUUxDbGFzc05hbWV9IGNsYXNzIG91dCBvZiB0aGUgcmVsYXRpb24uIFlvdSBjYW4gdXNlIGVpdGhlciB0aGUgZ2xvYmFsIG9yIHRoZSBvYmplY3QgaWRzLmAsXG4gICAgICAgICAgdHlwZTogbmV3IEdyYXBoUUxMaXN0KGRlZmF1bHRHcmFwaFFMVHlwZXMuT0JKRUNUX0lEKSxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICBpZiAoaXNDcmVhdGVFbmFibGVkKSB7XG4gICAgICAgIGZpZWxkc1snY3JlYXRlQW5kQWRkJ10gPSB7XG4gICAgICAgICAgZGVzY3JpcHRpb246IGBDcmVhdGUgYW5kIGFkZCBvYmplY3RzIG9mIHRoZSAke2dyYXBoUUxDbGFzc05hbWV9IGNsYXNzIGludG8gdGhlIHJlbGF0aW9uLmAsXG4gICAgICAgICAgdHlwZTogbmV3IEdyYXBoUUxMaXN0KG5ldyBHcmFwaFFMTm9uTnVsbChjbGFzc0dyYXBoUUxDcmVhdGVUeXBlKSksXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICByZXR1cm4gZmllbGRzO1xuICAgIH0sXG4gIH0pO1xuICBjbGFzc0dyYXBoUUxSZWxhdGlvblR5cGUgPVxuICAgIHBhcnNlR3JhcGhRTFNjaGVtYS5hZGRHcmFwaFFMVHlwZShjbGFzc0dyYXBoUUxSZWxhdGlvblR5cGUpIHx8IGRlZmF1bHRHcmFwaFFMVHlwZXMuT0JKRUNUO1xuXG4gIGNvbnN0IGNsYXNzR3JhcGhRTENvbnN0cmFpbnRzVHlwZU5hbWUgPSBgJHtncmFwaFFMQ2xhc3NOYW1lfVdoZXJlSW5wdXRgO1xuICBsZXQgY2xhc3NHcmFwaFFMQ29uc3RyYWludHNUeXBlID0gbmV3IEdyYXBoUUxJbnB1dE9iamVjdFR5cGUoe1xuICAgIG5hbWU6IGNsYXNzR3JhcGhRTENvbnN0cmFpbnRzVHlwZU5hbWUsXG4gICAgZGVzY3JpcHRpb246IGBUaGUgJHtjbGFzc0dyYXBoUUxDb25zdHJhaW50c1R5cGVOYW1lfSBpbnB1dCB0eXBlIGlzIHVzZWQgaW4gb3BlcmF0aW9ucyB0aGF0IGludm9sdmUgZmlsdGVyaW5nIG9iamVjdHMgb2YgJHtncmFwaFFMQ2xhc3NOYW1lfSBjbGFzcy5gLFxuICAgIGZpZWxkczogKCkgPT4gKHtcbiAgICAgIC4uLmNsYXNzQ29uc3RyYWludEZpZWxkcy5yZWR1Y2UoKGZpZWxkcywgZmllbGQpID0+IHtcbiAgICAgICAgaWYgKFsnT1InLCAnQU5EJywgJ05PUiddLmluY2x1ZGVzKGZpZWxkKSkge1xuICAgICAgICAgIHBhcnNlR3JhcGhRTFNjaGVtYS5sb2cud2FybihcbiAgICAgICAgICAgIGBGaWVsZCAke2ZpZWxkfSBjb3VsZCBub3QgYmUgYWRkZWQgdG8gdGhlIGF1dG8gc2NoZW1hICR7Y2xhc3NHcmFwaFFMQ29uc3RyYWludHNUeXBlTmFtZX0gYmVjYXVzZSBpdCBjb2xsaWRlZCB3aXRoIGFuIGV4aXN0aW5nIG9uZS5gXG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXR1cm4gZmllbGRzO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhcnNlRmllbGQgPSBmaWVsZCA9PT0gJ2lkJyA/ICdvYmplY3RJZCcgOiBmaWVsZDtcbiAgICAgICAgY29uc3QgdHlwZSA9IHRyYW5zZm9ybUNvbnN0cmFpbnRUeXBlVG9HcmFwaFFMKFxuICAgICAgICAgIHBhcnNlQ2xhc3MuZmllbGRzW3BhcnNlRmllbGRdLnR5cGUsXG4gICAgICAgICAgcGFyc2VDbGFzcy5maWVsZHNbcGFyc2VGaWVsZF0udGFyZ2V0Q2xhc3MsXG4gICAgICAgICAgcGFyc2VHcmFwaFFMU2NoZW1hLnBhcnNlQ2xhc3NUeXBlcyxcbiAgICAgICAgICBmaWVsZFxuICAgICAgICApO1xuICAgICAgICBpZiAodHlwZSkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5maWVsZHMsXG4gICAgICAgICAgICBbZmllbGRdOiB7XG4gICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBgVGhpcyBpcyB0aGUgb2JqZWN0ICR7ZmllbGR9LmAsXG4gICAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZpZWxkcztcbiAgICAgICAgfVxuICAgICAgfSwge30pLFxuICAgICAgT1I6IHtcbiAgICAgICAgZGVzY3JpcHRpb246ICdUaGlzIGlzIHRoZSBPUiBvcGVyYXRvciB0byBjb21wb3VuZCBjb25zdHJhaW50cy4nLFxuICAgICAgICB0eXBlOiBuZXcgR3JhcGhRTExpc3QobmV3IEdyYXBoUUxOb25OdWxsKGNsYXNzR3JhcGhRTENvbnN0cmFpbnRzVHlwZSkpLFxuICAgICAgfSxcbiAgICAgIEFORDoge1xuICAgICAgICBkZXNjcmlwdGlvbjogJ1RoaXMgaXMgdGhlIEFORCBvcGVyYXRvciB0byBjb21wb3VuZCBjb25zdHJhaW50cy4nLFxuICAgICAgICB0eXBlOiBuZXcgR3JhcGhRTExpc3QobmV3IEdyYXBoUUxOb25OdWxsKGNsYXNzR3JhcGhRTENvbnN0cmFpbnRzVHlwZSkpLFxuICAgICAgfSxcbiAgICAgIE5PUjoge1xuICAgICAgICBkZXNjcmlwdGlvbjogJ1RoaXMgaXMgdGhlIE5PUiBvcGVyYXRvciB0byBjb21wb3VuZCBjb25zdHJhaW50cy4nLFxuICAgICAgICB0eXBlOiBuZXcgR3JhcGhRTExpc3QobmV3IEdyYXBoUUxOb25OdWxsKGNsYXNzR3JhcGhRTENvbnN0cmFpbnRzVHlwZSkpLFxuICAgICAgfSxcbiAgICB9KSxcbiAgfSk7XG4gIGNsYXNzR3JhcGhRTENvbnN0cmFpbnRzVHlwZSA9XG4gICAgcGFyc2VHcmFwaFFMU2NoZW1hLmFkZEdyYXBoUUxUeXBlKGNsYXNzR3JhcGhRTENvbnN0cmFpbnRzVHlwZSkgfHwgZGVmYXVsdEdyYXBoUUxUeXBlcy5PQkpFQ1Q7XG5cbiAgY29uc3QgY2xhc3NHcmFwaFFMUmVsYXRpb25Db25zdHJhaW50c1R5cGVOYW1lID0gYCR7Z3JhcGhRTENsYXNzTmFtZX1SZWxhdGlvbldoZXJlSW5wdXRgO1xuICBsZXQgY2xhc3NHcmFwaFFMUmVsYXRpb25Db25zdHJhaW50c1R5cGUgPSBuZXcgR3JhcGhRTElucHV0T2JqZWN0VHlwZSh7XG4gICAgbmFtZTogY2xhc3NHcmFwaFFMUmVsYXRpb25Db25zdHJhaW50c1R5cGVOYW1lLFxuICAgIGRlc2NyaXB0aW9uOiBgVGhlICR7Y2xhc3NHcmFwaFFMUmVsYXRpb25Db25zdHJhaW50c1R5cGVOYW1lfSBpbnB1dCB0eXBlIGlzIHVzZWQgaW4gb3BlcmF0aW9ucyB0aGF0IGludm9sdmUgZmlsdGVyaW5nIG9iamVjdHMgb2YgJHtncmFwaFFMQ2xhc3NOYW1lfSBjbGFzcy5gLFxuICAgIGZpZWxkczogKCkgPT4gKHtcbiAgICAgIGhhdmU6IHtcbiAgICAgICAgZGVzY3JpcHRpb246ICdSdW4gYSByZWxhdGlvbmFsL3BvaW50ZXIgcXVlcnkgd2hlcmUgYXQgbGVhc3Qgb25lIGNoaWxkIG9iamVjdCBjYW4gbWF0Y2guJyxcbiAgICAgICAgdHlwZTogY2xhc3NHcmFwaFFMQ29uc3RyYWludHNUeXBlLFxuICAgICAgfSxcbiAgICAgIGhhdmVOb3Q6IHtcbiAgICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICAgJ1J1biBhbiBpbnZlcnRlZCByZWxhdGlvbmFsL3BvaW50ZXIgcXVlcnkgd2hlcmUgYXQgbGVhc3Qgb25lIGNoaWxkIG9iamVjdCBjYW4gbWF0Y2guJyxcbiAgICAgICAgdHlwZTogY2xhc3NHcmFwaFFMQ29uc3RyYWludHNUeXBlLFxuICAgICAgfSxcbiAgICAgIGV4aXN0czoge1xuICAgICAgICBkZXNjcmlwdGlvbjogJ0NoZWNrIGlmIHRoZSByZWxhdGlvbi9wb2ludGVyIGNvbnRhaW5zIG9iamVjdHMuJyxcbiAgICAgICAgdHlwZTogR3JhcGhRTEJvb2xlYW4sXG4gICAgICB9LFxuICAgIH0pLFxuICB9KTtcbiAgY2xhc3NHcmFwaFFMUmVsYXRpb25Db25zdHJhaW50c1R5cGUgPVxuICAgIHBhcnNlR3JhcGhRTFNjaGVtYS5hZGRHcmFwaFFMVHlwZShjbGFzc0dyYXBoUUxSZWxhdGlvbkNvbnN0cmFpbnRzVHlwZSkgfHxcbiAgICBkZWZhdWx0R3JhcGhRTFR5cGVzLk9CSkVDVDtcblxuICBjb25zdCBjbGFzc0dyYXBoUUxPcmRlclR5cGVOYW1lID0gYCR7Z3JhcGhRTENsYXNzTmFtZX1PcmRlcmA7XG4gIGxldCBjbGFzc0dyYXBoUUxPcmRlclR5cGUgPSBuZXcgR3JhcGhRTEVudW1UeXBlKHtcbiAgICBuYW1lOiBjbGFzc0dyYXBoUUxPcmRlclR5cGVOYW1lLFxuICAgIGRlc2NyaXB0aW9uOiBgVGhlICR7Y2xhc3NHcmFwaFFMT3JkZXJUeXBlTmFtZX0gaW5wdXQgdHlwZSBpcyB1c2VkIHdoZW4gc29ydGluZyBvYmplY3RzIG9mIHRoZSAke2dyYXBoUUxDbGFzc05hbWV9IGNsYXNzLmAsXG4gICAgdmFsdWVzOiBjbGFzc1NvcnRGaWVsZHMucmVkdWNlKChzb3J0RmllbGRzLCBmaWVsZENvbmZpZykgPT4ge1xuICAgICAgY29uc3QgeyBmaWVsZCwgYXNjLCBkZXNjIH0gPSBmaWVsZENvbmZpZztcbiAgICAgIGNvbnN0IHVwZGF0ZWRTb3J0RmllbGRzID0ge1xuICAgICAgICAuLi5zb3J0RmllbGRzLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHZhbHVlID0gZmllbGQgPT09ICdpZCcgPyAnb2JqZWN0SWQnIDogZmllbGQ7XG4gICAgICBpZiAoYXNjKSB7XG4gICAgICAgIHVwZGF0ZWRTb3J0RmllbGRzW2Ake2ZpZWxkfV9BU0NgXSA9IHsgdmFsdWUgfTtcbiAgICAgIH1cbiAgICAgIGlmIChkZXNjKSB7XG4gICAgICAgIHVwZGF0ZWRTb3J0RmllbGRzW2Ake2ZpZWxkfV9ERVNDYF0gPSB7IHZhbHVlOiBgLSR7dmFsdWV9YCB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHVwZGF0ZWRTb3J0RmllbGRzO1xuICAgIH0sIHt9KSxcbiAgfSk7XG4gIGNsYXNzR3JhcGhRTE9yZGVyVHlwZSA9IHBhcnNlR3JhcGhRTFNjaGVtYS5hZGRHcmFwaFFMVHlwZShjbGFzc0dyYXBoUUxPcmRlclR5cGUpO1xuXG4gIGNvbnN0IGNsYXNzR3JhcGhRTEZpbmRBcmdzID0ge1xuICAgIHdoZXJlOiB7XG4gICAgICBkZXNjcmlwdGlvbjogJ1RoZXNlIGFyZSB0aGUgY29uZGl0aW9ucyB0aGF0IHRoZSBvYmplY3RzIG5lZWQgdG8gbWF0Y2ggaW4gb3JkZXIgdG8gYmUgZm91bmQuJyxcbiAgICAgIHR5cGU6IGNsYXNzR3JhcGhRTENvbnN0cmFpbnRzVHlwZSxcbiAgICB9LFxuICAgIG9yZGVyOiB7XG4gICAgICBkZXNjcmlwdGlvbjogJ1RoZSBmaWVsZHMgdG8gYmUgdXNlZCB3aGVuIHNvcnRpbmcgdGhlIGRhdGEgZmV0Y2hlZC4nLFxuICAgICAgdHlwZTogY2xhc3NHcmFwaFFMT3JkZXJUeXBlXG4gICAgICAgID8gbmV3IEdyYXBoUUxMaXN0KG5ldyBHcmFwaFFMTm9uTnVsbChjbGFzc0dyYXBoUUxPcmRlclR5cGUpKVxuICAgICAgICA6IEdyYXBoUUxTdHJpbmcsXG4gICAgfSxcbiAgICBza2lwOiBkZWZhdWx0R3JhcGhRTFR5cGVzLlNLSVBfQVRULFxuICAgIC4uLmNvbm5lY3Rpb25BcmdzLFxuICAgIG9wdGlvbnM6IGRlZmF1bHRHcmFwaFFMVHlwZXMuUkVBRF9PUFRJT05TX0FUVCxcbiAgfTtcbiAgY29uc3QgY2xhc3NHcmFwaFFMT3V0cHV0VHlwZU5hbWUgPSBgJHtncmFwaFFMQ2xhc3NOYW1lfWA7XG4gIGNvbnN0IGludGVyZmFjZXMgPSBbZGVmYXVsdEdyYXBoUUxUeXBlcy5QQVJTRV9PQkpFQ1QsIHBhcnNlR3JhcGhRTFNjaGVtYS5yZWxheU5vZGVJbnRlcmZhY2VdO1xuICBjb25zdCBwYXJzZU9iamVjdEZpZWxkcyA9IHtcbiAgICBpZDogZ2xvYmFsSWRGaWVsZChjbGFzc05hbWUsIG9iaiA9PiBvYmoub2JqZWN0SWQpLFxuICAgIC4uLmRlZmF1bHRHcmFwaFFMVHlwZXMuUEFSU0VfT0JKRUNUX0ZJRUxEUyxcbiAgfTtcbiAgY29uc3Qgb3V0cHV0RmllbGRzID0gKCkgPT4ge1xuICAgIHJldHVybiBjbGFzc091dHB1dEZpZWxkcy5yZWR1Y2UoKGZpZWxkcywgZmllbGQpID0+IHtcbiAgICAgIGNvbnN0IHR5cGUgPSB0cmFuc2Zvcm1PdXRwdXRUeXBlVG9HcmFwaFFMKFxuICAgICAgICBwYXJzZUNsYXNzLmZpZWxkc1tmaWVsZF0udHlwZSxcbiAgICAgICAgcGFyc2VDbGFzcy5maWVsZHNbZmllbGRdLnRhcmdldENsYXNzLFxuICAgICAgICBwYXJzZUdyYXBoUUxTY2hlbWEucGFyc2VDbGFzc1R5cGVzXG4gICAgICApO1xuICAgICAgaWYgKHBhcnNlQ2xhc3MuZmllbGRzW2ZpZWxkXS50eXBlID09PSAnUmVsYXRpb24nKSB7XG4gICAgICAgIGNvbnN0IHRhcmdldFBhcnNlQ2xhc3NUeXBlcyA9XG4gICAgICAgICAgcGFyc2VHcmFwaFFMU2NoZW1hLnBhcnNlQ2xhc3NUeXBlc1twYXJzZUNsYXNzLmZpZWxkc1tmaWVsZF0udGFyZ2V0Q2xhc3NdO1xuICAgICAgICBjb25zdCBhcmdzID0gdGFyZ2V0UGFyc2VDbGFzc1R5cGVzID8gdGFyZ2V0UGFyc2VDbGFzc1R5cGVzLmNsYXNzR3JhcGhRTEZpbmRBcmdzIDogdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLmZpZWxkcyxcbiAgICAgICAgICBbZmllbGRdOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogYFRoaXMgaXMgdGhlIG9iamVjdCAke2ZpZWxkfS5gLFxuICAgICAgICAgICAgYXJncyxcbiAgICAgICAgICAgIHR5cGU6IHBhcnNlQ2xhc3MuZmllbGRzW2ZpZWxkXS5yZXF1aXJlZCA/IG5ldyBHcmFwaFFMTm9uTnVsbCh0eXBlKSA6IHR5cGUsXG4gICAgICAgICAgICBhc3luYyByZXNvbHZlKHNvdXJjZSwgYXJncywgY29udGV4dCwgcXVlcnlJbmZvKSB7XG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyB3aGVyZSwgb3JkZXIsIHNraXAsIGZpcnN0LCBhZnRlciwgbGFzdCwgYmVmb3JlLCBvcHRpb25zIH0gPSBhcmdzO1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgcmVhZFByZWZlcmVuY2UsIGluY2x1ZGVSZWFkUHJlZmVyZW5jZSwgc3VicXVlcnlSZWFkUHJlZmVyZW5jZSB9ID1cbiAgICAgICAgICAgICAgICAgIG9wdGlvbnMgfHwge307XG4gICAgICAgICAgICAgICAgY29uc3QgeyBjb25maWcsIGF1dGgsIGluZm8gfSA9IGNvbnRleHQ7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRGaWVsZHMgPSBnZXRGaWVsZE5hbWVzKHF1ZXJ5SW5mbyk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB7IGtleXMsIGluY2x1ZGUgfSA9IGV4dHJhY3RLZXlzQW5kSW5jbHVkZShcbiAgICAgICAgICAgICAgICAgIHNlbGVjdGVkRmllbGRzXG4gICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoZmllbGQgPT4gZmllbGQuc3RhcnRzV2l0aCgnZWRnZXMubm9kZS4nKSlcbiAgICAgICAgICAgICAgICAgICAgLm1hcChmaWVsZCA9PiBmaWVsZC5yZXBsYWNlKCdlZGdlcy5ub2RlLicsICcnKSlcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihmaWVsZCA9PiBmaWVsZC5pbmRleE9mKCdlZGdlcy5ub2RlJykgPCAwKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgY29uc3QgcGFyc2VPcmRlciA9IG9yZGVyICYmIG9yZGVyLmpvaW4oJywnKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBvYmplY3RzUXVlcmllcy5maW5kT2JqZWN0cyhcbiAgICAgICAgICAgICAgICAgIHNvdXJjZVtmaWVsZF0uY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAkcmVsYXRlZFRvOiB7XG4gICAgICAgICAgICAgICAgICAgICAgb2JqZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3R5cGU6ICdQb2ludGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0SWQ6IHNvdXJjZS5vYmplY3RJZCxcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIGtleTogZmllbGQsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIC4uLih3aGVyZSB8fCB7fSksXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgcGFyc2VPcmRlcixcbiAgICAgICAgICAgICAgICAgIHNraXAsXG4gICAgICAgICAgICAgICAgICBmaXJzdCxcbiAgICAgICAgICAgICAgICAgIGFmdGVyLFxuICAgICAgICAgICAgICAgICAgbGFzdCxcbiAgICAgICAgICAgICAgICAgIGJlZm9yZSxcbiAgICAgICAgICAgICAgICAgIGtleXMsXG4gICAgICAgICAgICAgICAgICBpbmNsdWRlLFxuICAgICAgICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICAgICAgICByZWFkUHJlZmVyZW5jZSxcbiAgICAgICAgICAgICAgICAgIGluY2x1ZGVSZWFkUHJlZmVyZW5jZSxcbiAgICAgICAgICAgICAgICAgIHN1YnF1ZXJ5UmVhZFByZWZlcmVuY2UsXG4gICAgICAgICAgICAgICAgICBjb25maWcsXG4gICAgICAgICAgICAgICAgICBhdXRoLFxuICAgICAgICAgICAgICAgICAgaW5mbyxcbiAgICAgICAgICAgICAgICAgIHNlbGVjdGVkRmllbGRzLFxuICAgICAgICAgICAgICAgICAgcGFyc2VHcmFwaFFMU2NoZW1hLnBhcnNlQ2xhc3Nlc1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBwYXJzZUdyYXBoUUxTY2hlbWEuaGFuZGxlRXJyb3IoZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSBpZiAocGFyc2VDbGFzcy5maWVsZHNbZmllbGRdLnR5cGUgPT09ICdQb2x5Z29uJykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLmZpZWxkcyxcbiAgICAgICAgICBbZmllbGRdOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogYFRoaXMgaXMgdGhlIG9iamVjdCAke2ZpZWxkfS5gLFxuICAgICAgICAgICAgdHlwZTogcGFyc2VDbGFzcy5maWVsZHNbZmllbGRdLnJlcXVpcmVkID8gbmV3IEdyYXBoUUxOb25OdWxsKHR5cGUpIDogdHlwZSxcbiAgICAgICAgICAgIGFzeW5jIHJlc29sdmUoc291cmNlKSB7XG4gICAgICAgICAgICAgIGlmIChzb3VyY2VbZmllbGRdICYmIHNvdXJjZVtmaWVsZF0uY29vcmRpbmF0ZXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc291cmNlW2ZpZWxkXS5jb29yZGluYXRlcy5tYXAoY29vcmRpbmF0ZSA9PiAoe1xuICAgICAgICAgICAgICAgICAgbGF0aXR1ZGU6IGNvb3JkaW5hdGVbMF0sXG4gICAgICAgICAgICAgICAgICBsb25naXR1ZGU6IGNvb3JkaW5hdGVbMV0sXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKHBhcnNlQ2xhc3MuZmllbGRzW2ZpZWxkXS50eXBlID09PSAnQXJyYXknKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4uZmllbGRzLFxuICAgICAgICAgIFtmaWVsZF06IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBgVXNlIElubGluZSBGcmFnbWVudCBvbiBBcnJheSB0byBnZXQgcmVzdWx0czogaHR0cHM6Ly9ncmFwaHFsLm9yZy9sZWFybi9xdWVyaWVzLyNpbmxpbmUtZnJhZ21lbnRzYCxcbiAgICAgICAgICAgIHR5cGU6IHBhcnNlQ2xhc3MuZmllbGRzW2ZpZWxkXS5yZXF1aXJlZCA/IG5ldyBHcmFwaFFMTm9uTnVsbCh0eXBlKSA6IHR5cGUsXG4gICAgICAgICAgICBhc3luYyByZXNvbHZlKHNvdXJjZSkge1xuICAgICAgICAgICAgICBpZiAoIXNvdXJjZVtmaWVsZF0pIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICByZXR1cm4gc291cmNlW2ZpZWxkXS5tYXAoYXN5bmMgZWxlbSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW0uY2xhc3NOYW1lICYmIGVsZW0ub2JqZWN0SWQgJiYgZWxlbS5fX3R5cGUgPT09ICdPYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZWxlbTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IGVsZW0gfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIGlmICh0eXBlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4uZmllbGRzLFxuICAgICAgICAgIFtmaWVsZF06IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBgVGhpcyBpcyB0aGUgb2JqZWN0ICR7ZmllbGR9LmAsXG4gICAgICAgICAgICB0eXBlOiBwYXJzZUNsYXNzLmZpZWxkc1tmaWVsZF0ucmVxdWlyZWQgPyBuZXcgR3JhcGhRTE5vbk51bGwodHlwZSkgOiB0eXBlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmllbGRzO1xuICAgICAgfVxuICAgIH0sIHBhcnNlT2JqZWN0RmllbGRzKTtcbiAgfTtcbiAgbGV0IGNsYXNzR3JhcGhRTE91dHB1dFR5cGUgPSBuZXcgR3JhcGhRTE9iamVjdFR5cGUoe1xuICAgIG5hbWU6IGNsYXNzR3JhcGhRTE91dHB1dFR5cGVOYW1lLFxuICAgIGRlc2NyaXB0aW9uOiBgVGhlICR7Y2xhc3NHcmFwaFFMT3V0cHV0VHlwZU5hbWV9IG9iamVjdCB0eXBlIGlzIHVzZWQgaW4gb3BlcmF0aW9ucyB0aGF0IGludm9sdmUgb3V0cHV0dGluZyBvYmplY3RzIG9mICR7Z3JhcGhRTENsYXNzTmFtZX0gY2xhc3MuYCxcbiAgICBpbnRlcmZhY2VzLFxuICAgIGZpZWxkczogb3V0cHV0RmllbGRzLFxuICB9KTtcbiAgY2xhc3NHcmFwaFFMT3V0cHV0VHlwZSA9IHBhcnNlR3JhcGhRTFNjaGVtYS5hZGRHcmFwaFFMVHlwZShjbGFzc0dyYXBoUUxPdXRwdXRUeXBlKTtcblxuICBjb25zdCB7IGNvbm5lY3Rpb25UeXBlLCBlZGdlVHlwZSB9ID0gY29ubmVjdGlvbkRlZmluaXRpb25zKHtcbiAgICBuYW1lOiBncmFwaFFMQ2xhc3NOYW1lLFxuICAgIGNvbm5lY3Rpb25GaWVsZHM6IHtcbiAgICAgIGNvdW50OiBkZWZhdWx0R3JhcGhRTFR5cGVzLkNPVU5UX0FUVCxcbiAgICB9LFxuICAgIG5vZGVUeXBlOiBjbGFzc0dyYXBoUUxPdXRwdXRUeXBlIHx8IGRlZmF1bHRHcmFwaFFMVHlwZXMuT0JKRUNULFxuICB9KTtcbiAgbGV0IGNsYXNzR3JhcGhRTEZpbmRSZXN1bHRUeXBlID0gdW5kZWZpbmVkO1xuICBpZiAoXG4gICAgcGFyc2VHcmFwaFFMU2NoZW1hLmFkZEdyYXBoUUxUeXBlKGVkZ2VUeXBlKSAmJlxuICAgIHBhcnNlR3JhcGhRTFNjaGVtYS5hZGRHcmFwaFFMVHlwZShjb25uZWN0aW9uVHlwZSwgZmFsc2UsIGZhbHNlLCB0cnVlKVxuICApIHtcbiAgICBjbGFzc0dyYXBoUUxGaW5kUmVzdWx0VHlwZSA9IGNvbm5lY3Rpb25UeXBlO1xuICB9XG5cbiAgcGFyc2VHcmFwaFFMU2NoZW1hLnBhcnNlQ2xhc3NUeXBlc1tjbGFzc05hbWVdID0ge1xuICAgIGNsYXNzR3JhcGhRTFBvaW50ZXJUeXBlLFxuICAgIGNsYXNzR3JhcGhRTFJlbGF0aW9uVHlwZSxcbiAgICBjbGFzc0dyYXBoUUxDcmVhdGVUeXBlLFxuICAgIGNsYXNzR3JhcGhRTFVwZGF0ZVR5cGUsXG4gICAgY2xhc3NHcmFwaFFMQ29uc3RyYWludHNUeXBlLFxuICAgIGNsYXNzR3JhcGhRTFJlbGF0aW9uQ29uc3RyYWludHNUeXBlLFxuICAgIGNsYXNzR3JhcGhRTEZpbmRBcmdzLFxuICAgIGNsYXNzR3JhcGhRTE91dHB1dFR5cGUsXG4gICAgY2xhc3NHcmFwaFFMRmluZFJlc3VsdFR5cGUsXG4gICAgY29uZmlnOiB7XG4gICAgICBwYXJzZUNsYXNzQ29uZmlnLFxuICAgICAgaXNDcmVhdGVFbmFibGVkLFxuICAgICAgaXNVcGRhdGVFbmFibGVkLFxuICAgIH0sXG4gIH07XG5cbiAgaWYgKGNsYXNzTmFtZSA9PT0gJ19Vc2VyJykge1xuICAgIGNvbnN0IHZpZXdlclR5cGUgPSBuZXcgR3JhcGhRTE9iamVjdFR5cGUoe1xuICAgICAgbmFtZTogJ1ZpZXdlcicsXG4gICAgICBkZXNjcmlwdGlvbjogYFRoZSBWaWV3ZXIgb2JqZWN0IHR5cGUgaXMgdXNlZCBpbiBvcGVyYXRpb25zIHRoYXQgaW52b2x2ZSBvdXRwdXR0aW5nIHRoZSBjdXJyZW50IHVzZXIgZGF0YS5gLFxuICAgICAgZmllbGRzOiAoKSA9PiAoe1xuICAgICAgICBzZXNzaW9uVG9rZW46IGRlZmF1bHRHcmFwaFFMVHlwZXMuU0VTU0lPTl9UT0tFTl9BVFQsXG4gICAgICAgIHVzZXI6IHtcbiAgICAgICAgICBkZXNjcmlwdGlvbjogJ1RoaXMgaXMgdGhlIGN1cnJlbnQgdXNlci4nLFxuICAgICAgICAgIHR5cGU6IG5ldyBHcmFwaFFMTm9uTnVsbChjbGFzc0dyYXBoUUxPdXRwdXRUeXBlKSxcbiAgICAgICAgfSxcbiAgICAgIH0pLFxuICAgIH0pO1xuICAgIHBhcnNlR3JhcGhRTFNjaGVtYS5hZGRHcmFwaFFMVHlwZSh2aWV3ZXJUeXBlLCB0cnVlLCB0cnVlKTtcbiAgICBwYXJzZUdyYXBoUUxTY2hlbWEudmlld2VyVHlwZSA9IHZpZXdlclR5cGU7XG4gIH1cbn07XG5cbmV4cG9ydCB7IGV4dHJhY3RLZXlzQW5kSW5jbHVkZSwgbG9hZCB9O1xuIl19