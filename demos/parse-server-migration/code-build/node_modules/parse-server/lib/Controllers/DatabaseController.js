"use strict";

var _node = require("parse/node");

var _lodash = _interopRequireDefault(require("lodash"));

var _intersect = _interopRequireDefault(require("intersect"));

var _deepcopy = _interopRequireDefault(require("deepcopy"));

var _logger = _interopRequireDefault(require("../logger"));

var _Utils = _interopRequireDefault(require("../Utils"));

var SchemaController = _interopRequireWildcard(require("./SchemaController"));

var _StorageAdapter = require("../Adapters/Storage/StorageAdapter");

var _MongoStorageAdapter = _interopRequireDefault(require("../Adapters/Storage/Mongo/MongoStorageAdapter"));

var _PostgresStorageAdapter = _interopRequireDefault(require("../Adapters/Storage/Postgres/PostgresStorageAdapter"));

var _SchemaCache = _interopRequireDefault(require("../Adapters/Cache/SchemaCache"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function addWriteACL(query, acl) {
  const newQuery = _lodash.default.cloneDeep(query); //Can't be any existing '_wperm' query, we don't allow client queries on that, no need to $and


  newQuery._wperm = {
    $in: [null, ...acl]
  };
  return newQuery;
}

function addReadACL(query, acl) {
  const newQuery = _lodash.default.cloneDeep(query); //Can't be any existing '_rperm' query, we don't allow client queries on that, no need to $and


  newQuery._rperm = {
    $in: [null, '*', ...acl]
  };
  return newQuery;
} // Transforms a REST API formatted ACL object to our two-field mongo format.


const transformObjectACL = _ref => {
  let {
    ACL
  } = _ref,
      result = _objectWithoutProperties(_ref, ["ACL"]);

  if (!ACL) {
    return result;
  }

  result._wperm = [];
  result._rperm = [];

  for (const entry in ACL) {
    if (ACL[entry].read) {
      result._rperm.push(entry);
    }

    if (ACL[entry].write) {
      result._wperm.push(entry);
    }
  }

  return result;
};

const specialQueryKeys = ['$and', '$or', '$nor', '_rperm', '_wperm'];
const specialMasterQueryKeys = [...specialQueryKeys, '_email_verify_token', '_perishable_token', '_tombstone', '_email_verify_token_expires_at', '_failed_login_count', '_account_lockout_expires_at', '_password_changed_at', '_password_history'];

const validateQuery = (query, isMaster, update) => {
  if (query.ACL) {
    throw new _node.Parse.Error(_node.Parse.Error.INVALID_QUERY, 'Cannot query on ACL.');
  }

  if (query.$or) {
    if (query.$or instanceof Array) {
      query.$or.forEach(value => validateQuery(value, isMaster, update));
    } else {
      throw new _node.Parse.Error(_node.Parse.Error.INVALID_QUERY, 'Bad $or format - use an array value.');
    }
  }

  if (query.$and) {
    if (query.$and instanceof Array) {
      query.$and.forEach(value => validateQuery(value, isMaster, update));
    } else {
      throw new _node.Parse.Error(_node.Parse.Error.INVALID_QUERY, 'Bad $and format - use an array value.');
    }
  }

  if (query.$nor) {
    if (query.$nor instanceof Array && query.$nor.length > 0) {
      query.$nor.forEach(value => validateQuery(value, isMaster, update));
    } else {
      throw new _node.Parse.Error(_node.Parse.Error.INVALID_QUERY, 'Bad $nor format - use an array of at least 1 value.');
    }
  }

  Object.keys(query).forEach(key => {
    if (query && query[key] && query[key].$regex) {
      if (typeof query[key].$options === 'string') {
        if (!query[key].$options.match(/^[imxs]+$/)) {
          throw new _node.Parse.Error(_node.Parse.Error.INVALID_QUERY, `Bad $options value for query: ${query[key].$options}`);
        }
      }
    }

    if (!key.match(/^[a-zA-Z][a-zA-Z0-9_\.]*$/) && (!specialQueryKeys.includes(key) && !isMaster && !update || update && isMaster && !specialMasterQueryKeys.includes(key))) {
      throw new _node.Parse.Error(_node.Parse.Error.INVALID_KEY_NAME, `Invalid key name: ${key}`);
    }
  });
}; // Filters out any data that shouldn't be on this REST-formatted object.


const filterSensitiveData = (isMaster, aclGroup, auth, operation, schema, className, protectedFields, object) => {
  let userId = null;
  if (auth && auth.user) userId = auth.user.id; // replace protectedFields when using pointer-permissions

  const perms = schema && schema.getClassLevelPermissions ? schema.getClassLevelPermissions(className) : {};

  if (perms) {
    const isReadOperation = ['get', 'find'].indexOf(operation) > -1;

    if (isReadOperation && perms.protectedFields) {
      // extract protectedFields added with the pointer-permission prefix
      const protectedFieldsPointerPerm = Object.keys(perms.protectedFields).filter(key => key.startsWith('userField:')).map(key => {
        return {
          key: key.substring(10),
          value: perms.protectedFields[key]
        };
      });
      const newProtectedFields = [];
      let overrideProtectedFields = false; // check if the object grants the current user access based on the extracted fields

      protectedFieldsPointerPerm.forEach(pointerPerm => {
        let pointerPermIncludesUser = false;
        const readUserFieldValue = object[pointerPerm.key];

        if (readUserFieldValue) {
          if (Array.isArray(readUserFieldValue)) {
            pointerPermIncludesUser = readUserFieldValue.some(user => user.objectId && user.objectId === userId);
          } else {
            pointerPermIncludesUser = readUserFieldValue.objectId && readUserFieldValue.objectId === userId;
          }
        }

        if (pointerPermIncludesUser) {
          overrideProtectedFields = true;
          newProtectedFields.push(pointerPerm.value);
        }
      }); // if at least one pointer-permission affected the current user
      // intersect vs protectedFields from previous stage (@see addProtectedFields)
      // Sets theory (intersections): A x (B x C) == (A x B) x C

      if (overrideProtectedFields && protectedFields) {
        newProtectedFields.push(protectedFields);
      } // intersect all sets of protectedFields


      newProtectedFields.forEach(fields => {
        if (fields) {
          // if there're no protctedFields by other criteria ( id / role / auth)
          // then we must intersect each set (per userField)
          if (!protectedFields) {
            protectedFields = fields;
          } else {
            protectedFields = protectedFields.filter(v => fields.includes(v));
          }
        }
      });
    }
  }

  const isUserClass = className === '_User';
  /* special treat for the user class: don't filter protectedFields if currently loggedin user is
  the retrieved user */

  if (!(isUserClass && userId && object.objectId === userId)) {
    protectedFields && protectedFields.forEach(k => delete object[k]); // fields not requested by client (excluded),
    //but were needed to apply protecttedFields

    perms.protectedFields && perms.protectedFields.temporaryKeys && perms.protectedFields.temporaryKeys.forEach(k => delete object[k]);
  }

  if (isUserClass) {
    object.password = object._hashed_password;
    delete object._hashed_password;
    delete object.sessionToken;
  }

  if (isMaster) {
    return object;
  }

  for (const key in object) {
    if (key.charAt(0) === '_') {
      delete object[key];
    }
  }

  if (!isUserClass) {
    return object;
  }

  if (aclGroup.indexOf(object.objectId) > -1) {
    return object;
  }

  delete object.authData;
  return object;
}; // Runs an update on the database.
// Returns a promise for an object with the new values for field
// modifications that don't know their results ahead of time, like
// 'increment'.
// Options:
//   acl:  a list of strings. If the object to be updated has an ACL,
//         one of the provided strings must provide the caller with
//         write permissions.


const specialKeysForUpdate = ['_hashed_password', '_perishable_token', '_email_verify_token', '_email_verify_token_expires_at', '_account_lockout_expires_at', '_failed_login_count', '_perishable_token_expires_at', '_password_changed_at', '_password_history'];

const isSpecialUpdateKey = key => {
  return specialKeysForUpdate.indexOf(key) >= 0;
};

function joinTableName(className, key) {
  return `_Join:${key}:${className}`;
}

const flattenUpdateOperatorsForCreate = object => {
  for (const key in object) {
    if (object[key] && object[key].__op) {
      switch (object[key].__op) {
        case 'Increment':
          if (typeof object[key].amount !== 'number') {
            throw new _node.Parse.Error(_node.Parse.Error.INVALID_JSON, 'objects to add must be an array');
          }

          object[key] = object[key].amount;
          break;

        case 'Add':
          if (!(object[key].objects instanceof Array)) {
            throw new _node.Parse.Error(_node.Parse.Error.INVALID_JSON, 'objects to add must be an array');
          }

          object[key] = object[key].objects;
          break;

        case 'AddUnique':
          if (!(object[key].objects instanceof Array)) {
            throw new _node.Parse.Error(_node.Parse.Error.INVALID_JSON, 'objects to add must be an array');
          }

          object[key] = object[key].objects;
          break;

        case 'Remove':
          if (!(object[key].objects instanceof Array)) {
            throw new _node.Parse.Error(_node.Parse.Error.INVALID_JSON, 'objects to add must be an array');
          }

          object[key] = [];
          break;

        case 'Delete':
          delete object[key];
          break;

        default:
          throw new _node.Parse.Error(_node.Parse.Error.COMMAND_UNAVAILABLE, `The ${object[key].__op} operator is not supported yet.`);
      }
    }
  }
};

const transformAuthData = (className, object, schema) => {
  if (object.authData && className === '_User') {
    Object.keys(object.authData).forEach(provider => {
      const providerData = object.authData[provider];
      const fieldName = `_auth_data_${provider}`;

      if (providerData == null) {
        object[fieldName] = {
          __op: 'Delete'
        };
      } else {
        object[fieldName] = providerData;
        schema.fields[fieldName] = {
          type: 'Object'
        };
      }
    });
    delete object.authData;
  }
}; // Transforms a Database format ACL to a REST API format ACL


const untransformObjectACL = _ref2 => {
  let {
    _rperm,
    _wperm
  } = _ref2,
      output = _objectWithoutProperties(_ref2, ["_rperm", "_wperm"]);

  if (_rperm || _wperm) {
    output.ACL = {};

    (_rperm || []).forEach(entry => {
      if (!output.ACL[entry]) {
        output.ACL[entry] = {
          read: true
        };
      } else {
        output.ACL[entry]['read'] = true;
      }
    });

    (_wperm || []).forEach(entry => {
      if (!output.ACL[entry]) {
        output.ACL[entry] = {
          write: true
        };
      } else {
        output.ACL[entry]['write'] = true;
      }
    });
  }

  return output;
};
/**
 * When querying, the fieldName may be compound, extract the root fieldName
 *     `temperature.celsius` becomes `temperature`
 * @param {string} fieldName that may be a compound field name
 * @returns {string} the root name of the field
 */


const getRootFieldName = fieldName => {
  return fieldName.split('.')[0];
};

const relationSchema = {
  fields: {
    relatedId: {
      type: 'String'
    },
    owningId: {
      type: 'String'
    }
  }
};

class DatabaseController {
  constructor(adapter, options) {
    this.adapter = adapter;
    this.options = options || {};
    this.idempotencyOptions = this.options.idempotencyOptions || {}; // Prevent mutable this.schema, otherwise one request could use
    // multiple schemas, so instead use loadSchema to get a schema.

    this.schemaPromise = null;
    this._transactionalSession = null;
    this.options = options;
  }

  collectionExists(className) {
    return this.adapter.classExists(className);
  }

  purgeCollection(className) {
    return this.loadSchema().then(schemaController => schemaController.getOneSchema(className)).then(schema => this.adapter.deleteObjectsByQuery(className, schema, {}));
  }

  validateClassName(className) {
    if (!SchemaController.classNameIsValid(className)) {
      return Promise.reject(new _node.Parse.Error(_node.Parse.Error.INVALID_CLASS_NAME, 'invalid className: ' + className));
    }

    return Promise.resolve();
  } // Returns a promise for a schemaController.


  loadSchema(options = {
    clearCache: false
  }) {
    if (this.schemaPromise != null) {
      return this.schemaPromise;
    }

    this.schemaPromise = SchemaController.load(this.adapter, options);
    this.schemaPromise.then(() => delete this.schemaPromise, () => delete this.schemaPromise);
    return this.loadSchema(options);
  }

  loadSchemaIfNeeded(schemaController, options = {
    clearCache: false
  }) {
    return schemaController ? Promise.resolve(schemaController) : this.loadSchema(options);
  } // Returns a promise for the classname that is related to the given
  // classname through the key.
  // TODO: make this not in the DatabaseController interface


  redirectClassNameForKey(className, key) {
    return this.loadSchema().then(schema => {
      var t = schema.getExpectedType(className, key);

      if (t != null && typeof t !== 'string' && t.type === 'Relation') {
        return t.targetClass;
      }

      return className;
    });
  } // Uses the schema to validate the object (REST API format).
  // Returns a promise that resolves to the new schema.
  // This does not update this.schema, because in a situation like a
  // batch request, that could confuse other users of the schema.


  validateObject(className, object, query, runOptions) {
    let schema;
    const acl = runOptions.acl;
    const isMaster = acl === undefined;
    var aclGroup = acl || [];
    return this.loadSchema().then(s => {
      schema = s;

      if (isMaster) {
        return Promise.resolve();
      }

      return this.canAddField(schema, className, object, aclGroup, runOptions);
    }).then(() => {
      return schema.validateObject(className, object, query);
    });
  }

  update(className, query, update, {
    acl,
    many,
    upsert,
    addsField
  } = {}, skipSanitization = false, validateOnly = false, validSchemaController) {
    const originalQuery = query;
    const originalUpdate = update; // Make a copy of the object, so we don't mutate the incoming data.

    update = (0, _deepcopy.default)(update);
    var relationUpdates = [];
    var isMaster = acl === undefined;
    var aclGroup = acl || [];
    return this.loadSchemaIfNeeded(validSchemaController).then(schemaController => {
      return (isMaster ? Promise.resolve() : schemaController.validatePermission(className, aclGroup, 'update')).then(() => {
        relationUpdates = this.collectRelationUpdates(className, originalQuery.objectId, update);

        if (!isMaster) {
          query = this.addPointerPermissions(schemaController, className, 'update', query, aclGroup);

          if (addsField) {
            query = {
              $and: [query, this.addPointerPermissions(schemaController, className, 'addField', query, aclGroup)]
            };
          }
        }

        if (!query) {
          return Promise.resolve();
        }

        if (acl) {
          query = addWriteACL(query, acl);
        }

        validateQuery(query, isMaster, true);
        return schemaController.getOneSchema(className, true).catch(error => {
          // If the schema doesn't exist, pretend it exists with no fields. This behavior
          // will likely need revisiting.
          if (error === undefined) {
            return {
              fields: {}
            };
          }

          throw error;
        }).then(schema => {
          Object.keys(update).forEach(fieldName => {
            if (fieldName.match(/^authData\.([a-zA-Z0-9_]+)\.id$/)) {
              throw new _node.Parse.Error(_node.Parse.Error.INVALID_KEY_NAME, `Invalid field name for update: ${fieldName}`);
            }

            const rootFieldName = getRootFieldName(fieldName);

            if (!SchemaController.fieldNameIsValid(rootFieldName, className) && !isSpecialUpdateKey(rootFieldName)) {
              throw new _node.Parse.Error(_node.Parse.Error.INVALID_KEY_NAME, `Invalid field name for update: ${fieldName}`);
            }
          });

          for (const updateOperation in update) {
            if (update[updateOperation] && typeof update[updateOperation] === 'object' && Object.keys(update[updateOperation]).some(innerKey => innerKey.includes('$') || innerKey.includes('.'))) {
              throw new _node.Parse.Error(_node.Parse.Error.INVALID_NESTED_KEY, "Nested keys should not contain the '$' or '.' characters");
            }
          }

          update = transformObjectACL(update);
          transformAuthData(className, update, schema);

          if (validateOnly) {
            return this.adapter.find(className, schema, query, {}).then(result => {
              if (!result || !result.length) {
                throw new _node.Parse.Error(_node.Parse.Error.OBJECT_NOT_FOUND, 'Object not found.');
              }

              return {};
            });
          }

          if (many) {
            return this.adapter.updateObjectsByQuery(className, schema, query, update, this._transactionalSession);
          } else if (upsert) {
            return this.adapter.upsertOneObject(className, schema, query, update, this._transactionalSession);
          } else {
            return this.adapter.findOneAndUpdate(className, schema, query, update, this._transactionalSession);
          }
        });
      }).then(result => {
        if (!result) {
          throw new _node.Parse.Error(_node.Parse.Error.OBJECT_NOT_FOUND, 'Object not found.');
        }

        if (validateOnly) {
          return result;
        }

        return this.handleRelationUpdates(className, originalQuery.objectId, update, relationUpdates).then(() => {
          return result;
        });
      }).then(result => {
        if (skipSanitization) {
          return Promise.resolve(result);
        }

        return this._sanitizeDatabaseResult(originalUpdate, result);
      });
    });
  } // Collect all relation-updating operations from a REST-format update.
  // Returns a list of all relation updates to perform
  // This mutates update.


  collectRelationUpdates(className, objectId, update) {
    var ops = [];
    var deleteMe = [];
    objectId = update.objectId || objectId;

    var process = (op, key) => {
      if (!op) {
        return;
      }

      if (op.__op == 'AddRelation') {
        ops.push({
          key,
          op
        });
        deleteMe.push(key);
      }

      if (op.__op == 'RemoveRelation') {
        ops.push({
          key,
          op
        });
        deleteMe.push(key);
      }

      if (op.__op == 'Batch') {
        for (var x of op.ops) {
          process(x, key);
        }
      }
    };

    for (const key in update) {
      process(update[key], key);
    }

    for (const key of deleteMe) {
      delete update[key];
    }

    return ops;
  } // Processes relation-updating operations from a REST-format update.
  // Returns a promise that resolves when all updates have been performed


  handleRelationUpdates(className, objectId, update, ops) {
    var pending = [];
    objectId = update.objectId || objectId;
    ops.forEach(({
      key,
      op
    }) => {
      if (!op) {
        return;
      }

      if (op.__op == 'AddRelation') {
        for (const object of op.objects) {
          pending.push(this.addRelation(key, className, objectId, object.objectId));
        }
      }

      if (op.__op == 'RemoveRelation') {
        for (const object of op.objects) {
          pending.push(this.removeRelation(key, className, objectId, object.objectId));
        }
      }
    });
    return Promise.all(pending);
  } // Adds a relation.
  // Returns a promise that resolves successfully iff the add was successful.


  addRelation(key, fromClassName, fromId, toId) {
    const doc = {
      relatedId: toId,
      owningId: fromId
    };
    return this.adapter.upsertOneObject(`_Join:${key}:${fromClassName}`, relationSchema, doc, doc, this._transactionalSession);
  } // Removes a relation.
  // Returns a promise that resolves successfully iff the remove was
  // successful.


  removeRelation(key, fromClassName, fromId, toId) {
    var doc = {
      relatedId: toId,
      owningId: fromId
    };
    return this.adapter.deleteObjectsByQuery(`_Join:${key}:${fromClassName}`, relationSchema, doc, this._transactionalSession).catch(error => {
      // We don't care if they try to delete a non-existent relation.
      if (error.code == _node.Parse.Error.OBJECT_NOT_FOUND) {
        return;
      }

      throw error;
    });
  } // Removes objects matches this query from the database.
  // Returns a promise that resolves successfully iff the object was
  // deleted.
  // Options:
  //   acl:  a list of strings. If the object to be updated has an ACL,
  //         one of the provided strings must provide the caller with
  //         write permissions.


  destroy(className, query, {
    acl
  } = {}, validSchemaController) {
    const isMaster = acl === undefined;
    const aclGroup = acl || [];
    return this.loadSchemaIfNeeded(validSchemaController).then(schemaController => {
      return (isMaster ? Promise.resolve() : schemaController.validatePermission(className, aclGroup, 'delete')).then(() => {
        if (!isMaster) {
          query = this.addPointerPermissions(schemaController, className, 'delete', query, aclGroup);

          if (!query) {
            throw new _node.Parse.Error(_node.Parse.Error.OBJECT_NOT_FOUND, 'Object not found.');
          }
        } // delete by query


        if (acl) {
          query = addWriteACL(query, acl);
        }

        validateQuery(query, isMaster, false);
        return schemaController.getOneSchema(className).catch(error => {
          // If the schema doesn't exist, pretend it exists with no fields. This behavior
          // will likely need revisiting.
          if (error === undefined) {
            return {
              fields: {}
            };
          }

          throw error;
        }).then(parseFormatSchema => this.adapter.deleteObjectsByQuery(className, parseFormatSchema, query, this._transactionalSession)).catch(error => {
          // When deleting sessions while changing passwords, don't throw an error if they don't have any sessions.
          if (className === '_Session' && error.code === _node.Parse.Error.OBJECT_NOT_FOUND) {
            return Promise.resolve({});
          }

          throw error;
        });
      });
    });
  } // Inserts an object into the database.
  // Returns a promise that resolves successfully iff the object saved.


  create(className, object, {
    acl
  } = {}, validateOnly = false, validSchemaController) {
    // Make a copy of the object, so we don't mutate the incoming data.
    const originalObject = object;
    object = transformObjectACL(object);
    object.createdAt = {
      iso: object.createdAt,
      __type: 'Date'
    };
    object.updatedAt = {
      iso: object.updatedAt,
      __type: 'Date'
    };
    var isMaster = acl === undefined;
    var aclGroup = acl || [];
    const relationUpdates = this.collectRelationUpdates(className, null, object);
    return this.validateClassName(className).then(() => this.loadSchemaIfNeeded(validSchemaController)).then(schemaController => {
      return (isMaster ? Promise.resolve() : schemaController.validatePermission(className, aclGroup, 'create')).then(() => schemaController.enforceClassExists(className)).then(() => schemaController.getOneSchema(className, true)).then(schema => {
        transformAuthData(className, object, schema);
        flattenUpdateOperatorsForCreate(object);

        if (validateOnly) {
          return {};
        }

        return this.adapter.createObject(className, SchemaController.convertSchemaToAdapterSchema(schema), object, this._transactionalSession);
      }).then(result => {
        if (validateOnly) {
          return originalObject;
        }

        return this.handleRelationUpdates(className, object.objectId, object, relationUpdates).then(() => {
          return this._sanitizeDatabaseResult(originalObject, result.ops[0]);
        });
      });
    });
  }

  canAddField(schema, className, object, aclGroup, runOptions) {
    const classSchema = schema.schemaData[className];

    if (!classSchema) {
      return Promise.resolve();
    }

    const fields = Object.keys(object);
    const schemaFields = Object.keys(classSchema.fields);
    const newKeys = fields.filter(field => {
      // Skip fields that are unset
      if (object[field] && object[field].__op && object[field].__op === 'Delete') {
        return false;
      }

      return schemaFields.indexOf(getRootFieldName(field)) < 0;
    });

    if (newKeys.length > 0) {
      // adds a marker that new field is being adding during update
      runOptions.addsField = true;
      const action = runOptions.action;
      return schema.validatePermission(className, aclGroup, 'addField', action);
    }

    return Promise.resolve();
  } // Won't delete collections in the system namespace

  /**
   * Delete all classes and clears the schema cache
   *
   * @param {boolean} fast set to true if it's ok to just delete rows and not indexes
   * @returns {Promise<void>} when the deletions completes
   */


  deleteEverything(fast = false) {
    this.schemaPromise = null;

    _SchemaCache.default.clear();

    return this.adapter.deleteAllClasses(fast);
  } // Returns a promise for a list of related ids given an owning id.
  // className here is the owning className.


  relatedIds(className, key, owningId, queryOptions) {
    const {
      skip,
      limit,
      sort
    } = queryOptions;
    const findOptions = {};

    if (sort && sort.createdAt && this.adapter.canSortOnJoinTables) {
      findOptions.sort = {
        _id: sort.createdAt
      };
      findOptions.limit = limit;
      findOptions.skip = skip;
      queryOptions.skip = 0;
    }

    return this.adapter.find(joinTableName(className, key), relationSchema, {
      owningId
    }, findOptions).then(results => results.map(result => result.relatedId));
  } // Returns a promise for a list of owning ids given some related ids.
  // className here is the owning className.


  owningIds(className, key, relatedIds) {
    return this.adapter.find(joinTableName(className, key), relationSchema, {
      relatedId: {
        $in: relatedIds
      }
    }, {
      keys: ['owningId']
    }).then(results => results.map(result => result.owningId));
  } // Modifies query so that it no longer has $in on relation fields, or
  // equal-to-pointer constraints on relation fields.
  // Returns a promise that resolves when query is mutated


  reduceInRelation(className, query, schema) {
    // Search for an in-relation or equal-to-relation
    // Make it sequential for now, not sure of paralleization side effects
    const promises = [];

    if (query['$or']) {
      const ors = query['$or'];
      promises.push(...ors.map((aQuery, index) => {
        return this.reduceInRelation(className, aQuery, schema).then(aQuery => {
          query['$or'][index] = aQuery;
        });
      }));
    }

    if (query['$and']) {
      const ands = query['$and'];
      promises.push(...ands.map((aQuery, index) => {
        return this.reduceInRelation(className, aQuery, schema).then(aQuery => {
          query['$and'][index] = aQuery;
        });
      }));
    }

    const otherKeys = Object.keys(query).map(key => {
      if (key === '$and' || key === '$or') {
        return;
      }

      const t = schema.getExpectedType(className, key);

      if (!t || t.type !== 'Relation') {
        return Promise.resolve(query);
      }

      let queries = null;

      if (query[key] && (query[key]['$in'] || query[key]['$ne'] || query[key]['$nin'] || query[key].__type == 'Pointer')) {
        // Build the list of queries
        queries = Object.keys(query[key]).map(constraintKey => {
          let relatedIds;
          let isNegation = false;

          if (constraintKey === 'objectId') {
            relatedIds = [query[key].objectId];
          } else if (constraintKey == '$in') {
            relatedIds = query[key]['$in'].map(r => r.objectId);
          } else if (constraintKey == '$nin') {
            isNegation = true;
            relatedIds = query[key]['$nin'].map(r => r.objectId);
          } else if (constraintKey == '$ne') {
            isNegation = true;
            relatedIds = [query[key]['$ne'].objectId];
          } else {
            return;
          }

          return {
            isNegation,
            relatedIds
          };
        });
      } else {
        queries = [{
          isNegation: false,
          relatedIds: []
        }];
      } // remove the current queryKey as we don,t need it anymore


      delete query[key]; // execute each query independently to build the list of
      // $in / $nin

      const promises = queries.map(q => {
        if (!q) {
          return Promise.resolve();
        }

        return this.owningIds(className, key, q.relatedIds).then(ids => {
          if (q.isNegation) {
            this.addNotInObjectIdsIds(ids, query);
          } else {
            this.addInObjectIdsIds(ids, query);
          }

          return Promise.resolve();
        });
      });
      return Promise.all(promises).then(() => {
        return Promise.resolve();
      });
    });
    return Promise.all([...promises, ...otherKeys]).then(() => {
      return Promise.resolve(query);
    });
  } // Modifies query so that it no longer has $relatedTo
  // Returns a promise that resolves when query is mutated


  reduceRelationKeys(className, query, queryOptions) {
    if (query['$or']) {
      return Promise.all(query['$or'].map(aQuery => {
        return this.reduceRelationKeys(className, aQuery, queryOptions);
      }));
    }

    if (query['$and']) {
      return Promise.all(query['$and'].map(aQuery => {
        return this.reduceRelationKeys(className, aQuery, queryOptions);
      }));
    }

    var relatedTo = query['$relatedTo'];

    if (relatedTo) {
      return this.relatedIds(relatedTo.object.className, relatedTo.key, relatedTo.object.objectId, queryOptions).then(ids => {
        delete query['$relatedTo'];
        this.addInObjectIdsIds(ids, query);
        return this.reduceRelationKeys(className, query, queryOptions);
      }).then(() => {});
    }
  }

  addInObjectIdsIds(ids = null, query) {
    const idsFromString = typeof query.objectId === 'string' ? [query.objectId] : null;
    const idsFromEq = query.objectId && query.objectId['$eq'] ? [query.objectId['$eq']] : null;
    const idsFromIn = query.objectId && query.objectId['$in'] ? query.objectId['$in'] : null; // -disable-next

    const allIds = [idsFromString, idsFromEq, idsFromIn, ids].filter(list => list !== null);
    const totalLength = allIds.reduce((memo, list) => memo + list.length, 0);
    let idsIntersection = [];

    if (totalLength > 125) {
      idsIntersection = _intersect.default.big(allIds);
    } else {
      idsIntersection = (0, _intersect.default)(allIds);
    } // Need to make sure we don't clobber existing shorthand $eq constraints on objectId.


    if (!('objectId' in query)) {
      query.objectId = {
        $in: undefined
      };
    } else if (typeof query.objectId === 'string') {
      query.objectId = {
        $in: undefined,
        $eq: query.objectId
      };
    }

    query.objectId['$in'] = idsIntersection;
    return query;
  }

  addNotInObjectIdsIds(ids = [], query) {
    const idsFromNin = query.objectId && query.objectId['$nin'] ? query.objectId['$nin'] : [];
    let allIds = [...idsFromNin, ...ids].filter(list => list !== null); // make a set and spread to remove duplicates

    allIds = [...new Set(allIds)]; // Need to make sure we don't clobber existing shorthand $eq constraints on objectId.

    if (!('objectId' in query)) {
      query.objectId = {
        $nin: undefined
      };
    } else if (typeof query.objectId === 'string') {
      query.objectId = {
        $nin: undefined,
        $eq: query.objectId
      };
    }

    query.objectId['$nin'] = allIds;
    return query;
  } // Runs a query on the database.
  // Returns a promise that resolves to a list of items.
  // Options:
  //   skip    number of results to skip.
  //   limit   limit to this number of results.
  //   sort    an object where keys are the fields to sort by.
  //           the value is +1 for ascending, -1 for descending.
  //   count   run a count instead of returning results.
  //   acl     restrict this operation with an ACL for the provided array
  //           of user objectIds and roles. acl: null means no user.
  //           when this field is not present, don't do anything regarding ACLs.
  //  caseInsensitive make string comparisons case insensitive
  // TODO: make userIds not needed here. The db adapter shouldn't know
  // anything about users, ideally. Then, improve the format of the ACL
  // arg to work like the others.


  find(className, query, {
    skip,
    limit,
    acl,
    sort = {},
    count,
    keys,
    op,
    distinct,
    pipeline,
    readPreference,
    hint,
    caseInsensitive = false,
    explain
  } = {}, auth = {}, validSchemaController) {
    const isMaster = acl === undefined;
    const aclGroup = acl || [];
    op = op || (typeof query.objectId == 'string' && Object.keys(query).length === 1 ? 'get' : 'find'); // Count operation if counting

    op = count === true ? 'count' : op;
    let classExists = true;
    return this.loadSchemaIfNeeded(validSchemaController).then(schemaController => {
      //Allow volatile classes if querying with Master (for _PushStatus)
      //TODO: Move volatile classes concept into mongo adapter, postgres adapter shouldn't care
      //that api.parse.com breaks when _PushStatus exists in mongo.
      return schemaController.getOneSchema(className, isMaster).catch(error => {
        // Behavior for non-existent classes is kinda weird on Parse.com. Probably doesn't matter too much.
        // For now, pretend the class exists but has no objects,
        if (error === undefined) {
          classExists = false;
          return {
            fields: {}
          };
        }

        throw error;
      }).then(schema => {
        // Parse.com treats queries on _created_at and _updated_at as if they were queries on createdAt and updatedAt,
        // so duplicate that behavior here. If both are specified, the correct behavior to match Parse.com is to
        // use the one that appears first in the sort list.
        if (sort._created_at) {
          sort.createdAt = sort._created_at;
          delete sort._created_at;
        }

        if (sort._updated_at) {
          sort.updatedAt = sort._updated_at;
          delete sort._updated_at;
        }

        const queryOptions = {
          skip,
          limit,
          sort,
          keys,
          readPreference,
          hint,
          caseInsensitive,
          explain
        };
        Object.keys(sort).forEach(fieldName => {
          if (fieldName.match(/^authData\.([a-zA-Z0-9_]+)\.id$/)) {
            throw new _node.Parse.Error(_node.Parse.Error.INVALID_KEY_NAME, `Cannot sort by ${fieldName}`);
          }

          const rootFieldName = getRootFieldName(fieldName);

          if (!SchemaController.fieldNameIsValid(rootFieldName, className)) {
            throw new _node.Parse.Error(_node.Parse.Error.INVALID_KEY_NAME, `Invalid field name: ${fieldName}.`);
          }

          if (!schema.fields[fieldName.split('.')[0]] && fieldName !== 'score') {
            delete sort[fieldName];
          }
        });
        return (isMaster ? Promise.resolve() : schemaController.validatePermission(className, aclGroup, op)).then(() => this.reduceRelationKeys(className, query, queryOptions)).then(() => this.reduceInRelation(className, query, schemaController)).then(() => {
          let protectedFields;

          if (!isMaster) {
            query = this.addPointerPermissions(schemaController, className, op, query, aclGroup);
            /* Don't use projections to optimize the protectedFields since the protectedFields
              based on pointer-permissions are determined after querying. The filtering can
              overwrite the protected fields. */

            protectedFields = this.addProtectedFields(schemaController, className, query, aclGroup, auth, queryOptions);
          }

          if (!query) {
            if (op === 'get') {
              throw new _node.Parse.Error(_node.Parse.Error.OBJECT_NOT_FOUND, 'Object not found.');
            } else {
              return [];
            }
          }

          if (!isMaster) {
            if (op === 'update' || op === 'delete') {
              query = addWriteACL(query, aclGroup);
            } else {
              query = addReadACL(query, aclGroup);
            }
          }

          validateQuery(query, isMaster, false);

          if (count) {
            if (!classExists) {
              return 0;
            } else {
              return this.adapter.count(className, schema, query, readPreference, undefined, hint);
            }
          } else if (distinct) {
            if (!classExists) {
              return [];
            } else {
              return this.adapter.distinct(className, schema, query, distinct);
            }
          } else if (pipeline) {
            if (!classExists) {
              return [];
            } else {
              return this.adapter.aggregate(className, schema, pipeline, readPreference, hint, explain);
            }
          } else if (explain) {
            return this.adapter.find(className, schema, query, queryOptions);
          } else {
            return this.adapter.find(className, schema, query, queryOptions).then(objects => objects.map(object => {
              object = untransformObjectACL(object);
              return filterSensitiveData(isMaster, aclGroup, auth, op, schemaController, className, protectedFields, object);
            })).catch(error => {
              throw new _node.Parse.Error(_node.Parse.Error.INTERNAL_SERVER_ERROR, error);
            });
          }
        });
      });
    });
  }

  deleteSchema(className) {
    let schemaController;
    return this.loadSchema({
      clearCache: true
    }).then(s => {
      schemaController = s;
      return schemaController.getOneSchema(className, true);
    }).catch(error => {
      if (error === undefined) {
        return {
          fields: {}
        };
      } else {
        throw error;
      }
    }).then(schema => {
      return this.collectionExists(className).then(() => this.adapter.count(className, {
        fields: {}
      }, null, '', false)).then(count => {
        if (count > 0) {
          throw new _node.Parse.Error(255, `Class ${className} is not empty, contains ${count} objects, cannot drop schema.`);
        }

        return this.adapter.deleteClass(className);
      }).then(wasParseCollection => {
        if (wasParseCollection) {
          const relationFieldNames = Object.keys(schema.fields).filter(fieldName => schema.fields[fieldName].type === 'Relation');
          return Promise.all(relationFieldNames.map(name => this.adapter.deleteClass(joinTableName(className, name)))).then(() => {
            _SchemaCache.default.del(className);

            return schemaController.reloadData();
          });
        } else {
          return Promise.resolve();
        }
      });
    });
  } // This helps to create intermediate objects for simpler comparison of
  // key value pairs used in query objects. Each key value pair will represented
  // in a similar way to json


  objectToEntriesStrings(query) {
    return Object.entries(query).map(a => a.map(s => JSON.stringify(s)).join(':'));
  } // Naive logic reducer for OR operations meant to be used only for pointer permissions.


  reduceOrOperation(query) {
    if (!query.$or) {
      return query;
    }

    const queries = query.$or.map(q => this.objectToEntriesStrings(q));
    let repeat = false;

    do {
      repeat = false;

      for (let i = 0; i < queries.length - 1; i++) {
        for (let j = i + 1; j < queries.length; j++) {
          const [shorter, longer] = queries[i].length > queries[j].length ? [j, i] : [i, j];
          const foundEntries = queries[shorter].reduce((acc, entry) => acc + (queries[longer].includes(entry) ? 1 : 0), 0);
          const shorterEntries = queries[shorter].length;

          if (foundEntries === shorterEntries) {
            // If the shorter query is completely contained in the longer one, we can strike
            // out the longer query.
            query.$or.splice(longer, 1);
            queries.splice(longer, 1);
            repeat = true;
            break;
          }
        }
      }
    } while (repeat);

    if (query.$or.length === 1) {
      query = _objectSpread(_objectSpread({}, query), query.$or[0]);
      delete query.$or;
    }

    return query;
  } // Naive logic reducer for AND operations meant to be used only for pointer permissions.


  reduceAndOperation(query) {
    if (!query.$and) {
      return query;
    }

    const queries = query.$and.map(q => this.objectToEntriesStrings(q));
    let repeat = false;

    do {
      repeat = false;

      for (let i = 0; i < queries.length - 1; i++) {
        for (let j = i + 1; j < queries.length; j++) {
          const [shorter, longer] = queries[i].length > queries[j].length ? [j, i] : [i, j];
          const foundEntries = queries[shorter].reduce((acc, entry) => acc + (queries[longer].includes(entry) ? 1 : 0), 0);
          const shorterEntries = queries[shorter].length;

          if (foundEntries === shorterEntries) {
            // If the shorter query is completely contained in the longer one, we can strike
            // out the shorter query.
            query.$and.splice(shorter, 1);
            queries.splice(shorter, 1);
            repeat = true;
            break;
          }
        }
      }
    } while (repeat);

    if (query.$and.length === 1) {
      query = _objectSpread(_objectSpread({}, query), query.$and[0]);
      delete query.$and;
    }

    return query;
  } // Constraints query using CLP's pointer permissions (PP) if any.
  // 1. Etract the user id from caller's ACLgroup;
  // 2. Exctract a list of field names that are PP for target collection and operation;
  // 3. Constraint the original query so that each PP field must
  // point to caller's id (or contain it in case of PP field being an array)


  addPointerPermissions(schema, className, operation, query, aclGroup = []) {
    // Check if class has public permission for operation
    // If the BaseCLP pass, let go through
    if (schema.testPermissionsForClassName(className, aclGroup, operation)) {
      return query;
    }

    const perms = schema.getClassLevelPermissions(className);
    const userACL = aclGroup.filter(acl => {
      return acl.indexOf('role:') != 0 && acl != '*';
    });
    const groupKey = ['get', 'find', 'count'].indexOf(operation) > -1 ? 'readUserFields' : 'writeUserFields';
    const permFields = [];

    if (perms[operation] && perms[operation].pointerFields) {
      permFields.push(...perms[operation].pointerFields);
    }

    if (perms[groupKey]) {
      for (const field of perms[groupKey]) {
        if (!permFields.includes(field)) {
          permFields.push(field);
        }
      }
    } // the ACL should have exactly 1 user


    if (permFields.length > 0) {
      // the ACL should have exactly 1 user
      // No user set return undefined
      // If the length is > 1, that means we didn't de-dupe users correctly
      if (userACL.length != 1) {
        return;
      }

      const userId = userACL[0];
      const userPointer = {
        __type: 'Pointer',
        className: '_User',
        objectId: userId
      };
      const queries = permFields.map(key => {
        const fieldDescriptor = schema.getExpectedType(className, key);
        const fieldType = fieldDescriptor && typeof fieldDescriptor === 'object' && Object.prototype.hasOwnProperty.call(fieldDescriptor, 'type') ? fieldDescriptor.type : null;
        let queryClause;

        if (fieldType === 'Pointer') {
          // constraint for single pointer setup
          queryClause = {
            [key]: userPointer
          };
        } else if (fieldType === 'Array') {
          // constraint for users-array setup
          queryClause = {
            [key]: {
              $all: [userPointer]
            }
          };
        } else if (fieldType === 'Object') {
          // constraint for object setup
          queryClause = {
            [key]: userPointer
          };
        } else {
          // This means that there is a CLP field of an unexpected type. This condition should not happen, which is
          // why is being treated as an error.
          throw Error(`An unexpected condition occurred when resolving pointer permissions: ${className} ${key}`);
        } // if we already have a constraint on the key, use the $and


        if (Object.prototype.hasOwnProperty.call(query, key)) {
          return this.reduceAndOperation({
            $and: [queryClause, query]
          });
        } // otherwise just add the constaint


        return Object.assign({}, query, queryClause);
      });
      return queries.length === 1 ? queries[0] : this.reduceOrOperation({
        $or: queries
      });
    } else {
      return query;
    }
  }

  addProtectedFields(schema, className, query = {}, aclGroup = [], auth = {}, queryOptions = {}) {
    const perms = schema && schema.getClassLevelPermissions ? schema.getClassLevelPermissions(className) : schema;
    if (!perms) return null;
    const protectedFields = perms.protectedFields;
    if (!protectedFields) return null;
    if (aclGroup.indexOf(query.objectId) > -1) return null; // for queries where "keys" are set and do not include all 'userField':{field},
    // we have to transparently include it, and then remove before returning to client
    // Because if such key not projected the permission won't be enforced properly
    // PS this is called when 'excludeKeys' already reduced to 'keys'

    const preserveKeys = queryOptions.keys; // these are keys that need to be included only
    // to be able to apply protectedFields by pointer
    // and then unset before returning to client (later in  filterSensitiveFields)

    const serverOnlyKeys = [];
    const authenticated = auth.user; // map to allow check without array search

    const roles = (auth.userRoles || []).reduce((acc, r) => {
      acc[r] = protectedFields[r];
      return acc;
    }, {}); // array of sets of protected fields. separate item for each applicable criteria

    const protectedKeysSets = [];

    for (const key in protectedFields) {
      // skip userFields
      if (key.startsWith('userField:')) {
        if (preserveKeys) {
          const fieldName = key.substring(10);

          if (!preserveKeys.includes(fieldName)) {
            // 1. put it there temporarily
            queryOptions.keys && queryOptions.keys.push(fieldName); // 2. preserve it delete later

            serverOnlyKeys.push(fieldName);
          }
        }

        continue;
      } // add public tier


      if (key === '*') {
        protectedKeysSets.push(protectedFields[key]);
        continue;
      }

      if (authenticated) {
        if (key === 'authenticated') {
          // for logged in users
          protectedKeysSets.push(protectedFields[key]);
          continue;
        }

        if (roles[key] && key.startsWith('role:')) {
          // add applicable roles
          protectedKeysSets.push(roles[key]);
        }
      }
    } // check if there's a rule for current user's id


    if (authenticated) {
      const userId = auth.user.id;

      if (perms.protectedFields[userId]) {
        protectedKeysSets.push(perms.protectedFields[userId]);
      }
    } // preserve fields to be removed before sending response to client


    if (serverOnlyKeys.length > 0) {
      perms.protectedFields.temporaryKeys = serverOnlyKeys;
    }

    let protectedKeys = protectedKeysSets.reduce((acc, next) => {
      if (next) {
        acc.push(...next);
      }

      return acc;
    }, []); // intersect all sets of protectedFields

    protectedKeysSets.forEach(fields => {
      if (fields) {
        protectedKeys = protectedKeys.filter(v => fields.includes(v));
      }
    });
    return protectedKeys;
  }

  createTransactionalSession() {
    return this.adapter.createTransactionalSession().then(transactionalSession => {
      this._transactionalSession = transactionalSession;
    });
  }

  commitTransactionalSession() {
    if (!this._transactionalSession) {
      throw new Error('There is no transactional session to commit');
    }

    return this.adapter.commitTransactionalSession(this._transactionalSession).then(() => {
      this._transactionalSession = null;
    });
  }

  abortTransactionalSession() {
    if (!this._transactionalSession) {
      throw new Error('There is no transactional session to abort');
    }

    return this.adapter.abortTransactionalSession(this._transactionalSession).then(() => {
      this._transactionalSession = null;
    });
  } // TODO: create indexes on first creation of a _User object. Otherwise it's impossible to
  // have a Parse app without it having a _User collection.


  async performInitialization() {
    await this.adapter.performInitialization({
      VolatileClassesSchemas: SchemaController.VolatileClassesSchemas
    });
    const requiredUserFields = {
      fields: _objectSpread(_objectSpread({}, SchemaController.defaultColumns._Default), SchemaController.defaultColumns._User)
    };
    const requiredRoleFields = {
      fields: _objectSpread(_objectSpread({}, SchemaController.defaultColumns._Default), SchemaController.defaultColumns._Role)
    };
    const requiredIdempotencyFields = {
      fields: _objectSpread(_objectSpread({}, SchemaController.defaultColumns._Default), SchemaController.defaultColumns._Idempotency)
    };
    await this.loadSchema().then(schema => schema.enforceClassExists('_User'));
    await this.loadSchema().then(schema => schema.enforceClassExists('_Role'));
    await this.loadSchema().then(schema => schema.enforceClassExists('_Idempotency'));
    await this.adapter.ensureUniqueness('_User', requiredUserFields, ['username']).catch(error => {
      _logger.default.warn('Unable to ensure uniqueness for usernames: ', error);

      throw error;
    });
    await this.adapter.ensureIndex('_User', requiredUserFields, ['username'], 'case_insensitive_username', true).catch(error => {
      _logger.default.warn('Unable to create case insensitive username index: ', error);

      throw error;
    });
    await this.adapter.ensureIndex('_User', requiredUserFields, ['username'], 'case_insensitive_username', true).catch(error => {
      _logger.default.warn('Unable to create case insensitive username index: ', error);

      throw error;
    });
    await this.adapter.ensureUniqueness('_User', requiredUserFields, ['email']).catch(error => {
      _logger.default.warn('Unable to ensure uniqueness for user email addresses: ', error);

      throw error;
    });
    await this.adapter.ensureIndex('_User', requiredUserFields, ['email'], 'case_insensitive_email', true).catch(error => {
      _logger.default.warn('Unable to create case insensitive email index: ', error);

      throw error;
    });
    await this.adapter.ensureUniqueness('_Role', requiredRoleFields, ['name']).catch(error => {
      _logger.default.warn('Unable to ensure uniqueness for role name: ', error);

      throw error;
    });
    await this.adapter.ensureUniqueness('_Idempotency', requiredIdempotencyFields, ['reqId']).catch(error => {
      _logger.default.warn('Unable to ensure uniqueness for idempotency request ID: ', error);

      throw error;
    });
    const isMongoAdapter = this.adapter instanceof _MongoStorageAdapter.default;
    const isPostgresAdapter = this.adapter instanceof _PostgresStorageAdapter.default;

    if (isMongoAdapter || isPostgresAdapter) {
      let options = {};

      if (isMongoAdapter) {
        options = {
          ttl: 0
        };
      } else if (isPostgresAdapter) {
        options = this.idempotencyOptions;
        options.setIdempotencyFunction = true;
      }

      await this.adapter.ensureIndex('_Idempotency', requiredIdempotencyFields, ['expire'], 'ttl', false, options).catch(error => {
        _logger.default.warn('Unable to create TTL index for idempotency expire date: ', error);

        throw error;
      });
    }

    await this.adapter.updateSchemaWithIndexes();
  }

  _expandResultOnKeyPath(object, key, value) {
    if (key.indexOf('.') < 0) {
      object[key] = value[key];
      return object;
    }

    const path = key.split('.');
    const firstKey = path[0];
    const nextPath = path.slice(1).join('.'); // Scan request data for denied keywords

    if (this.options && this.options.requestKeywordDenylist) {
      // Scan request data for denied keywords
      for (const keyword of this.options.requestKeywordDenylist) {
        const match = _Utils.default.objectContainsKeyValue({
          [firstKey]: true,
          [nextPath]: true
        }, keyword.key, true);

        if (match) {
          throw new _node.Parse.Error(_node.Parse.Error.INVALID_KEY_NAME, `Prohibited keyword in request data: ${JSON.stringify(keyword)}.`);
        }
      }
    }

    object[firstKey] = this._expandResultOnKeyPath(object[firstKey] || {}, nextPath, value[firstKey]);
    delete object[key];
    return object;
  }

  _sanitizeDatabaseResult(originalObject, result) {
    const response = {};

    if (!result) {
      return Promise.resolve(response);
    }

    Object.keys(originalObject).forEach(key => {
      const keyUpdate = originalObject[key]; // determine if that was an op

      if (keyUpdate && typeof keyUpdate === 'object' && keyUpdate.__op && ['Add', 'AddUnique', 'Remove', 'Increment'].indexOf(keyUpdate.__op) > -1) {
        // only valid ops that produce an actionable result
        // the op may have happened on a keypath
        this._expandResultOnKeyPath(response, key, result);
      }
    });
    return Promise.resolve(response);
  }

}

module.exports = DatabaseController; // Expose validateQuery for tests

module.exports._validateQuery = validateQuery;
module.exports.filterSensitiveData = filterSensitiveData;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Db250cm9sbGVycy9EYXRhYmFzZUNvbnRyb2xsZXIuanMiXSwibmFtZXMiOlsiYWRkV3JpdGVBQ0wiLCJxdWVyeSIsImFjbCIsIm5ld1F1ZXJ5IiwiXyIsImNsb25lRGVlcCIsIl93cGVybSIsIiRpbiIsImFkZFJlYWRBQ0wiLCJfcnBlcm0iLCJ0cmFuc2Zvcm1PYmplY3RBQ0wiLCJBQ0wiLCJyZXN1bHQiLCJlbnRyeSIsInJlYWQiLCJwdXNoIiwid3JpdGUiLCJzcGVjaWFsUXVlcnlLZXlzIiwic3BlY2lhbE1hc3RlclF1ZXJ5S2V5cyIsInZhbGlkYXRlUXVlcnkiLCJpc01hc3RlciIsInVwZGF0ZSIsIlBhcnNlIiwiRXJyb3IiLCJJTlZBTElEX1FVRVJZIiwiJG9yIiwiQXJyYXkiLCJmb3JFYWNoIiwidmFsdWUiLCIkYW5kIiwiJG5vciIsImxlbmd0aCIsIk9iamVjdCIsImtleXMiLCJrZXkiLCIkcmVnZXgiLCIkb3B0aW9ucyIsIm1hdGNoIiwiaW5jbHVkZXMiLCJJTlZBTElEX0tFWV9OQU1FIiwiZmlsdGVyU2Vuc2l0aXZlRGF0YSIsImFjbEdyb3VwIiwiYXV0aCIsIm9wZXJhdGlvbiIsInNjaGVtYSIsImNsYXNzTmFtZSIsInByb3RlY3RlZEZpZWxkcyIsIm9iamVjdCIsInVzZXJJZCIsInVzZXIiLCJpZCIsInBlcm1zIiwiZ2V0Q2xhc3NMZXZlbFBlcm1pc3Npb25zIiwiaXNSZWFkT3BlcmF0aW9uIiwiaW5kZXhPZiIsInByb3RlY3RlZEZpZWxkc1BvaW50ZXJQZXJtIiwiZmlsdGVyIiwic3RhcnRzV2l0aCIsIm1hcCIsInN1YnN0cmluZyIsIm5ld1Byb3RlY3RlZEZpZWxkcyIsIm92ZXJyaWRlUHJvdGVjdGVkRmllbGRzIiwicG9pbnRlclBlcm0iLCJwb2ludGVyUGVybUluY2x1ZGVzVXNlciIsInJlYWRVc2VyRmllbGRWYWx1ZSIsImlzQXJyYXkiLCJzb21lIiwib2JqZWN0SWQiLCJmaWVsZHMiLCJ2IiwiaXNVc2VyQ2xhc3MiLCJrIiwidGVtcG9yYXJ5S2V5cyIsInBhc3N3b3JkIiwiX2hhc2hlZF9wYXNzd29yZCIsInNlc3Npb25Ub2tlbiIsImNoYXJBdCIsImF1dGhEYXRhIiwic3BlY2lhbEtleXNGb3JVcGRhdGUiLCJpc1NwZWNpYWxVcGRhdGVLZXkiLCJqb2luVGFibGVOYW1lIiwiZmxhdHRlblVwZGF0ZU9wZXJhdG9yc0ZvckNyZWF0ZSIsIl9fb3AiLCJhbW91bnQiLCJJTlZBTElEX0pTT04iLCJvYmplY3RzIiwiQ09NTUFORF9VTkFWQUlMQUJMRSIsInRyYW5zZm9ybUF1dGhEYXRhIiwicHJvdmlkZXIiLCJwcm92aWRlckRhdGEiLCJmaWVsZE5hbWUiLCJ0eXBlIiwidW50cmFuc2Zvcm1PYmplY3RBQ0wiLCJvdXRwdXQiLCJnZXRSb290RmllbGROYW1lIiwic3BsaXQiLCJyZWxhdGlvblNjaGVtYSIsInJlbGF0ZWRJZCIsIm93bmluZ0lkIiwiRGF0YWJhc2VDb250cm9sbGVyIiwiY29uc3RydWN0b3IiLCJhZGFwdGVyIiwib3B0aW9ucyIsImlkZW1wb3RlbmN5T3B0aW9ucyIsInNjaGVtYVByb21pc2UiLCJfdHJhbnNhY3Rpb25hbFNlc3Npb24iLCJjb2xsZWN0aW9uRXhpc3RzIiwiY2xhc3NFeGlzdHMiLCJwdXJnZUNvbGxlY3Rpb24iLCJsb2FkU2NoZW1hIiwidGhlbiIsInNjaGVtYUNvbnRyb2xsZXIiLCJnZXRPbmVTY2hlbWEiLCJkZWxldGVPYmplY3RzQnlRdWVyeSIsInZhbGlkYXRlQ2xhc3NOYW1lIiwiU2NoZW1hQ29udHJvbGxlciIsImNsYXNzTmFtZUlzVmFsaWQiLCJQcm9taXNlIiwicmVqZWN0IiwiSU5WQUxJRF9DTEFTU19OQU1FIiwicmVzb2x2ZSIsImNsZWFyQ2FjaGUiLCJsb2FkIiwibG9hZFNjaGVtYUlmTmVlZGVkIiwicmVkaXJlY3RDbGFzc05hbWVGb3JLZXkiLCJ0IiwiZ2V0RXhwZWN0ZWRUeXBlIiwidGFyZ2V0Q2xhc3MiLCJ2YWxpZGF0ZU9iamVjdCIsInJ1bk9wdGlvbnMiLCJ1bmRlZmluZWQiLCJzIiwiY2FuQWRkRmllbGQiLCJtYW55IiwidXBzZXJ0IiwiYWRkc0ZpZWxkIiwic2tpcFNhbml0aXphdGlvbiIsInZhbGlkYXRlT25seSIsInZhbGlkU2NoZW1hQ29udHJvbGxlciIsIm9yaWdpbmFsUXVlcnkiLCJvcmlnaW5hbFVwZGF0ZSIsInJlbGF0aW9uVXBkYXRlcyIsInZhbGlkYXRlUGVybWlzc2lvbiIsImNvbGxlY3RSZWxhdGlvblVwZGF0ZXMiLCJhZGRQb2ludGVyUGVybWlzc2lvbnMiLCJjYXRjaCIsImVycm9yIiwicm9vdEZpZWxkTmFtZSIsImZpZWxkTmFtZUlzVmFsaWQiLCJ1cGRhdGVPcGVyYXRpb24iLCJpbm5lcktleSIsIklOVkFMSURfTkVTVEVEX0tFWSIsImZpbmQiLCJPQkpFQ1RfTk9UX0ZPVU5EIiwidXBkYXRlT2JqZWN0c0J5UXVlcnkiLCJ1cHNlcnRPbmVPYmplY3QiLCJmaW5kT25lQW5kVXBkYXRlIiwiaGFuZGxlUmVsYXRpb25VcGRhdGVzIiwiX3Nhbml0aXplRGF0YWJhc2VSZXN1bHQiLCJvcHMiLCJkZWxldGVNZSIsInByb2Nlc3MiLCJvcCIsIngiLCJwZW5kaW5nIiwiYWRkUmVsYXRpb24iLCJyZW1vdmVSZWxhdGlvbiIsImFsbCIsImZyb21DbGFzc05hbWUiLCJmcm9tSWQiLCJ0b0lkIiwiZG9jIiwiY29kZSIsImRlc3Ryb3kiLCJwYXJzZUZvcm1hdFNjaGVtYSIsImNyZWF0ZSIsIm9yaWdpbmFsT2JqZWN0IiwiY3JlYXRlZEF0IiwiaXNvIiwiX190eXBlIiwidXBkYXRlZEF0IiwiZW5mb3JjZUNsYXNzRXhpc3RzIiwiY3JlYXRlT2JqZWN0IiwiY29udmVydFNjaGVtYVRvQWRhcHRlclNjaGVtYSIsImNsYXNzU2NoZW1hIiwic2NoZW1hRGF0YSIsInNjaGVtYUZpZWxkcyIsIm5ld0tleXMiLCJmaWVsZCIsImFjdGlvbiIsImRlbGV0ZUV2ZXJ5dGhpbmciLCJmYXN0IiwiU2NoZW1hQ2FjaGUiLCJjbGVhciIsImRlbGV0ZUFsbENsYXNzZXMiLCJyZWxhdGVkSWRzIiwicXVlcnlPcHRpb25zIiwic2tpcCIsImxpbWl0Iiwic29ydCIsImZpbmRPcHRpb25zIiwiY2FuU29ydE9uSm9pblRhYmxlcyIsIl9pZCIsInJlc3VsdHMiLCJvd25pbmdJZHMiLCJyZWR1Y2VJblJlbGF0aW9uIiwicHJvbWlzZXMiLCJvcnMiLCJhUXVlcnkiLCJpbmRleCIsImFuZHMiLCJvdGhlcktleXMiLCJxdWVyaWVzIiwiY29uc3RyYWludEtleSIsImlzTmVnYXRpb24iLCJyIiwicSIsImlkcyIsImFkZE5vdEluT2JqZWN0SWRzSWRzIiwiYWRkSW5PYmplY3RJZHNJZHMiLCJyZWR1Y2VSZWxhdGlvbktleXMiLCJyZWxhdGVkVG8iLCJpZHNGcm9tU3RyaW5nIiwiaWRzRnJvbUVxIiwiaWRzRnJvbUluIiwiYWxsSWRzIiwibGlzdCIsInRvdGFsTGVuZ3RoIiwicmVkdWNlIiwibWVtbyIsImlkc0ludGVyc2VjdGlvbiIsImludGVyc2VjdCIsImJpZyIsIiRlcSIsImlkc0Zyb21OaW4iLCJTZXQiLCIkbmluIiwiY291bnQiLCJkaXN0aW5jdCIsInBpcGVsaW5lIiwicmVhZFByZWZlcmVuY2UiLCJoaW50IiwiY2FzZUluc2Vuc2l0aXZlIiwiZXhwbGFpbiIsIl9jcmVhdGVkX2F0IiwiX3VwZGF0ZWRfYXQiLCJhZGRQcm90ZWN0ZWRGaWVsZHMiLCJhZ2dyZWdhdGUiLCJJTlRFUk5BTF9TRVJWRVJfRVJST1IiLCJkZWxldGVTY2hlbWEiLCJkZWxldGVDbGFzcyIsIndhc1BhcnNlQ29sbGVjdGlvbiIsInJlbGF0aW9uRmllbGROYW1lcyIsIm5hbWUiLCJkZWwiLCJyZWxvYWREYXRhIiwib2JqZWN0VG9FbnRyaWVzU3RyaW5ncyIsImVudHJpZXMiLCJhIiwiSlNPTiIsInN0cmluZ2lmeSIsImpvaW4iLCJyZWR1Y2VPck9wZXJhdGlvbiIsInJlcGVhdCIsImkiLCJqIiwic2hvcnRlciIsImxvbmdlciIsImZvdW5kRW50cmllcyIsImFjYyIsInNob3J0ZXJFbnRyaWVzIiwic3BsaWNlIiwicmVkdWNlQW5kT3BlcmF0aW9uIiwidGVzdFBlcm1pc3Npb25zRm9yQ2xhc3NOYW1lIiwidXNlckFDTCIsImdyb3VwS2V5IiwicGVybUZpZWxkcyIsInBvaW50ZXJGaWVsZHMiLCJ1c2VyUG9pbnRlciIsImZpZWxkRGVzY3JpcHRvciIsImZpZWxkVHlwZSIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsInF1ZXJ5Q2xhdXNlIiwiJGFsbCIsImFzc2lnbiIsInByZXNlcnZlS2V5cyIsInNlcnZlck9ubHlLZXlzIiwiYXV0aGVudGljYXRlZCIsInJvbGVzIiwidXNlclJvbGVzIiwicHJvdGVjdGVkS2V5c1NldHMiLCJwcm90ZWN0ZWRLZXlzIiwibmV4dCIsImNyZWF0ZVRyYW5zYWN0aW9uYWxTZXNzaW9uIiwidHJhbnNhY3Rpb25hbFNlc3Npb24iLCJjb21taXRUcmFuc2FjdGlvbmFsU2Vzc2lvbiIsImFib3J0VHJhbnNhY3Rpb25hbFNlc3Npb24iLCJwZXJmb3JtSW5pdGlhbGl6YXRpb24iLCJWb2xhdGlsZUNsYXNzZXNTY2hlbWFzIiwicmVxdWlyZWRVc2VyRmllbGRzIiwiZGVmYXVsdENvbHVtbnMiLCJfRGVmYXVsdCIsIl9Vc2VyIiwicmVxdWlyZWRSb2xlRmllbGRzIiwiX1JvbGUiLCJyZXF1aXJlZElkZW1wb3RlbmN5RmllbGRzIiwiX0lkZW1wb3RlbmN5IiwiZW5zdXJlVW5pcXVlbmVzcyIsImxvZ2dlciIsIndhcm4iLCJlbnN1cmVJbmRleCIsImlzTW9uZ29BZGFwdGVyIiwiTW9uZ29TdG9yYWdlQWRhcHRlciIsImlzUG9zdGdyZXNBZGFwdGVyIiwiUG9zdGdyZXNTdG9yYWdlQWRhcHRlciIsInR0bCIsInNldElkZW1wb3RlbmN5RnVuY3Rpb24iLCJ1cGRhdGVTY2hlbWFXaXRoSW5kZXhlcyIsIl9leHBhbmRSZXN1bHRPbktleVBhdGgiLCJwYXRoIiwiZmlyc3RLZXkiLCJuZXh0UGF0aCIsInNsaWNlIiwicmVxdWVzdEtleXdvcmREZW55bGlzdCIsImtleXdvcmQiLCJVdGlscyIsIm9iamVjdENvbnRhaW5zS2V5VmFsdWUiLCJyZXNwb25zZSIsImtleVVwZGF0ZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJfdmFsaWRhdGVRdWVyeSJdLCJtYXBwaW5ncyI6Ijs7QUFLQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS0EsU0FBU0EsV0FBVCxDQUFxQkMsS0FBckIsRUFBNEJDLEdBQTVCLEVBQWlDO0FBQy9CLFFBQU1DLFFBQVEsR0FBR0MsZ0JBQUVDLFNBQUYsQ0FBWUosS0FBWixDQUFqQixDQUQrQixDQUUvQjs7O0FBQ0FFLEVBQUFBLFFBQVEsQ0FBQ0csTUFBVCxHQUFrQjtBQUFFQyxJQUFBQSxHQUFHLEVBQUUsQ0FBQyxJQUFELEVBQU8sR0FBR0wsR0FBVjtBQUFQLEdBQWxCO0FBQ0EsU0FBT0MsUUFBUDtBQUNEOztBQUVELFNBQVNLLFVBQVQsQ0FBb0JQLEtBQXBCLEVBQTJCQyxHQUEzQixFQUFnQztBQUM5QixRQUFNQyxRQUFRLEdBQUdDLGdCQUFFQyxTQUFGLENBQVlKLEtBQVosQ0FBakIsQ0FEOEIsQ0FFOUI7OztBQUNBRSxFQUFBQSxRQUFRLENBQUNNLE1BQVQsR0FBa0I7QUFBRUYsSUFBQUEsR0FBRyxFQUFFLENBQUMsSUFBRCxFQUFPLEdBQVAsRUFBWSxHQUFHTCxHQUFmO0FBQVAsR0FBbEI7QUFDQSxTQUFPQyxRQUFQO0FBQ0QsQyxDQUVEOzs7QUFDQSxNQUFNTyxrQkFBa0IsR0FBRyxRQUF3QjtBQUFBLE1BQXZCO0FBQUVDLElBQUFBO0FBQUYsR0FBdUI7QUFBQSxNQUFiQyxNQUFhOztBQUNqRCxNQUFJLENBQUNELEdBQUwsRUFBVTtBQUNSLFdBQU9DLE1BQVA7QUFDRDs7QUFFREEsRUFBQUEsTUFBTSxDQUFDTixNQUFQLEdBQWdCLEVBQWhCO0FBQ0FNLEVBQUFBLE1BQU0sQ0FBQ0gsTUFBUCxHQUFnQixFQUFoQjs7QUFFQSxPQUFLLE1BQU1JLEtBQVgsSUFBb0JGLEdBQXBCLEVB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RHpTLElBQUFBLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZK0ksY0FBWixFQUE0QnJKLE9BQTVCLENBQW9DTyxHQUFHLElBQUk7QUFDekMsWUFBTXdTLFNBQVMsR0FBRzFKLGNBQWMsQ0FBQzlJLEdBQUQsQ0FBaEMsQ0FEeUMsQ0FFekM7O0FBQ0EsVUFDRXdTLFNBQVMsSUFDVCxPQUFPQSxTQUFQLEtBQXFCLFFBRHJCLElBRUFBLFNBQVMsQ0FBQ3hQLElBRlYsSUFHQSxDQUFDLEtBQUQsRUFBUSxXQUFSLEVBQXFCLFFBQXJCLEVBQStCLFdBQS9CLEVBQTRDNUIsT0FBNUMsQ0FBb0RvUixTQUFTLENBQUN4UCxJQUE5RCxJQUFzRSxDQUFDLENBSnpFLEVBS0U7QUFDQTtBQUNBO0FBQ0EsYUFBSzhPLHNCQUFMLENBQTRCUyxRQUE1QixFQUFzQ3ZTLEdBQXRDLEVBQTJDdEIsTUFBM0M7QUFDRDtBQUNGLEtBYkQ7QUFjQSxXQUFPeUcsT0FBTyxDQUFDRyxPQUFSLENBQWdCaU4sUUFBaEIsQ0FBUDtBQUNEOztBQTc2Q3NCOztBQW03Q3pCRSxNQUFNLENBQUNDLE9BQVAsR0FBaUJ6TyxrQkFBakIsQyxDQUNBOztBQUNBd08sTUFBTSxDQUFDQyxPQUFQLENBQWVDLGNBQWYsR0FBZ0MxVCxhQUFoQztBQUNBd1QsTUFBTSxDQUFDQyxPQUFQLENBQWVwUyxtQkFBZixHQUFxQ0EsbUJBQXJDIiwic291cmNlc0NvbnRlbnQiOlsi77u/Ly8gQGZsb3dcbi8vIEEgZGF0YWJhc2UgYWRhcHRlciB0aGF0IHdvcmtzIHdpdGggZGF0YSBleHBvcnRlZCBmcm9tIHRoZSBob3N0ZWRcbi8vIFBhcnNlIGRhdGFiYXNlLlxuXG4vLyBAZmxvdy1kaXNhYmxlLW5leHRcbmltcG9ydCB7IFBhcnNlIH0gZnJvbSAncGFyc2Uvbm9kZSc7XG4vLyBAZmxvdy1kaXNhYmxlLW5leHRcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG4vLyBAZmxvdy1kaXNhYmxlLW5leHRcbmltcG9ydCBpbnRlcnNlY3QgZnJvbSAnaW50ZXJzZWN0Jztcbi8vIEBmbG93LWRpc2FibGUtbmV4dFxuaW1wb3J0IGRlZXBjb3B5IGZyb20gJ2RlZXBjb3B5JztcbmltcG9ydCBsb2dnZXIgZnJvbSAnLi4vbG9nZ2VyJztcbmltcG9ydCBVdGlscyBmcm9tICcuLi9VdGlscyc7XG5pbXBvcnQgKiBhcyBTY2hlbWFDb250cm9sbGVyIGZyb20gJy4vU2NoZW1hQ29udHJvbGxlcic7XG5pbXBvcnQgeyBTdG9yYWdlQWRhcHRlciB9IGZyb20gJy4uL0FkYXB0ZXJzL1N0b3JhZ2UvU3RvcmFnZUFkYXB0ZXInO1xuaW1wb3J0IE1vbmdvU3RvcmFnZUFkYXB0ZXIgZnJvbSAnLi4vQWRhcHRlcnMvU3RvcmFnZS9Nb25nby9Nb25nb1N0b3JhZ2VBZGFwdGVyJztcbmltcG9ydCBQb3N0Z3Jlc1N0b3JhZ2VBZGFwdGVyIGZyb20gJy4uL0FkYXB0ZXJzL1N0b3JhZ2UvUG9zdGdyZXMvUG9zdGdyZXNTdG9yYWdlQWRhcHRlcic7XG5pbXBvcnQgU2NoZW1hQ2FjaGUgZnJvbSAnLi4vQWRhcHRlcnMvQ2FjaGUvU2NoZW1hQ2FjaGUnO1xuaW1wb3J0IHR5cGUgeyBMb2FkU2NoZW1hT3B0aW9ucyB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHR5cGUgeyBQYXJzZVNlcnZlck9wdGlvbnMgfSBmcm9tICcuLi9PcHRpb25zJztcbmltcG9ydCB0eXBlIHsgUXVlcnlPcHRpb25zLCBGdWxsUXVlcnlPcHRpb25zIH0gZnJvbSAnLi4vQWRhcHRlcnMvU3RvcmFnZS9TdG9yYWdlQWRhcHRlcic7XG5cbmZ1bmN0aW9uIGFkZFdyaXRlQUNMKHF1ZXJ5LCBhY2wpIHtcbiAgY29uc3QgbmV3UXVlcnkgPSBfLmNsb25lRGVlcChxdWVyeSk7XG4gIC8vQ2FuJ3QgYmUgYW55IGV4aXN0aW5nICdfd3Blcm0nIHF1ZXJ5LCB3ZSBkb24ndCBhbGxvdyBjbGllbnQgcXVlcmllcyBvbiB0aGF0LCBubyBuZWVkIHRvICRhbmRcbiAgbmV3UXVlcnkuX3dwZXJtID0geyAkaW46IFtudWxsLCAuLi5hY2xdIH07XG4gIHJldHVybiBuZXdRdWVyeTtcbn1cblxuZnVuY3Rpb24gYWRkUmVhZEFDTChxdWVyeSwgYWNsKSB7XG4gIGNvbnN0IG5ld1F1ZXJ5ID0gXy5jbG9uZURlZXAocXVlcnkpO1xuICAvL0Nhbid0IGJlIGFueSBleGlzdGluZyAnX3JwZXJtJyBxdWVyeSwgd2UgZG9uJ3QgYWxsb3cgY2xpZW50IHF1ZXJpZXMgb24gdGhhdCwgbm8gbmVlZCB0byAkYW5kXG4gIG5ld1F1ZXJ5Ll9ycGVybSA9IHsgJGluOiBbbnVsbCwgJyonLCAuLi5hY2xdIH07XG4gIHJldHVybiBuZXdRdWVyeTtcbn1cblxuLy8gVHJhbnNmb3JtcyBhIFJFU1QgQVBJIGZvcm1hdHRlZCBBQ0wgb2JqZWN0IHRvIG91ciB0d28tZmllbGQgbW9uZ28gZm9ybWF0LlxuY29uc3QgdHJhbnNmb3JtT2JqZWN0QUNMID0gKHsgQUNMLCAuLi5yZXN1bHQgfSkgPT4ge1xuICBpZiAoIUFDTCkge1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICByZXN1bHQuX3dwZXJtID0gW107XG4gIHJlc3VsdC5fcnBlcm0gPSBbXTtcblxuICBmb3IgKGNvbnN0IGVudHJ5IGluIEFDTCkge1xuICAgIGlmIChBQ0xbZW50cnldLnJlYWQpIHtcbiAgICAgIHJlc3VsdC5fcnBlcm0ucHVzaChlbnRyeSk7XG4gICAgfVxuICAgIGlmIChBQ0xbZW50cnldLndyaXRlKSB7XG4gICAgICByZXN1bHQuX3dwZXJtLnB1c2goZW50cnkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuY29uc3Qgc3BlY2lhbFF1ZXJ5S2V5cyA9IFsnJGFuZCcsICckb3InLCAnJG5vcicsICdfcnBlcm0nLCAnX3dwZXJtJ107XG5jb25zdCBzcGVjaWFsTWFzdGVyUXVlcnlLZXlzID0gW1xuICAuLi5zcGVjaWFsUXVlcnlLZXlzLFxuICAnX2VtYWlsX3ZlcmlmeV90b2tlbicsXG4gICdfcGVyaXNoYWJsZV90b2tlbicsXG4gICdfdG9tYnN0b25lJyxcbiAgJ19lbWFpbF92ZXJpZnlfdG9rZW5fZXhwaXJlc19hdCcsXG4gICdfZmFpbGVkX2xvZ2luX2NvdW50JyxcbiAgJ19hY2NvdW50X2xvY2tvdXRfZXhwaXJlc19hdCcsXG4gICdfcGFzc3dvcmRfY2hhbmdlZF9hdCcsXG4gICdfcGFzc3dvcmRfaGlzdG9yeScsXG5dO1xuXG5jb25zdCB2YWxpZGF0ZVF1ZXJ5ID0gKHF1ZXJ5OiBhbnksIGlzTWFzdGVyOiBib29sZWFuLCB1cGRhdGU6IGJvb2xlYW4pOiB2b2lkID0+IHtcbiAgaWYgKHF1ZXJ5LkFDTCkge1xuICAgIHRocm93IG5ldyBQYXJzZS5FcnJvcihQYXJzZS5FcnJvci5JTlZBTElEX1FVRVJZLCAnQ2Fubm90IHF1ZXJ5IG9uIEFDTC4nKTtcbiAgfVxuXG4gIGlmIChxdWVyeS4kb3IpIHtcbiAgICBpZiAocXVlcnkuJG9yIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIHF1ZXJ5LiRvci5mb3JFYWNoKHZhbHVlID0+IHZhbGlkYXRlUXVlcnkodmFsdWUsIGlzTWFzdGVyLCB1cGRhdGUpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFBhcnNlLkVycm9yKFBhcnNlLkVycm9yLklOVkFMSURfUVVFUlksICdCYWQgJG9yIGZvcm1hdCAtIHVzZSBhbiBhcnJheSB2YWx1ZS4nKTtcbiAgICB9XG4gIH1cblxuICBpZiAocXVlcnkuJGFuZCkge1xuICAgIGlmIChxdWVyeS4kYW5kIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIHF1ZXJ5LiRhbmQuZm9yRWFjaCh2YWx1ZSA9PiB2YWxpZGF0ZVF1ZXJ5KHZhbHVlLCBpc01hc3RlciwgdXBkYXRlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBQYXJzZS5FcnJvcihQYXJzZS5FcnJvci5JTlZBTElEX1FVRVJZLCAnQmFkICRhbmQgZm9ybWF0IC0gdXNlIGFuIGFycmF5IHZhbHVlLicpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChxdWVyeS4kbm9yKSB7XG4gICAgaWYgKHF1ZXJ5LiRub3IgaW5zdGFuY2VvZiBBcnJheSAmJiBxdWVyeS4kbm9yLmxlbmd0aCA+IDApIHtcbiAgICAgIHF1ZXJ5LiRub3IuZm9yRWFjaCh2YWx1ZSA9PiB2YWxpZGF0ZVF1ZXJ5KHZhbHVlLCBpc01hc3RlciwgdXBkYXRlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBQYXJzZS5FcnJvcihcbiAgICAgICAgUGFyc2UuRXJyb3IuSU5WQUxJRF9RVUVSWSxcbiAgICAgICAgJ0JhZCAkbm9yIGZvcm1hdCAtIHVzZSBhbiBhcnJheSBvZiBhdCBsZWFzdCAxIHZhbHVlLidcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgT2JqZWN0LmtleXMocXVlcnkpLmZvckVhY2goa2V5ID0+IHtcbiAgICBpZiAocXVlcnkgJiYgcXVlcnlba2V5XSAmJiBxdWVyeVtrZXldLiRyZWdleCkge1xuICAgICAgaWYgKHR5cGVvZiBxdWVyeVtrZXldLiRvcHRpb25zID09PSAnc3RyaW5nJykge1xuICAgICAgICBpZiAoIXF1ZXJ5W2tleV0uJG9wdGlvbnMubWF0Y2goL15baW14c10rJC8pKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFBhcnNlLkVycm9yKFxuICAgICAgICAgICAgUGFyc2UuRXJyb3IuSU5WQUxJRF9RVUVSWSxcbiAgICAgICAgICAgIGBCYWQgJG9wdGlvbnMgdmFsdWUgZm9yIHF1ZXJ5OiAke3F1ZXJ5W2tleV0uJG9wdGlvbnN9YFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKFxuICAgICAgIWtleS5tYXRjaCgvXlthLXpBLVpdW2EtekEtWjAtOV9cXC5dKiQvKSAmJlxuICAgICAgKCghc3BlY2lhbFF1ZXJ5S2V5cy5pbmNsdWRlcyhrZXkpICYmICFpc01hc3RlciAmJiAhdXBkYXRlKSB8fFxuICAgICAgICAodXBkYXRlICYmIGlzTWFzdGVyICYmICFzcGVjaWFsTWFzdGVyUXVlcnlLZXlzLmluY2x1ZGVzKGtleSkpKVxuICAgICkge1xuICAgICAgdGhyb3cgbmV3IFBhcnNlLkVycm9yKFBhcnNlLkVycm9yLklOVkFMSURfS0VZX05BTUUsIGBJbnZhbGlkIGtleSBuYW1lOiAke2tleX1gKTtcbiAgICB9XG4gIH0pO1xufTtcblxuLy8gRmlsdGVycyBvdXQgYW55IGRhdGEgdGhhdCBzaG91bGRuJ3QgYmUgb24gdGhpcyBSRVNULWZvcm1hdHRlZCBvYmplY3QuXG5jb25zdCBmaWx0ZXJTZW5zaXRpdmVEYXRhID0gKFxuICBpc01hc3RlcjogYm9vbGVhbixcbiAgYWNsR3JvdXA6IGFueVtdLFxuICBhdXRoOiBhbnksXG4gIG9wZXJhdGlvbjogYW55LFxuICBzY2hlbWE6IFNjaGVtYUNvbnRyb2xsZXIuU2NoZW1hQ29udHJvbGxlciB8IGFueSxcbiAgY2xhc3NOYW1lOiBzdHJpbmcsXG4gIHByb3RlY3RlZEZpZWxkczogbnVsbCB8IEFycmF5PGFueT4sXG4gIG9iamVjdDogYW55XG4pID0+IHtcbiAgbGV0IHVzZXJJZCA9IG51bGw7XG4gIGlmIChhdXRoICYmIGF1dGgudXNlcikgdXNlcklkID0gYXV0aC51c2VyLmlkO1xuXG4gIC8vIHJlcGxhY2UgcHJvdGVjdGVkRmllbGRzIHdoZW4gdXNpbmcgcG9pbnRlci1wZXJtaXNzaW9uc1xuICBjb25zdCBwZXJtcyA9XG4gICAgc2NoZW1hICYmIHNjaGVtYS5nZXRDbGFzc0xldmVsUGVybWlzc2lvbnMgPyBzY2hlbWEuZ2V0Q2xhc3NMZXZlbFBlcm1pc3Npb25zKGNsYXNzTmFtZSkgOiB7fTtcbiAgaWYgKHBlcm1zKSB7XG4gICAgY29uc3QgaXNSZWFkT3BlcmF0aW9uID0gWydnZXQnLCAnZmluZCddLmluZGV4T2Yob3BlcmF0aW9uKSA+IC0xO1xuXG4gICAgaWYgKGlzUmVhZE9wZXJhdGlvbiAmJiBwZXJtcy5wcm90ZWN0ZWRGaWVsZHMpIHtcbiAgICAgIC8vIGV4dHJhY3QgcHJvdGVjdGVkRmllbGRzIGFkZGVkIHdpdGggdGhlIHBvaW50ZXItcGVybWlzc2lvbiBwcmVmaXhcbiAgICAgIGNvbnN0IHByb3RlY3RlZEZpZWxkc1BvaW50ZXJQZXJtID0gT2JqZWN0LmtleXMocGVybXMucHJvdGVjdGVkRmllbGRzKVxuICAgICAgICAuZmlsdGVyKGtleSA9PiBrZXkuc3RhcnRzV2l0aCgndXNlckZpZWxkOicpKVxuICAgICAgICAubWFwKGtleSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHsga2V5OiBrZXkuc3Vic3RyaW5nKDEwKSwgdmFsdWU6IHBlcm1zLnByb3RlY3RlZEZpZWxkc1trZXldIH07XG4gICAgICAgIH0pO1xuXG4gICAgICBjb25zdCBuZXdQcm90ZWN0ZWRGaWVsZHM6IEFycmF5PHN0cmluZz5bXSA9IFtdO1xuICAgICAgbGV0IG92ZXJyaWRlUHJvdGVjdGVkRmllbGRzID0gZmFsc2U7XG5cbiAgICAgIC8vIGNoZWNrIGlmIHRoZSBvYmplY3QgZ3JhbnRzIHRoZSBjdXJyZW50IHVzZXIgYWNjZXNzIGJhc2VkIG9uIHRoZSBleHRyYWN0ZWQgZmllbGRzXG4gICAgICBwcm90ZWN0ZWRGaWVsZHNQb2ludGVyUGVybS5mb3JFYWNoKHBvaW50ZXJQZXJtID0+IHtcbiAgICAgICAgbGV0IHBvaW50ZXJQZXJtSW5jbHVkZXNVc2VyID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IHJlYWRVc2VyRmllbGRWYWx1ZSA9IG9iamVjdFtwb2ludGVyUGVybS5rZXldO1xuICAgICAgICBpZiAocmVhZFVzZXJGaWVsZFZhbHVlKSB7XG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocmVhZFVzZXJGaWVsZFZhbHVlKSkge1xuICAgICAgICAgICAgcG9pbnRlclBlcm1JbmNsdWRlc1VzZXIgPSByZWFkVXNlckZpZWxkVmFsdWUuc29tZShcbiAgICAgICAgICAgICAgdXNlciA9PiB1c2VyLm9iamVjdElkICYmIHVzZXIub2JqZWN0SWQgPT09IHVzZXJJZFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcG9pbnRlclBlcm1JbmNsdWRlc1VzZXIgPVxuICAgICAgICAgICAgICByZWFkVXNlckZpZWxkVmFsdWUub2JqZWN0SWQgJiYgcmVhZFVzZXJGaWVsZFZhbHVlLm9iamVjdElkID09PSB1c2VySWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBvaW50ZXJQZXJtSW5jbHVkZXNVc2VyKSB7XG4gICAgICAgICAgb3ZlcnJpZGVQcm90ZWN0ZWRGaWVsZHMgPSB0cnVlO1xuICAgICAgICAgIG5ld1Byb3RlY3RlZEZpZWxkcy5wdXNoKHBvaW50ZXJQZXJtLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vIGlmIGF0IGxlYXN0IG9uZSBwb2ludGVyLXBlcm1pc3Npb24gYWZmZWN0ZWQgdGhlIGN1cnJlbnQgdXNlclxuICAgICAgLy8gaW50ZXJzZWN0IHZzIHByb3RlY3RlZEZpZWxkcyBmcm9tIHByZXZpb3VzIHN0YWdlIChAc2VlIGFkZFByb3RlY3RlZEZpZWxkcylcbiAgICAgIC8vIFNldHMgdGhlb3J5IChpbnRlcnNlY3Rpb25zKTogQSB4IChCIHggQykgPT0gKEEgeCBCKSB4IENcbiAgICAgIGlmIChvdmVycmlkZVByb3RlY3RlZEZpZWxkcyAmJiBwcm90ZWN0ZWRGaWVsZHMpIHtcbiAgICAgICAgbmV3UHJvdGVjdGVkRmllbGRzLnB1c2gocHJvdGVjdGVkRmllbGRzKTtcbiAgICAgIH1cbiAgICAgIC8vIGludGVyc2VjdCBhbGwgc2V0cyBvZiBwcm90ZWN0ZWRGaWVsZHNcbiAgICAgIG5ld1Byb3RlY3RlZEZpZWxkcy5mb3JFYWNoKGZpZWxkcyA9PiB7XG4gICAgICAgIGlmIChmaWVsZHMpIHtcbiAgICAgICAgICAvLyBpZiB0aGVyZSdyZSBubyBwcm90Y3RlZEZpZWxkcyBieSBvdGhlciBjcml0ZXJpYSAoIGlkIC8gcm9sZSAvIGF1dGgpXG4gICAgICAgICAgLy8gdGhlbiB3ZSBtdXN0IGludGVyc2VjdCBlYWNoIHNldCAocGVyIHVzZXJGaWVsZClcbiAgICAgICAgICBpZiAoIXByb3RlY3RlZEZpZWxkcykge1xuICAgICAgICAgICAgcHJvdGVjdGVkRmllbGRzID0gZmllbGRzO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcm90ZWN0ZWRGaWVsZHMgPSBwcm90ZWN0ZWRGaWVsZHMuZmlsdGVyKHYgPT4gZmllbGRzLmluY2x1ZGVzKHYpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGlzVXNlckNsYXNzID0gY2xhc3NOYW1lID09PSAnX1VzZXInO1xuXG4gIC8qIHNwZWNpYWwgdHJlYXQgZm9yIHRoZSB1c2VyIGNsYXNzOiBkb24ndCBmaWx0ZXIgcHJvdGVjdGVkRmllbGRzIGlmIGN1cnJlbnRseSBsb2dnZWRpbiB1c2VyIGlzXG4gIHRoZSByZXRyaWV2ZWQgdXNlciAqL1xuICBpZiAoIShpc1VzZXJDbGFzcyAmJiB1c2VySWQgJiYgb2JqZWN0Lm9iamVjdElkID09PSB1c2VySWQpKSB7XG4gICAgcHJvdGVjdGVkRmllbGRzICYmIHByb3RlY3RlZEZpZWxkcy5mb3JFYWNoKGsgPT4gZGVsZXRlIG9iamVjdFtrXSk7XG5cbiAgICAvLyBmaWVsZHMgbm90IHJlcXVlc3RlZCBieSBjbGllbnQgKGV4Y2x1ZGVkKSxcbiAgICAvL2J1dCB3ZXJlIG5lZWRlZCB0byBhcHBseSBwcm90ZWN0dGVkRmllbGRzXG4gICAgcGVybXMucHJvdGVjdGVkRmllbGRzICYmXG4gICAgICBwZXJtcy5wcm90ZWN0ZWRGaWVsZHMudGVtcG9yYXJ5S2V5cyAmJlxuICAgICAgcGVybXMucHJvdGVjdGVkRmllbGRzLnRlbXBvcmFyeUtleXMuZm9yRWFjaChrID0+IGRlbGV0ZSBvYmplY3Rba10pO1xuICB9XG5cbiAgaWYgKGlzVXNlckNsYXNzKSB7XG4gICAgb2JqZWN0LnBhc3N3b3JkID0gb2JqZWN0Ll9oYXNoZWRfcGFzc3dvcmQ7XG4gICAgZGVsZXRlIG9iamVjdC5faGFzaGVkX3Bhc3N3b3JkO1xuICAgIGRlbGV0ZSBvYmplY3Quc2Vzc2lvblRva2VuO1xuICB9XG5cbiAgaWYgKGlzTWFzdGVyKSB7XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfVxuICBmb3IgKGNvbnN0IGtleSBpbiBvYmplY3QpIHtcbiAgICBpZiAoa2V5LmNoYXJBdCgwKSA9PT0gJ18nKSB7XG4gICAgICBkZWxldGUgb2JqZWN0W2tleV07XG4gICAgfVxuICB9XG5cbiAgaWYgKCFpc1VzZXJDbGFzcykge1xuICAgIHJldHVybiBvYmplY3Q7XG4gIH1cblxuICBpZiAoYWNsR3JvdXAuaW5kZXhPZihvYmplY3Qub2JqZWN0SWQpID4gLTEpIHtcbiAgICByZXR1cm4gb2JqZWN0O1xuICB9XG4gIGRlbGV0ZSBvYmplY3QuYXV0aERhdGE7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuXG4vLyBSdW5zIGFuIHVwZGF0ZSBvbiB0aGUgZGF0YWJhc2UuXG4vLyBSZXR1cm5zIGEgcHJvbWlzZSBmb3IgYW4gb2JqZWN0IHdpdGggdGhlIG5ldyB2YWx1ZXMgZm9yIGZpZWxkXG4vLyBtb2RpZmljYXRpb25zIHRoYXQgZG9uJ3Qga25vdyB0aGVpciByZXN1bHRzIGFoZWFkIG9mIHRpbWUsIGxpa2Vcbi8vICdpbmNyZW1lbnQnLlxuLy8gT3B0aW9uczpcbi8vICAgYWNsOiAgYSBsaXN0IG9mIHN0cmluZ3MuIElmIHRoZSBvYmplY3QgdG8gYmUgdXBkYXRlZCBoYXMgYW4gQUNMLFxuLy8gICAgICAgICBvbmUgb2YgdGhlIHByb3ZpZGVkIHN0cmluZ3MgbXVzdCBwcm92aWRlIHRoZSBjYWxsZXIgd2l0aFxuLy8gICAgICAgICB3cml0ZSBwZXJtaXNzaW9ucy5cbmNvbnN0IHNwZWNpYWxLZXlzRm9yVXBkYXRlID0gW1xuICAnX2hhc2hlZF9wYXNzd29yZCcsXG4gICdfcGVyaXNoYWJsZV90b2tlbicsXG4gICdfZW1haWxfdmVyaWZ5X3Rva2VuJyxcbiAgJ19lbWFpbF92ZXJpZnlfdG9rZW5fZXhwaXJlc19hdCcsXG4gICdfYWNjb3VudF9sb2Nrb3V0X2V4cGlyZXNfYXQnLFxuICAnX2ZhaWxlZF9sb2dpbl9jb3VudCcsXG4gICdfcGVyaXNoYWJsZV90b2tlbl9leHBpcmVzX2F0JyxcbiAgJ19wYXNzd29yZF9jaGFuZ2VkX2F0JyxcbiAgJ19wYXNzd29yZF9oaXN0b3J5Jyxcbl07XG5cbmNvbnN0IGlzU3BlY2lhbFVwZGF0ZUtleSA9IGtleSA9PiB7XG4gIHJldHVybiBzcGVjaWFsS2V5c0ZvclVwZGF0ZS5pbmRleE9mKGtleSkgPj0gMDtcbn07XG5cbmZ1bmN0aW9uIGpvaW5UYWJsZU5hbWUoY2xhc3NOYW1lLCBrZXkpIHtcbiAgcmV0dXJuIGBfSm9pbjoke2tleX06JHtjbGFzc05hbWV9YDtcbn1cblxuY29uc3QgZmxhdHRlblVwZGF0ZU9wZXJhdG9yc0ZvckNyZWF0ZSA9IG9iamVjdCA9PiB7XG4gIGZvciAoY29uc3Qga2V5IGluIG9iamVjdCkge1xuICAgIGlmIChvYmplY3Rba2V5XSAmJiBvYmplY3Rba2V5XS5fX29wKSB7XG4gICAgICBzd2l0Y2ggKG9iamVjdFtrZXldLl9fb3ApIHtcbiAgICAgICAgY2FzZSAnSW5jcmVtZW50JzpcbiAgICAgICAgICBpZiAodHlwZW9mIG9iamVjdFtrZXldLmFtb3VudCAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBQYXJzZS5FcnJvcihQYXJzZS5FcnJvci5JTlZBTElEX0pTT04sICdvYmplY3RzIHRvIGFkZCBtdXN0IGJlIGFuIGFycmF5Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIG9iamVjdFtrZXldID0gb2JqZWN0W2tleV0uYW1vdW50O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdBZGQnOlxuICAgICAgICAgIGlmICghKG9iamVjdFtrZXldLm9iamVjdHMgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBQYXJzZS5FcnJvcihQYXJzZS5FcnJvci5JTlZBTElEX0pTT04sICdvYmplY3RzIHRvIGFkZCBtdXN0IGJlIGFuIGFycmF5Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIG9iamVjdFtrZXldID0gb2JqZWN0W2tleV0ub2JqZWN0cztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnQWRkVW5pcXVlJzpcbiAgICAgICAgICBpZiAoIShvYmplY3Rba2V5XS5vYmplY3RzIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUGFyc2UuRXJyb3IoUGFyc2UuRXJyb3IuSU5WQUxJRF9KU09OLCAnb2JqZWN0cyB0byBhZGQgbXVzdCBiZSBhbiBhcnJheScpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBvYmplY3Rba2V5XSA9IG9iamVjdFtrZXldLm9iamVjdHM7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ1JlbW92ZSc6XG4gICAgICAgICAgaWYgKCEob2JqZWN0W2tleV0ub2JqZWN0cyBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFBhcnNlLkVycm9yKFBhcnNlLkVycm9yLklOVkFMSURfSlNPTiwgJ29iamVjdHMgdG8gYWRkIG11c3QgYmUgYW4gYXJyYXknKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgb2JqZWN0W2tleV0gPSBbXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRGVsZXRlJzpcbiAgICAgICAgICBkZWxldGUgb2JqZWN0W2tleV07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbmV3IFBhcnNlLkVycm9yKFxuICAgICAgICAgICAgUGFyc2UuRXJyb3IuQ09NTUFORF9VTkFWQUlMQUJMRSxcbiAgICAgICAgICAgIGBUaGUgJHtvYmplY3Rba2V5XS5fX29wfSBvcGVyYXRvciBpcyBub3Qgc3VwcG9ydGVkIHlldC5gXG4gICAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IHRyYW5zZm9ybUF1dGhEYXRhID0gKGNsYXNzTmFtZSwgb2JqZWN0LCBzY2hlbWEpID0+IHtcbiAgaWYgKG9iamVjdC5hdXRoRGF0YSAmJiBjbGFzc05hbWUgPT09ICdfVXNlcicpIHtcbiAgICBPYmplY3Qua2V5cyhvYmplY3QuYXV0aERhdGEpLmZvckVhY2gocHJvdmlkZXIgPT4ge1xuICAgICAgY29uc3QgcHJvdmlkZXJEYXRhID0gb2JqZWN0LmF1dGhEYXRhW3Byb3ZpZGVyXTtcbiAgICAgIGNvbnN0IGZpZWxkTmFtZSA9IGBfYXV0aF9kYXRhXyR7cHJvdmlkZXJ9YDtcbiAgICAgIGlmIChwcm92aWRlckRhdGEgPT0gbnVsbCkge1xuICAgICAgICBvYmplY3RbZmllbGROYW1lXSA9IHtcbiAgICAgICAgICBfX29wOiAnRGVsZXRlJyxcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9iamVjdFtmaWVsZE5hbWVdID0gcHJvdmlkZXJEYXRhO1xuICAgICAgICBzY2hlbWEuZmllbGRzW2ZpZWxkTmFtZV0gPSB7IHR5cGU6ICdPYmplY3QnIH07XG4gICAgICB9XG4gICAgfSk7XG4gICAgZGVsZXRlIG9iamVjdC5hdXRoRGF0YTtcbiAgfVxufTtcbi8vIFRyYW5zZm9ybXMgYSBEYXRhYmFzZSBmb3JtYXQgQUNMIHRvIGEgUkVTVCBBUEkgZm9ybWF0IEFDTFxuY29uc3QgdW50cmFuc2Zvcm1PYmplY3RBQ0wgPSAoeyBfcnBlcm0sIF93cGVybSwgLi4ub3V0cHV0IH0pID0+IHtcbiAgaWYgKF9ycGVybSB8fCBfd3Blcm0pIHtcbiAgICBvdXRwdXQuQUNMID0ge307XG5cbiAgICAoX3JwZXJtIHx8IFtdKS5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgIGlmICghb3V0cHV0LkFDTFtlbnRyeV0pIHtcbiAgICAgICAgb3V0cHV0LkFDTFtlbnRyeV0gPSB7IHJlYWQ6IHRydWUgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG91dHB1dC5BQ0xbZW50cnldWydyZWFkJ10gPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgKF93cGVybSB8fCBbXSkuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICBpZiAoIW91dHB1dC5BQ0xbZW50cnldKSB7XG4gICAgICAgIG91dHB1dC5BQ0xbZW50cnldID0geyB3cml0ZTogdHJ1ZSB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3V0cHV0LkFDTFtlbnRyeV1bJ3dyaXRlJ10gPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIHJldHVybiBvdXRwdXQ7XG59O1xuXG4vKipcbiAqIFdoZW4gcXVlcnlpbmcsIHRoZSBmaWVsZE5hbWUgbWF5IGJlIGNvbXBvdW5kLCBleHRyYWN0IHRoZSByb290IGZpZWxkTmFtZVxuICogICAgIGB0ZW1wZXJhdHVyZS5jZWxzaXVzYCBiZWNvbWVzIGB0ZW1wZXJhdHVyZWBcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWUgdGhhdCBtYXkgYmUgYSBjb21wb3VuZCBmaWVsZCBuYW1lXG4gKiBAcmV0dXJucyB7c3RyaW5nfSB0aGUgcm9vdCBuYW1lIG9mIHRoZSBmaWVsZFxuICovXG5jb25zdCBnZXRSb290RmllbGROYW1lID0gKGZpZWxkTmFtZTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIGZpZWxkTmFtZS5zcGxpdCgnLicpWzBdO1xufTtcblxuY29uc3QgcmVsYXRpb25TY2hlbWEgPSB7XG4gIGZpZWxkczogeyByZWxhdGVkSWQ6IHsgdHlwZTogJ1N0cmluZycgfSwgb3duaW5nSWQ6IHsgdHlwZTogJ1N0cmluZycgfSB9LFxufTtcblxuY2xhc3MgRGF0YWJhc2VDb250cm9sbGVyIHtcbiAgYWRhcHRlcjogU3RvcmFnZUFkYXB0ZXI7XG4gIHNjaGVtYUNhY2hlOiBhbnk7XG4gIHNjaGVtYVByb21pc2U6ID9Qcm9taXNlPFNjaGVtYUNvbnRyb2xsZXIuU2NoZW1hQ29udHJvbGxlcj47XG4gIF90cmFuc2FjdGlvbmFsU2Vzc2lvbjogP2FueTtcbiAgb3B0aW9uczogUGFyc2VTZXJ2ZXJPcHRpb25zO1xuICBpZGVtcG90ZW5jeU9wdGlvbnM6IGFueTtcblxuICBjb25zdHJ1Y3RvcihhZGFwdGVyOiBTdG9yYWdlQWRhcHRlciwgb3B0aW9uczogUGFyc2VTZXJ2ZXJPcHRpb25zKSB7XG4gICAgdGhpcy5hZGFwdGVyID0gYWRhcHRlcjtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIHRoaXMuaWRlbXBvdGVuY3lPcHRpb25zID0gdGhpcy5vcHRpb25zLmlkZW1wb3RlbmN5T3B0aW9ucyB8fCB7fTtcbiAgICAvLyBQcmV2ZW50IG11dGFibGUgdGhpcy5zY2hlbWEsIG90aGVyd2lzZSBvbmUgcmVxdWVzdCBjb3VsZCB1c2VcbiAgICAvLyBtdWx0aXBsZSBzY2hlbWFzLCBzbyBpbnN0ZWFkIHVzZSBsb2FkU2NoZW1hIHRvIGdldCBhIHNjaGVtYS5cbiAgICB0aGlzLnNjaGVtYVByb21pc2UgPSBudWxsO1xuICAgIHRoaXMuX3RyYW5zYWN0aW9uYWxTZXNzaW9uID0gbnVsbDtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICB9XG5cbiAgY29sbGVjdGlvbkV4aXN0cyhjbGFzc05hbWU6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXIuY2xhc3NFeGlzdHMoY2xhc3NOYW1lKTtcbiAgfVxuXG4gIHB1cmdlQ29sbGVjdGlvbihjbGFzc05hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLmxvYWRTY2hlbWEoKVxuICAgICAgLnRoZW4oc2NoZW1hQ29udHJvbGxlciA9PiBzY2hlbWFDb250cm9sbGVyLmdldE9uZVNjaGVtYShjbGFzc05hbWUpKVxuICAgICAgLnRoZW4oc2NoZW1hID0+IHRoaXMuYWRhcHRlci5kZWxldGVPYmplY3RzQnlRdWVyeShjbGFzc05hbWUsIHNjaGVtYSwge30pKTtcbiAgfVxuXG4gIHZhbGlkYXRlQ2xhc3NOYW1lKGNsYXNzTmFtZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCFTY2hlbWFDb250cm9sbGVyLmNsYXNzTmFtZUlzVmFsaWQoY2xhc3NOYW1lKSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFxuICAgICAgICBuZXcgUGFyc2UuRXJyb3IoUGFyc2UuRXJyb3IuSU5WQUxJRF9DTEFTU19OQU1FLCAnaW52YWxpZCBjbGFzc05hbWU6ICcgKyBjbGFzc05hbWUpXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvLyBSZXR1cm5zIGEgcHJvbWlzZSBmb3IgYSBzY2hlbWFDb250cm9sbGVyLlxuICBsb2FkU2NoZW1hKFxuICAgIG9wdGlvbnM6IExvYWRTY2hlbWFPcHRpb25zID0geyBjbGVhckNhY2hlOiBmYWxzZSB9XG4gICk6IFByb21pc2U8U2NoZW1hQ29udHJvbGxlci5TY2hlbWFDb250cm9sbGVyPiB7XG4gICAgaWYgKHRoaXMuc2NoZW1hUHJvbWlzZSAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy5zY2hlbWFQcm9taXNlO1xuICAgIH1cbiAgICB0aGlzLnNjaGVtYVByb21pc2UgPSBTY2hlbWFDb250cm9sbGVyLmxvYWQodGhpcy5hZGFwdGVyLCBvcHRpb25zKTtcbiAgICB0aGlzLnNjaGVtYVByb21pc2UudGhlbihcbiAgICAgICgpID0+IGRlbGV0ZSB0aGlzLnNjaGVtYVByb21pc2UsXG4gICAgICAoKSA9PiBkZWxldGUgdGhpcy5zY2hlbWFQcm9taXNlXG4gICAgKTtcbiAgICByZXR1cm4gdGhpcy5sb2FkU2NoZW1hKG9wdGlvbnMpO1xuICB9XG5cbiAgbG9hZFNjaGVtYUlmTmVlZGVkKFxuICAgIHNjaGVtYUNvbnRyb2xsZXI6IFNjaGVtYUNvbnRyb2xsZXIuU2NoZW1hQ29udHJvbGxlcixcbiAgICBvcHRpb25zOiBMb2FkU2NoZW1hT3B0aW9ucyA9IHsgY2xlYXJDYWNoZTogZmFsc2UgfVxuICApOiBQcm9taXNlPFNjaGVtYUNvbnRyb2xsZXIuU2NoZW1hQ29udHJvbGxlcj4ge1xuICAgIHJldHVybiBzY2hlbWFDb250cm9sbGVyID8gUHJvbWlzZS5yZXNvbHZlKHNjaGVtYUNvbnRyb2xsZXIpIDogdGhpcy5sb2FkU2NoZW1hKG9wdGlvbnMpO1xuICB9XG5cbiAgLy8gUmV0dXJucyBhIHByb21pc2UgZm9yIHRoZSBjbGFzc25hbWUgdGhhdCBpcyByZWxhdGVkIHRvIHRoZSBnaXZlblxuICAvLyBjbGFzc25hbWUgdGhyb3VnaCB0aGUga2V5LlxuICAvLyBUT0RPOiBtYWtlIHRoaXMgbm90IGluIHRoZSBEYXRhYmFzZUNvbnRyb2xsZXIgaW50ZXJmYWNlXG4gIHJlZGlyZWN0Q2xhc3NOYW1lRm9yS2V5KGNsYXNzTmFtZTogc3RyaW5nLCBrZXk6IHN0cmluZyk6IFByb21pc2U8P3N0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLmxvYWRTY2hlbWEoKS50aGVuKHNjaGVtYSA9PiB7XG4gICAgICB2YXIgdCA9IHNjaGVtYS5nZXRFeHBlY3RlZFR5cGUoY2xhc3NOYW1lLCBrZXkpO1xuICAgICAgaWYgKHQgIT0gbnVsbCAmJiB0eXBlb2YgdCAhPT0gJ3N0cmluZycgJiYgdC50eXBlID09PSAnUmVsYXRpb24nKSB7XG4gICAgICAgIHJldHVybiB0LnRhcmdldENsYXNzO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNsYXNzTmFtZTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFVzZXMgdGhlIHNjaGVtYSB0byB2YWxpZGF0ZSB0aGUgb2JqZWN0IChSRVNUIEFQSSBmb3JtYXQpLlxuICAvLyBSZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSBuZXcgc2NoZW1hLlxuICAvLyBUaGlzIGRvZXMgbm90IHVwZGF0ZSB0aGlzLnNjaGVtYSwgYmVjYXVzZSBpbiBhIHNpdHVhdGlvbiBsaWtlIGFcbiAgLy8gYmF0Y2ggcmVxdWVzdCwgdGhhdCBjb3VsZCBjb25mdXNlIG90aGVyIHVzZXJzIG9mIHRoZSBzY2hlbWEuXG4gIHZhbGlkYXRlT2JqZWN0KFxuICAgIGNsYXNzTmFtZTogc3RyaW5nLFxuICAgIG9iamVjdDogYW55LFxuICAgIHF1ZXJ5OiBhbnksXG4gICAgcnVuT3B0aW9uczogUXVlcnlPcHRpb25zXG4gICk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGxldCBzY2hlbWE7XG4gICAgY29uc3QgYWNsID0gcnVuT3B0aW9ucy5hY2w7XG4gICAgY29uc3QgaXNNYXN0ZXIgPSBhY2wgPT09IHVuZGVmaW5lZDtcbiAgICB2YXIgYWNsR3JvdXA6IHN0cmluZ1tdID0gYWNsIHx8IFtdO1xuICAgIHJldHVybiB0aGlzLmxvYWRTY2hlbWEoKVxuICAgICAgLnRoZW4ocyA9PiB7XG4gICAgICAgIHNjaGVtYSA9IHM7XG4gICAgICAgIGlmIChpc01hc3Rlcikge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5jYW5BZGRGaWVsZChzY2hlbWEsIGNsYXNzTmFtZSwgb2JqZWN0LCBhY2xHcm91cCwgcnVuT3B0aW9ucyk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICByZXR1cm4gc2NoZW1hLnZhbGlkYXRlT2JqZWN0KGNsYXNzTmFtZSwgb2JqZWN0LCBxdWVyeSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZShcbiAgICBjbGFzc05hbWU6IHN0cmluZyxcbiAgICBxdWVyeTogYW55LFxuICAgIHVwZGF0ZTogYW55LFxuICAgIHsgYWNsLCBtYW55LCB1cHNlcnQsIGFkZHNGaWVsZCB9OiBGdWxsUXVlcnlPcHRpb25zID0ge30sXG4gICAgc2tpcFNhbml0aXphdGlvbjogYm9vbGVhbiA9IGZhbHNlLFxuICAgIHZhbGlkYXRlT25seTogYm9vbGVhbiA9IGZhbHNlLFxuICAgIHZhbGlkU2NoZW1hQ29udHJvbGxlcjogU2NoZW1hQ29udHJvbGxlci5TY2hlbWFDb250cm9sbGVyXG4gICk6IFByb21pc2U8YW55PiB7XG4gICAgY29uc3Qgb3JpZ2luYWxRdWVyeSA9IHF1ZXJ5O1xuICAgIGNvbnN0IG9yaWdpbmFsVXBkYXRlID0gdXBkYXRlO1xuICAgIC8vIE1ha2UgYSBjb3B5IG9mIHRoZSBvYmplY3QsIHNvIHdlIGRvbid0IG11dGF0ZSB0aGUgaW5jb21pbmcgZGF0YS5cbiAgICB1cGRhdGUgPSBkZWVwY29weSh1cGRhdGUpO1xuICAgIHZhciByZWxhdGlvblVwZGF0ZXMgPSBbXTtcbiAgICB2YXIgaXNNYXN0ZXIgPSBhY2wgPT09IHVuZGVmaW5lZDtcbiAgICB2YXIgYWNsR3JvdXAgPSBhY2wgfHwgW107XG5cbiAgICByZXR1cm4gdGhpcy5sb2FkU2NoZW1hSWZOZWVkZWQodmFsaWRTY2hlbWFDb250cm9sbGVyKS50aGVuKHNjaGVtYUNvbnRyb2xsZXIgPT4ge1xuICAgICAgcmV0dXJuIChpc01hc3RlclxuICAgICAgICA/IFByb21pc2UucmVzb2x2ZSgpXG4gICAgICAgIDogc2NoZW1hQ29udHJvbGxlci52YWxpZGF0ZVBlcm1pc3Npb24oY2xhc3NOYW1lLCBhY2xHcm91cCwgJ3VwZGF0ZScpXG4gICAgICApXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICByZWxhdGlvblVwZGF0ZXMgPSB0aGlzLmNvbGxlY3RSZWxhdGlvblVwZGF0ZXMoY2xhc3NOYW1lLCBvcmlnaW5hbFF1ZXJ5Lm9iamVjdElkLCB1cGRhdGUpO1xuICAgICAgICAgIGlmICghaXNNYXN0ZXIpIHtcbiAgICAgICAgICAgIHF1ZXJ5ID0gdGhpcy5hZGRQb2ludGVyUGVybWlzc2lvbnMoXG4gICAgICAgICAgICAgIHNjaGVtYUNvbnRyb2xsZXIsXG4gICAgICAgICAgICAgIGNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgJ3VwZGF0ZScsXG4gICAgICAgICAgICAgIHF1ZXJ5LFxuICAgICAgICAgICAgICBhY2xHcm91cFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYgKGFkZHNGaWVsZCkge1xuICAgICAgICAgICAgICBxdWVyeSA9IHtcbiAgICAgICAgICAgICAgICAkYW5kOiBbXG4gICAgICAgICAgICAgICAgICBxdWVyeSxcbiAgICAgICAgICAgICAgICAgIHRoaXMuYWRkUG9pbnRlclBlcm1pc3Npb25zKFxuICAgICAgICAgICAgICAgICAgICBzY2hlbWFDb250cm9sbGVyLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICdhZGRGaWVsZCcsXG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5LFxuICAgICAgICAgICAgICAgICAgICBhY2xHcm91cFxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIXF1ZXJ5KSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChhY2wpIHtcbiAgICAgICAgICAgIHF1ZXJ5ID0gYWRkV3JpdGVBQ0wocXVlcnksIGFjbCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhbGlkYXRlUXVlcnkocXVlcnksIGlzTWFzdGVyLCB0cnVlKTtcbiAgICAgICAgICByZXR1cm4gc2NoZW1hQ29udHJvbGxlclxuICAgICAgICAgICAgLmdldE9uZVNjaGVtYShjbGFzc05hbWUsIHRydWUpXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAvLyBJZiB0aGUgc2NoZW1hIGRvZXNuJ3QgZXhpc3QsIHByZXRlbmQgaXQgZXhpc3RzIHdpdGggbm8gZmllbGRzLiBUaGlzIGJlaGF2aW9yXG4gICAgICAgICAgICAgIC8vIHdpbGwgbGlrZWx5IG5lZWQgcmV2aXNpdGluZy5cbiAgICAgICAgICAgICAgaWYgKGVycm9yID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBmaWVsZHM6IHt9IH07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oc2NoZW1hID0+IHtcbiAgICAgICAgICAgICAgT2JqZWN0LmtleXModXBkYXRlKS5mb3JFYWNoKGZpZWxkTmFtZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZpZWxkTmFtZS5tYXRjaCgvXmF1dGhEYXRhXFwuKFthLXpBLVowLTlfXSspXFwuaWQkLykpIHtcbiAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBQYXJzZS5FcnJvcihcbiAgICAgICAgICAgICAgICAgICAgUGFyc2UuRXJyb3IuSU5WQUxJRF9LRVlfTkFNRSxcbiAgICAgICAgICAgICAgICAgICAgYEludmFsaWQgZmllbGQgbmFtZSBmb3IgdXBkYXRlOiAke2ZpZWxkTmFtZX1gXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCByb290RmllbGROYW1lID0gZ2V0Um9vdEZpZWxkTmFtZShmaWVsZE5hbWUpO1xuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICFTY2hlbWFDb250cm9sbGVyLmZpZWxkTmFtZUlzVmFsaWQocm9vdEZpZWxkTmFtZSwgY2xhc3NOYW1lKSAmJlxuICAgICAgICAgICAgICAgICAgIWlzU3BlY2lhbFVwZGF0ZUtleShyb290RmllbGROYW1lKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFBhcnNlLkVycm9yKFxuICAgICAgICAgICAgICAgICAgICBQYXJzZS5FcnJvci5JTlZBTElEX0tFWV9OQU1FLFxuICAgICAgICAgICAgICAgICAgICBgSW52YWxpZCBmaWVsZCBuYW1lIGZvciB1cGRhdGU6ICR7ZmllbGROYW1lfWBcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgZm9yIChjb25zdCB1cGRhdGVPcGVyYXRpb24gaW4gdXBkYXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgdXBkYXRlW3VwZGF0ZU9wZXJhdGlvbl0gJiZcbiAgICAgICAgICAgICAgICAgIHR5cGVvZiB1cGRhdGVbdXBkYXRlT3BlcmF0aW9uXSA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHVwZGF0ZVt1cGRhdGVPcGVyYXRpb25dKS5zb21lKFxuICAgICAgICAgICAgICAgICAgICBpbm5lcktleSA9PiBpbm5lcktleS5pbmNsdWRlcygnJCcpIHx8IGlubmVyS2V5LmluY2x1ZGVzKCcuJylcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBQYXJzZS5FcnJvcihcbiAgICAgICAgICAgICAgICAgICAgUGFyc2UuRXJyb3IuSU5WQUxJRF9ORVNURURfS0VZLFxuICAgICAgICAgICAgICAgICAgICBcIk5lc3RlZCBrZXlzIHNob3VsZCBub3QgY29udGFpbiB0aGUgJyQnIG9yICcuJyBjaGFyYWN0ZXJzXCJcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHVwZGF0ZSA9IHRyYW5zZm9ybU9iamVjdEFDTCh1cGRhdGUpO1xuICAgICAgICAgICAgICB0cmFuc2Zvcm1BdXRoRGF0YShjbGFzc05hbWUsIHVwZGF0ZSwgc2NoZW1hKTtcbiAgICAgICAgICAgICAgaWYgKHZhbGlkYXRlT25seSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFkYXB0ZXIuZmluZChjbGFzc05hbWUsIHNjaGVtYSwgcXVlcnksIHt9KS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdCB8fCAhcmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUGFyc2UuRXJyb3IoUGFyc2UuRXJyb3IuT0JKRUNUX05PVF9GT1VORCwgJ09iamVjdCBub3QgZm91bmQuJyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKG1hbnkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hZGFwdGVyLnVwZGF0ZU9iamVjdHNCeVF1ZXJ5KFxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgc2NoZW1hLFxuICAgICAgICAgICAgICAgICAgcXVlcnksXG4gICAgICAgICAgICAgICAgICB1cGRhdGUsXG4gICAgICAgICAgICAgICAgICB0aGlzLl90cmFuc2FjdGlvbmFsU2Vzc2lvblxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAodXBzZXJ0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWRhcHRlci51cHNlcnRPbmVPYmplY3QoXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICBzY2hlbWEsXG4gICAgICAgICAgICAgICAgICBxdWVyeSxcbiAgICAgICAgICAgICAgICAgIHVwZGF0ZSxcbiAgICAgICAgICAgICAgICAgIHRoaXMuX3RyYW5zYWN0aW9uYWxTZXNzaW9uXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hZGFwdGVyLmZpbmRPbmVBbmRVcGRhdGUoXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICBzY2hlbWEsXG4gICAgICAgICAgICAgICAgICBxdWVyeSxcbiAgICAgICAgICAgICAgICAgIHVwZGF0ZSxcbiAgICAgICAgICAgICAgICAgIHRoaXMuX3RyYW5zYWN0aW9uYWxTZXNzaW9uXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUGFyc2UuRXJyb3IoUGFyc2UuRXJyb3IuT0JKRUNUX05PVF9GT1VORCwgJ09iamVjdCBub3QgZm91bmQuJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh2YWxpZGF0ZU9ubHkpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZVJlbGF0aW9uVXBkYXRlcyhcbiAgICAgICAgICAgIGNsYXNzTmFtZSxcbiAgICAgICAgICAgIG9yaWdpbmFsUXVlcnkub2JqZWN0SWQsXG4gICAgICAgICAgICB1cGRhdGUsXG4gICAgICAgICAgICByZWxhdGlvblVwZGF0ZXNcbiAgICAgICAgICApLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBpZiAoc2tpcFNhbml0aXphdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhpcy5fc2FuaXRpemVEYXRhYmFzZVJlc3VsdChvcmlnaW5hbFVwZGF0ZSwgcmVzdWx0KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBDb2xsZWN0IGFsbCByZWxhdGlvbi11cGRhdGluZyBvcGVyYXRpb25zIGZyb20gYSBSRVNULWZvcm1hdCB1cGRhdGUuXG4gIC8vIFJldHVybnMgYSBsaXN0IG9mIGFsbCByZWxhdGlvbiB1cGRhdGVzIHRvIHBlcmZvcm1cbiAgLy8gVGhpcyBtdXRhdGVzIHVwZGF0ZS5cbiAgY29sbGVjdFJlbGF0aW9uVXBkYXRlcyhjbGFzc05hbWU6IHN0cmluZywgb2JqZWN0SWQ6ID9zdHJpbmcsIHVwZGF0ZTogYW55KSB7XG4gICAgdmFyIG9wcyA9IFtdO1xuICAgIHZhciBkZWxldGVNZSA9IFtdO1xuICAgIG9iamVjdElkID0gdXBkYXRlLm9iamVjdElkIHx8IG9iamVjdElkO1xuXG4gICAgdmFyIHByb2Nlc3MgPSAob3AsIGtleSkgPT4ge1xuICAgICAgaWYgKCFvcCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAob3AuX19vcCA9PSAnQWRkUmVsYXRpb24nKSB7XG4gICAgICAgIG9wcy5wdXNoKHsga2V5LCBvcCB9KTtcbiAgICAgICAgZGVsZXRlTWUucHVzaChrZXkpO1xuICAgICAgfVxuXG4gICAgICBpZiAob3AuX19vcCA9PSAnUmVtb3ZlUmVsYXRpb24nKSB7XG4gICAgICAgIG9wcy5wdXNoKHsga2V5LCBvcCB9KTtcbiAgICAgICAgZGVsZXRlTWUucHVzaChrZXkpO1xuICAgICAgfVxuXG4gICAgICBpZiAob3AuX19vcCA9PSAnQmF0Y2gnKSB7XG4gICAgICAgIGZvciAodmFyIHggb2Ygb3Aub3BzKSB7XG4gICAgICAgICAgcHJvY2Vzcyh4LCBrZXkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIGZvciAoY29uc3Qga2V5IGluIHVwZGF0ZSkge1xuICAgICAgcHJvY2Vzcyh1cGRhdGVba2V5XSwga2V5KTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBrZXkgb2YgZGVsZXRlTWUpIHtcbiAgICAgIGRlbGV0ZSB1cGRhdGVba2V5XTtcbiAgICB9XG4gICAgcmV0dXJuIG9wcztcbiAgfVxuXG4gIC8vIFByb2Nlc3NlcyByZWxhdGlvbi11cGRhdGluZyBvcGVyYXRpb25zIGZyb20gYSBSRVNULWZvcm1hdCB1cGRhdGUuXG4gIC8vIFJldHVybnMgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiBhbGwgdXBkYXRlcyBoYXZlIGJlZW4gcGVyZm9ybWVkXG4gIGhhbmRsZVJlbGF0aW9uVXBkYXRlcyhjbGFzc05hbWU6IHN0cmluZywgb2JqZWN0SWQ6IHN0cmluZywgdXBkYXRlOiBhbnksIG9wczogYW55KSB7XG4gICAgdmFyIHBlbmRpbmcgPSBbXTtcbiAgICBvYmplY3RJZCA9IHVwZGF0ZS5vYmplY3RJZCB8fCBvYmplY3RJZDtcbiAgICBvcHMuZm9yRWFjaCgoeyBrZXksIG9wIH0pID0+IHtcbiAgICAgIGlmICghb3ApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKG9wLl9fb3AgPT0gJ0FkZFJlbGF0aW9uJykge1xuICAgICAgICBmb3IgKGNvbnN0IG9iamVjdCBvZiBvcC5vYmplY3RzKSB7XG4gICAgICAgICAgcGVuZGluZy5wdXNoKHRoaXMuYWRkUmVsYXRpb24oa2V5LCBjbGFzc05hbWUsIG9iamVjdElkLCBvYmplY3Qub2JqZWN0SWQpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAob3AuX19vcCA9PSAnUmVtb3ZlUmVsYXRpb24nKSB7XG4gICAgICAgIGZvciAoY29uc3Qgb2JqZWN0IG9mIG9wLm9iamVjdHMpIHtcbiAgICAgICAgICBwZW5kaW5nLnB1c2godGhpcy5yZW1vdmVSZWxhdGlvbihrZXksIGNsYXNzTmFtZSwgb2JqZWN0SWQsIG9iamVjdC5vYmplY3RJZCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwocGVuZGluZyk7XG4gIH1cblxuICAvLyBBZGRzIGEgcmVsYXRpb24uXG4gIC8vIFJldHVybnMgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgc3VjY2Vzc2Z1bGx5IGlmZiB0aGUgYWRkIHdhcyBzdWNjZXNzZnVsLlxuICBhZGRSZWxhdGlvbihrZXk6IHN0cmluZywgZnJvbUNsYXNzTmFtZTogc3RyaW5nLCBmcm9tSWQ6IHN0cmluZywgdG9JZDogc3RyaW5nKSB7XG4gICAgY29uc3QgZG9jID0ge1xuICAgICAgcmVsYXRlZElkOiB0b0lkLFxuICAgICAgb3duaW5nSWQ6IGZyb21JZCxcbiAgICB9O1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXIudXBzZXJ0T25lT2JqZWN0KFxuICAgICAgYF9Kb2luOiR7a2V5fToke2Zyb21DbGFzc05hbWV9YCxcbiAgICAgIHJlbGF0aW9uU2NoZW1hLFxuICAgICAgZG9jLFxuICAgICAgZG9jLFxuICAgICAgdGhpcy5fdHJhbnNhY3Rpb25hbFNlc3Npb25cbiAgICApO1xuICB9XG5cbiAgLy8gUmVtb3ZlcyBhIHJlbGF0aW9uLlxuICAvLyBSZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHN1Y2Nlc3NmdWxseSBpZmYgdGhlIHJlbW92ZSB3YXNcbiAgLy8gc3VjY2Vzc2Z1bC5cbiAgcmVtb3ZlUmVsYXRpb24oa2V5OiBzdHJpbmcsIGZyb21DbGFzc05hbWU6IHN0cmluZywgZnJvbUlkOiBzdHJpbmcsIHRvSWQ6IHN0cmluZykge1xuICAgIHZhciBkb2MgPSB7XG4gICAgICByZWxhdGVkSWQ6IHRvSWQsXG4gICAgICBvd25pbmdJZDogZnJvbUlkLFxuICAgIH07XG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlclxuICAgICAgLmRlbGV0ZU9iamVjdHNCeVF1ZXJ5KFxuICAgICAgICBgX0pvaW46JHtrZXl9OiR7ZnJvbUNsYXNzTmFtZX1gLFxuICAgICAgICByZWxhdGlvblNjaGVtYSxcbiAgICAgICAgZG9jLFxuICAgICAgICB0aGlzLl90cmFuc2FjdGlvbmFsU2Vzc2lvblxuICAgICAgKVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgLy8gV2UgZG9uJ3QgY2FyZSBpZiB0aGV5IHRyeSB0byBkZWxldGUgYSBub24tZXhpc3RlbnQgcmVsYXRpb24uXG4gICAgICAgIGlmIChlcnJvci5jb2RlID09IFBhcnNlLkVycm9yLk9CSkVDVF9OT1RfRk9VTkQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8vIFJlbW92ZXMgb2JqZWN0cyBtYXRjaGVzIHRoaXMgcXVlcnkgZnJvbSB0aGUgZGF0YWJhc2UuXG4gIC8vIFJldHVybnMgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgc3VjY2Vzc2Z1bGx5IGlmZiB0aGUgb2JqZWN0IHdhc1xuICAvLyBkZWxldGVkLlxuICAvLyBPcHRpb25zOlxuICAvLyAgIGFjbDogIGEgbGlzdCBvZiBzdHJpbmdzLiBJZiB0aGUgb2JqZWN0IHRvIGJlIHVwZGF0ZWQgaGFzIGFuIEFDTCxcbiAgLy8gICAgICAgICBvbmUgb2YgdGhlIHByb3ZpZGVkIHN0cmluZ3MgbXVzdCBwcm92aWRlIHRoZSBjYWxsZXIgd2l0aFxuICAvLyAgICAgICAgIHdyaXRlIHBlcm1pc3Npb25zLlxuICBkZXN0cm95KFxuICAgIGNsYXNzTmFtZTogc3RyaW5nLFxuICAgIHF1ZXJ5OiBhbnksXG4gICAgeyBhY2wgfTogUXVlcnlPcHRpb25zID0ge30sXG4gICAgdmFsaWRTY2hlbWFDb250cm9sbGVyOiBTY2hlbWFDb250cm9sbGVyLlNjaGVtYUNvbnRyb2xsZXJcbiAgKTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCBpc01hc3RlciA9IGFjbCA9PT0gdW5kZWZpbmVkO1xuICAgIGNvbnN0IGFjbEdyb3VwID0gYWNsIHx8IFtdO1xuXG4gICAgcmV0dXJuIHRoaXMubG9hZFNjaGVtYUlmTmVlZGVkKHZhbGlkU2NoZW1hQ29udHJvbGxlcikudGhlbihzY2hlbWFDb250cm9sbGVyID0+IHtcbiAgICAgIHJldHVybiAoaXNNYXN0ZXJcbiAgICAgICAgPyBQcm9taXNlLnJlc29sdmUoKVxuICAgICAgICA6IHNjaGVtYUNvbnRyb2xsZXIudmFsaWRhdGVQZXJtaXNzaW9uKGNsYXNzTmFtZSwgYWNsR3JvdXAsICdkZWxldGUnKVxuICAgICAgKS50aGVuKCgpID0+IHtcbiAgICAgICAgaWYgKCFpc01hc3Rlcikge1xuICAgICAgICAgIHF1ZXJ5ID0gdGhpcy5hZGRQb2ludGVyUGVybWlzc2lvbnMoXG4gICAgICAgICAgICBzY2hlbWFDb250cm9sbGVyLFxuICAgICAgICAgICAgY2xhc3NOYW1lLFxuICAgICAgICAgICAgJ2RlbGV0ZScsXG4gICAgICAgICAgICBxdWVyeSxcbiAgICAgICAgICAgIGFjbEdyb3VwXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAoIXF1ZXJ5KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUGFyc2UuRXJyb3IoUGFyc2UuRXJyb3IuT0JKRUNUX05PVF9GT1VORCwgJ09iamVjdCBub3QgZm91bmQuJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIGRlbGV0ZSBieSBxdWVyeVxuICAgICAgICBpZiAoYWNsKSB7XG4gICAgICAgICAgcXVlcnkgPSBhZGRXcml0ZUFDTChxdWVyeSwgYWNsKTtcbiAgICAgICAgfVxuICAgICAgICB2YWxpZGF0ZVF1ZXJ5KHF1ZXJ5LCBpc01hc3RlciwgZmFsc2UpO1xuICAgICAgICByZXR1cm4gc2NoZW1hQ29udHJvbGxlclxuICAgICAgICAgIC5nZXRPbmVTY2hlbWEoY2xhc3NOYW1lKVxuICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAvLyBJZiB0aGUgc2NoZW1hIGRvZXNuJ3QgZXhpc3QsIHByZXRlbmQgaXQgZXhpc3RzIHdpdGggbm8gZmllbGRzLiBUaGlzIGJlaGF2aW9yXG4gICAgICAgICAgICAvLyB3aWxsIGxpa2VseSBuZWVkIHJldmlzaXRpbmcuXG4gICAgICAgICAgICBpZiAoZXJyb3IgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICByZXR1cm4geyBmaWVsZHM6IHt9IH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC50aGVuKHBhcnNlRm9ybWF0U2NoZW1hID0+XG4gICAgICAgICAgICB0aGlzLmFkYXB0ZXIuZGVsZXRlT2JqZWN0c0J5UXVlcnkoXG4gICAgICAgICAgICAgIGNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgcGFyc2VGb3JtYXRTY2hlbWEsXG4gICAgICAgICAgICAgIHF1ZXJ5LFxuICAgICAgICAgICAgICB0aGlzLl90cmFuc2FjdGlvbmFsU2Vzc2lvblxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgLy8gV2hlbiBkZWxldGluZyBzZXNzaW9ucyB3aGlsZSBjaGFuZ2luZyBwYXNzd29yZHMsIGRvbid0IHRocm93IGFuIGVycm9yIGlmIHRoZXkgZG9uJ3QgaGF2ZSBhbnkgc2Vzc2lvbnMuXG4gICAgICAgICAgICBpZiAoY2xhc3NOYW1lID09PSAnX1Nlc3Npb24nICYmIGVycm9yLmNvZGUgPT09IFBhcnNlLkVycm9yLk9CSkVDVF9OT1RfRk9VTkQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7fSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gSW5zZXJ0cyBhbiBvYmplY3QgaW50byB0aGUgZGF0YWJhc2UuXG4gIC8vIFJldHVybnMgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgc3VjY2Vzc2Z1bGx5IGlmZiB0aGUgb2JqZWN0IHNhdmVkLlxuICBjcmVhdGUoXG4gICAgY2xhc3NOYW1lOiBzdHJpbmcsXG4gICAgb2JqZWN0OiBhbnksXG4gICAgeyBhY2wgfTogUXVlcnlPcHRpb25zID0ge30sXG4gICAgdmFsaWRhdGVPbmx5OiBib29sZWFuID0gZmFsc2UsXG4gICAgdmFsaWRTY2hlbWFDb250cm9sbGVyOiBTY2hlbWFDb250cm9sbGVyLlNjaGVtYUNvbnRyb2xsZXJcbiAgKTogUHJvbWlzZTxhbnk+IHtcbiAgICAvLyBNYWtlIGEgY29weSBvZiB0aGUgb2JqZWN0LCBzbyB3ZSBkb24ndCBtdXRhdGUgdGhlIGluY29taW5nIGRhdGEuXG4gICAgY29uc3Qgb3JpZ2luYWxPYmplY3QgPSBvYmplY3Q7XG4gICAgb2JqZWN0ID0gdHJhbnNmb3JtT2JqZWN0QUNMKG9iamVjdCk7XG5cbiAgICBvYmplY3QuY3JlYXRlZEF0ID0geyBpc286IG9iamVjdC5jcmVhdGVkQXQsIF9fdHlwZTogJ0RhdGUnIH07XG4gICAgb2JqZWN0LnVwZGF0ZWRBdCA9IHsgaXNvOiBvYmplY3QudXBkYXRlZEF0LCBfX3R5cGU6ICdEYXRlJyB9O1xuXG4gICAgdmFyIGlzTWFzdGVyID0gYWNsID09PSB1bmRlZmluZWQ7XG4gICAgdmFyIGFjbEdyb3VwID0gYWNsIHx8IFtdO1xuICAgIGNvbnN0IHJlbGF0aW9uVXBkYXRlcyA9IHRoaXMuY29sbGVjdFJlbGF0aW9uVXBkYXRlcyhjbGFzc05hbWUsIG51bGwsIG9iamVjdCk7XG5cbiAgICByZXR1cm4gdGhpcy52YWxpZGF0ZUNsYXNzTmFtZShjbGFzc05hbWUpXG4gICAgICAudGhlbigoKSA9PiB0aGlzLmxvYWRTY2hlbWFJZk5lZWRlZCh2YWxpZFNjaGVtYUNvbnRyb2xsZXIpKVxuICAgICAgLnRoZW4oc2NoZW1hQ29udHJvbGxlciA9PiB7XG4gICAgICAgIHJldHVybiAoaXNNYXN0ZXJcbiAgICAgICAgICA/IFByb21pc2UucmVzb2x2ZSgpXG4gICAgICAgICAgOiBzY2hlbWFDb250cm9sbGVyLnZhbGlkYXRlUGVybWlzc2lvbihjbGFzc05hbWUsIGFjbEdyb3VwLCAnY3JlYXRlJylcbiAgICAgICAgKVxuICAgICAgICAgIC50aGVuKCgpID0+IHNjaGVtYUNvbnRyb2xsZXIuZW5mb3JjZUNsYXNzRXhpc3RzKGNsYXNzTmFtZSkpXG4gICAgICAgICAgLnRoZW4oKCkgPT4gc2NoZW1hQ29udHJvbGxlci5nZXRPbmVTY2hlbWEoY2xhc3NOYW1lLCB0cnVlKSlcbiAgICAgICAgICAudGhlbihzY2hlbWEgPT4ge1xuICAgICAgICAgICAgdHJhbnNmb3JtQXV0aERhdGEoY2xhc3NOYW1lLCBvYmplY3QsIHNjaGVtYSk7XG4gICAgICAgICAgICBmbGF0dGVuVXBkYXRlT3BlcmF0b3JzRm9yQ3JlYXRlKG9iamVjdCk7XG4gICAgICAgICAgICBpZiAodmFsaWRhdGVPbmx5KSB7XG4gICAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFkYXB0ZXIuY3JlYXRlT2JqZWN0KFxuICAgICAgICAgICAgICBjbGFzc05hbWUsXG4gICAgICAgICAgICAgIFNjaGVtYUNvbnRyb2xsZXIuY29udmVydFNjaGVtYVRvQWRhcHRlclNjaGVtYShzY2hlbWEpLFxuICAgICAgICAgICAgICBvYmplY3QsXG4gICAgICAgICAgICAgIHRoaXMuX3RyYW5zYWN0aW9uYWxTZXNzaW9uXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgIGlmICh2YWxpZGF0ZU9ubHkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG9yaWdpbmFsT2JqZWN0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVsYXRpb25VcGRhdGVzKFxuICAgICAgICAgICAgICBjbGFzc05hbWUsXG4gICAgICAgICAgICAgIG9iamVjdC5vYmplY3RJZCxcbiAgICAgICAgICAgICAgb2JqZWN0LFxuICAgICAgICAgICAgICByZWxhdGlvblVwZGF0ZXNcbiAgICAgICAgICAgICkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zYW5pdGl6ZURhdGFiYXNlUmVzdWx0KG9yaWdpbmFsT2JqZWN0LCByZXN1bHQub3BzWzBdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICBjYW5BZGRGaWVsZChcbiAgICBzY2hlbWE6IFNjaGVtYUNvbnRyb2xsZXIuU2NoZW1hQ29udHJvbGxlcixcbiAgICBjbGFzc05hbWU6IHN0cmluZyxcbiAgICBvYmplY3Q6IGFueSxcbiAgICBhY2xHcm91cDogc3RyaW5nW10sXG4gICAgcnVuT3B0aW9uczogUXVlcnlPcHRpb25zXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGNsYXNzU2NoZW1hID0gc2NoZW1hLnNjaGVtYURhdGFbY2xhc3NOYW1lXTtcbiAgICBpZiAoIWNsYXNzU2NoZW1hKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuICAgIGNvbnN0IGZpZWxkcyA9IE9iamVjdC5rZXlzKG9iamVjdCk7XG4gICAgY29uc3Qgc2NoZW1hRmllbGRzID0gT2JqZWN0LmtleXMoY2xhc3NTY2hlbWEuZmllbGRzKTtcbiAgICBjb25zdCBuZXdLZXlzID0gZmllbGRzLmZpbHRlcihmaWVsZCA9PiB7XG4gICAgICAvLyBTa2lwIGZpZWxkcyB0aGF0IGFyZSB1bnNldFxuICAgICAgaWYgKG9iamVjdFtmaWVsZF0gJiYgb2JqZWN0W2ZpZWxkXS5fX29wICYmIG9iamVjdFtmaWVsZF0uX19vcCA9PT0gJ0RlbGV0ZScpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNjaGVtYUZpZWxkcy5pbmRleE9mKGdldFJvb3RGaWVsZE5hbWUoZmllbGQpKSA8IDA7XG4gICAgfSk7XG4gICAgaWYgKG5ld0tleXMubGVuZ3RoID4gMCkge1xuICAgICAgLy8gYWRkcyBhIG1hcmtlciB0aGF0IG5ldyBmaWVsZCBpcyBiZWluZyBhZGRpbmcgZHVyaW5nIHVwZGF0ZVxuICAgICAgcnVuT3B0aW9ucy5hZGRzRmllbGQgPSB0cnVlO1xuXG4gICAgICBjb25zdCBhY3Rpb24gPSBydW5PcHRpb25zLmFjdGlvbjtcbiAgICAgIHJldHVybiBzY2hlbWEudmFsaWRhdGVQZXJtaXNzaW9uKGNsYXNzTmFtZSwgYWNsR3JvdXAsICdhZGRGaWVsZCcsIGFjdGlvbik7XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIC8vIFdvbid0IGRlbGV0ZSBjb2xsZWN0aW9ucyBpbiB0aGUgc3lzdGVtIG5hbWVzcGFjZVxuICAvKipcbiAgICogRGVsZXRlIGFsbCBjbGFzc2VzIGFuZCBjbGVhcnMgdGhlIHNjaGVtYSBjYWNoZVxuICAgKlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGZhc3Qgc2V0IHRvIHRydWUgaWYgaXQncyBvayB0byBqdXN0IGRlbGV0ZSByb3dzIGFuZCBub3QgaW5kZXhlc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gd2hlbiB0aGUgZGVsZXRpb25zIGNvbXBsZXRlc1xuICAgKi9cbiAgZGVsZXRlRXZlcnl0aGluZyhmYXN0OiBib29sZWFuID0gZmFsc2UpOiBQcm9taXNlPGFueT4ge1xuICAgIHRoaXMuc2NoZW1hUHJvbWlzZSA9IG51bGw7XG4gICAgU2NoZW1hQ2FjaGUuY2xlYXIoKTtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyLmRlbGV0ZUFsbENsYXNzZXMoZmFzdCk7XG4gIH1cblxuICAvLyBSZXR1cm5zIGEgcHJvbWlzZSBmb3IgYSBsaXN0IG9mIHJlbGF0ZWQgaWRzIGdpdmVuIGFuIG93bmluZyBpZC5cbiAgLy8gY2xhc3NOYW1lIGhlcmUgaXMgdGhlIG93bmluZyBjbGFzc05hbWUuXG4gIHJlbGF0ZWRJZHMoXG4gICAgY2xhc3NOYW1lOiBzdHJpbmcsXG4gICAga2V5OiBzdHJpbmcsXG4gICAgb3duaW5nSWQ6IHN0cmluZyxcbiAgICBxdWVyeU9wdGlvbnM6IFF1ZXJ5T3B0aW9uc1xuICApOiBQcm9taXNlPEFycmF5PHN0cmluZz4+IHtcbiAgICBjb25zdCB7IHNraXAsIGxpbWl0LCBzb3J0IH0gPSBxdWVyeU9wdGlvbnM7XG4gICAgY29uc3QgZmluZE9wdGlvbnMgPSB7fTtcbiAgICBpZiAoc29ydCAmJiBzb3J0LmNyZWF0ZWRBdCAmJiB0aGlzLmFkYXB0ZXIuY2FuU29ydE9uSm9pblRhYmxlcykge1xuICAgICAgZmluZE9wdGlvbnMuc29ydCA9IHsgX2lkOiBzb3J0LmNyZWF0ZWRBdCB9O1xuICAgICAgZmluZE9wdGlvbnMubGltaXQgPSBsaW1pdDtcbiAgICAgIGZpbmRPcHRpb25zLnNraXAgPSBza2lwO1xuICAgICAgcXVlcnlPcHRpb25zLnNraXAgPSAwO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyXG4gICAgICAuZmluZChqb2luVGFibGVOYW1lKGNsYXNzTmFtZSwga2V5KSwgcmVsYXRpb25TY2hlbWEsIHsgb3duaW5nSWQgfSwgZmluZE9wdGlvbnMpXG4gICAgICAudGhlbihyZXN1bHRzID0+IHJlc3VsdHMubWFwKHJlc3VsdCA9PiByZXN1bHQucmVsYXRlZElkKSk7XG4gIH1cblxuICAvLyBSZXR1cm5zIGEgcHJvbWlzZSBmb3IgYSBsaXN0IG9mIG93bmluZyBpZHMgZ2l2ZW4gc29tZSByZWxhdGVkIGlkcy5cbiAgLy8gY2xhc3NOYW1lIGhlcmUgaXMgdGhlIG93bmluZyBjbGFzc05hbWUuXG4gIG93bmluZ0lkcyhjbGFzc05hbWU6IHN0cmluZywga2V5OiBzdHJpbmcsIHJlbGF0ZWRJZHM6IHN0cmluZ1tdKTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXJcbiAgICAgIC5maW5kKFxuICAgICAgICBqb2luVGFibGVOYW1lKGNsYXNzTmFtZSwga2V5KSxcbiAgICAgICAgcmVsYXRpb25TY2hlbWEsXG4gICAgICAgIHsgcmVsYXRlZElkOiB7ICRpbjogcmVsYXRlZElkcyB9IH0sXG4gICAgICAgIHsga2V5czogWydvd25pbmdJZCddIH1cbiAgICAgIClcbiAgICAgIC50aGVuKHJlc3VsdHMgPT4gcmVzdWx0cy5tYXAocmVzdWx0ID0+IHJlc3VsdC5vd25pbmdJZCkpO1xuICB9XG5cbiAgLy8gTW9kaWZpZXMgcXVlcnkgc28gdGhhdCBpdCBubyBsb25nZXIgaGFzICRpbiBvbiByZWxhdGlvbiBmaWVsZHMsIG9yXG4gIC8vIGVxdWFsLXRvLXBvaW50ZXIgY29uc3RyYWludHMgb24gcmVsYXRpb24gZmllbGRzLlxuICAvLyBSZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gcXVlcnkgaXMgbXV0YXRlZFxuICByZWR1Y2VJblJlbGF0aW9uKGNsYXNzTmFtZTogc3RyaW5nLCBxdWVyeTogYW55LCBzY2hlbWE6IGFueSk6IFByb21pc2U8YW55PiB7XG4gICAgLy8gU2VhcmNoIGZvciBhbiBpbi1yZWxhdGlvbiBvciBlcXVhbC10by1yZWxhdGlvblxuICAgIC8vIE1ha2UgaXQgc2VxdWVudGlhbCBmb3Igbm93LCBub3Qgc3VyZSBvZiBwYXJhbGxlaXphdGlvbiBzaWRlIGVmZmVjdHNcbiAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuICAgIGlmIChxdWVyeVsnJG9yJ10pIHtcbiAgICAgIGNvbnN0IG9ycyA9IHF1ZXJ5Wyckb3InXTtcbiAgICAgIHByb21pc2VzLnB1c2goXG4gICAgICAgIC4uLm9ycy5tYXAoKGFRdWVyeSwgaW5kZXgpID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5yZWR1Y2VJblJlbGF0aW9uKGNsYXNzTmFtZSwgYVF1ZXJ5LCBzY2hlbWEpLnRoZW4oYVF1ZXJ5ID0+IHtcbiAgICAgICAgICAgIHF1ZXJ5Wyckb3InXVtpbmRleF0gPSBhUXVlcnk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAocXVlcnlbJyRhbmQnXSkge1xuICAgICAgY29uc3QgYW5kcyA9IHF1ZXJ5WyckYW5kJ107XG4gICAgICBwcm9taXNlcy5wdXNoKFxuICAgICAgICAuLi5hbmRzLm1hcCgoYVF1ZXJ5LCBpbmRleCkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLnJlZHVjZUluUmVsYXRpb24oY2xhc3NOYW1lLCBhUXVlcnksIHNjaGVtYSkudGhlbihhUXVlcnkgPT4ge1xuICAgICAgICAgICAgcXVlcnlbJyRhbmQnXVtpbmRleF0gPSBhUXVlcnk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IG90aGVyS2V5cyA9IE9iamVjdC5rZXlzKHF1ZXJ5KS5tYXAoa2V5ID0+IHtcbiAgICAgIGlmIChrZXkgPT09ICckYW5kJyB8fCBrZXkgPT09ICckb3InKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHQgPSBzY2hlbWEuZ2V0RXhwZWN0ZWRUeXBlKGNsYXNzTmFtZSwga2V5KTtcbiAgICAgIGlmICghdCB8fCB0LnR5cGUgIT09ICdSZWxhdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShxdWVyeSk7XG4gICAgICB9XG4gICAgICBsZXQgcXVlcmllczogPyhhbnlbXSkgPSBudWxsO1xuICAgICAgaWYgKFxuICAgICAgICBxdWVyeVtrZXldICYmXG4gICAgICAgIChxdWVyeVtrZXldWyckaW4nXSB8fFxuICAgICAgICAgIHF1ZXJ5W2tleV1bJyRuZSddIHx8XG4gICAgICAgICAgcXVlcnlba2V5XVsnJG5pbiddIHx8XG4gICAgICAgICAgcXVlcnlba2V5XS5fX3R5cGUgPT0gJ1BvaW50ZXInKVxuICAgICAgKSB7XG4gICAgICAgIC8vIEJ1aWxkIHRoZSBsaXN0IG9mIHF1ZXJpZXNcbiAgICAgICAgcXVlcmllcyA9IE9iamVjdC5rZXlzKHF1ZXJ5W2tleV0pLm1hcChjb25zdHJhaW50S2V5ID0+IHtcbiAgICAgICAgICBsZXQgcmVsYXRlZElkcztcbiAgICAgICAgICBsZXQgaXNOZWdhdGlvbiA9IGZhbHNlO1xuICAgICAgICAgIGlmIChjb25zdHJhaW50S2V5ID09PSAnb2JqZWN0SWQnKSB7XG4gICAgICAgICAgICByZWxhdGVkSWRzID0gW3F1ZXJ5W2tleV0ub2JqZWN0SWRdO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY29uc3RyYWludEtleSA9PSAnJGluJykge1xuICAgICAgICAgICAgcmVsYXRlZElkcyA9IHF1ZXJ5W2tleV1bJyRpbiddLm1hcChyID0+IHIub2JqZWN0SWQpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY29uc3RyYWludEtleSA9PSAnJG5pbicpIHtcbiAgICAgICAgICAgIGlzTmVnYXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgcmVsYXRlZElkcyA9IHF1ZXJ5W2tleV1bJyRuaW4nXS5tYXAociA9PiByLm9iamVjdElkKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGNvbnN0cmFpbnRLZXkgPT0gJyRuZScpIHtcbiAgICAgICAgICAgIGlzTmVnYXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgcmVsYXRlZElkcyA9IFtxdWVyeVtrZXldWyckbmUnXS5vYmplY3RJZF07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlzTmVnYXRpb24sXG4gICAgICAgICAgICByZWxhdGVkSWRzLFxuICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcXVlcmllcyA9IFt7IGlzTmVnYXRpb246IGZhbHNlLCByZWxhdGVkSWRzOiBbXSB9XTtcbiAgICAgIH1cblxuICAgICAgLy8gcmVtb3ZlIHRoZSBjdXJyZW50IHF1ZXJ5S2V5IGFzIHdlIGRvbix0IG5lZWQgaXQgYW55bW9yZVxuICAgICAgZGVsZXRlIHF1ZXJ5W2tleV07XG4gICAgICAvLyBleGVjdXRlIGVhY2ggcXVlcnkgaW5kZXBlbmRlbnRseSB0byBidWlsZCB0aGUgbGlzdCBvZlxuICAgICAgLy8gJGluIC8gJG5pblxuICAgICAgY29uc3QgcHJvbWlzZXMgPSBxdWVyaWVzLm1hcChxID0+IHtcbiAgICAgICAgaWYgKCFxKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLm93bmluZ0lkcyhjbGFzc05hbWUsIGtleSwgcS5yZWxhdGVkSWRzKS50aGVuKGlkcyA9PiB7XG4gICAgICAgICAgaWYgKHEuaXNOZWdhdGlvbikge1xuICAgICAgICAgICAgdGhpcy5hZGROb3RJbk9iamVjdElkc0lkcyhpZHMsIHF1ZXJ5KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hZGRJbk9iamVjdElkc0lkcyhpZHMsIHF1ZXJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oKCkgPT4ge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHJldHVybiBQcm9taXNlLmFsbChbLi4ucHJvbWlzZXMsIC4uLm90aGVyS2V5c10pLnRoZW4oKCkgPT4ge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShxdWVyeSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBNb2RpZmllcyBxdWVyeSBzbyB0aGF0IGl0IG5vIGxvbmdlciBoYXMgJHJlbGF0ZWRUb1xuICAvLyBSZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gcXVlcnkgaXMgbXV0YXRlZFxuICByZWR1Y2VSZWxhdGlvbktleXMoY2xhc3NOYW1lOiBzdHJpbmcsIHF1ZXJ5OiBhbnksIHF1ZXJ5T3B0aW9uczogYW55KTogP1Byb21pc2U8dm9pZD4ge1xuICAgIGlmIChxdWVyeVsnJG9yJ10pIHtcbiAgICAgIHJldHVybiBQcm9taXNlLmFsbChcbiAgICAgICAgcXVlcnlbJyRvciddLm1hcChhUXVlcnkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLnJlZHVjZVJlbGF0aW9uS2V5cyhjbGFzc05hbWUsIGFRdWVyeSwgcXVlcnlPcHRpb25zKTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChxdWVyeVsnJGFuZCddKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5hbGwoXG4gICAgICAgIHF1ZXJ5WyckYW5kJ10ubWFwKGFRdWVyeSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucmVkdWNlUmVsYXRpb25LZXlzKGNsYXNzTmFtZSwgYVF1ZXJ5LCBxdWVyeU9wdGlvbnMpO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG4gICAgdmFyIHJlbGF0ZWRUbyA9IHF1ZXJ5WyckcmVsYXRlZFRvJ107XG4gICAgaWYgKHJlbGF0ZWRUbykge1xuICAgICAgcmV0dXJuIHRoaXMucmVsYXRlZElkcyhcbiAgICAgICAgcmVsYXRlZFRvLm9iamVjdC5jbGFzc05hbWUsXG4gICAgICAgIHJlbGF0ZWRUby5rZXksXG4gICAgICAgIHJlbGF0ZWRUby5vYmplY3Qub2JqZWN0SWQsXG4gICAgICAgIHF1ZXJ5T3B0aW9uc1xuICAgICAgKVxuICAgICAgICAudGhlbihpZHMgPT4ge1xuICAgICAgICAgIGRlbGV0ZSBxdWVyeVsnJHJlbGF0ZWRUbyddO1xuICAgICAgICAgIHRoaXMuYWRkSW5PYmplY3RJZHNJZHMoaWRzLCBxdWVyeSk7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucmVkdWNlUmVsYXRpb25LZXlzKGNsYXNzTmFtZSwgcXVlcnksIHF1ZXJ5T3B0aW9ucyk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCgpID0+IHt9KTtcbiAgICB9XG4gIH1cblxuICBhZGRJbk9iamVjdElkc0lkcyhpZHM6ID9BcnJheTxzdHJpbmc+ID0gbnVsbCwgcXVlcnk6IGFueSkge1xuICAgIGNvbnN0IGlkc0Zyb21TdHJpbmc6ID9BcnJheTxzdHJpbmc+ID1cbiAgICAgIHR5cGVvZiBxdWVyeS5vYmplY3RJZCA9PT0gJ3N0cmluZycgPyBbcXVlcnkub2JqZWN0SWRdIDogbnVsbDtcbiAgICBjb25zdCBpZHNGcm9tRXE6ID9BcnJheTxzdHJpbmc+ID1cbiAgICAgIHF1ZXJ5Lm9iamVjdElkICYmIHF1ZXJ5Lm9iamVjdElkWyckZXEnXSA/IFtxdWVyeS5vYmplY3RJZFsnJGVxJ11dIDogbnVsbDtcbiAgICBjb25zdCBpZHNGcm9tSW46ID9BcnJheTxzdHJpbmc+ID1cbiAgICAgIHF1ZXJ5Lm9iamVjdElkICYmIHF1ZXJ5Lm9iamVjdElkWyckaW4nXSA/IHF1ZXJ5Lm9iamVjdElkWyckaW4nXSA6IG51bGw7XG5cbiAgICAvLyBAZmxvdy1kaXNhYmxlLW5leHRcbiAgICBjb25zdCBhbGxJZHM6IEFycmF5PEFycmF5PHN0cmluZz4+ID0gW2lkc0Zyb21TdHJpbmcsIGlkc0Zyb21FcSwgaWRzRnJvbUluLCBpZHNdLmZpbHRlcihcbiAgICAgIGxpc3QgPT4gbGlzdCAhPT0gbnVsbFxuICAgICk7XG4gICAgY29uc3QgdG90YWxMZW5ndGggPSBhbGxJZHMucmVkdWNlKChtZW1vLCBsaXN0KSA9PiBtZW1vICsgbGlzdC5sZW5ndGgsIDApO1xuXG4gICAgbGV0IGlkc0ludGVyc2VjdGlvbiA9IFtdO1xuICAgIGlmICh0b3RhbExlbmd0aCA+IDEyNSkge1xuICAgICAgaWRzSW50ZXJzZWN0aW9uID0gaW50ZXJzZWN0LmJpZyhhbGxJZHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZHNJbnRlcnNlY3Rpb24gPSBpbnRlcnNlY3QoYWxsSWRzKTtcbiAgICB9XG5cbiAgICAvLyBOZWVkIHRvIG1ha2Ugc3VyZSB3ZSBkb24ndCBjbG9iYmVyIGV4aXN0aW5nIHNob3J0aGFuZCAkZXEgY29uc3RyYWludHMgb24gb2JqZWN0SWQuXG4gICAgaWYgKCEoJ29iamVjdElkJyBpbiBxdWVyeSkpIHtcbiAgICAgIHF1ZXJ5Lm9iamVjdElkID0ge1xuICAgICAgICAkaW46IHVuZGVmaW5lZCxcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcXVlcnkub2JqZWN0SWQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBxdWVyeS5vYmplY3RJZCA9IHtcbiAgICAgICAgJGluOiB1bmRlZmluZWQsXG4gICAgICAgICRlcTogcXVlcnkub2JqZWN0SWQsXG4gICAgICB9O1xuICAgIH1cbiAgICBxdWVyeS5vYmplY3RJZFsnJGluJ10gPSBpZHNJbnRlcnNlY3Rpb247XG5cbiAgICByZXR1cm4gcXVlcnk7XG4gIH1cblxuICBhZGROb3RJbk9iamVjdElkc0lkcyhpZHM6IHN0cmluZ1tdID0gW10sIHF1ZXJ5OiBhbnkpIHtcbiAgICBjb25zdCBpZHNGcm9tTmluID0gcXVlcnkub2JqZWN0SWQgJiYgcXVlcnkub2JqZWN0SWRbJyRuaW4nXSA/IHF1ZXJ5Lm9iamVjdElkWyckbmluJ10gOiBbXTtcbiAgICBsZXQgYWxsSWRzID0gWy4uLmlkc0Zyb21OaW4sIC4uLmlkc10uZmlsdGVyKGxpc3QgPT4gbGlzdCAhPT0gbnVsbCk7XG5cbiAgICAvLyBtYWtlIGEgc2V0IGFuZCBzcHJlYWQgdG8gcmVtb3ZlIGR1cGxpY2F0ZXNcbiAgICBhbGxJZHMgPSBbLi4ubmV3IFNldChhbGxJZHMpXTtcblxuICAgIC8vIE5lZWQgdG8gbWFrZSBzdXJlIHdlIGRvbid0IGNsb2JiZXIgZXhpc3Rpbmcgc2hvcnRoYW5kICRlcSBjb25zdHJhaW50cyBvbiBvYmplY3RJZC5cbiAgICBpZiAoISgnb2JqZWN0SWQnIGluIHF1ZXJ5KSkge1xuICAgICAgcXVlcnkub2JqZWN0SWQgPSB7XG4gICAgICAgICRuaW46IHVuZGVmaW5lZCxcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcXVlcnkub2JqZWN0SWQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBxdWVyeS5vYmplY3RJZCA9IHtcbiAgICAgICAgJG5pbjogdW5kZWZpbmVkLFxuICAgICAgICAkZXE6IHF1ZXJ5Lm9iamVjdElkLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBxdWVyeS5vYmplY3RJZFsnJG5pbiddID0gYWxsSWRzO1xuICAgIHJldHVybiBxdWVyeTtcbiAgfVxuXG4gIC8vIFJ1bnMgYSBxdWVyeSBvbiB0aGUgZGF0YWJhc2UuXG4gIC8vIFJldHVybnMgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBsaXN0IG9mIGl0ZW1zLlxuICAvLyBPcHRpb25zOlxuICAvLyAgIHNraXAgICAgbnVtYmVyIG9mIHJlc3VsdHMgdG8gc2tpcC5cbiAgLy8gICBsaW1pdCAgIGxpbWl0IHRvIHRoaXMgbnVtYmVyIG9mIHJlc3VsdHMuXG4gIC8vICAgc29ydCAgICBhbiBvYmplY3Qgd2hlcmUga2V5cyBhcmUgdGhlIGZpZWxkcyB0byBzb3J0IGJ5LlxuICAvLyAgICAgICAgICAgdGhlIHZhbHVlIGlzICsxIGZvciBhc2NlbmRpbmcsIC0xIGZvciBkZXNjZW5kaW5nLlxuICAvLyAgIGNvdW50ICAgcnVuIGEgY291bnQgaW5zdGVhZCBvZiByZXR1cm5pbmcgcmVzdWx0cy5cbiAgLy8gICBhY2wgICAgIHJlc3RyaWN0IHRoaXMgb3BlcmF0aW9uIHdpdGggYW4gQUNMIGZvciB0aGUgcHJvdmlkZWQgYXJyYXlcbiAgLy8gICAgICAgICAgIG9mIHVzZXIgb2JqZWN0SWRzIGFuZCByb2xlcy4gYWNsOiBudWxsIG1lYW5zIG5vIHVzZXIuXG4gIC8vICAgICAgICAgICB3aGVuIHRoaXMgZmllbGQgaXMgbm90IHByZXNlbnQsIGRvbid0IGRvIGFueXRoaW5nIHJlZ2FyZGluZyBBQ0xzLlxuICAvLyAgY2FzZUluc2Vuc2l0aXZlIG1ha2Ugc3RyaW5nIGNvbXBhcmlzb25zIGNhc2UgaW5zZW5zaXRpdmVcbiAgLy8gVE9ETzogbWFrZSB1c2VySWRzIG5vdCBuZWVkZWQgaGVyZS4gVGhlIGRiIGFkYXB0ZXIgc2hvdWxkbid0IGtub3dcbiAgLy8gYW55dGhpbmcgYWJvdXQgdXNlcnMsIGlkZWFsbHkuIFRoZW4sIGltcHJvdmUgdGhlIGZvcm1hdCBvZiB0aGUgQUNMXG4gIC8vIGFyZyB0byB3b3JrIGxpa2UgdGhlIG90aGVycy5cbiAgZmluZChcbiAgICBjbGFzc05hbWU6IHN0cmluZyxcbiAgICBxdWVyeTogYW55LFxuICAgIHtcbiAgICAgIHNraXAsXG4gICAgICBsaW1pdCxcbiAgICAgIGFjbCxcbiAgICAgIHNvcnQgPSB7fSxcbiAgICAgIGNvdW50LFxuICAgICAga2V5cyxcbiAgICAgIG9wLFxuICAgICAgZGlzdGluY3QsXG4gICAgICBwaXBlbGluZSxcbiAgICAgIHJlYWRQcmVmZXJlbmNlLFxuICAgICAgaGludCxcbiAgICAgIGNhc2VJbnNlbnNpdGl2ZSA9IGZhbHNlLFxuICAgICAgZXhwbGFpbixcbiAgICB9OiBhbnkgPSB7fSxcbiAgICBhdXRoOiBhbnkgPSB7fSxcbiAgICB2YWxpZFNjaGVtYUNvbnRyb2xsZXI6IFNjaGVtYUNvbnRyb2xsZXIuU2NoZW1hQ29udHJvbGxlclxuICApOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IGlzTWFzdGVyID0gYWNsID09PSB1bmRlZmluZWQ7XG4gICAgY29uc3QgYWNsR3JvdXAgPSBhY2wgfHwgW107XG4gICAgb3AgPVxuICAgICAgb3AgfHwgKHR5cGVvZiBxdWVyeS5vYmplY3RJZCA9PSAnc3RyaW5nJyAmJiBPYmplY3Qua2V5cyhxdWVyeSkubGVuZ3RoID09PSAxID8gJ2dldCcgOiAnZmluZCcpO1xuICAgIC8vIENvdW50IG9wZXJhdGlvbiBpZiBjb3VudGluZ1xuICAgIG9wID0gY291bnQgPT09IHRydWUgPyAnY291bnQnIDogb3A7XG5cbiAgICBsZXQgY2xhc3NFeGlzdHMgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzLmxvYWRTY2hlbWFJZk5lZWRlZCh2YWxpZFNjaGVtYUNvbnRyb2xsZXIpLnRoZW4oc2NoZW1hQ29udHJvbGxlciA9PiB7XG4gICAgICAvL0FsbG93IHZvbGF0aWxlIGNsYXNzZXMgaWYgcXVlcnlpbmcgd2l0aCBNYXN0ZXIgKGZvciBfUHVzaFN0YXR1cylcbiAgICAgIC8vVE9ETzogTW92ZSB2b2xhdGlsZSBjbGFzc2VzIGNvbmNlcHQgaW50byBtb25nbyBhZGFwdGVyLCBwb3N0Z3JlcyBhZGFwdGVyIHNob3VsZG4ndCBjYXJlXG4gICAgICAvL3RoYXQgYXBpLnBhcnNlLmNvbSBicmVha3Mgd2hlbiBfUHVzaFN0YXR1cyBleGlzdHMgaW4gbW9uZ28uXG4gICAgICByZXR1cm4gc2NoZW1hQ29udHJvbGxlclxuICAgICAgICAuZ2V0T25lU2NoZW1hKGNsYXNzTmFtZSwgaXNNYXN0ZXIpXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgLy8gQmVoYXZpb3IgZm9yIG5vbi1leGlzdGVudCBjbGFzc2VzIGlzIGtpbmRhIHdlaXJkIG9uIFBhcnNlLmNvbS4gUHJvYmFibHkgZG9lc24ndCBtYXR0ZXIgdG9vIG11Y2guXG4gICAgICAgICAgLy8gRm9yIG5vdywgcHJldGVuZCB0aGUgY2xhc3MgZXhpc3RzIGJ1dCBoYXMgbm8gb2JqZWN0cyxcbiAgICAgICAgICBpZiAoZXJyb3IgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY2xhc3NFeGlzdHMgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiB7IGZpZWxkczoge30gfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHNjaGVtYSA9PiB7XG4gICAgICAgICAgLy8gUGFyc2UuY29tIHRyZWF0cyBxdWVyaWVzIG9uIF9jcmVhdGVkX2F0IGFuZCBfdXBkYXRlZF9hdCBhcyBpZiB0aGV5IHdlcmUgcXVlcmllcyBvbiBjcmVhdGVkQXQgYW5kIHVwZGF0ZWRBdCxcbiAgICAgICAgICAvLyBzbyBkdXBsaWNhdGUgdGhhdCBiZWhhdmlvciBoZXJlLiBJZiBib3RoIGFyZSBzcGVjaWZpZWQsIHRoZSBjb3JyZWN0IGJlaGF2aW9yIHRvIG1hdGNoIFBhcnNlLmNvbSBpcyB0b1xuICAgICAgICAgIC8vIHVzZSB0aGUgb25lIHRoYXQgYXBwZWFycyBmaXJzdCBpbiB0aGUgc29ydCBsaXN0LlxuICAgICAgICAgIGlmIChzb3J0Ll9jcmVhdGVkX2F0KSB7XG4gICAgICAgICAgICBzb3J0LmNyZWF0ZWRBdCA9IHNvcnQuX2NyZWF0ZWRfYXQ7XG4gICAgICAgICAgICBkZWxldGUgc29ydC5fY3JlYXRlZF9hdDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHNvcnQuX3VwZGF0ZWRfYXQpIHtcbiAgICAgICAgICAgIHNvcnQudXBkYXRlZEF0ID0gc29ydC5fdXBkYXRlZF9hdDtcbiAgICAgICAgICAgIGRlbGV0ZSBzb3J0Ll91cGRhdGVkX2F0O1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBxdWVyeU9wdGlvbnMgPSB7XG4gICAgICAgICAgICBza2lwLFxuICAgICAgICAgICAgbGltaXQsXG4gICAgICAgICAgICBzb3J0LFxuICAgICAgICAgICAga2V5cyxcbiAgICAgICAgICAgIHJlYWRQcmVmZXJlbmNlLFxuICAgICAgICAgICAgaGludCxcbiAgICAgICAgICAgIGNhc2VJbnNlbnNpdGl2ZSxcbiAgICAgICAgICAgIGV4cGxhaW4sXG4gICAgICAgICAgfTtcbiAgICAgICAgICBPYmplY3Qua2V5cyhzb3J0KS5mb3JFYWNoKGZpZWxkTmFtZSA9PiB7XG4gICAgICAgICAgICBpZiAoZmllbGROYW1lLm1hdGNoKC9eYXV0aERhdGFcXC4oW2EtekEtWjAtOV9dKylcXC5pZCQvKSkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgUGFyc2UuRXJyb3IoUGFyc2UuRXJyb3IuSU5WQUxJRF9LRVlfTkFNRSwgYENhbm5vdCBzb3J0IGJ5ICR7ZmllbGROYW1lfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgcm9vdEZpZWxkTmFtZSA9IGdldFJvb3RGaWVsZE5hbWUoZmllbGROYW1lKTtcbiAgICAgICAgICAgIGlmICghU2NoZW1hQ29udHJvbGxlci5maWVsZE5hbWVJc1ZhbGlkKHJvb3RGaWVsZE5hbWUsIGNsYXNzTmFtZSkpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IFBhcnNlLkVycm9yKFxuICAgICAgICAgICAgICAgIFBhcnNlLkVycm9yLklOVkFMSURfS0VZX05BTUUsXG4gICAgICAgICAgICAgICAgYEludmFsaWQgZmllbGQgbmFtZTogJHtmaWVsZE5hbWV9LmBcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghc2NoZW1hLmZpZWxkc1tmaWVsZE5hbWUuc3BsaXQoJy4nKVswXV0gJiYgZmllbGROYW1lICE9PSAnc2NvcmUnKSB7XG4gICAgICAgICAgICAgIGRlbGV0ZSBzb3J0W2ZpZWxkTmFtZV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIChpc01hc3RlclxuICAgICAgICAgICAgPyBQcm9taXNlLnJlc29sdmUoKVxuICAgICAgICAgICAgOiBzY2hlbWFDb250cm9sbGVyLnZhbGlkYXRlUGVybWlzc2lvbihjbGFzc05hbWUsIGFjbEdyb3VwLCBvcClcbiAgICAgICAgICApXG4gICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLnJlZHVjZVJlbGF0aW9uS2V5cyhjbGFzc05hbWUsIHF1ZXJ5LCBxdWVyeU9wdGlvbnMpKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5yZWR1Y2VJblJlbGF0aW9uKGNsYXNzTmFtZSwgcXVlcnksIHNjaGVtYUNvbnRyb2xsZXIpKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICBsZXQgcHJvdGVjdGVkRmllbGRzO1xuICAgICAgICAgICAgICBpZiAoIWlzTWFzdGVyKSB7XG4gICAgICAgICAgICAgICAgcXVlcnkgPSB0aGlzLmFkZFBvaW50ZXJQZXJtaXNzaW9ucyhcbiAgICAgICAgICAgICAgICAgIHNjaGVtYUNvbnRyb2xsZXIsXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICBvcCxcbiAgICAgICAgICAgICAgICAgIHF1ZXJ5LFxuICAgICAgICAgICAgICAgICAgYWNsR3JvdXBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIC8qIERvbid0IHVzZSBwcm9qZWN0aW9ucyB0byBvcHRpbWl6ZSB0aGUgcHJvdGVjdGVkRmllbGRzIHNpbmNlIHRoZSBwcm90ZWN0ZWRGaWVsZHNcbiAgICAgICAgICAgICAgICAgIGJhc2VkIG9uIHBvaW50ZXItcGVybWlzc2lvbnMgYXJlIGRldGVybWluZWQgYWZ0ZXIgcXVlcnlpbmcuIFRoZSBmaWx0ZXJpbmcgY2FuXG4gICAgICAgICAgICAgICAgICBvdmVyd3JpdGUgdGhlIHByb3RlY3RlZCBmaWVsZHMuICovXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkRmllbGRzID0gdGhpcy5hZGRQcm90ZWN0ZWRGaWVsZHMoXG4gICAgICAgICAgICAgICAgICBzY2hlbWFDb250cm9sbGVyLFxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgcXVlcnksXG4gICAgICAgICAgICAgICAgICBhY2xHcm91cCxcbiAgICAgICAgICAgICAgICAgIGF1dGgsXG4gICAgICAgICAgICAgICAgICBxdWVyeU9wdGlvbnNcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICghcXVlcnkpIHtcbiAgICAgICAgICAgICAgICBpZiAob3AgPT09ICdnZXQnKSB7XG4gICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUGFyc2UuRXJyb3IoUGFyc2UuRXJyb3IuT0JKRUNUX05PVF9GT1VORCwgJ09iamVjdCBub3QgZm91bmQuJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKCFpc01hc3Rlcikge1xuICAgICAgICAgICAgICAgIGlmIChvcCA9PT0gJ3VwZGF0ZScgfHwgb3AgPT09ICdkZWxldGUnKSB7XG4gICAgICAgICAgICAgICAgICBxdWVyeSA9IGFkZFdyaXRlQUNMKHF1ZXJ5LCBhY2xHcm91cCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHF1ZXJ5ID0gYWRkUmVhZEFDTChxdWVyeSwgYWNsR3JvdXApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB2YWxpZGF0ZVF1ZXJ5KHF1ZXJ5LCBpc01hc3RlciwgZmFsc2UpO1xuICAgICAgICAgICAgICBpZiAoY291bnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWNsYXNzRXhpc3RzKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWRhcHRlci5jb3VudChcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICBzY2hlbWEsXG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5LFxuICAgICAgICAgICAgICAgICAgICByZWFkUHJlZmVyZW5jZSxcbiAgICAgICAgICAgICAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICBoaW50XG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChkaXN0aW5jdCkge1xuICAgICAgICAgICAgICAgIGlmICghY2xhc3NFeGlzdHMpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWRhcHRlci5kaXN0aW5jdChjbGFzc05hbWUsIHNjaGVtYSwgcXVlcnksIGRpc3RpbmN0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAocGlwZWxpbmUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWNsYXNzRXhpc3RzKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFkYXB0ZXIuYWdncmVnYXRlKFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIHNjaGVtYSxcbiAgICAgICAgICAgICAgICAgICAgcGlwZWxpbmUsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRQcmVmZXJlbmNlLFxuICAgICAgICAgICAgICAgICAgICBoaW50LFxuICAgICAgICAgICAgICAgICAgICBleHBsYWluXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChleHBsYWluKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWRhcHRlci5maW5kKGNsYXNzTmFtZSwgc2NoZW1hLCBxdWVyeSwgcXVlcnlPcHRpb25zKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hZGFwdGVyXG4gICAgICAgICAgICAgICAgICAuZmluZChjbGFzc05hbWUsIHNjaGVtYSwgcXVlcnksIHF1ZXJ5T3B0aW9ucylcbiAgICAgICAgICAgICAgICAgIC50aGVuKG9iamVjdHMgPT5cbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0cy5tYXAob2JqZWN0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBvYmplY3QgPSB1bnRyYW5zZm9ybU9iamVjdEFDTChvYmplY3QpO1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmaWx0ZXJTZW5zaXRpdmVEYXRhKFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNNYXN0ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhY2xHcm91cCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dGgsXG4gICAgICAgICAgICAgICAgICAgICAgICBvcCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjaGVtYUNvbnRyb2xsZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm90ZWN0ZWRGaWVsZHMsXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RcbiAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFBhcnNlLkVycm9yKFBhcnNlLkVycm9yLklOVEVSTkFMX1NFUlZFUl9FUlJPUiwgZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGRlbGV0ZVNjaGVtYShjbGFzc05hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxldCBzY2hlbWFDb250cm9sbGVyO1xuICAgIHJldHVybiB0aGlzLmxvYWRTY2hlbWEoeyBjbGVhckNhY2hlOiB0cnVlIH0pXG4gICAgICAudGhlbihzID0+IHtcbiAgICAgICAgc2NoZW1hQ29udHJvbGxlciA9IHM7XG4gICAgICAgIHJldHVybiBzY2hlbWFDb250cm9sbGVyLmdldE9uZVNjaGVtYShjbGFzc05hbWUsIHRydWUpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGlmIChlcnJvciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuIHsgZmllbGRzOiB7fSB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLnRoZW4oKHNjaGVtYTogYW55KSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbGxlY3Rpb25FeGlzdHMoY2xhc3NOYW1lKVxuICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuYWRhcHRlci5jb3VudChjbGFzc05hbWUsIHsgZmllbGRzOiB7fSB9LCBudWxsLCAnJywgZmFsc2UpKVxuICAgICAgICAgIC50aGVuKGNvdW50ID0+IHtcbiAgICAgICAgICAgIGlmIChjb3VudCA+IDApIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IFBhcnNlLkVycm9yKFxuICAgICAgICAgICAgICAgIDI1NSxcbiAgICAgICAgICAgICAgICBgQ2xhc3MgJHtjbGFzc05hbWV9IGlzIG5vdCBlbXB0eSwgY29udGFpbnMgJHtjb3VudH0gb2JqZWN0cywgY2Fubm90IGRyb3Agc2NoZW1hLmBcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFkYXB0ZXIuZGVsZXRlQ2xhc3MoY2xhc3NOYW1lKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC50aGVuKHdhc1BhcnNlQ29sbGVjdGlvbiA9PiB7XG4gICAgICAgICAgICBpZiAod2FzUGFyc2VDb2xsZWN0aW9uKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHJlbGF0aW9uRmllbGROYW1lcyA9IE9iamVjdC5rZXlzKHNjaGVtYS5maWVsZHMpLmZpbHRlcihcbiAgICAgICAgICAgICAgICBmaWVsZE5hbWUgPT4gc2NoZW1hLmZpZWxkc1tmaWVsZE5hbWVdLnR5cGUgPT09ICdSZWxhdGlvbidcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFxuICAgICAgICAgICAgICAgIHJlbGF0aW9uRmllbGROYW1lcy5tYXAobmFtZSA9PlxuICAgICAgICAgICAgICAgICAgdGhpcy5hZGFwdGVyLmRlbGV0ZUNsYXNzKGpvaW5UYWJsZU5hbWUoY2xhc3NOYW1lLCBuYW1lKSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgU2NoZW1hQ2FjaGUuZGVsKGNsYXNzTmFtZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNjaGVtYUNvbnRyb2xsZXIucmVsb2FkRGF0YSgpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLy8gVGhpcyBoZWxwcyB0byBjcmVhdGUgaW50ZXJtZWRpYXRlIG9iamVjdHMgZm9yIHNpbXBsZXIgY29tcGFyaXNvbiBvZlxuICAvLyBrZXkgdmFsdWUgcGFpcnMgdXNlZCBpbiBxdWVyeSBvYmplY3RzLiBFYWNoIGtleSB2YWx1ZSBwYWlyIHdpbGwgcmVwcmVzZW50ZWRcbiAgLy8gaW4gYSBzaW1pbGFyIHdheSB0byBqc29uXG4gIG9iamVjdFRvRW50cmllc1N0cmluZ3MocXVlcnk6IGFueSk6IEFycmF5PHN0cmluZz4ge1xuICAgIHJldHVybiBPYmplY3QuZW50cmllcyhxdWVyeSkubWFwKGEgPT4gYS5tYXAocyA9PiBKU09OLnN0cmluZ2lmeShzKSkuam9pbignOicpKTtcbiAgfVxuXG4gIC8vIE5haXZlIGxvZ2ljIHJlZHVjZXIgZm9yIE9SIG9wZXJhdGlvbnMgbWVhbnQgdG8gYmUgdXNlZCBvbmx5IGZvciBwb2ludGVyIHBlcm1pc3Npb25zLlxuICByZWR1Y2VPck9wZXJhdGlvbihxdWVyeTogeyAkb3I6IEFycmF5PGFueT4gfSk6IGFueSB7XG4gICAgaWYgKCFxdWVyeS4kb3IpIHtcbiAgICAgIHJldHVybiBxdWVyeTtcbiAgICB9XG4gICAgY29uc3QgcXVlcmllcyA9IHF1ZXJ5LiRvci5tYXAocSA9PiB0aGlzLm9iamVjdFRvRW50cmllc1N0cmluZ3MocSkpO1xuICAgIGxldCByZXBlYXQgPSBmYWxzZTtcbiAgICBkbyB7XG4gICAgICByZXBlYXQgPSBmYWxzZTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcXVlcmllcy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IGkgKyAxOyBqIDwgcXVlcmllcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGNvbnN0IFtzaG9ydGVyLCBsb25nZXJdID0gcXVlcmllc1tpXS5sZW5ndGggPiBxdWVyaWVzW2pdLmxlbmd0aCA/IFtqLCBpXSA6IFtpLCBqXTtcbiAgICAgICAgICBjb25zdCBmb3VuZEVudHJpZXMgPSBxdWVyaWVzW3Nob3J0ZXJdLnJlZHVjZShcbiAgICAgICAgICAgIChhY2MsIGVudHJ5KSA9PiBhY2MgKyAocXVlcmllc1tsb25nZXJdLmluY2x1ZGVzKGVudHJ5KSA/IDEgOiAwKSxcbiAgICAgICAgICAgIDBcbiAgICAgICAgICApO1xuICAgICAgICAgIGNvbnN0IHNob3J0ZXJFbnRyaWVzID0gcXVlcmllc1tzaG9ydGVyXS5sZW5ndGg7XG4gICAgICAgICAgaWYgKGZvdW5kRW50cmllcyA9PT0gc2hvcnRlckVudHJpZXMpIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSBzaG9ydGVyIHF1ZXJ5IGlzIGNvbXBsZXRlbHkgY29udGFpbmVkIGluIHRoZSBsb25nZXIgb25lLCB3ZSBjYW4gc3RyaWtlXG4gICAgICAgICAgICAvLyBvdXQgdGhlIGxvbmdlciBxdWVyeS5cbiAgICAgICAgICAgIHF1ZXJ5LiRvci5zcGxpY2UobG9uZ2VyLCAxKTtcbiAgICAgICAgICAgIHF1ZXJpZXMuc3BsaWNlKGxvbmdlciwgMSk7XG4gICAgICAgICAgICByZXBlYXQgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSB3aGlsZSAocmVwZWF0KTtcbiAgICBpZiAocXVlcnkuJG9yLmxlbmd0aCA9PT0gMSkge1xuICAgICAgcXVlcnkgPSB7IC4uLnF1ZXJ5LCAuLi5xdWVyeS4kb3JbMF0gfTtcbiAgICAgIGRlbGV0ZSBxdWVyeS4kb3I7XG4gICAgfVxuICAgIHJldHVybiBxdWVyeTtcbiAgfVxuXG4gIC8vIE5haXZlIGxvZ2ljIHJlZHVjZXIgZm9yIEFORCBvcGVyYXRpb25zIG1lYW50IHRvIGJlIHVzZWQgb25seSBmb3IgcG9pbnRlciBwZXJtaXNzaW9ucy5cbiAgcmVkdWNlQW5kT3BlcmF0aW9uKHF1ZXJ5OiB7ICRhbmQ6IEFycmF5PGFueT4gfSk6IGFueSB7XG4gICAgaWYgKCFxdWVyeS4kYW5kKSB7XG4gICAgICByZXR1cm4gcXVlcnk7XG4gICAgfVxuICAgIGNvbnN0IHF1ZXJpZXMgPSBxdWVyeS4kYW5kLm1hcChxID0+IHRoaXMub2JqZWN0VG9FbnRyaWVzU3RyaW5ncyhxKSk7XG4gICAgbGV0IHJlcGVhdCA9IGZhbHNlO1xuICAgIGRvIHtcbiAgICAgIHJlcGVhdCA9IGZhbHNlO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBxdWVyaWVzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICBmb3IgKGxldCBqID0gaSArIDE7IGogPCBxdWVyaWVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgY29uc3QgW3Nob3J0ZXIsIGxvbmdlcl0gPSBxdWVyaWVzW2ldLmxlbmd0aCA+IHF1ZXJpZXNbal0ubGVuZ3RoID8gW2osIGldIDogW2ksIGpdO1xuICAgICAgICAgIGNvbnN0IGZvdW5kRW50cmllcyA9IHF1ZXJpZXNbc2hvcnRlcl0ucmVkdWNlKFxuICAgICAgICAgICAgKGFjYywgZW50cnkpID0+IGFjYyArIChxdWVyaWVzW2xvbmdlcl0uaW5jbHVkZXMoZW50cnkpID8gMSA6IDApLFxuICAgICAgICAgICAgMFxuICAgICAgICAgICk7XG4gICAgICAgICAgY29uc3Qgc2hvcnRlckVudHJpZXMgPSBxdWVyaWVzW3Nob3J0ZXJdLmxlbmd0aDtcbiAgICAgICAgICBpZiAoZm91bmRFbnRyaWVzID09PSBzaG9ydGVyRW50cmllcykge1xuICAgICAgICAgICAgLy8gSWYgdGhlIHNob3J0ZXIgcXVlcnkgaXMgY29tcGxldGVseSBjb250YWluZWQgaW4gdGhlIGxvbmdlciBvbmUsIHdlIGNhbiBzdHJpa2VcbiAgICAgICAgICAgIC8vIG91dCB0aGUgc2hvcnRlciBxdWVyeS5cbiAgICAgICAgICAgIHF1ZXJ5LiRhbmQuc3BsaWNlKHNob3J0ZXIsIDEpO1xuICAgICAgICAgICAgcXVlcmllcy5zcGxpY2Uoc2hvcnRlciwgMSk7XG4gICAgICAgICAgICByZXBlYXQgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSB3aGlsZSAocmVwZWF0KTtcbiAgICBpZiAocXVlcnkuJGFuZC5sZW5ndGggPT09IDEpIHtcbiAgICAgIHF1ZXJ5ID0geyAuLi5xdWVyeSwgLi4ucXVlcnkuJGFuZFswXSB9O1xuICAgICAgZGVsZXRlIHF1ZXJ5LiRhbmQ7XG4gICAgfVxuICAgIHJldHVybiBxdWVyeTtcbiAgfVxuXG4gIC8vIENvbnN0cmFpbnRzIHF1ZXJ5IHVzaW5nIENMUCdzIHBvaW50ZXIgcGVybWlzc2lvbnMgKFBQKSBpZiBhbnkuXG4gIC8vIDEuIEV0cmFjdCB0aGUgdXNlciBpZCBmcm9tIGNhbGxlcidzIEFDTGdyb3VwO1xuICAvLyAyLiBFeGN0cmFjdCBhIGxpc3Qgb2YgZmllbGQgbmFtZXMgdGhhdCBhcmUgUFAgZm9yIHRhcmdldCBjb2xsZWN0aW9uIGFuZCBvcGVyYXRpb247XG4gIC8vIDMuIENvbnN0cmFpbnQgdGhlIG9yaWdpbmFsIHF1ZXJ5IHNvIHRoYXQgZWFjaCBQUCBmaWVsZCBtdXN0XG4gIC8vIHBvaW50IHRvIGNhbGxlcidzIGlkIChvciBjb250YWluIGl0IGluIGNhc2Ugb2YgUFAgZmllbGQgYmVpbmcgYW4gYXJyYXkpXG4gIGFkZFBvaW50ZXJQZXJtaXNzaW9ucyhcbiAgICBzY2hlbWE6IFNjaGVtYUNvbnRyb2xsZXIuU2NoZW1hQ29udHJvbGxlcixcbiAgICBjbGFzc05hbWU6IHN0cmluZyxcbiAgICBvcGVyYXRpb246IHN0cmluZyxcbiAgICBxdWVyeTogYW55LFxuICAgIGFjbEdyb3VwOiBhbnlbXSA9IFtdXG4gICk6IGFueSB7XG4gICAgLy8gQ2hlY2sgaWYgY2xhc3MgaGFzIHB1YmxpYyBwZXJtaXNzaW9uIGZvciBvcGVyYXRpb25cbiAgICAvLyBJZiB0aGUgQmFzZUNMUCBwYXNzLCBsZXQgZ28gdGhyb3VnaFxuICAgIGlmIChzY2hlbWEudGVzdFBlcm1pc3Npb25zRm9yQ2xhc3NOYW1lKGNsYXNzTmFtZSwgYWNsR3JvdXAsIG9wZXJhdGlvbikpIHtcbiAgICAgIHJldHVybiBxdWVyeTtcbiAgICB9XG4gICAgY29uc3QgcGVybXMgPSBzY2hlbWEuZ2V0Q2xhc3NMZXZlbFBlcm1pc3Npb25zKGNsYXNzTmFtZSk7XG5cbiAgICBjb25zdCB1c2VyQUNMID0gYWNsR3JvdXAuZmlsdGVyKGFjbCA9PiB7XG4gICAgICByZXR1cm4gYWNsLmluZGV4T2YoJ3JvbGU6JykgIT0gMCAmJiBhY2wgIT0gJyonO1xuICAgIH0pO1xuXG4gICAgY29uc3QgZ3JvdXBLZXkgPVxuICAgICAgWydnZXQnLCAnZmluZCcsICdjb3VudCddLmluZGV4T2Yob3BlcmF0aW9uKSA+IC0xID8gJ3JlYWRVc2VyRmllbGRzJyA6ICd3cml0ZVVzZXJGaWVsZHMnO1xuXG4gICAgY29uc3QgcGVybUZpZWxkcyA9IFtdO1xuXG4gICAgaWYgKHBlcm1zW29wZXJhdGlvbl0gJiYgcGVybXNbb3BlcmF0aW9uXS5wb2ludGVyRmllbGRzKSB7XG4gICAgICBwZXJtRmllbGRzLnB1c2goLi4ucGVybXNbb3BlcmF0aW9uXS5wb2ludGVyRmllbGRzKTtcbiAgICB9XG5cbiAgICBpZiAocGVybXNbZ3JvdXBLZXldKSB7XG4gICAgICBmb3IgKGNvbnN0IGZpZWxkIG9mIHBlcm1zW2dyb3VwS2V5XSkge1xuICAgICAgICBpZiAoIXBlcm1GaWVsZHMuaW5jbHVkZXMoZmllbGQpKSB7XG4gICAgICAgICAgcGVybUZpZWxkcy5wdXNoKGZpZWxkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyB0aGUgQUNMIHNob3VsZCBoYXZlIGV4YWN0bHkgMSB1c2VyXG4gICAgaWYgKHBlcm1GaWVsZHMubGVuZ3RoID4gMCkge1xuICAgICAgLy8gdGhlIEFDTCBzaG91bGQgaGF2ZSBleGFjdGx5IDEgdXNlclxuICAgICAgLy8gTm8gdXNlciBzZXQgcmV0dXJuIHVuZGVmaW5lZFxuICAgICAgLy8gSWYgdGhlIGxlbmd0aCBpcyA+IDEsIHRoYXQgbWVhbnMgd2UgZGlkbid0IGRlLWR1cGUgdXNlcnMgY29ycmVjdGx5XG4gICAgICBpZiAodXNlckFDTC5sZW5ndGggIT0gMSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCB1c2VySWQgPSB1c2VyQUNMWzBdO1xuICAgICAgY29uc3QgdXNlclBvaW50ZXIgPSB7XG4gICAgICAgIF9fdHlwZTogJ1BvaW50ZXInLFxuICAgICAgICBjbGFzc05hbWU6ICdfVXNlcicsXG4gICAgICAgIG9iamVjdElkOiB1c2VySWQsXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBxdWVyaWVzID0gcGVybUZpZWxkcy5tYXAoa2V5ID0+IHtcbiAgICAgICAgY29uc3QgZmllbGREZXNjcmlwdG9yID0gc2NoZW1hLmdldEV4cGVjdGVkVHlwZShjbGFzc05hbWUsIGtleSk7XG4gICAgICAgIGNvbnN0IGZpZWxkVHlwZSA9XG4gICAgICAgICAgZmllbGREZXNjcmlwdG9yICYmXG4gICAgICAgICAgdHlwZW9mIGZpZWxkRGVzY3JpcHRvciA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAgICBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZmllbGREZXNjcmlwdG9yLCAndHlwZScpXG4gICAgICAgICAgICA/IGZpZWxkRGVzY3JpcHRvci50eXBlXG4gICAgICAgICAgICA6IG51bGw7XG5cbiAgICAgICAgbGV0IHF1ZXJ5Q2xhdXNlO1xuXG4gICAgICAgIGlmIChmaWVsZFR5cGUgPT09ICdQb2ludGVyJykge1xuICAgICAgICAgIC8vIGNvbnN0cmFpbnQgZm9yIHNpbmdsZSBwb2ludGVyIHNldHVwXG4gICAgICAgICAgcXVlcnlDbGF1c2UgPSB7IFtrZXldOiB1c2VyUG9pbnRlciB9O1xuICAgICAgICB9IGVsc2UgaWYgKGZpZWxkVHlwZSA9PT0gJ0FycmF5Jykge1xuICAgICAgICAgIC8vIGNvbnN0cmFpbnQgZm9yIHVzZXJzLWFycmF5IHNldHVwXG4gICAgICAgICAgcXVlcnlDbGF1c2UgPSB7IFtrZXldOiB7ICRhbGw6IFt1c2VyUG9pbnRlcl0gfSB9O1xuICAgICAgICB9IGVsc2UgaWYgKGZpZWxkVHlwZSA9PT0gJ09iamVjdCcpIHtcbiAgICAgICAgICAvLyBjb25zdHJhaW50IGZvciBvYmplY3Qgc2V0dXBcbiAgICAgICAgICBxdWVyeUNsYXVzZSA9IHsgW2tleV06IHVzZXJQb2ludGVyIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gVGhpcyBtZWFucyB0aGF0IHRoZXJlIGlzIGEgQ0xQIGZpZWxkIG9mIGFuIHVuZXhwZWN0ZWQgdHlwZS4gVGhpcyBjb25kaXRpb24gc2hvdWxkIG5vdCBoYXBwZW4sIHdoaWNoIGlzXG4gICAgICAgICAgLy8gd2h5IGlzIGJlaW5nIHRyZWF0ZWQgYXMgYW4gZXJyb3IuXG4gICAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgICBgQW4gdW5leHBlY3RlZCBjb25kaXRpb24gb2NjdXJyZWQgd2hlbiByZXNvbHZpbmcgcG9pbnRlciBwZXJtaXNzaW9uczogJHtjbGFzc05hbWV9ICR7a2V5fWBcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIC8vIGlmIHdlIGFscmVhZHkgaGF2ZSBhIGNvbnN0cmFpbnQgb24gdGhlIGtleSwgdXNlIHRoZSAkYW5kXG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocXVlcnksIGtleSkpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5yZWR1Y2VBbmRPcGVyYXRpb24oeyAkYW5kOiBbcXVlcnlDbGF1c2UsIHF1ZXJ5XSB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBvdGhlcndpc2UganVzdCBhZGQgdGhlIGNvbnN0YWludFxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgcXVlcnksIHF1ZXJ5Q2xhdXNlKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gcXVlcmllcy5sZW5ndGggPT09IDEgPyBxdWVyaWVzWzBdIDogdGhpcy5yZWR1Y2VPck9wZXJhdGlvbih7ICRvcjogcXVlcmllcyB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHF1ZXJ5O1xuICAgIH1cbiAgfVxuXG4gIGFkZFByb3RlY3RlZEZpZWxkcyhcbiAgICBzY2hlbWE6IFNjaGVtYUNvbnRyb2xsZXIuU2NoZW1hQ29udHJvbGxlciB8IGFueSxcbiAgICBjbGFzc05hbWU6IHN0cmluZyxcbiAgICBxdWVyeTogYW55ID0ge30sXG4gICAgYWNsR3JvdXA6IGFueVtdID0gW10sXG4gICAgYXV0aDogYW55ID0ge30sXG4gICAgcXVlcnlPcHRpb25zOiBGdWxsUXVlcnlPcHRpb25zID0ge31cbiAgKTogbnVsbCB8IHN0cmluZ1tdIHtcbiAgICBjb25zdCBwZXJtcyA9XG4gICAgICBzY2hlbWEgJiYgc2NoZW1hLmdldENsYXNzTGV2ZWxQZXJtaXNzaW9uc1xuICAgICAgICA/IHNjaGVtYS5nZXRDbGFzc0xldmVsUGVybWlzc2lvbnMoY2xhc3NOYW1lKVxuICAgICAgICA6IHNjaGVtYTtcbiAgICBpZiAoIXBlcm1zKSByZXR1cm4gbnVsbDtcblxuICAgIGNvbnN0IHByb3RlY3RlZEZpZWxkcyA9IHBlcm1zLnByb3RlY3RlZEZpZWxkcztcbiAgICBpZiAoIXByb3RlY3RlZEZpZWxkcykgcmV0dXJuIG51bGw7XG5cbiAgICBpZiAoYWNsR3JvdXAuaW5kZXhPZihxdWVyeS5vYmplY3RJZCkgPiAtMSkgcmV0dXJuIG51bGw7XG5cbiAgICAvLyBmb3IgcXVlcmllcyB3aGVyZSBcImtleXNcIiBhcmUgc2V0IGFuZCBkbyBub3QgaW5jbHVkZSBhbGwgJ3VzZXJGaWVsZCc6e2ZpZWxkfSxcbiAgICAvLyB3ZSBoYXZlIHRvIHRyYW5zcGFyZW50bHkgaW5jbHVkZSBpdCwgYW5kIHRoZW4gcmVtb3ZlIGJlZm9yZSByZXR1cm5pbmcgdG8gY2xpZW50XG4gICAgLy8gQmVjYXVzZSBpZiBzdWNoIGtleSBub3QgcHJvamVjdGVkIHRoZSBwZXJtaXNzaW9uIHdvbid0IGJlIGVuZm9yY2VkIHByb3Blcmx5XG4gICAgLy8gUFMgdGhpcyBpcyBjYWxsZWQgd2hlbiAnZXhjbHVkZUtleXMnIGFscmVhZHkgcmVkdWNlZCB0byAna2V5cydcbiAgICBjb25zdCBwcmVzZXJ2ZUtleXMgPSBxdWVyeU9wdGlvbnMua2V5cztcblxuICAgIC8vIHRoZXNlIGFyZSBrZXlzIHRoYXQgbmVlZCB0byBiZSBpbmNsdWRlZCBvbmx5XG4gICAgLy8gdG8gYmUgYWJsZSB0byBhcHBseSBwcm90ZWN0ZWRGaWVsZHMgYnkgcG9pbnRlclxuICAgIC8vIGFuZCB0aGVuIHVuc2V0IGJlZm9yZSByZXR1cm5pbmcgdG8gY2xpZW50IChsYXRlciBpbiAgZmlsdGVyU2Vuc2l0aXZlRmllbGRzKVxuICAgIGNvbnN0IHNlcnZlck9ubHlLZXlzID0gW107XG5cbiAgICBjb25zdCBhdXRoZW50aWNhdGVkID0gYXV0aC51c2VyO1xuXG4gICAgLy8gbWFwIHRvIGFsbG93IGNoZWNrIHdpdGhvdXQgYXJyYXkgc2VhcmNoXG4gICAgY29uc3Qgcm9sZXMgPSAoYXV0aC51c2VyUm9sZXMgfHwgW10pLnJlZHVjZSgoYWNjLCByKSA9PiB7XG4gICAgICBhY2Nbcl0gPSBwcm90ZWN0ZWRGaWVsZHNbcl07XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcblxuICAgIC8vIGFycmF5IG9mIHNldHMgb2YgcHJvdGVjdGVkIGZpZWxkcy4gc2VwYXJhdGUgaXRlbSBmb3IgZWFjaCBhcHBsaWNhYmxlIGNyaXRlcmlhXG4gICAgY29uc3QgcHJvdGVjdGVkS2V5c1NldHMgPSBbXTtcblxuICAgIGZvciAoY29uc3Qga2V5IGluIHByb3RlY3RlZEZpZWxkcykge1xuICAgICAgLy8gc2tpcCB1c2VyRmllbGRzXG4gICAgICBpZiAoa2V5LnN0YXJ0c1dpdGgoJ3VzZXJGaWVsZDonKSkge1xuICAgICAgICBpZiAocHJlc2VydmVLZXlzKSB7XG4gICAgICAgICAgY29uc3QgZmllbGROYW1lID0ga2V5LnN1YnN0cmluZygxMCk7XG4gICAgICAgICAgaWYgKCFwcmVzZXJ2ZUtleXMuaW5jbHVkZXMoZmllbGROYW1lKSkge1xuICAgICAgICAgICAgLy8gMS4gcHV0IGl0IHRoZXJlIHRlbXBvcmFyaWx5XG4gICAgICAgICAgICBxdWVyeU9wdGlvbnMua2V5cyAmJiBxdWVyeU9wdGlvbnMua2V5cy5wdXNoKGZpZWxkTmFtZSk7XG4gICAgICAgICAgICAvLyAyLiBwcmVzZXJ2ZSBpdCBkZWxldGUgbGF0ZXJcbiAgICAgICAgICAgIHNlcnZlck9ubHlLZXlzLnB1c2goZmllbGROYW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIGFkZCBwdWJsaWMgdGllclxuICAgICAgaWYgKGtleSA9PT0gJyonKSB7XG4gICAgICAgIHByb3RlY3RlZEtleXNTZXRzLnB1c2gocHJvdGVjdGVkRmllbGRzW2tleV0pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGF1dGhlbnRpY2F0ZWQpIHtcbiAgICAgICAgaWYgKGtleSA9PT0gJ2F1dGhlbnRpY2F0ZWQnKSB7XG4gICAgICAgICAgLy8gZm9yIGxvZ2dlZCBpbiB1c2Vyc1xuICAgICAgICAgIHByb3RlY3RlZEtleXNTZXRzLnB1c2gocHJvdGVjdGVkRmllbGRzW2tleV0pO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJvbGVzW2tleV0gJiYga2V5LnN0YXJ0c1dpdGgoJ3JvbGU6JykpIHtcbiAgICAgICAgICAvLyBhZGQgYXBwbGljYWJsZSByb2xlc1xuICAgICAgICAgIHByb3RlY3RlZEtleXNTZXRzLnB1c2gocm9sZXNba2V5XSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBjaGVjayBpZiB0aGVyZSdzIGEgcnVsZSBmb3IgY3VycmVudCB1c2VyJ3MgaWRcbiAgICBpZiAoYXV0aGVudGljYXRlZCkge1xuICAgICAgY29uc3QgdXNlcklkID0gYXV0aC51c2VyLmlkO1xuICAgICAgaWYgKHBlcm1zLnByb3RlY3RlZEZpZWxkc1t1c2VySWRdKSB7XG4gICAgICAgIHByb3RlY3RlZEtleXNTZXRzLnB1c2gocGVybXMucHJvdGVjdGVkRmllbGRzW3VzZXJJZF0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHByZXNlcnZlIGZpZWxkcyB0byBiZSByZW1vdmVkIGJlZm9yZSBzZW5kaW5nIHJlc3BvbnNlIHRvIGNsaWVudFxuICAgIGlmIChzZXJ2ZXJPbmx5S2V5cy5sZW5ndGggPiAwKSB7XG4gICAgICBwZXJtcy5wcm90ZWN0ZWRGaWVsZHMudGVtcG9yYXJ5S2V5cyA9IHNlcnZlck9ubHlLZXlzO1xuICAgIH1cblxuICAgIGxldCBwcm90ZWN0ZWRLZXlzID0gcHJvdGVjdGVkS2V5c1NldHMucmVkdWNlKChhY2MsIG5leHQpID0+IHtcbiAgICAgIGlmIChuZXh0KSB7XG4gICAgICAgIGFjYy5wdXNoKC4uLm5leHQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCBbXSk7XG5cbiAgICAvLyBpbnRlcnNlY3QgYWxsIHNldHMgb2YgcHJvdGVjdGVkRmllbGRzXG4gICAgcHJvdGVjdGVkS2V5c1NldHMuZm9yRWFjaChmaWVsZHMgPT4ge1xuICAgICAgaWYgKGZpZWxkcykge1xuICAgICAgICBwcm90ZWN0ZWRLZXlzID0gcHJvdGVjdGVkS2V5cy5maWx0ZXIodiA9PiBmaWVsZHMuaW5jbHVkZXModikpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHByb3RlY3RlZEtleXM7XG4gIH1cblxuICBjcmVhdGVUcmFuc2FjdGlvbmFsU2Vzc2lvbigpIHtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyLmNyZWF0ZVRyYW5zYWN0aW9uYWxTZXNzaW9uKCkudGhlbih0cmFuc2FjdGlvbmFsU2Vzc2lvbiA9PiB7XG4gICAgICB0aGlzLl90cmFuc2FjdGlvbmFsU2Vzc2lvbiA9IHRyYW5zYWN0aW9uYWxTZXNzaW9uO1xuICAgIH0pO1xuICB9XG5cbiAgY29tbWl0VHJhbnNhY3Rpb25hbFNlc3Npb24oKSB7XG4gICAgaWYgKCF0aGlzLl90cmFuc2FjdGlvbmFsU2Vzc2lvbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGVyZSBpcyBubyB0cmFuc2FjdGlvbmFsIHNlc3Npb24gdG8gY29tbWl0Jyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmFkYXB0ZXIuY29tbWl0VHJhbnNhY3Rpb25hbFNlc3Npb24odGhpcy5fdHJhbnNhY3Rpb25hbFNlc3Npb24pLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5fdHJhbnNhY3Rpb25hbFNlc3Npb24gPSBudWxsO1xuICAgIH0pO1xuICB9XG5cbiAgYWJvcnRUcmFuc2FjdGlvbmFsU2Vzc2lvbigpIHtcbiAgICBpZiAoIXRoaXMuX3RyYW5zYWN0aW9uYWxTZXNzaW9uKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZXJlIGlzIG5vIHRyYW5zYWN0aW9uYWwgc2Vzc2lvbiB0byBhYm9ydCcpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyLmFib3J0VHJhbnNhY3Rpb25hbFNlc3Npb24odGhpcy5fdHJhbnNhY3Rpb25hbFNlc3Npb24pLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5fdHJhbnNhY3Rpb25hbFNlc3Npb24gPSBudWxsO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gVE9ETzogY3JlYXRlIGluZGV4ZXMgb24gZmlyc3QgY3JlYXRpb24gb2YgYSBfVXNlciBvYmplY3QuIE90aGVyd2lzZSBpdCdzIGltcG9zc2libGUgdG9cbiAgLy8gaGF2ZSBhIFBhcnNlIGFwcCB3aXRob3V0IGl0IGhhdmluZyBhIF9Vc2VyIGNvbGxlY3Rpb24uXG4gIGFzeW5jIHBlcmZvcm1Jbml0aWFsaXphdGlvbigpIHtcbiAgICBhd2FpdCB0aGlzLmFkYXB0ZXIucGVyZm9ybUluaXRpYWxpemF0aW9uKHtcbiAgICAgIFZvbGF0aWxlQ2xhc3Nlc1NjaGVtYXM6IFNjaGVtYUNvbnRyb2xsZXIuVm9sYXRpbGVDbGFzc2VzU2NoZW1hcyxcbiAgICB9KTtcbiAgICBjb25zdCByZXF1aXJlZFVzZXJGaWVsZHMgPSB7XG4gICAgICBmaWVsZHM6IHtcbiAgICAgICAgLi4uU2NoZW1hQ29udHJvbGxlci5kZWZhdWx0Q29sdW1ucy5fRGVmYXVsdCxcbiAgICAgICAgLi4uU2NoZW1hQ29udHJvbGxlci5kZWZhdWx0Q29sdW1ucy5fVXNlcixcbiAgICAgIH0sXG4gICAgfTtcbiAgICBjb25zdCByZXF1aXJlZFJvbGVGaWVsZHMgPSB7XG4gICAgICBmaWVsZHM6IHtcbiAgICAgICAgLi4uU2NoZW1hQ29udHJvbGxlci5kZWZhdWx0Q29sdW1ucy5fRGVmYXVsdCxcbiAgICAgICAgLi4uU2NoZW1hQ29udHJvbGxlci5kZWZhdWx0Q29sdW1ucy5fUm9sZSxcbiAgICAgIH0sXG4gICAgfTtcbiAgICBjb25zdCByZXF1aXJlZElkZW1wb3RlbmN5RmllbGRzID0ge1xuICAgICAgZmllbGRzOiB7XG4gICAgICAgIC4uLlNjaGVtYUNvbnRyb2xsZXIuZGVmYXVsdENvbHVtbnMuX0RlZmF1bHQsXG4gICAgICAgIC4uLlNjaGVtYUNvbnRyb2xsZXIuZGVmYXVsdENvbHVtbnMuX0lkZW1wb3RlbmN5LFxuICAgICAgfSxcbiAgICB9O1xuICAgIGF3YWl0IHRoaXMubG9hZFNjaGVtYSgpLnRoZW4oc2NoZW1hID0+IHNjaGVtYS5lbmZvcmNlQ2xhc3NFeGlzdHMoJ19Vc2VyJykpO1xuICAgIGF3YWl0IHRoaXMubG9hZFNjaGVtYSgpLnRoZW4oc2NoZW1hID0+IHNjaGVtYS5lbmZvcmNlQ2xhc3NFeGlzdHMoJ19Sb2xlJykpO1xuICAgIGF3YWl0IHRoaXMubG9hZFNjaGVtYSgpLnRoZW4oc2NoZW1hID0+IHNjaGVtYS5lbmZvcmNlQ2xhc3NFeGlzdHMoJ19JZGVtcG90ZW5jeScpKTtcblxuICAgIGF3YWl0IHRoaXMuYWRhcHRlci5lbnN1cmVVbmlxdWVuZXNzKCdfVXNlcicsIHJlcXVpcmVkVXNlckZpZWxkcywgWyd1c2VybmFtZSddKS5jYXRjaChlcnJvciA9PiB7XG4gICAgICBsb2dnZXIud2FybignVW5hYmxlIHRvIGVuc3VyZSB1bmlxdWVuZXNzIGZvciB1c2VybmFtZXM6ICcsIGVycm9yKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH0pO1xuXG4gICAgYXdhaXQgdGhpcy5hZGFwdGVyXG4gICAgICAuZW5zdXJlSW5kZXgoJ19Vc2VyJywgcmVxdWlyZWRVc2VyRmllbGRzLCBbJ3VzZXJuYW1lJ10sICdjYXNlX2luc2Vuc2l0aXZlX3VzZXJuYW1lJywgdHJ1ZSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGxvZ2dlci53YXJuKCdVbmFibGUgdG8gY3JlYXRlIGNhc2UgaW5zZW5zaXRpdmUgdXNlcm5hbWUgaW5kZXg6ICcsIGVycm9yKTtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9KTtcbiAgICBhd2FpdCB0aGlzLmFkYXB0ZXJcbiAgICAgIC5lbnN1cmVJbmRleCgnX1VzZXInLCByZXF1aXJlZFVzZXJGaWVsZHMsIFsndXNlcm5hbWUnXSwgJ2Nhc2VfaW5zZW5zaXRpdmVfdXNlcm5hbWUnLCB0cnVlKVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgbG9nZ2VyLndhcm4oJ1VuYWJsZSB0byBjcmVhdGUgY2FzZSBpbnNlbnNpdGl2ZSB1c2VybmFtZSBpbmRleDogJywgZXJyb3IpO1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH0pO1xuXG4gICAgYXdhaXQgdGhpcy5hZGFwdGVyLmVuc3VyZVVuaXF1ZW5lc3MoJ19Vc2VyJywgcmVxdWlyZWRVc2VyRmllbGRzLCBbJ2VtYWlsJ10pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGxvZ2dlci53YXJuKCdVbmFibGUgdG8gZW5zdXJlIHVuaXF1ZW5lc3MgZm9yIHVzZXIgZW1haWwgYWRkcmVzc2VzOiAnLCBlcnJvcik7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9KTtcblxuICAgIGF3YWl0IHRoaXMuYWRhcHRlclxuICAgICAgLmVuc3VyZUluZGV4KCdfVXNlcicsIHJlcXVpcmVkVXNlckZpZWxkcywgWydlbWFpbCddLCAnY2FzZV9pbnNlbnNpdGl2ZV9lbWFpbCcsIHRydWUpXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBsb2dnZXIud2FybignVW5hYmxlIHRvIGNyZWF0ZSBjYXNlIGluc2Vuc2l0aXZlIGVtYWlsIGluZGV4OiAnLCBlcnJvcik7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfSk7XG5cbiAgICBhd2FpdCB0aGlzLmFkYXB0ZXIuZW5zdXJlVW5pcXVlbmVzcygnX1JvbGUnLCByZXF1aXJlZFJvbGVGaWVsZHMsIFsnbmFtZSddKS5jYXRjaChlcnJvciA9PiB7XG4gICAgICBsb2dnZXIud2FybignVW5hYmxlIHRvIGVuc3VyZSB1bmlxdWVuZXNzIGZvciByb2xlIG5hbWU6ICcsIGVycm9yKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH0pO1xuXG4gICAgYXdhaXQgdGhpcy5hZGFwdGVyXG4gICAgICAuZW5zdXJlVW5pcXVlbmVzcygnX0lkZW1wb3RlbmN5JywgcmVxdWlyZWRJZGVtcG90ZW5jeUZpZWxkcywgWydyZXFJZCddKVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgbG9nZ2VyLndhcm4oJ1VuYWJsZSB0byBlbnN1cmUgdW5pcXVlbmVzcyBmb3IgaWRlbXBvdGVuY3kgcmVxdWVzdCBJRDogJywgZXJyb3IpO1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH0pO1xuXG4gICAgY29uc3QgaXNNb25nb0FkYXB0ZXIgPSB0aGlzLmFkYXB0ZXIgaW5zdGFuY2VvZiBNb25nb1N0b3JhZ2VBZGFwdGVyO1xuICAgIGNvbnN0IGlzUG9zdGdyZXNBZGFwdGVyID0gdGhpcy5hZGFwdGVyIGluc3RhbmNlb2YgUG9zdGdyZXNTdG9yYWdlQWRhcHRlcjtcbiAgICBpZiAoaXNNb25nb0FkYXB0ZXIgfHwgaXNQb3N0Z3Jlc0FkYXB0ZXIpIHtcbiAgICAgIGxldCBvcHRpb25zID0ge307XG4gICAgICBpZiAoaXNNb25nb0FkYXB0ZXIpIHtcbiAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICB0dGw6IDAsXG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKGlzUG9zdGdyZXNBZGFwdGVyKSB7XG4gICAgICAgIG9wdGlvbnMgPSB0aGlzLmlkZW1wb3RlbmN5T3B0aW9ucztcbiAgICAgICAgb3B0aW9ucy5zZXRJZGVtcG90ZW5jeUZ1bmN0aW9uID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IHRoaXMuYWRhcHRlclxuICAgICAgICAuZW5zdXJlSW5kZXgoJ19JZGVtcG90ZW5jeScsIHJlcXVpcmVkSWRlbXBvdGVuY3lGaWVsZHMsIFsnZXhwaXJlJ10sICd0dGwnLCBmYWxzZSwgb3B0aW9ucylcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICBsb2dnZXIud2FybignVW5hYmxlIHRvIGNyZWF0ZSBUVEwgaW5kZXggZm9yIGlkZW1wb3RlbmN5IGV4cGlyZSBkYXRlOiAnLCBlcnJvcik7XG4gICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhd2FpdCB0aGlzLmFkYXB0ZXIudXBkYXRlU2NoZW1hV2l0aEluZGV4ZXMoKTtcbiAgfVxuXG4gIF9leHBhbmRSZXN1bHRPbktleVBhdGgob2JqZWN0OiBhbnksIGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogYW55IHtcbiAgICBpZiAoa2V5LmluZGV4T2YoJy4nKSA8IDApIHtcbiAgICAgIG9iamVjdFtrZXldID0gdmFsdWVba2V5XTtcbiAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuICAgIGNvbnN0IHBhdGggPSBrZXkuc3BsaXQoJy4nKTtcbiAgICBjb25zdCBmaXJzdEtleSA9IHBhdGhbMF07XG4gICAgY29uc3QgbmV4dFBhdGggPSBwYXRoLnNsaWNlKDEpLmpvaW4oJy4nKTtcblxuICAgIC8vIFNjYW4gcmVxdWVzdCBkYXRhIGZvciBkZW5pZWQga2V5d29yZHNcbiAgICBpZiAodGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5yZXF1ZXN0S2V5d29yZERlbnlsaXN0KSB7XG4gICAgICAvLyBTY2FuIHJlcXVlc3QgZGF0YSBmb3IgZGVuaWVkIGtleXdvcmRzXG4gICAgICBmb3IgKGNvbnN0IGtleXdvcmQgb2YgdGhpcy5vcHRpb25zLnJlcXVlc3RLZXl3b3JkRGVueWxpc3QpIHtcbiAgICAgICAgY29uc3QgbWF0Y2ggPSBVdGlscy5vYmplY3RDb250YWluc0tleVZhbHVlKFxuICAgICAgICAgIHsgW2ZpcnN0S2V5XTogdHJ1ZSwgW25leHRQYXRoXTogdHJ1ZSB9LFxuICAgICAgICAgIGtleXdvcmQua2V5LFxuICAgICAgICAgIHRydWVcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFBhcnNlLkVycm9yKFxuICAgICAgICAgICAgUGFyc2UuRXJyb3IuSU5WQUxJRF9LRVlfTkFNRSxcbiAgICAgICAgICAgIGBQcm9oaWJpdGVkIGtleXdvcmQgaW4gcmVxdWVzdCBkYXRhOiAke0pTT04uc3RyaW5naWZ5KGtleXdvcmQpfS5gXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIG9iamVjdFtmaXJzdEtleV0gPSB0aGlzLl9leHBhbmRSZXN1bHRPbktleVBhdGgoXG4gICAgICBvYmplY3RbZmlyc3RLZXldIHx8IHt9LFxuICAgICAgbmV4dFBhdGgsXG4gICAgICB2YWx1ZVtmaXJzdEtleV1cbiAgICApO1xuICAgIGRlbGV0ZSBvYmplY3Rba2V5XTtcbiAgICByZXR1cm4gb2JqZWN0O1xuICB9XG5cbiAgX3Nhbml0aXplRGF0YWJhc2VSZXN1bHQob3JpZ2luYWxPYmplY3Q6IGFueSwgcmVzdWx0OiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0ge307XG4gICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpO1xuICAgIH1cbiAgICBPYmplY3Qua2V5cyhvcmlnaW5hbE9iamVjdCkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgY29uc3Qga2V5VXBkYXRlID0gb3JpZ2luYWxPYmplY3Rba2V5XTtcbiAgICAgIC8vIGRldGVybWluZSBpZiB0aGF0IHdhcyBhbiBvcFxuICAgICAgaWYgKFxuICAgICAgICBrZXlVcGRhdGUgJiZcbiAgICAgICAgdHlwZW9mIGtleVVwZGF0ZSA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAga2V5VXBkYXRlLl9fb3AgJiZcbiAgICAgICAgWydBZGQnLCAnQWRkVW5pcXVlJywgJ1JlbW92ZScsICdJbmNyZW1lbnQnXS5pbmRleE9mKGtleVVwZGF0ZS5fX29wKSA+IC0xXG4gICAgICApIHtcbiAgICAgICAgLy8gb25seSB2YWxpZCBvcHMgdGhhdCBwcm9kdWNlIGFuIGFjdGlvbmFibGUgcmVzdWx0XG4gICAgICAgIC8vIHRoZSBvcCBtYXkgaGF2ZSBoYXBwZW5lZCBvbiBhIGtleXBhdGhcbiAgICAgICAgdGhpcy5fZXhwYW5kUmVzdWx0T25LZXlQYXRoKHJlc3BvbnNlLCBrZXksIHJlc3VsdCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSk7XG4gIH1cblxuICBzdGF0aWMgX3ZhbGlkYXRlUXVlcnk6IChhbnksIGJvb2xlYW4sIGJvb2xlYW4pID0+IHZvaWQ7XG4gIHN0YXRpYyBmaWx0ZXJTZW5zaXRpdmVEYXRhOiAoYm9vbGVhbiwgYW55W10sIGFueSwgYW55LCBhbnksIHN0cmluZywgYW55W10sIGFueSkgPT4gdm9pZDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEYXRhYmFzZUNvbnRyb2xsZXI7XG4vLyBFeHBvc2UgdmFsaWRhdGVRdWVyeSBmb3IgdGVzdHNcbm1vZHVsZS5leHBvcnRzLl92YWxpZGF0ZVF1ZXJ5ID0gdmFsaWRhdGVRdWVyeTtcbm1vZHVsZS5leHBvcnRzLmZpbHRlclNlbnNpdGl2ZURhdGEgPSBmaWx0ZXJTZW5zaXRpdmVEYXRhO1xuIl19