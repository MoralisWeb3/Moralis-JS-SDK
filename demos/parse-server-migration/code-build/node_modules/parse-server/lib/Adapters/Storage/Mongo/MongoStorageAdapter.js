"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MongoStorageAdapter = void 0;

var _MongoCollection = _interopRequireDefault(require("./MongoCollection"));

var _MongoSchemaCollection = _interopRequireDefault(require("./MongoSchemaCollection"));

var _StorageAdapter = require("../StorageAdapter");

var _mongodbUrl = require("../../../vendor/mongodbUrl");

var _MongoTransform = require("./MongoTransform");

var _node = _interopRequireDefault(require("parse/node"));

var _lodash = _interopRequireDefault(require("lodash"));

var _defaults = _interopRequireDefault(require("../../../defaults"));

var _logger = _interopRequireDefault(require("../../../logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// -disable-next
const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
const ReadPreference = mongodb.ReadPreference;
const MongoSchemaCollectionName = '_SCHEMA';

const storageAdapterAllCollections = mongoAdapter => {
  return mongoAdapter.connect().then(() => mongoAdapter.database.collections()).then(collections => {
    return collections.filter(collection => {
      if (collection.namespace.match(/\.system\./)) {
        return false;
      } // TODO: If you have one app with a collection prefix that happens to be a prefix of another
      // apps prefix, this will go very very badly. We should fix that somehow.


      return collection.collectionName.indexOf(mongoAdapter._collectionPrefix) == 0;
    });
  });
};

const convertParseSchemaToMongoSchema = _ref => {
  let schema = _extends({}, _ref);

  delete schema.fields._rperm;
  delete schema.fields._wperm;

  if (schema.className === '_User') {
    // Legacy mongo adapter knows about the difference between password and _hashed_password.
    // Future database adapters will only know about _hashed_password.
    // Note: Parse Server will bring back password with injectDefaultSchema, so we don't need
    // to add _hashed_password back ever.
    delete schema.fields._hashed_password;
  }

  return schema;
}; // Returns { code, error } if invalid, or { result }, an object
// suitable for inserting into _SCHEMA collection, otherwise.


const mongoSchemaFromFieldsAndClassNameAndCLP = (fields, className, classLevelPermissions, indexes) => {
  const mongoObject = {
    _id: className,
    objectId: 'string',
    updatedAt: 'string',
    createdAt: 'string',
    _metadata: undefined
  };

  for (const fieldName in fields) {
    const _fields$fieldName = fields[fieldName],
          {
      type,
      targetClass
    } = _fields$fieldName,
          fieldOptions = _objectWithoutProperties(_fields$fieldName, ["type", "targetClass"]);

    mongoObject[fieldName] = _MongoSchemaCollection.default.parseFieldTypeToMongoFieldType({
      type,
      targetClass
    });

    if (fieldOptions && Object.keys(fieldOptions).length > 0) {
      mongoObject._metadata = mongoObject._metadata || {};
      mongoObject._metadata.fields_options = mongoObject._metadata.fields_options || {};
      mongoObject._metadata.fields_options[fieldName] = fieldOptions;
    }
  }

  if (typeof classLevelPermissions !== 'undefined') {
    mongoObject._metadata = mongoObject._metadata || {};

    if (!classLevelPermissions) {
      delete mongoObject._metadata.class_permissions;
    } else {
      mongoObject._metadata.class_permissions = classLevelPermissions;
    }
  }

  if (indexes && typeof indexes === 'object' && Object.keys(indexes).length > 0) {
    mongoObject._metadata = mongoObject._metadata || {};
    mongoObject._metadata.indexes = indexes;
  }

  if (!mongoObject._metadata) {
    // cleanup the unused _metadata
    delete mongoObject._metadata;
  }

  return mongoObject;
};

function validateExplainValue(explain) {
  if (explain) {
    // The list of allowed explain values is from node-mongodb-native/lib/explain.js
    const explainAllowedValues = ['queryPlanner', 'queryPlannerExtended', 'executionStats', 'allPlansExecution', false, true];

    if (!explainAllowedValues.includes(explain)) {
      throw new _node.default.Error(_node.default.Error.INVALID_QUERY, 'Invalid value for explain');
    }
  }
}

class MongoStorageAdapter {
  // Private
  // Public
  constructor({
    uri = _defaults.default.DefaultMongoURI,
    collectionPrefix = '',
    mongoOptions = {}
  }) {
    this._uri = uri;
    this._collectionPrefix = collectionPrefix;
    this._mongoOptions = mongoOptions;
    this._mongoOptions.useNewUrlParser = true;
    this._mongoOptions.useUnifiedTopology = true;

    this._onchange = () => {}; // MaxTimeMS is not a global MongoDB client option, it is applied per operation.


    this._maxTimeMS = mongoOptions.maxTimeMS;
    this.canSortOnJoinTables = true;
    this.enableSchemaHooks = !!mongoOptions.enableSchemaHooks;
    delete mongoOptions.enableSchemaHooks;
    delete mongoOptions.maxTimeMS;
  }

  watch(callback) {
    this._onchange = callback;
  }

  connect() {
    if (this.connectionPromise) {
      return this.connectionPromise;
    } // parsing and re-formatting causes the auth value (if there) to get URI
    // encoded


    const encodedUri = (0, _mongodbUrl.format)((0, _mongodbUrl.parse)(this._uri));
    this.connectionPromise = MongoClient.connect(encodedUri, this._mongoOptions).then(client => {
      // Starting mongoDB 3.0, the MongoClient.connect don't return a DB anymore but a client
      // Fortunately, we can get back the options and use them to select the proper DB.
      // https://github.com/mongodb/node-mongodb-native/blob/2c35d76f08574225b8db02d7bef687123e6bb018/lib/mongo_client.js#L885
      const options = client.s.options;
      const database = client.db(options.dbName);

      if (!database) {
        delete this.connectionPromise;
        return;
      }

      client.on('error', () => {
        delete this.connectionPromise;
      });
      client.on('close', () => {
        delete this.connectionPromise;
      });
      this.client = client;
      this.database = database;
    }).catch(err => {
      delete this.connectionPromise;
      return Promise.reject(err);
    });
    return this.connectionPromise;
  }

  handleError(error) {
    if (error && error.code === 13) {
      // Unauthorized error
      delete this.client;
      delete this.database;
      delete this.connectionPromise;

      _logger.default.error('Received unauthorized error', {
        error: error
      });
    }

    throw error;
  }

  handleShutdown() {
    if (!this.client) {
      return Promise.resolve();
    }

    return this.client.close(false);
  }

  _adaptiveCollection(name) {
    return this.connect().then(() => this.database.collection(this._collectionPrefix + name)).then(rawCollection => new _MongoCollection.default(rawCollection)).catch(err => this.handleError(err));
  }

  _schemaCollection() {
    return this.connect().then(() => this._adaptiveCollection(MongoSchemaCollectionName)).then(collection => {
      if (!this._stream && this.enableSchemaHooks) {
        this._stream = collection._mongoCollection.watch();

        this._stream.on('change', () => this._onchange());
      }

      return new _MongoSchemaCollection.default(collection);
    });
  }

  classExists(name) {
    return this.connect().then(() => {
      return this.database.listCollections({
        name: this._collectionPrefix + name
      }).toArray();
    }).then(collections => {
      return collections.length > 0;
    }).catch(err => this.handleError(err));
  }

  setClassLevelPermissions(className, CLPs) {
    return this._schemaCollection().then(schemaCollection => schemaCollection.updateSchema(className, {
      $set: {
        '_metadata.class_permissions': CLPs
      }
    })).catch(err => this.handleError(err));
  }

  setIndexesWithSchemaFormat(className, submittedIndexes, existingIndexes = {}, fields) {
    if (submittedIndexes === undefined) {
      return Promise.resolve();
    }

    if (Object.keys(existingIndexes).length === 0) {
      existingIndexes = {
        _id_: {
          _id: 1
        }
      };
    }

    const deletePromises = [];
    const insertedIndexes = [];
    Object.keys(submittedIndexes).forEach(name => {
      const field = submittedIndexes[name];

      if (existingIndexes[name] && field.__op !== 'Delete') {
        throw new _node.default.Error(_node.default.Error.INVALID_QUERY, `Index ${name} exists, cannot update.`);
      }

      if (!existingIndexes[name] && field.__op === 'Delete') {
        throw new _node.default.Error(_node.default.Error.INVALID_QUERY, `Index ${name} does not exist, cannot delete.`);
      }

      if (field.__op === 'Delete') {
        const promise = this.dropIndex(className, name);
        deletePromises.push(promise);
        delete existingIndexes[name];
      } else {
        Object.keys(field).forEach(key => {
          if (!Object.prototype.hasOwnProperty.call(fields, key.indexOf('_p_') === 0 ? key.replace('_p_', '') : key)) {
            throw new _node.default.Error(_node.default.Error.INVALID_QUERY, `Field ${key} does not exist, cannot add index.`);
          }
        });
        existingIndexes[name] = field;
        insertedIndexes.push({
          key: field,
          name
        });
      }
    });
    let insertPromise = Promise.resolve();

    if (insertedIndexes.length > 0) {
      insertPromise = this.createIndexes(className, insertedIndexes);
    }

    return Promise.all(deletePromises).then(() => insertPromise).then(() => this._schemaCollection()).then(schemaCollection => schemaCollection.updateSchema(className, {
      $set: {
        '_metadata.indexes': existingIndexes
      }
    })).catch(err => this.handleError(err));
  }

  setIndexesFromMongo(className) {
    return this.getIndexes(className).then(indexes => {
      indexes = indexes.reduce((obj, index) => {
        if (index.key._fts) {
          delete index.key._fts;
          delete index.key._ftsx;

          for (const field in index.weights) {
            index.key[field] = 'text';
          }
        }

        obj[index.name] = index.key;
        return obj;
      }, {});
      return this._schemaCollection().then(schemaCollection => schemaCollection.updateSchema(className, {
        $set: {
          '_metadata.indexes': indexes
        }
      }));
    }).catch(err => this.handleError(err)).catch(() => {
      // Ignore if collection not found
      return Promise.resolve();
    });
  }

  createClass(className, schema) {
    schema = convertParseSchemaToMongoSchema(schema);
    const mongoObject = mongoSchemaFromFieldsAndClassNameAndCLP(schema.fields, className, schema.classLevelPermissions, schema.indexes);
    mongoObject._id = className;
    return this.setIndexesWithSchemaFormat(className, schema.indexes, {}, schema.fields).then(() => this._schemaCollection()).then(schemaCollection => schemaCollection.insertSchema(mongoObject)).catch(err => this.handleError(err));
  }

  async updateFieldOptions(className, fieldName, type) {
    const schemaCollection = await this._schemaCollection();
    await schemaCollection.updateFieldOptions(className, fieldName, type);
  }

  addFieldIfNotExists(className, fieldName, type) {
    return this._schemaCollection().then(schemaCollection => schemaCollection.addFieldIfNotExists(className, fieldName, type)).then(() => this.createIndexesIfNeeded(className, fieldName, type)).catch(err => this.handleError(err));
  } // Drops a collection. Resolves with true if it was a Parse Schema (eg. _User, Custom, etc.)
  // and resolves with false if it wasn't (eg. a join table). Rejects if deletion was impossible.


  deleteClass(className) {
    return this._adaptiveCollection(className).then(collection => collection.drop()).catch(error => {
      // 'ns not found' means collection was already gone. Ignore deletion attempt.
      if (error.message == 'ns not found') {
        return;
      }

      throw error;
    }) // We've dropped the collection, now remove the _SCHEMA document
    .then(() => this._schemaCollection()).then(schemaCollection => schemaCollection.findAndDeleteSchema(className)).catch(err => this.handleError(err));
  }

  deleteAllClasses(fast) {
    return storageAdapterAllCollections(this).then(collections => Promise.all(collections.map(collection => fast ? collection.deleteMany({}) : collection.drop())));
  } // Remove the column and all the data. For Relations, the _Join collection is handled
  // specially, this function does not delete _Join columns. It should, however, indicate
  // that the relation fields does not exist anymore. In mongo, this means removing it from
  // the _SCHEMA collection.  There should be no actual data in the collection under the same name
  // as the relation column, so it's fine to attempt to delete it. If the fields listed to be
  // deleted do not exist, this function should return successfully anyways. Checking for
  // attempts to delete non-existent fields is the responsibility of Parse Server.
  // Pointer field names are passed for legacy reasons: the original mongo
  // format stored pointer field names differently in the database, and therefore
  // needed to know the type of the field before it could delete it. Future database
  // adapters should ignore the pointerFieldNames argument. All the field names are in
  // fieldNames, they show up additionally in the pointerFieldNames database for use
  // by the mongo adapter, which deals with the legacy mongo format.
  // This function is not obligated to delete fields atomically. It is given the field
  // names in a list so that databases that are capable of deleting fields atomically
  // may do so.
  // Returns a Promise.


  deleteFields(className, schema, fieldNames) {
    const mongoFormatNames = fieldNames.map(fieldName => {
      if (schema.fields[fieldName].type === 'Pointer') {
        return `_p_${fieldName}`;
      } else {
        return fieldName;
      }
    });
    const collectionUpdate = {
      $unset: {}
    };
    mongoFormatNames.forEach(name => {
      collectionUpdate['$unset'][name] = null;
    });
    const collectionFilter = {
      $or: []
    };
    mongoFormatNames.forEach(name => {
      collectionFilter['$or'].push({
        [name]: {
          $exists: true
        }
      });
    });
    const schemaUpdate = {
      $unset: {}
    };
    fieldNames.forEach(name => {
      schemaUpdate['$unset'][name] = null;
      schemaUpdate['$unset'][`_metadata.fields_options.${name}`] = null;
    });
    return this._adaptiveCollection(className).then(collection => collection.updateMany(collectionFilter, collectionUpdate)).then(() => this._schemaCollection()).then(schemaCollection => schemaCollection.updateSchema(className, schemaUpdate)).catch(err => this.handleError(err));
  } // Return a promise for all schemas known to this adapter, in Parse format. In case the
  // schemas cannot be retrieved, returns a promise that rejects. Requirements for the
  // rejection reason are TBD.


  getAllClasses() {
    return this._schemaCollection().then(schemasCollection => schemasCollection._fetchAllSchemasFrom_SCHEMA()).catch(err => this.handleError(err));
  } // Return a promise for the schema with the given name, in Parse format. If
  // this adapter doesn't know about the schema, return a promise that rejects with
  // undefined as the reason.


  getClass(className) {
    return this._schemaCollection().then(schemasCollection => schemasCollection._fetchOneSchemaFrom_SCHEMA(className)).catch(err => this.handleError(err));
  } // TODO: As yet not particularly well specified. Creates an object. Maybe shouldn't even need the schema,
  // and should infer from the type. Or maybe does need the schema for validations. Or maybe needs
  // the schema only for the legacy mongo format. We'll figure that out later.


  createObject(className, schema, object, transactionalSession) {
    schema = convertParseSchemaToMongoSchema(schema);
    const mongoObject = (0, _MongoTransform.parseObjectToMongoObjectForCreate)(className, object, schema);
    return this._adaptiveCollection(className).then(collection => collection.insertOne(mongoObject, transactionalSession)).then(() => ({
      ops: [mongoObject]
    })).catch(error => {
      if (error.code === 11000) {
        // Duplicate value
        const err = new _node.default.Error(_node.default.Error.DUPLICATE_VALUE, 'A duplicate value for a field with unique values was provided');
        err.underlyingError = error;

        if (error.message) {
          const matches = error.message.match(/index:[\sa-zA-Z0-9_\-\.]+\$?([a-zA-Z_-]+)_1/);

          if (matches && Array.isArray(matches)) {
            err.userInfo = {
              duplicated_field: matches[1]
            };
          }
        }

        throw err;
      }

      throw error;
    }).catch(err => this.handleError(err));
  } // Remove all objects that match the given Parse Query.
  // If no objects match, reject with OBJECT_NOT_FOUND. If objects are found and deleted, resolve with undefined.
  // If there is some other error, reject with INTERNAL_SERVER_ERROR.


  deleteObjectsByQuery(className, schema, query, transactionalSession) {
    schema = convertParseSchemaToMongoSchema(schema);
    return this._adaptiveCollection(className).then(collection => {
      const mongoWhere = (0, _MongoTransform.transformWhere)(className, query, schema);
      return collection.deleteMany(mongoWhere, transactionalSession);
    }).catch(err => this.handleError(err)).then(({
      deletedCount
    }) => {
      if (deletedCount === 0) {
        throw new _node.default.Error(_node.default.Error.OBJECT_NOT_FOUND, 'Object not found.');
      }

      return Promise.resolve();
    }, () => {
      throw new _node.default.Error(_node.default.Error.INTERNAL_SERVER_ERROR, 'Database adapter error');
    });
  } // Apply the update to all objects that match the given Parse Query.


  updateObjectsByQuery(className, schema, query, update, transactionalSession) {
    schema = convertParseSchemaToMongoSchema(schema);
    const mongoUpdate = (0, _MongoTransform.transformUpdate)(className, update, schema);
    const mongoWhere = (0, _MongoTransform.transformWhere)(className, query, schema);
    return this._adaptiveCollection(className).then(collection => collection.updateMany(mongoWhere, mongoUpdate, transactionalSession)).catch(err => this.handleError(err));
  } // Atomically finds and updates an object based on query.
  // Return value not currently well specified.


  findOneAndUpdate(className, schema, query, update, transactionalSession) {
    schema = convertParseSchemaToMongoSchema(schema);
    const mongoUpdate = (0, _MongoTransform.transformUpdate)(className, update, schema);
    const mongoWhere = (0, _MongoTransform.transformWhere)(className, query, schema);
    return this._adaptiveCollection(className).then(collection => collection._mongoCollection.findOneAndUpdate(mongoWhere, mongoUpdate, {
      returnDocument: 'after',
      session: transactionalSession || undefined
    })).then(result => (0, _MongoTransform.mongoObjectToParseObject)(className, result.value, schema)).catch(error => {
      if (error.code === 11000) {
        throw new _node.default.Error(_node.default.Error.DUPLICATE_VALUE, 'A duplicate value for a field with unique values was provided');
      }

      throw error;
    }).catch(err => this.handleError(err));
  } // Hopefully we can get rid of this. It's only used for config and hooks.


  upsertOneObject(className, schema, query, update, transactionalSession) {
    schema = convertParseSchemaToMongoSchema(schema);
    const mongoUpdate = (0, _MongoTransform.transformUpdate)(className, update, schema);
    const mongoWhere = (0, _MongoTransform.transformWhere)(className, query, schema);
    return this._adaptiveCollection(className).then(collection => collection.upsertOne(mongoWhere, mongoUpdate, transactionalSession)).catch(err => this.handleError(err));
  } // Executes a find. Accepts: className, query in Parse format, and { skip, limit, sort }.


  find(className, schema, query, {
    skip,
    limit,
    sort,
    keys,
    readPreference,
    hint,
    caseInsensitive,
    explain
  }) {
    validateExplainValue(explain);
    schema = convertParseSchemaToMongoSchema(schema);
    const mongoWhere = (0, _MongoTransform.transformWhere)(className, query, schema);

    const mongoSort = _lodash.default.mapKeys(sort, (value, fieldName) => (0, _MongoTransform.transformKey)(className, fieldName, schema));

    const mongoKeys = _lodash.default.reduce(keys, (memo, key) => {
      if (key === 'ACL') {
        memo['_rperm'] = 1;
        memo['_wperm'] = 1;
      } else {
        memo[(0, _MongoTransform.transformKey)(className, key, schema)] = 1;
      }

      return memo;
    }, {}); // If we aren't requesting the `_id` field, we need to explicitly opt out
    // of it. Doing so in parse-server is unusual, but it can allow us to
    // optimize some queries with covering indexes.


    if (keys && !mongoKeys._id) {
      mongoKeys._id = 0;
    }

    readPreference = this._parseReadPreference(readPreference);
    return this.createTextIndexesIfNeeded(className, query, schema).then(() => this._adaptiveCollection(className)).then(collection => collection.find(mongoWhere, {
      skip,
      limit,
      sort: mongoSort,
      keys: mongoKeys,
      maxTimeMS: this._maxTimeMS,
      readPreference,
      hint,
      caseInsensitive,
      explain
    })).then(objects => {
      if (explain) {
        return objects;
      }

      return objects.map(object => (0, _MongoTransform.mongoObjectToParseObject)(className, object, schema));
    }).catch(err => this.handleError(err));
  }

  ensureIndex(className, schema, fieldNames, indexName, caseInsensitive = false, options = {}) {
    schema = convertParseSchemaToMongoSchema(schema);
    const indexCreationRequest = {};
    const mongoFieldNames = fieldNames.map(fieldName => (0, _MongoTransform.transformKey)(className, fieldName, schema));
    mongoFieldNames.forEach(fieldName => {
      indexCreationRequest[fieldName] = options.indexType !== undefined ? options.indexType : 1;
    });
    const defaultOptions = {
      background: true,
      sparse: true
    };
    const indexNameOptions = indexName ? {
      name: indexName
    } : {};
    const ttlOptions = options.ttl !== undefined ? {
      expireAfterSeconds: options.ttl
    } : {};
    const caseInsensitiveOptions = caseInsensitive ? {
      collation: _MongoCollection.default.caseInsensitiveCollation()
    } : {};

    const indexOptions = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, defaultOptions), caseInsensitiveOptions), indexNameOptions), ttlOptions);

    return this._adaptiveCollection(className).then(collection => new Promise((resolve, reject) => collection._mongoCollection.createIndex(indexCreationRequest, indexOptions, error => error ? reject(error) : resolve()))).catch(err => this.handleError(err));
  } // Create a unique index. Unique indexes on nullable fields are not allowed. Since we don't
  // currently know which fields are nullable and which aren't, we ignore that criteria.
  // As such, we shouldn't expose this function to users of parse until we have an out-of-band
  // Way of determining if a field is nullable. Undefined doesn't count against uniqueness,
  // which is why we use sparse indexes.


  ensureUniqueness(className, schema, fieldNames) {
    schema = convertParseSchemaToMongoSchema(schema);
    const indexCreationRequest = {};
    const mongoFieldNames = fieldNames.map(fieldName => (0, _MongoTransform.transformKey)(className, fieldName, schema));
    mongoFieldNames.forEach(fieldName => {
      indexCreationRequest[fieldName] = 1;
    });
    return this._adaptiveCollection(className).then(collection => collection._ensureSparseUniqueIndexInBackground(indexCreationRequest)).catch(error => {
      if (error.code === 11000) {
        throw new _node.default.Error(_node.default.Error.DUPLICATE_VALUE, 'Tried to ensure field uniqueness for a class that already has duplicates.');
      }

      throw error;
    }).catch(err => this.handleError(err));
  } // Used in tests


  _rawFind(className, query) {
    return this._adaptiveCollection(className).then(collection => collection.find(query, {
      maxTimeMS: this._maxTimeMS
    })).catch(err => this.handleError(err));
  } // Executes a count.


  count(className, schema, query, readPreference, hint) {
    schema = convertParseSchemaToMongoSchema(schema);
    readPreference = this._parseReadPreference(readPreference);
    return this._adaptiveCollection(className).then(collection => collection.count((0, _MongoTransform.transformWhere)(className, query, schema, true), {
      maxTimeMS: this._maxTimeMS,
      readPreference,
      hint
    })).catch(err => this.handleError(err));
  }

  distinct(className, schema, query, fieldName) {
    schema = convertParseSchemaToMongoSchema(schema);
    const isPointerField = schema.fields[fieldName] && schema.fields[fieldName].type === 'Pointer';
    const transformField = (0, _MongoTransform.transformKey)(className, fieldName, schema);
    return this._adaptiveCollection(className).then(collection => collection.distinct(transformField, (0, _MongoTransform.transformWhere)(className, query, schema))).then(objects => {
      objects = objects.filter(obj => obj != null);
      return objects.map(object => {
        if (isPointerField) {
          return (0, _MongoTransform.transformPointerString)(schema, fieldName, object);
        }

        return (0, _MongoTransform.mongoObjectToParseObject)(className, object, schema);
      });
    }).catch(err => this.handleError(err));
  }

  aggregate(className, schema, pipeline, readPreference, hint, explain) {
    validateExplainValue(explain);
    let isPointerField = false;
    pipeline = pipeline.map(stage => {
      if (stage.$group) {
        stage.$group = this._parseAggregateGroupArgs(schema, stage.$group);

        if (stage.$group._id && typeof stage.$group._id === 'string' && stage.$group._id.indexOf('$_p_') >= 0) {
          isPointerField = true;
        }
      }

      if (stage.$match) {
        stage.$match = this._parseAggregateArgs(schema, stage.$match);
      }

      if (stage.$project) {
        stage.$project = this._parseAggregateProjectArgs(schema, stage.$project);
      }

      if (stage.$geoNear && stage.$geoNear.query) {
        stage.$geoNear.query = this._parseAggregateArgs(schema, stage.$geoNear.query);
      }

      return stage;
    });
    readPreference = this._parseReadPreference(readPreference);
    return this._adaptiveCollection(className).then(collection => collection.aggregate(pipeline, {
      readPreference,
      maxTimeMS: this._maxTimeMS,
      hint,
      explain
    })).then(results => {
      results.forEach(result => {
        if (Object.prototype.hasOwnProperty.call(result, '_id')) {
          if (isPointerField && result._id) {
            result._id = result._id.split('$')[1];
          }

          if (result._id == null || result._id == undefined || ['object', 'string'].includes(typeof result._id) && _lodash.default.isEmpty(result._id)) {
            result._id = null;
          }

          result.objectId = result._id;
          delete result._id;
        }
      });
      return results;
    }).then(objects => objects.map(object => (0, _MongoTransform.mongoObjectToParseObject)(className, object, schema))).catch(err => this.handleError(err));
  } // This function will recursively traverse the pipeline and convert any Pointer or Date columns.
  // If we detect a pointer column we will rename the column being queried for to match the column
  // in the database. We also modify the value to what we expect the value to be in the database
  // as well.
  // For dates, the driver expects a Date object, but we have a string coming in. So we'll convert
  // the string to a Date so the driver can perform the necessary comparison.
  //
  // The goal of this method is to look for the "leaves" of the pipeline and determine if it needs
  // to be converted. The pipeline can have a few different forms. For more details, see:
  //     https://docs.mongodb.com/manual/reference/operator/aggregation/
  //
  // If the pipeline is an array, it means we are probably parsing an '$and' or '$or' operator. In
  // that case we need to loop through all of it's children to find the columns being operated on.
  // If the pipeline is an object, then we'll loop through the keys checking to see if the key name
  // matches one of the schema columns. If it does match a column and the column is a Pointer or
  // a Date, then we'll convert the value as described above.
  //
  // As much as I hate recursion...this seemed like a good fit for it. We're essentially traversing
  // down a tree to find a "leaf node" and checking to see if it needs to be converted.


  _parseAggregateArgs(schema, pipeline) {
    if (pipeline === null) {
      return null;
    } else if (Array.isArray(pipeline)) {
      return pipeline.map(value => this._parseAggregateArgs(schema, value));
    } else if (typeof pipeline === 'object') {
      const returnValue = {};

      for (const field in pipeline) {
        if (schema.fields[field] && schema.fields[field].type === 'Pointer') {
          if (typeof pipeline[field] === 'object') {
            // Pass objects down to MongoDB...this is more than likely an $exists operator.
            returnValue[`_p_${field}`] = pipeline[field];
          } else {
            returnValue[`_p_${field}`] = `${schema.fields[field].targetClass}$${pipeline[field]}`;
          }
        } else if (schema.fields[field] && schema.fields[field].type === 'Date') {
          returnValue[field] = this._convertToDate(pipeline[field]);
        } else {
          returnValue[field] = this._parseAggregateArgs(schema, pipeline[field]);
        }

        if (field === 'objectId') {
          returnValue['_id'] = returnValue[field];
          delete returnValue[field];
        } else if (field === 'createdAt') {
          returnValue['_created_at'] = returnValue[field];
          delete returnValue[field];
        } else if (field === 'updatedAt') {
          returnValue['_updated_at'] = returnValue[field];
          delete returnValue[field];
        }
      }

      return returnValue;
    }

    return pipeline;
  } // This function is slightly different than the one above. Rather than trying to combine these
  // two functions and making the code even harder to understand, I decided to split it up. The
  // difference with this function is we are not transforming the values, only the keys of the
  // pipeline.


  _parseAggregateProjectArgs(schema, pipeline) {
    const returnValue = {};

    for (const field in pipeline) {
      if (schema.fields[field] && schema.fields[field].type === 'Pointer') {
        returnValue[`_p_${field}`] = pipeline[field];
      } else {
        returnValue[field] = this._parseAggregateArgs(schema, pipeline[field]);
      }

      if (field === 'objectId') {
        returnValue['_id'] = returnValue[field];
        delete returnValue[field];
      } else if (field === 'createdAt') {
        returnValue['_created_at'] = returnValue[field];
        delete returnValue[field];
      } else if (field === 'updatedAt') {
        returnValue['_updated_at'] = returnValue[field];
        delete returnValue[field];
      }
    }

    return returnValue;
  } // This function is slightly different than the two above. MongoDB $group aggregate looks like:
  //     { $group: { _id: <expression>, <field1>: { <accumulator1> : <expression1> }, ... } }
  // The <expression> could be a column name, prefixed with the '$' character. We'll look for
  // these <expression> and check to see if it is a 'Pointer' or if it's one of createdAt,
  // updatedAt or objectId and change it accordingly.


  _parseAggregateGroupArgs(schema, pipeline) {
    if (Array.isArray(pipeline)) {
      return pipeline.map(value => this._parseAggregateGroupArgs(schema, value));
    } else if (typeof pipeline === 'object') {
      const returnValue = {};

      for (const field in pipeline) {
        returnValue[field] = this._parseAggregateGroupArgs(schema, pipeline[field]);
      }

      return returnValue;
    } else if (typeof pipeline === 'string') {
      const field = pipeline.substring(1);

      if (schema.fields[field] && schema.fields[field].type === 'Pointer') {
        return `$_p_${field}`;
      } else if (field == 'createdAt') {
        return '$_created_at';
      } else if (field == 'updatedAt') {
        return '$_updated_at';
      }
    }

    return pipeline;
  } // This function will attempt to convert the provided value to a Date object. Since this is part
  // of an aggregation pipeline, the value can either be a string or it can be another object with
  // an operator in it (like $gt, $lt, etc). Because of this I felt it was easier to make this a
  // recursive method to traverse down to the "leaf node" which is going to be the string.


  _convertToDate(value) {
    if (value instanceof Date) {
      return value;
    }

    if (typeof value === 'string') {
      return new Date(value);
    }

    const returnValue = {};

    for (const field in value) {
      returnValue[field] = this._convertToDate(value[field]);
    }

    return returnValue;
  }

  _parseReadPreference(readPreference) {
    if (readPreference) {
      readPreference = readPreference.toUpperCase();
    }

    switch (readPreference) {
      case 'PRIMARY':
        readPreference = ReadPreference.PRIMARY;
        break;

      case 'PRIMARY_PREFERRED':
        readPreference = ReadPreference.PRIMARY_PREFERRED;
        break;

      case 'SECONDARY':
        readPreference = ReadPreference.SECONDARY;
        break;

      case 'SECONDARY_PREFERRED':
        readPreference = ReadPreference.SECONDARY_PREFERRED;
        break;

      case 'NEAREST':
        readPreference = ReadPreference.NEAREST;
        break;

      case undefined:
      case null:
      case '':
        break;

      default:
        throw new _node.default.Error(_node.default.Error.INVALID_QUERY, 'Not supported read preference.');
    }

    return readPreference;
  }

  performInitialization() {
    return Promise.resolve();
  }

  createIndex(className, index) {
    return this._adaptiveCollection(className).then(collection => collection._mongoCollection.createIndex(index)).catch(err => this.handleError(err));
  }

  createIndexes(className, indexes) {
    return this._adaptiveCollection(className).then(collection => collection._mongoCollection.createIndexes(indexes)).catch(err => this.handleError(err));
  }

  createIndexesIfNeeded(className, fieldName, type) {
    if (type && type.type === 'Polygon') {
      const index = {
        [fieldName]: '2dsphere'
      };
      return this.createIndex(className, index);
    }

    return Promise.resolve();
  }

  createTextIndexesIfNeeded(className, query, schema) {
    for (const fieldName in query) {
      if (!query[fieldName] || !query[fieldName].$text) {
        continue;
      }

      const existingIndexes = schema.indexes;

      for (const key in existingIndexes) {
        const index = existingIndexes[key];

        if (Object.prototype.hasOwnProperty.call(index, fieldName)) {
          return Promise.resolve();
        }
      }

      const indexName = `${fieldName}_text`;
      const textIndex = {
        [indexName]: {
          [fieldName]: 'text'
        }
      };
      return this.setIndexesWithSchemaFormat(className, textIndex, existingIndexes, schema.fields).catch(error => {
        if (error.code === 85) {
          // Index exist with different options
          return this.setIndexesFromMongo(className);
        }

        throw error;
      });
    }

    return Promise.resolve();
  }

  getIndexes(className) {
    return this._adaptiveCollection(className).then(collection => collection._mongoCollection.indexes()).catch(err => this.handleError(err));
  }

  dropIndex(className, index) {
    return this._adaptiveCollection(className).then(collection => collection._mongoCollection.dropIndex(index)).catch(err => this.handleError(err));
  }

  dropAllIndexes(className) {
    return this._adaptiveCollection(className).then(collection => collection._mongoCollection.dropIndexes()).catch(err => this.handleError(err));
  }

  updateSchemaWithIndexes() {
    return this.getAllClasses().then(classes => {
      const promises = classes.map(schema => {
        return this.setIndexesFromMongo(schema.className);
      });
      return Promise.all(promises);
    }).catch(err => this.handleError(err));
  }

  createTransactionalSession() {
    const transactionalSection = this.client.startSession();
    transactionalSection.startTransaction();
    return Promise.resolve(transactionalSection);
  }

  commitTransactionalSession(transactionalSection) {
    const commit = retries => {
      return transactionalSection.commitTransaction().catch(error => {
        if (error && error.hasErrorLabel('TransientTransactionError') && retries > 0) {
          return commit(retries - 1);
        }

        throw error;
      }).then(() => {
        transactionalSection.endSession();
      });
    };

    return commit(5);
  }

  abortTransactionalSession(transactionalSection) {
    return transactionalSection.abortTransaction().then(() => {
      transactionalSection.endSession();
    });
  }

}

exports.MongoStorageAdapter = MongoStorageAdapter;
var _default = MongoStorageAdapter;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9BZGFwdGVycy9TdG9yYWdlL01vbmdvL01vbmdvU3RvcmFnZUFkYXB0ZXIuanMiXSwibmFtZXMiOlsibW9uZ29kYiIsInJlcXVpcmUiLCJNb25nb0NsaWVudCIsIlJlYWRQcmVmZXJlbmNlIiwiTW9uZ29TY2hlbWFDb2xsZWN0aW9uTmFtZSIsInN0b3JhZ2VBZGFwdGVyQWxsQ29sbGVjdGlvbnMiLCJtb25nb0FkYXB0ZXIiLCJjb25uZWN0IiwidGhlbiIsImRhdGFiYXNlIiwiY29sbGVjdGlvbnMiLCJmaWx0ZXIiLCJjb2xsZWN0aW9uIiwibmFtZXNwYWNlIiwibWF0Y2giLCJjb2xsZWN0aW9uTmFtZSIsImluZGV4T2YiLCJfY29sbGVjdGlvblByZWZpeCIsImNvbnZlcnRQYXJzZVNjaGVtYVRvTW9uZ29TY2hlbWEiLCJzY2hlbWEiLCJmaWVsZHMiLCJfcnBlcm0iLCJfd3Blcm0iLCJjbGFzc05hbWUiLCJfaGFzaGVkX3Bhc3N3b3JkIiwibW9uZ29TY2hlbWFGcm9tRmllbGRzQW5kQ2xhc3NOYW1lQW5kQ0xQIiwiY2xhc3NMZXZlbFBlcm1pc3Npb25zIiwiaW5kZXhlcyIsIm1vbmdvT2JqZWN0IiwiX2lkIiwib2JqZWN0SWQiLCJ1cGRhdGVkQXQiLCJjcmVhdGVkQXQiLCJfbWV0YWRhdGEiLCJ1bmRlZmluZWQiLCJmaWVsZE5hbWUiLCJ0eXBlIiwidGFyZ2V0Q2xhc3MiLCJmaWVsZE9wdGlvbnMiLCJNb25nb1NjaGVtYUNvbGxlY3Rpb24iLCJwYXJzZUZpZWxkVHlwZVRvTW9uZ29GaWVsZFR5cGUiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiZmllbGRzX29wdGlvbnMiLCJjbGFzc19wZXJtaXNzaW9ucyIsInZhbGlkYXRlRXhwbGFpblZhbHVlIiwiZXhwbGFpbiIsImV4cGxhaW5BbGxvd2VkVmFsdWVzIiwiaW5jbHVkZXMiLCJQYXJzZSIsIkVycm9yIiwiSU5WQUxJRF9RVUVSWSIsIk1vbmdvU3RvcmFnZUFkYXB0ZXIiLCJjb25zdHJ1Y3RvciIsInVyaSIsImRlZmF1bHRzIiwiRGVmYXVsdE1vbmdvVVJJIiwiY29sbGVjdGlvblByZWZpeCIsIm1vbmdvT3B0aW9ucyIsIl91cmkiLCJfbW9uZ29PcHRpb25zIiwidXNlTmV3VXJsUGFyc2VyIiwidXNlVW5pZmllZFRvcG9sb2d5IiwiX29uY2hhbmdlIiwiX21heFRpbWVNUyIsIm1heFRpbWVNUyIsImNhblNvcnRPbkpvaW5UYWJsZXMiLCJlbmFibGVTY2hlbWFIb29rcyIsIndhdGNoIiwiY2FsbGJhY2siLCJjb25uZWN0aW9uUHJvbWlzZSIsImVuY29kZWRVcmkiLCJjbGllbnQiLCJvcHRpb25zIiwicyIsImRiIiwiZGJOYW1lIiwib24iLCJjYXRjaCIsImVyciIsIlByb21pc2UiLCJyZWplY3QiLCJoYW5kbGVFcnJvciIsImVycm9yIiwiY29kZSIsImxvZ2dlciIsImhhbmRsZVNodXRkb3duIiwicmVzb2x2ZSIsImNsb3NlIiwiX2FkYXB0aXZlQ29sbGVjdGlvbiIsIm5hbWUiLCJyYXdDb2xsZWN0aW9uIiwiTW9uZ29Db2xsZWN0aW9uIiwiX3NjaGVtYUNvbGxlY3Rpb24iLCJfc3RyZWFtIiwiX21vbmdvQ29sbGVjdGlvbiIsImNsYXNzRXhpc3RzIiwibGlzdENvbGxlY3Rpb25zIiwidG9BcnJheSIsInNldENsYXNzTGV2ZWxQZXJtaXNzaW9ucyIsIkNMUHMiLCJzY2hlbWFDb2xsZWN0aW9uIiwidXBkYXRlU2NoZW1hIiwiJHNldCIsInNldEluZGV4ZXNXaXRoU2NoZW1hRm9ybWF0Iiwic3VibWl0dGVkSW5kZXhlcyIsImV4aXN0aW5nSW5kZXhlcyIsIl9pZF8iLCJkZWxldGVQcm9taXNlcyIsImluc2VydGVkSW5kZXhlcyIsImZvckVhY2giLCJmaWVsZCIsIl9fb3AiLCJwcm9taXNlIiwiZHJvcEluZGV4IiwicHVzaCIsImtleSIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsInJlcGxhY2UiLCJpbnNlcnRQcm9taXNlIiwiY3JlYXRlSW5kZXhlcyIsImFsbCIsInNldEluZGV4ZXNGcm9tTW9uZ28iLCJnZXRJbmRleGVzIiwicmVkdWNlIiwib2JqIiwiaW5kZXgiLCJfZnRzIiwiX2Z0c3giLCJ3ZWlnaHRzIiwiY3JlYXRlQ2xhc3MiLCJpbnNlcnRTY2hlbWEiLCJ1cGRhdGVGaWVsZE9wdGlvbnMiLCJhZGRGaWVsZElmTm90RXhpc3RzIiwiY3JlYXRlSW5kZXhlc0lmTmVlZGVkIiwiZGVsZXRlQ2xhc3MiLCJkcm9wIiwibWVzc2FnZSIsImZpbmRBbmREZWxldGVTY2hlbWEiLCJkZWxldGVBbGxDbGFzc2VzIiwiZmFzdCIsIm1hcCIsImRlbGV0ZU1hbnkiLCJkZWxldGVGaWVsZHMiLCJmaWVsZE5hbWVzIiwibW9uZ29Gb3JtYXROYW1lcyIsImNvbGxlY3Rpb25VcGRhdGUiLCIkdW5zZXQiLCJjb2xsZWN0aW9uRmlsdGVyIiwiJG9yIiwiJGV4aXN0cyIsInNjaGVtYVVwZGF0ZSIsInVwZGF0ZU1hbnkiLCJnZXRBbGxDbGFzc2VzIiwic2NoZW1hc0NvbGxlY3Rpb24iLCJfZmV0Y2hBbGxTY2hlbWFzRnJvbV9TQ0hFTUEiLCJnZXRDbGFzcyIsIl9mZXRjaE9uZVNjaGVtYUZyb21fU0NIRU1BIiwiY3JlYXRlT2JqZWN0Iiwib2JqZWN0IiwidHJhbnNhY3Rpb25hbFNlc3Npb24iLCJpbnNlcnRPbmUiLCJvcHMiLCJEVVBMSUNBVEVfVkFMVUUiLCJ1bmRlcmx5aW5nRXJyb3IiLCJtYXRjaGVzIiwiQXJyYXkiLCJpc0FycmF5IiwidXNlckluZm8iLCJkdXBsaWNhdGVkX2ZpZWxkIiwiZGVsZXRlT2JqZWN0c0J5UXVlcnkiLCJxdWVyeSIsIm1vbmdvV2hlcmUiLCJkZWxldGVkQ291bnQiLCJPQkpFQ1RfTk9UX0ZPVU5EIiwiSU5URVJOQUxfU0VSVkVSX0VSUk9SIiwidXBkYXRlT2JqZWN0c0J5UXVlcnkiLCJ1cGRhdGUiLCJtb25nb1VwZGF0ZSIsImZpbmRPbmVBbmRVcGRhdGUiLCJyZXR1cm5Eb2N1bWVudCIsInNlc3Npb24iLCJyZXN1bHQiLCJ2YWx1ZSIsInVwc2VydE9uZU9iamVjdCIsInVwc2VydE9uZSIsImZpbmQiLCJza2lwIiwibGltaXQiLCJzb3J0IiwicmVhZFByZWZlcmVuY2UiLCJoaW50IiwiY2FzZUluc2Vuc2l0aXZlIiwibW9uZ29Tb3J0IiwiXyIsIm1hcEtleXMiLCJtb25nb0tleXMiLCJtZW1vIiwiX3BhcnNlUmVhZFByZWZlcmVuY2UiLCJjcmVhdGVUZXh0SW5kZXhlc0lmTmVlZGVkIiwib2JqZWN0cyIsImVuc3VyZUluZGV4IiwiaW5kZXhOYW1lIiwiaW5kZXhDcmVhdGlvblJlcXVlc3QiLCJtb25nb0ZpZWxkTmFtZXMiLCJpbmRleFR5cGUiLCJkZWZhdWx0T3B0aW9ucyIsImJhY2tncm91bmQiLCJzcGFyc2UiLCJpbmRleE5hbWVPcHRpb25zIiwidHRsT3B0aW9ucyIsInR0bCIsImV4cGlyZUFmdGVyU2Vjb25kcyIsImNhc2VJbnNlbnNpdGl2ZU9wdGlvbnMiLCJjb2xsYXRpb24iLCJjYXNlSW5zZW5zaXRpdmVDb2xsYXRpb24iLCJpbmRleE9wdGlvbnMiLCJjcmVhdGVJbmRleCIsImVuc3VyZVVuaXF1ZW5lc3MiLCJfZW5zdXJlU3BhcnNlVW5pcXVlSW5kZXhJbkJhY2tncm91bmQiLCJfcmF3RmluZCIsImNvdW50IiwiZGlzdGluY3QiLCJpc1BvaW50ZXJGaWVsZCIsInRyYW5zZm9ybUZpZWxkIiwiYWdncmVnYXRlIiwicGlwZWxpbmUiLCJzdGFnZSIsIiRncm91cCIsIl9wYXJzZUFnZ3JlZ2F0ZUdyb3VwQXJncyIsIiRtYXRjaCIsIl9wYXJzZUFnZ3JlZ2F0ZUFyZ3MiLCIkcHJvamVjdCIsIl9wYXJzZUFnZ3JlZ2F0ZVByb2plY3RBcmdzIiwiJGdlb05lYXIiLCJyZXN1bHRzIiwic3BsaXQiLCJpc0VtcHR5IiwicmV0dXJuVmFsdWUiLCJfY29udmVydFRvRGF0ZSIsInN1YnN0cmluZyIsIkRhdGUiLCJ0b1VwcGVyQ2FzZSIsIlBSSU1BUlkiLCJQUklNQVJZX1BSRUZFUlJFRCIsIlNFQ09OREFSWSIsIlNFQ09OREFSWV9QUkVGRVJSRUQiLCJORUFSRVNUIiwicGVyZm9ybUluaXRpYWxpemF0aW9uIiwiJHRleHQiLCJ0ZXh0SW5kZXgiLCJkcm9wQWxsSW5kZXhlcyIsImRyb3BJbmRleGVzIiwidXBkYXRlU2NoZW1hV2l0aEluZGV4ZXMiLCJjbGFzc2VzIiwicHJvbWlzZXMiLCJjcmVhdGVUcmFuc2FjdGlvbmFsU2Vzc2lvbiIsInRyYW5zYWN0aW9uYWxTZWN0aW9uIiwic3RhcnRTZXNzaW9uIiwic3RhcnRUcmFuc2FjdGlvbiIsImNvbW1pdFRyYW5zYWN0aW9uYWxTZXNzaW9uIiwiY29tbWl0IiwicmV0cmllcyIsImNvbW1pdFRyYW5zYWN0aW9uIiwiaGFzRXJyb3JMYWJlbCIsImVuZFNlc3Npb24iLCJhYm9ydFRyYW5zYWN0aW9uYWxTZXNzaW9uIiwiYWJvcnRUcmFuc2FjdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQVNBOztBQUVBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7QUFDQSxNQUFNQSxPQUFPLEdBQUdDLE9BQU8sQ0FBQyxTQUFELENBQXZCOztBQUNBLE1BQU1DLFdBQVcsR0FBR0YsT0FBTyxDQUFDRSxXQUE1QjtBQUNBLE1BQU1DLGNBQWMsR0FBR0gsT0FBTyxDQUFDRyxjQUEvQjtBQUVBLE1BQU1DLHlCQUF5QixHQUFHLFNBQWxDOztBQUVBLE1BQU1DLDRCQUE0QixHQUFHQyxZQUFZLElBQUk7QUFDbkQsU0FBT0EsWUFBWSxDQUNoQkMsT0FESSxHQUVKQyxJQUZJLENBRUMsTUFBTUYsWUFBWSxDQUFDRyxRQUFiLENBQXNCQyxXQUF0QixFQUZQLEVBR0pGLElBSEksQ0FHQ0UsV0FBVyxJQUFJO0FBQ25CLFdBQU9BLFdBQVcsQ0FBQ0MsTUFBWixDQUFtQkMsVUFBVSxJQUFJO0FBQ3RDLFVBQUlBLFVBQVUsQ0FBQ0MsU0FBWCxDQUFxQkMsS0FBckIsQ0FBMkIsWUFBM0IsQ0FBSixFQUE4QztBQUM1QyxlQUFPLEtBQVA7QUFDRCxPQUhxQyxDQUl0QztBQUNBOzs7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Q0FBQyxDQUFELENBQWI7QUFDRDs7QUFFREssRUFBQUEseUJBQXlCLENBQUNULG9CQUFELEVBQTJDO0FBQ2xFLFdBQU9BLG9CQUFvQixDQUFDVSxnQkFBckIsR0FBd0N0USxJQUF4QyxDQUE2QyxNQUFNO0FBQ3hENFAsTUFBQUEsb0JBQW9CLENBQUNRLFVBQXJCO0FBQ0QsS0FGTSxDQUFQO0FBR0Q7O0FBejlCd0Q7OztlQTQ5QjVDdk4sbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuaW1wb3J0IE1vbmdvQ29sbGVjdGlvbiBmcm9tICcuL01vbmdvQ29sbGVjdGlvbic7XG5pbXBvcnQgTW9uZ29TY2hlbWFDb2xsZWN0aW9uIGZyb20gJy4vTW9uZ29TY2hlbWFDb2xsZWN0aW9uJztcbmltcG9ydCB7IFN0b3JhZ2VBZGFwdGVyIH0gZnJvbSAnLi4vU3RvcmFnZUFkYXB0ZXInO1xuaW1wb3J0IHR5cGUgeyBTY2hlbWFUeXBlLCBRdWVyeVR5cGUsIFN0b3JhZ2VDbGFzcywgUXVlcnlPcHRpb25zIH0gZnJvbSAnLi4vU3RvcmFnZUFkYXB0ZXInO1xuaW1wb3J0IHsgcGFyc2UgYXMgcGFyc2VVcmwsIGZvcm1hdCBhcyBmb3JtYXRVcmwgfSBmcm9tICcuLi8uLi8uLi92ZW5kb3IvbW9uZ29kYlVybCc7XG5pbXBvcnQge1xuICBwYXJzZU9iamVjdFRvTW9uZ29PYmplY3RGb3JDcmVhdGUsXG4gIG1vbmdvT2JqZWN0VG9QYXJzZU9iamVjdCxcbiAgdHJhbnNmb3JtS2V5LFxuICB0cmFuc2Zvcm1XaGVyZSxcbiAgdHJhbnNmb3JtVXBkYXRlLFxuICB0cmFuc2Zvcm1Qb2ludGVyU3RyaW5nLFxufSBmcm9tICcuL01vbmdvVHJhbnNmb3JtJztcbi8vIEBmbG93LWRpc2FibGUtbmV4dFxuaW1wb3J0IFBhcnNlIGZyb20gJ3BhcnNlL25vZGUnO1xuLy8gQGZsb3ctZGlzYWJsZS1uZXh0XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4uLy4uLy4uL2RlZmF1bHRzJztcbmltcG9ydCBsb2dnZXIgZnJvbSAnLi4vLi4vLi4vbG9nZ2VyJztcblxuLy8gQGZsb3ctZGlzYWJsZS1uZXh0XG5jb25zdCBtb25nb2RiID0gcmVxdWlyZSgnbW9uZ29kYicpO1xuY29uc3QgTW9uZ29DbGllbnQgPSBtb25nb2RiLk1vbmdvQ2xpZW50O1xuY29uc3QgUmVhZFByZWZlcmVuY2UgPSBtb25nb2RiLlJlYWRQcmVmZXJlbmNlO1xuXG5jb25zdCBNb25nb1NjaGVtYUNvbGxlY3Rpb25OYW1lID0gJ19TQ0hFTUEnO1xuXG5jb25zdCBzdG9yYWdlQWRhcHRlckFsbENvbGxlY3Rpb25zID0gbW9uZ29BZGFwdGVyID0+IHtcbiAgcmV0dXJuIG1vbmdvQWRhcHRlclxuICAgIC5jb25uZWN0KClcbiAgICAudGhlbigoKSA9PiBtb25nb0FkYXB0ZXIuZGF0YWJhc2UuY29sbGVjdGlvbnMoKSlcbiAgICAudGhlbihjb2xsZWN0aW9ucyA9PiB7XG4gICAgICByZXR1cm4gY29sbGVjdGlvbnMuZmlsdGVyKGNvbGxlY3Rpb24gPT4ge1xuICAgICAgICBpZiAoY29sbGVjdGlvbi5uYW1lc3BhY2UubWF0Y2goL1xcLnN5c3RlbVxcLi8pKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRPRE86IElmIHlvdSBoYXZlIG9uZSBhcHAgd2l0aCBhIGNvbGxlY3Rpb24gcHJlZml4IHRoYXQgaGFwcGVucyB0byBiZSBhIHByZWZpeCBvZiBhbm90aGVyXG4gICAgICAgIC8vIGFwcHMgcHJlZml4LCB0aGlzIHdpbGwgZ28gdmVyeSB2ZXJ5IGJhZGx5LiBXZSBzaG91bGQgZml4IHRoYXQgc29tZWhvdy5cbiAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb24uY29sbGVjdGlvbk5hbWUuaW5kZXhPZihtb25nb0FkYXB0ZXIuX2NvbGxlY3Rpb25QcmVmaXgpID09IDA7XG4gICAgICB9KTtcbiAgICB9KTtcbn07XG5cbmNvbnN0IGNvbnZlcnRQYXJzZVNjaGVtYVRvTW9uZ29TY2hlbWEgPSAoeyAuLi5zY2hlbWEgfSkgPT4ge1xuICBkZWxldGUgc2NoZW1hLmZpZWxkcy5fcnBlcm07XG4gIGRlbGV0ZSBzY2hlbWEuZmllbGRzLl93cGVybTtcblxuICBpZiAoc2NoZW1hLmNsYXNzTmFtZSA9PT0gJ19Vc2VyJykge1xuICAgIC8vIExlZ2FjeSBtb25nbyBhZGFwdGVyIGtub3dzIGFib3V0IHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gcGFzc3dvcmQgYW5kIF9oYXNoZWRfcGFzc3dvcmQuXG4gICAgLy8gRnV0dXJlIGRhdGFiYXNlIGFkYXB0ZXJzIHdpbGwgb25seSBrbm93IGFib3V0IF9oYXNoZWRfcGFzc3dvcmQuXG4gICAgLy8gTm90ZTogUGFyc2UgU2VydmVyIHdpbGwgYnJpbmcgYmFjayBwYXNzd29yZCB3aXRoIGluamVjdERlZmF1bHRTY2hlbWEsIHNvIHdlIGRvbid0IG5lZWRcbiAgICAvLyB0byBhZGQgX2hhc2hlZF9wYXNzd29yZCBiYWNrIGV2ZXIuXG4gICAgZGVsZXRlIHNjaGVtYS5maWVsZHMuX2hhc2hlZF9wYXNzd29yZDtcbiAgfVxuXG4gIHJldHVybiBzY2hlbWE7XG59O1xuXG4vLyBSZXR1cm5zIHsgY29kZSwgZXJyb3IgfSBpZiBpbnZhbGlkLCBvciB7IHJlc3VsdCB9LCBhbiBvYmplY3Rcbi8vIHN1aXRhYmxlIGZvciBpbnNlcnRpbmcgaW50byBfU0NIRU1BIGNvbGxlY3Rpb24sIG90aGVyd2lzZS5cbmNvbnN0IG1vbmdvU2NoZW1hRnJvbUZpZWxkc0FuZENsYXNzTmFtZUFuZENMUCA9IChcbiAgZmllbGRzLFxuICBjbGFzc05hbWUsXG4gIGNsYXNzTGV2ZWxQZXJtaXNzaW9ucyxcbiAgaW5kZXhlc1xuKSA9PiB7XG4gIGNvbnN0IG1vbmdvT2JqZWN0ID0ge1xuICAgIF9pZDogY2xhc3NOYW1lLFxuICAgIG9iamVjdElkOiAnc3RyaW5nJyxcbiAgICB1cGRhdGVkQXQ6ICdzdHJpbmcnLFxuICAgIGNyZWF0ZWRBdDogJ3N0cmluZycsXG4gICAgX21ldGFkYXRhOiB1bmRlZmluZWQsXG4gIH07XG5cbiAgZm9yIChjb25zdCBmaWVsZE5hbWUgaW4gZmllbGRzKSB7XG4gICAgY29uc3QgeyB0eXBlLCB0YXJnZXRDbGFzcywgLi4uZmllbGRPcHRpb25zIH0gPSBmaWVsZHNbZmllbGROYW1lXTtcbiAgICBtb25nb09iamVjdFtmaWVsZE5hbWVdID0gTW9uZ29TY2hlbWFDb2xsZWN0aW9uLnBhcnNlRmllbGRUeXBlVG9Nb25nb0ZpZWxkVHlwZSh7XG4gICAgICB0eXBlLFxuICAgICAgdGFyZ2V0Q2xhc3MsXG4gICAgfSk7XG4gICAgaWYgKGZpZWxkT3B0aW9ucyAmJiBPYmplY3Qua2V5cyhmaWVsZE9wdGlvbnMpLmxlbmd0aCA+IDApIHtcbiAgICAgIG1vbmdvT2JqZWN0Ll9tZXRhZGF0YSA9IG1vbmdvT2JqZWN0Ll9tZXRhZGF0YSB8fCB7fTtcbiAgICAgIG1vbmdvT2JqZWN0Ll9tZXRhZGF0YS5maWVsZHNfb3B0aW9ucyA9IG1vbmdvT2JqZWN0Ll9tZXRhZGF0YS5maWVsZHNfb3B0aW9ucyB8fCB7fTtcbiAgICAgIG1vbmdvT2JqZWN0Ll9tZXRhZGF0YS5maWVsZHNfb3B0aW9uc1tmaWVsZE5hbWVdID0gZmllbGRPcHRpb25zO1xuICAgIH1cbiAgfVxuXG4gIGlmICh0eXBlb2YgY2xhc3NMZXZlbFBlcm1pc3Npb25zICE9PSAndW5kZWZpbmVkJykge1xuICAgIG1vbmdvT2JqZWN0Ll9tZXRhZGF0YSA9IG1vbmdvT2JqZWN0Ll9tZXRhZGF0YSB8fCB7fTtcbiAgICBpZiAoIWNsYXNzTGV2ZWxQZXJtaXNzaW9ucykge1xuICAgICAgZGVsZXRlIG1vbmdvT2JqZWN0Ll9tZXRhZGF0YS5jbGFzc19wZXJtaXNzaW9ucztcbiAgICB9IGVsc2Uge1xuICAgICAgbW9uZ29PYmplY3QuX21ldGFkYXRhLmNsYXNzX3Blcm1pc3Npb25zID0gY2xhc3NMZXZlbFBlcm1pc3Npb25zO1xuICAgIH1cbiAgfVxuXG4gIGlmIChpbmRleGVzICYmIHR5cGVvZiBpbmRleGVzID09PSAnb2JqZWN0JyAmJiBPYmplY3Qua2V5cyhpbmRleGVzKS5sZW5ndGggPiAwKSB7XG4gICAgbW9uZ29PYmplY3QuX21ldGFkYXRhID0gbW9uZ29PYmplY3QuX21ldGFkYXRhIHx8IHt9O1xuICAgIG1vbmdvT2JqZWN0Ll9tZXRhZGF0YS5pbmRleGVzID0gaW5kZXhlcztcbiAgfVxuXG4gIGlmICghbW9uZ29PYmplY3QuX21ldGFkYXRhKSB7XG4gICAgLy8gY2xlYW51cCB0aGUgdW51c2VkIF9tZXRhZGF0YVxuICAgIGRlbGV0ZSBtb25nb09iamVjdC5fbWV0YWRhdGE7XG4gIH1cblxuICByZXR1cm4gbW9uZ29PYmplY3Q7XG59O1xuXG5mdW5jdGlvbiB2YWxpZGF0ZUV4cGxhaW5WYWx1ZShleHBsYWluKSB7XG4gIGlmIChleHBsYWluKSB7XG4gICAgLy8gVGhlIGxpc3Qgb2YgYWxsb3dlZCBleHBsYWluIHZhbHVlcyBpcyBmcm9tIG5vZGUtbW9uZ29kYi1uYXRpdmUvbGliL2V4cGxhaW4uanNcbiAgICBjb25zdCBleHBsYWluQWxsb3dlZFZhbHVlcyA9IFtcbiAgICAgICdxdWVyeVBsYW5uZXInLFxuICAgICAgJ3F1ZXJ5UGxhbm5lckV4dGVuZGVkJyxcbiAgICAgICdleGVjdXRpb25TdGF0cycsXG4gICAgICAnYWxsUGxhbnNFeGVjdXRpb24nLFxuICAgICAgZmFsc2UsXG4gICAgICB0cnVlLFxuICAgIF07XG4gICAgaWYgKCFleHBsYWluQWxsb3dlZFZhbHVlcy5pbmNsdWRlcyhleHBsYWluKSkge1xuICAgICAgdGhyb3cgbmV3IFBhcnNlLkVycm9yKFBhcnNlLkVycm9yLklOVkFMSURfUVVFUlksICdJbnZhbGlkIHZhbHVlIGZvciBleHBsYWluJyk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBNb25nb1N0b3JhZ2VBZGFwdGVyIGltcGxlbWVudHMgU3RvcmFnZUFkYXB0ZXIge1xuICAvLyBQcml2YXRlXG4gIF91cmk6IHN0cmluZztcbiAgX2NvbGxlY3Rpb25QcmVmaXg6IHN0cmluZztcbiAgX21vbmdvT3B0aW9uczogT2JqZWN0O1xuICBfb25jaGFuZ2U6IGFueTtcbiAgX3N0cmVhbTogYW55O1xuICAvLyBQdWJsaWNcbiAgY29ubmVjdGlvblByb21pc2U6ID9Qcm9taXNlPGFueT47XG4gIGRhdGFiYXNlOiBhbnk7XG4gIGNsaWVudDogTW9uZ29DbGllbnQ7XG4gIF9tYXhUaW1lTVM6ID9udW1iZXI7XG4gIGNhblNvcnRPbkpvaW5UYWJsZXM6IGJvb2xlYW47XG4gIGVuYWJsZVNjaGVtYUhvb2tzOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHsgdXJpID0gZGVmYXVsdHMuRGVmYXVsdE1vbmdvVVJJLCBjb2xsZWN0aW9uUHJlZml4ID0gJycsIG1vbmdvT3B0aW9ucyA9IHt9IH06IGFueSkge1xuICAgIHRoaXMuX3VyaSA9IHVyaTtcbiAgICB0aGlzLl9jb2xsZWN0aW9uUHJlZml4ID0gY29sbGVjdGlvblByZWZpeDtcbiAgICB0aGlzLl9tb25nb09wdGlvbnMgPSBtb25nb09wdGlvbnM7XG4gICAgdGhpcy5fbW9uZ29PcHRpb25zLnVzZU5ld1VybFBhcnNlciA9IHRydWU7XG4gICAgdGhpcy5fbW9uZ29PcHRpb25zLnVzZVVuaWZpZWRUb3BvbG9neSA9IHRydWU7XG4gICAgdGhpcy5fb25jaGFuZ2UgPSAoKSA9PiB7fTtcblxuICAgIC8vIE1heFRpbWVNUyBpcyBub3QgYSBnbG9iYWwgTW9uZ29EQiBjbGllbnQgb3B0aW9uLCBpdCBpcyBhcHBsaWVkIHBlciBvcGVyYXRpb24uXG4gICAgdGhpcy5fbWF4VGltZU1TID0gbW9uZ29PcHRpb25zLm1heFRpbWVNUztcbiAgICB0aGlzLmNhblNvcnRPbkpvaW5UYWJsZXMgPSB0cnVlO1xuICAgIHRoaXMuZW5hYmxlU2NoZW1hSG9va3MgPSAhIW1vbmdvT3B0aW9ucy5lbmFibGVTY2hlbWFIb29rcztcbiAgICBkZWxldGUgbW9uZ29PcHRpb25zLmVuYWJsZVNjaGVtYUhvb2tzO1xuICAgIGRlbGV0ZSBtb25nb09wdGlvbnMubWF4VGltZU1TO1xuICB9XG5cbiAgd2F0Y2goY2FsbGJhY2s6ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLl9vbmNoYW5nZSA9IGNhbGxiYWNrO1xuICB9XG5cbiAgY29ubmVjdCgpIHtcbiAgICBpZiAodGhpcy5jb25uZWN0aW9uUHJvbWlzZSkge1xuICAgICAgcmV0dXJuIHRoaXMuY29ubmVjdGlvblByb21pc2U7XG4gICAgfVxuXG4gICAgLy8gcGFyc2luZyBhbmQgcmUtZm9ybWF0dGluZyBjYXVzZXMgdGhlIGF1dGggdmFsdWUgKGlmIHRoZXJlKSB0byBnZXQgVVJJXG4gICAgLy8gZW5jb2RlZFxuICAgIGNvbnN0IGVuY29kZWRVcmkgPSBmb3JtYXRVcmwocGFyc2VVcmwodGhpcy5fdXJpKSk7XG5cbiAgICB0aGlzLmNvbm5lY3Rpb25Qcm9taXNlID0gTW9uZ29DbGllbnQuY29ubmVjdChlbmNvZGVkVXJpLCB0aGlzLl9tb25nb09wdGlvbnMpXG4gICAgICAudGhlbihjbGllbnQgPT4ge1xuICAgICAgICAvLyBTdGFydGluZyBtb25nb0RCIDMuMCwgdGhlIE1vbmdvQ2xpZW50LmNvbm5lY3QgZG9uJ3QgcmV0dXJuIGEgREIgYW55bW9yZSBidXQgYSBjbGllbnRcbiAgICAgICAgLy8gRm9ydHVuYXRlbHksIHdlIGNhbiBnZXQgYmFjayB0aGUgb3B0aW9ucyBhbmQgdXNlIHRoZW0gdG8gc2VsZWN0IHRoZSBwcm9wZXIgREIuXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tb25nb2RiL25vZGUtbW9uZ29kYi1uYXRpdmUvYmxvYi8yYzM1ZDc2ZjA4NTc0MjI1YjhkYjAyZDdiZWY2ODcxMjNlNmJiMDE4L2xpYi9tb25nb19jbGllbnQuanMjTDg4NVxuICAgICAgICBjb25zdCBvcHRpb25zID0gY2xpZW50LnMub3B0aW9ucztcbiAgICAgICAgY29uc3QgZGF0YWJhc2UgPSBjbGllbnQuZGIob3B0aW9ucy5kYk5hbWUpO1xuICAgICAgICBpZiAoIWRhdGFiYXNlKSB7XG4gICAgICAgICAgZGVsZXRlIHRoaXMuY29ubmVjdGlvblByb21pc2U7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNsaWVudC5vbignZXJyb3InLCAoKSA9PiB7XG4gICAgICAgICAgZGVsZXRlIHRoaXMuY29ubmVjdGlvblByb21pc2U7XG4gICAgICAgIH0pO1xuICAgICAgICBjbGllbnQub24oJ2Nsb3NlJywgKCkgPT4ge1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLmNvbm5lY3Rpb25Qcm9taXNlO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5jbGllbnQgPSBjbGllbnQ7XG4gICAgICAgIHRoaXMuZGF0YWJhc2UgPSBkYXRhYmFzZTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgZGVsZXRlIHRoaXMuY29ubmVjdGlvblByb21pc2U7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5jb25uZWN0aW9uUHJvbWlzZTtcbiAgfVxuXG4gIGhhbmRsZUVycm9yPFQ+KGVycm9yOiA/KEVycm9yIHwgUGFyc2UuRXJyb3IpKTogUHJvbWlzZTxUPiB7XG4gICAgaWYgKGVycm9yICYmIGVycm9yLmNvZGUgPT09IDEzKSB7XG4gICAgICAvLyBVbmF1dGhvcml6ZWQgZXJyb3JcbiAgICAgIGRlbGV0ZSB0aGlzLmNsaWVudDtcbiAgICAgIGRlbGV0ZSB0aGlzLmRhdGFiYXNlO1xuICAgICAgZGVsZXRlIHRoaXMuY29ubmVjdGlvblByb21pc2U7XG4gICAgICBsb2dnZXIuZXJyb3IoJ1JlY2VpdmVkIHVuYXV0aG9yaXplZCBlcnJvcicsIHsgZXJyb3I6IGVycm9yIH0pO1xuICAgIH1cbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxuXG4gIGhhbmRsZVNodXRkb3duKCkge1xuICAgIGlmICghdGhpcy5jbGllbnQpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY2xpZW50LmNsb3NlKGZhbHNlKTtcbiAgfVxuXG4gIF9hZGFwdGl2ZUNvbGxlY3Rpb24obmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuY29ubmVjdCgpXG4gICAgICAudGhlbigoKSA9PiB0aGlzLmRhdGFiYXNlLmNvbGxlY3Rpb24odGhpcy5fY29sbGVjdGlvblByZWZpeCArIG5hbWUpKVxuICAgICAgLnRoZW4ocmF3Q29sbGVjdGlvbiA9PiBuZXcgTW9uZ29Db2xsZWN0aW9uKHJhd0NvbGxlY3Rpb24pKVxuICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLmhhbmRsZUVycm9yKGVycikpO1xuICB9XG5cbiAgX3NjaGVtYUNvbGxlY3Rpb24oKTogUHJvbWlzZTxNb25nb1NjaGVtYUNvbGxlY3Rpb24+IHtcbiAgICByZXR1cm4gdGhpcy5jb25uZWN0KClcbiAgICAgIC50aGVuKCgpID0+IHRoaXMuX2FkYXB0aXZlQ29sbGVjdGlvbihNb25nb1NjaGVtYUNvbGxlY3Rpb25OYW1lKSlcbiAgICAgIC50aGVuKGNvbGxlY3Rpb24gPT4ge1xuICAgICAgICBpZiAoIXRoaXMuX3N0cmVhbSAmJiB0aGlzLmVuYWJsZVNjaGVtYUhvb2tzKSB7XG4gICAgICAgICAgdGhpcy5fc3RyZWFtID0gY29sbGVjdGlvbi5fbW9uZ29Db2xsZWN0aW9uLndhdGNoKCk7XG4gICAgICAgICAgdGhpcy5fc3RyZWFtLm9uKCdjaGFuZ2UnLCAoKSA9PiB0aGlzLl9vbmNoYW5nZSgpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IE1vbmdvU2NoZW1hQ29sbGVjdGlvbihjb2xsZWN0aW9uKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgY2xhc3NFeGlzdHMobmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuY29ubmVjdCgpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFiYXNlLmxpc3RDb2xsZWN0aW9ucyh7IG5hbWU6IHRoaXMuX2NvbGxlY3Rpb25QcmVmaXggKyBuYW1lIH0pLnRvQXJyYXkoKTtcbiAgICAgIH0pXG4gICAgICAudGhlbihjb2xsZWN0aW9ucyA9PiB7XG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9ucy5sZW5ndGggPiAwO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnIpKTtcbiAgfVxuXG4gIHNldENsYXNzTGV2ZWxQZXJtaXNzaW9ucyhjbGFzc05hbWU6IHN0cmluZywgQ0xQczogYW55KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX3NjaGVtYUNvbGxlY3Rpb24oKVxuICAgICAgLnRoZW4oc2NoZW1hQ29sbGVjdGlvbiA9PlxuICAgICAgICBzY2hlbWFDb2xsZWN0aW9uLnVwZGF0ZVNjaGVtYShjbGFzc05hbWUsIHtcbiAgICAgICAgICAkc2V0OiB7ICdfbWV0YWRhdGEuY2xhc3NfcGVybWlzc2lvbnMnOiBDTFBzIH0sXG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyKSk7XG4gIH1cblxuICBzZXRJbmRleGVzV2l0aFNjaGVtYUZvcm1hdChcbiAgICBjbGFzc05hbWU6IHN0cmluZyxcbiAgICBzdWJtaXR0ZWRJbmRleGVzOiBhbnksXG4gICAgZXhpc3RpbmdJbmRleGVzOiBhbnkgPSB7fSxcbiAgICBmaWVsZHM6IGFueVxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoc3VibWl0dGVkSW5kZXhlcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuICAgIGlmIChPYmplY3Qua2V5cyhleGlzdGluZ0luZGV4ZXMpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgZXhpc3RpbmdJbmRleGVzID0geyBfaWRfOiB7IF9pZDogMSB9IH07XG4gICAgfVxuICAgIGNvbnN0IGRlbGV0ZVByb21pc2VzID0gW107XG4gICAgY29uc3QgaW5zZXJ0ZWRJbmRleGVzID0gW107XG4gICAgT2JqZWN0LmtleXMoc3VibWl0dGVkSW5kZXhlcykuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgIGNvbnN0IGZpZWxkID0gc3VibWl0dGVkSW5kZXhlc1tuYW1lXTtcbiAgICAgIGlmIChleGlzdGluZ0luZGV4ZXNbbmFtZV0gJiYgZmllbGQuX19vcCAhPT0gJ0RlbGV0ZScpIHtcbiAgICAgICAgdGhyb3cgbmV3IFBhcnNlLkVycm9yKFBhcnNlLkVycm9yLklOVkFMSURfUVVFUlksIGBJbmRleCAke25hbWV9IGV4aXN0cywgY2Fubm90IHVwZGF0ZS5gKTtcbiAgICAgIH1cbiAgICAgIGlmICghZXhpc3RpbmdJbmRleGVzW25hbWVdICYmIGZpZWxkLl9fb3AgPT09ICdEZWxldGUnKSB7XG4gICAgICAgIHRocm93IG5ldyBQYXJzZS5FcnJvcihcbiAgICAgICAgICBQYXJzZS5FcnJvci5JTlZBTElEX1FVRVJZLFxuICAgICAgICAgIGBJbmRleCAke25hbWV9IGRvZXMgbm90IGV4aXN0LCBjYW5ub3QgZGVsZXRlLmBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmIChmaWVsZC5fX29wID09PSAnRGVsZXRlJykge1xuICAgICAgICBjb25zdCBwcm9taXNlID0gdGhpcy5kcm9wSW5kZXgoY2xhc3NOYW1lLCBuYW1lKTtcbiAgICAgICAgZGVsZXRlUHJvbWlzZXMucHVzaChwcm9taXNlKTtcbiAgICAgICAgZGVsZXRlIGV4aXN0aW5nSW5kZXhlc1tuYW1lXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIE9iamVjdC5rZXlzKGZpZWxkKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChcbiAgICAgICAgICAgICAgZmllbGRzLFxuICAgICAgICAgICAgICBrZXkuaW5kZXhPZignX3BfJykgPT09IDAgPyBrZXkucmVwbGFjZSgnX3BfJywgJycpIDoga2V5XG4gICAgICAgICAgICApXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUGFyc2UuRXJyb3IoXG4gICAgICAgICAgICAgIFBhcnNlLkVycm9yLklOVkFMSURfUVVFUlksXG4gICAgICAgICAgICAgIGBGaWVsZCAke2tleX0gZG9lcyBub3QgZXhpc3QsIGNhbm5vdCBhZGQgaW5kZXguYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBleGlzdGluZ0luZGV4ZXNbbmFtZV0gPSBmaWVsZDtcbiAgICAgICAgaW5zZXJ0ZWRJbmRleGVzLnB1c2goe1xuICAgICAgICAgIGtleTogZmllbGQsXG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgbGV0IGluc2VydFByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoKTtcbiAgICBpZiAoaW5zZXJ0ZWRJbmRleGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGluc2VydFByb21pc2UgPSB0aGlzLmNyZWF0ZUluZGV4ZXMoY2xhc3NOYW1lLCBpbnNlcnRlZEluZGV4ZXMpO1xuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoZGVsZXRlUHJvbWlzZXMpXG4gICAgICAudGhlbigoKSA9PiBpbnNlcnRQcm9taXNlKVxuICAgICAgLnRoZW4oKCkgPT4gdGhpcy5fc2NoZW1hQ29sbGVjdGlvbigpKVxuICAgICAgLnRoZW4oc2NoZW1hQ29sbGVjdGlvbiA9PlxuICAgICAgICBzY2hlbWFDb2xsZWN0aW9uLnVwZGF0ZVNjaGVtYShjbGFzc05hbWUsIHtcbiAgICAgICAgICAkc2V0OiB7ICdfbWV0YWRhdGEuaW5kZXhlcyc6IGV4aXN0aW5nSW5kZXhlcyB9LFxuICAgICAgICB9KVxuICAgICAgKVxuICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLmhhbmRsZUVycm9yKGVycikpO1xuICB9XG5cbiAgc2V0SW5kZXhlc0Zyb21Nb25nbyhjbGFzc05hbWU6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmdldEluZGV4ZXMoY2xhc3NOYW1lKVxuICAgICAgLnRoZW4oaW5kZXhlcyA9PiB7XG4gICAgICAgIGluZGV4ZXMgPSBpbmRleGVzLnJlZHVjZSgob2JqLCBpbmRleCkgPT4ge1xuICAgICAgICAgIGlmIChpbmRleC5rZXkuX2Z0cykge1xuICAgICAgICAgICAgZGVsZXRlIGluZGV4LmtleS5fZnRzO1xuICAgICAgICAgICAgZGVsZXRlIGluZGV4LmtleS5fZnRzeDtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZmllbGQgaW4gaW5kZXgud2VpZ2h0cykge1xuICAgICAgICAgICAgICBpbmRleC5rZXlbZmllbGRdID0gJ3RleHQnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBvYmpbaW5kZXgubmFtZV0gPSBpbmRleC5rZXk7XG4gICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfSwge30pO1xuICAgICAgICByZXR1cm4gdGhpcy5fc2NoZW1hQ29sbGVjdGlvbigpLnRoZW4oc2NoZW1hQ29sbGVjdGlvbiA9PlxuICAgICAgICAgIHNjaGVtYUNvbGxlY3Rpb24udXBkYXRlU2NoZW1hKGNsYXNzTmFtZSwge1xuICAgICAgICAgICAgJHNldDogeyAnX21ldGFkYXRhLmluZGV4ZXMnOiBpbmRleGVzIH0sXG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyKSlcbiAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgIC8vIElnbm9yZSBpZiBjb2xsZWN0aW9uIG5vdCBmb3VuZFxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIGNyZWF0ZUNsYXNzKGNsYXNzTmFtZTogc3RyaW5nLCBzY2hlbWE6IFNjaGVtYVR5cGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBzY2hlbWEgPSBjb252ZXJ0UGFyc2VTY2hlbWFUb01vbmdvU2NoZW1hKHNjaGVtYSk7XG4gICAgY29uc3QgbW9uZ29PYmplY3QgPSBtb25nb1NjaGVtYUZyb21GaWVsZHNBbmRDbGFzc05hbWVBbmRDTFAoXG4gICAgICBzY2hlbWEuZmllbGRzLFxuICAgICAgY2xhc3NOYW1lLFxuICAgICAgc2NoZW1hLmNsYXNzTGV2ZWxQZXJtaXNzaW9ucyxcbiAgICAgIHNjaGVtYS5pbmRleGVzXG4gICAgKTtcbiAgICBtb25nb09iamVjdC5faWQgPSBjbGFzc05hbWU7XG4gICAgcmV0dXJuIHRoaXMuc2V0SW5kZXhlc1dpdGhTY2hlbWFGb3JtYXQoY2xhc3NOYW1lLCBzY2hlbWEuaW5kZXhlcywge30sIHNjaGVtYS5maWVsZHMpXG4gICAgICAudGhlbigoKSA9PiB0aGlzLl9zY2hlbWFDb2xsZWN0aW9uKCkpXG4gICAgICAudGhlbihzY2hlbWFDb2xsZWN0aW9uID0+IHNjaGVtYUNvbGxlY3Rpb24uaW5zZXJ0U2NoZW1hKG1vbmdvT2JqZWN0KSlcbiAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnIpKTtcbiAgfVxuXG4gIGFzeW5jIHVwZGF0ZUZpZWxkT3B0aW9ucyhjbGFzc05hbWU6IHN0cmluZywgZmllbGROYW1lOiBzdHJpbmcsIHR5cGU6IGFueSkge1xuICAgIGNvbnN0IHNjaGVtYUNvbGxlY3Rpb24gPSBhd2FpdCB0aGlzLl9zY2hlbWFDb2xsZWN0aW9uKCk7XG4gICAgYXdhaXQgc2NoZW1hQ29sbGVjdGlvbi51cGRhdGVGaWVsZE9wdGlvbnMoY2xhc3NOYW1lLCBmaWVsZE5hbWUsIHR5cGUpO1xuICB9XG5cbiAgYWRkRmllbGRJZk5vdEV4aXN0cyhjbGFzc05hbWU6IHN0cmluZywgZmllbGROYW1lOiBzdHJpbmcsIHR5cGU6IGFueSk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9zY2hlbWFDb2xsZWN0aW9uKClcbiAgICAgIC50aGVuKHNjaGVtYUNvbGxlY3Rpb24gPT4gc2NoZW1hQ29sbGVjdGlvbi5hZGRGaWVsZElmTm90RXhpc3RzKGNsYXNzTmFtZSwgZmllbGROYW1lLCB0eXBlKSlcbiAgICAgIC50aGVuKCgpID0+IHRoaXMuY3JlYXRlSW5kZXhlc0lmTmVlZGVkKGNsYXNzTmFtZSwgZmllbGROYW1lLCB0eXBlKSlcbiAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnIpKTtcbiAgfVxuXG4gIC8vIERyb3BzIGEgY29sbGVjdGlvbi4gUmVzb2x2ZXMgd2l0aCB0cnVlIGlmIGl0IHdhcyBhIFBhcnNlIFNjaGVtYSAoZWcuIF9Vc2VyLCBDdXN0b20sIGV0Yy4pXG4gIC8vIGFuZCByZXNvbHZlcyB3aXRoIGZhbHNlIGlmIGl0IHdhc24ndCAoZWcuIGEgam9pbiB0YWJsZSkuIFJlamVjdHMgaWYgZGVsZXRpb24gd2FzIGltcG9zc2libGUuXG4gIGRlbGV0ZUNsYXNzKGNsYXNzTmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuX2FkYXB0aXZlQ29sbGVjdGlvbihjbGFzc05hbWUpXG4gICAgICAgIC50aGVuKGNvbGxlY3Rpb24gPT4gY29sbGVjdGlvbi5kcm9wKCkpXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgLy8gJ25zIG5vdCBmb3VuZCcgbWVhbnMgY29sbGVjdGlvbiB3YXMgYWxyZWFkeSBnb25lLiBJZ25vcmUgZGVsZXRpb24gYXR0ZW1wdC5cbiAgICAgICAgICBpZiAoZXJyb3IubWVzc2FnZSA9PSAnbnMgbm90IGZvdW5kJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfSlcbiAgICAgICAgLy8gV2UndmUgZHJvcHBlZCB0aGUgY29sbGVjdGlvbiwgbm93IHJlbW92ZSB0aGUgX1NDSEVNQSBkb2N1bWVudFxuICAgICAgICAudGhlbigoKSA9PiB0aGlzLl9zY2hlbWFDb2xsZWN0aW9uKCkpXG4gICAgICAgIC50aGVuKHNjaGVtYUNvbGxlY3Rpb24gPT4gc2NoZW1hQ29sbGVjdGlvbi5maW5kQW5kRGVsZXRlU2NoZW1hKGNsYXNzTmFtZSkpXG4gICAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnIpKVxuICAgICk7XG4gIH1cblxuICBkZWxldGVBbGxDbGFzc2VzKGZhc3Q6IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gc3RvcmFnZUFkYXB0ZXJBbGxDb2xsZWN0aW9ucyh0aGlzKS50aGVuKGNvbGxlY3Rpb25zID0+XG4gICAgICBQcm9taXNlLmFsbChcbiAgICAgICAgY29sbGVjdGlvbnMubWFwKGNvbGxlY3Rpb24gPT4gKGZhc3QgPyBjb2xsZWN0aW9uLmRlbGV0ZU1hbnkoe30pIDogY29sbGVjdGlvbi5kcm9wKCkpKVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICAvLyBSZW1vdmUgdGhlIGNvbHVtbiBhbmQgYWxsIHRoZSBkYXRhLiBGb3IgUmVsYXRpb25zLCB0aGUgX0pvaW4gY29sbGVjdGlvbiBpcyBoYW5kbGVkXG4gIC8vIHNwZWNpYWxseSwgdGhpcyBmdW5jdGlvbiBkb2VzIG5vdCBkZWxldGUgX0pvaW4gY29sdW1ucy4gSXQgc2hvdWxkLCBob3dldmVyLCBpbmRpY2F0ZVxuICAvLyB0aGF0IHRoZSByZWxhdGlvbiBmaWVsZHMgZG9lcyBub3QgZXhpc3QgYW55bW9yZS4gSW4gbW9uZ28sIHRoaXMgbWVhbnMgcmVtb3ZpbmcgaXQgZnJvbVxuICAvLyB0aGUgX1NDSEVNQSBjb2xsZWN0aW9uLiAgVGhlcmUgc2hvdWxkIGJlIG5vIGFjdHVhbCBkYXRhIGluIHRoZSBjb2xsZWN0aW9uIHVuZGVyIHRoZSBzYW1lIG5hbWVcbiAgLy8gYXMgdGhlIHJlbGF0aW9uIGNvbHVtbiwgc28gaXQncyBmaW5lIHRvIGF0dGVtcHQgdG8gZGVsZXRlIGl0LiBJZiB0aGUgZmllbGRzIGxpc3RlZCB0byBiZVxuICAvLyBkZWxldGVkIGRvIG5vdCBleGlzdCwgdGhpcyBmdW5jdGlvbiBzaG91bGQgcmV0dXJuIHN1Y2Nlc3NmdWxseSBhbnl3YXlzLiBDaGVja2luZyBmb3JcbiAgLy8gYXR0ZW1wdHMgdG8gZGVsZXRlIG5vbi1leGlzdGVudCBmaWVsZHMgaXMgdGhlIHJlc3BvbnNpYmlsaXR5IG9mIFBhcnNlIFNlcnZlci5cblxuICAvLyBQb2ludGVyIGZpZWxkIG5hbWVzIGFyZSBwYXNzZWQgZm9yIGxlZ2FjeSByZWFzb25zOiB0aGUgb3JpZ2luYWwgbW9uZ29cbiAgLy8gZm9ybWF0IHN0b3JlZCBwb2ludGVyIGZpZWxkIG5hbWVzIGRpZmZlcmVudGx5IGluIHRoZSBkYXRhYmFzZSwgYW5kIHRoZXJlZm9yZVxuICAvLyBuZWVkZWQgdG8ga25vdyB0aGUgdHlwZSBvZiB0aGUgZmllbGQgYmVmb3JlIGl0IGNvdWxkIGRlbGV0ZSBpdC4gRnV0dXJlIGRhdGFiYXNlXG4gIC8vIGFkYXB0ZXJzIHNob3VsZCBpZ25vcmUgdGhlIHBvaW50ZXJGaWVsZE5hbWVzIGFyZ3VtZW50LiBBbGwgdGhlIGZpZWxkIG5hbWVzIGFyZSBpblxuICAvLyBmaWVsZE5hbWVzLCB0aGV5IHNob3cgdXAgYWRkaXRpb25hbGx5IGluIHRoZSBwb2ludGVyRmllbGROYW1lcyBkYXRhYmFzZSBmb3IgdXNlXG4gIC8vIGJ5IHRoZSBtb25nbyBhZGFwdGVyLCB3aGljaCBkZWFscyB3aXRoIHRoZSBsZWdhY3kgbW9uZ28gZm9ybWF0LlxuXG4gIC8vIFRoaXMgZnVuY3Rpb24gaXMgbm90IG9ibGlnYXRlZCB0byBkZWxldGUgZmllbGRzIGF0b21pY2FsbHkuIEl0IGlzIGdpdmVuIHRoZSBmaWVsZFxuICAvLyBuYW1lcyBpbiBhIGxpc3Qgc28gdGhhdCBkYXRhYmFzZXMgdGhhdCBhcmUgY2FwYWJsZSBvZiBkZWxldGluZyBmaWVsZHMgYXRvbWljYWxseVxuICAvLyBtYXkgZG8gc28uXG5cbiAgLy8gUmV0dXJucyBhIFByb21pc2UuXG4gIGRlbGV0ZUZpZWxkcyhjbGFzc05hbWU6IHN0cmluZywgc2NoZW1hOiBTY2hlbWFUeXBlLCBmaWVsZE5hbWVzOiBzdHJpbmdbXSkge1xuICAgIGNvbnN0IG1vbmdvRm9ybWF0TmFtZXMgPSBmaWVsZE5hbWVzLm1hcChmaWVsZE5hbWUgPT4ge1xuICAgICAgaWYgKHNjaGVtYS5maWVsZHNbZmllbGROYW1lXS50eXBlID09PSAnUG9pbnRlcicpIHtcbiAgICAgICAgcmV0dXJuIGBfcF8ke2ZpZWxkTmFtZX1gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZpZWxkTmFtZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCBjb2xsZWN0aW9uVXBkYXRlID0geyAkdW5zZXQ6IHt9IH07XG4gICAgbW9uZ29Gb3JtYXROYW1lcy5mb3JFYWNoKG5hbWUgPT4ge1xuICAgICAgY29sbGVjdGlvblVwZGF0ZVsnJHVuc2V0J11bbmFtZV0gPSBudWxsO1xuICAgIH0pO1xuXG4gICAgY29uc3QgY29sbGVjdGlvbkZpbHRlciA9IHsgJG9yOiBbXSB9O1xuICAgIG1vbmdvRm9ybWF0TmFtZXMuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgIGNvbGxlY3Rpb25GaWx0ZXJbJyRvciddLnB1c2goeyBbbmFtZV06IHsgJGV4aXN0czogdHJ1ZSB9IH0pO1xuICAgIH0pO1xuXG4gICAgY29uc3Qgc2NoZW1hVXBkYXRlID0geyAkdW5zZXQ6IHt9IH07XG4gICAgZmllbGROYW1lcy5mb3JFYWNoKG5hbWUgPT4ge1xuICAgICAgc2NoZW1hVXBkYXRlWyckdW5zZXQnXVtuYW1lXSA9IG51bGw7XG4gICAgICBzY2hlbWFVcGRhdGVbJyR1bnNldCddW2BfbWV0YWRhdGEuZmllbGRzX29wdGlvbnMuJHtuYW1lfWBdID0gbnVsbDtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLl9hZGFwdGl2ZUNvbGxlY3Rpb24oY2xhc3NOYW1lKVxuICAgICAgLnRoZW4oY29sbGVjdGlvbiA9PiBjb2xsZWN0aW9uLnVwZGF0ZU1hbnkoY29sbGVjdGlvbkZpbHRlciwgY29sbGVjdGlvblVwZGF0ZSkpXG4gICAgICAudGhlbigoKSA9PiB0aGlzLl9zY2hlbWFDb2xsZWN0aW9uKCkpXG4gICAgICAudGhlbihzY2hlbWFDb2xsZWN0aW9uID0+IHNjaGVtYUNvbGxlY3Rpb24udXBkYXRlU2NoZW1hKGNsYXNzTmFtZSwgc2NoZW1hVXBkYXRlKSlcbiAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnIpKTtcbiAgfVxuXG4gIC8vIFJldHVybiBhIHByb21pc2UgZm9yIGFsbCBzY2hlbWFzIGtub3duIHRvIHRoaXMgYWRhcHRlciwgaW4gUGFyc2UgZm9ybWF0LiBJbiBjYXNlIHRoZVxuICAvLyBzY2hlbWFzIGNhbm5vdCBiZSByZXRyaWV2ZWQsIHJldHVybnMgYSBwcm9taXNlIHRoYXQgcmVqZWN0cy4gUmVxdWlyZW1lbnRzIGZvciB0aGVcbiAgLy8gcmVqZWN0aW9uIHJlYXNvbiBhcmUgVEJELlxuICBnZXRBbGxDbGFzc2VzKCk6IFByb21pc2U8U3RvcmFnZUNsYXNzW10+IHtcbiAgICByZXR1cm4gdGhpcy5fc2NoZW1hQ29sbGVjdGlvbigpXG4gICAgICAudGhlbihzY2hlbWFzQ29sbGVjdGlvbiA9PiBzY2hlbWFzQ29sbGVjdGlvbi5fZmV0Y2hBbGxTY2hlbWFzRnJvbV9TQ0hFTUEoKSlcbiAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnIpKTtcbiAgfVxuXG4gIC8vIFJldHVybiBhIHByb21pc2UgZm9yIHRoZSBzY2hlbWEgd2l0aCB0aGUgZ2l2ZW4gbmFtZSwgaW4gUGFyc2UgZm9ybWF0LiBJZlxuICAvLyB0aGlzIGFkYXB0ZXIgZG9lc24ndCBrbm93IGFib3V0IHRoZSBzY2hlbWEsIHJldHVybiBhIHByb21pc2UgdGhhdCByZWplY3RzIHdpdGhcbiAgLy8gdW5kZWZpbmVkIGFzIHRoZSByZWFzb24uXG4gIGdldENsYXNzKGNsYXNzTmFtZTogc3RyaW5nKTogUHJvbWlzZTxTdG9yYWdlQ2xhc3M+IHtcbiAgICByZXR1cm4gdGhpcy5fc2NoZW1hQ29sbGVjdGlvbigpXG4gICAgICAudGhlbihzY2hlbWFzQ29sbGVjdGlvbiA9PiBzY2hlbWFzQ29sbGVjdGlvbi5fZmV0Y2hPbmVTY2hlbWFGcm9tX1NDSEVNQShjbGFzc05hbWUpKVxuICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLmhhbmRsZUVycm9yKGVycikpO1xuICB9XG5cbiAgLy8gVE9ETzogQXMgeWV0IG5vdCBwYXJ0aWN1bGFybHkgd2VsbCBzcGVjaWZpZWQuIENyZWF0ZXMgYW4gb2JqZWN0LiBNYXliZSBzaG91bGRuJ3QgZXZlbiBuZWVkIHRoZSBzY2hlbWEsXG4gIC8vIGFuZCBzaG91bGQgaW5mZXIgZnJvbSB0aGUgdHlwZS4gT3IgbWF5YmUgZG9lcyBuZWVkIHRoZSBzY2hlbWEgZm9yIHZhbGlkYXRpb25zLiBPciBtYXliZSBuZWVkc1xuICAvLyB0aGUgc2NoZW1hIG9ubHkgZm9yIHRoZSBsZWdhY3kgbW9uZ28gZm9ybWF0LiBXZSdsbCBmaWd1cmUgdGhhdCBvdXQgbGF0ZXIuXG4gIGNyZWF0ZU9iamVjdChjbGFzc05hbWU6IHN0cmluZywgc2NoZW1hOiBTY2hlbWFUeXBlLCBvYmplY3Q6IGFueSwgdHJhbnNhY3Rpb25hbFNlc3Npb246ID9hbnkpIHtcbiAgICBzY2hlbWEgPSBjb252ZXJ0UGFyc2VTY2hlbWFUb01vbmdvU2NoZW1hKHNjaGVtYSk7XG4gICAgY29uc3QgbW9uZ29PYmplY3QgPSBwYXJzZU9iamVjdFRvTW9uZ29PYmplY3RGb3JDcmVhdGUoY2xhc3NOYW1lLCBvYmplY3QsIHNjaGVtYSk7XG4gICAgcmV0dXJuIHRoaXMuX2FkYXB0aXZlQ29sbGVjdGlvbihjbGFzc05hbWUpXG4gICAgICAudGhlbihjb2xsZWN0aW9uID0+IGNvbGxlY3Rpb24uaW5zZXJ0T25lKG1vbmdvT2JqZWN0LCB0cmFuc2FjdGlvbmFsU2Vzc2lvbikpXG4gICAgICAudGhlbigoKSA9PiAoeyBvcHM6IFttb25nb09iamVjdF0gfSkpXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBpZiAoZXJyb3IuY29kZSA9PT0gMTEwMDApIHtcbiAgICAgICAgICAvLyBEdXBsaWNhdGUgdmFsdWVcbiAgICAgICAgICBjb25zdCBlcnIgPSBuZXcgUGFyc2UuRXJyb3IoXG4gICAgICAgICAgICBQYXJzZS5FcnJvci5EVVBMSUNBVEVfVkFMVUUsXG4gICAgICAgICAgICAnQSBkdXBsaWNhdGUgdmFsdWUgZm9yIGEgZmllbGQgd2l0aCB1bmlxdWUgdmFsdWVzIHdhcyBwcm92aWRlZCdcbiAgICAgICAgICApO1xuICAgICAgICAgIGVyci51bmRlcmx5aW5nRXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICBpZiAoZXJyb3IubWVzc2FnZSkge1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hlcyA9IGVycm9yLm1lc3NhZ2UubWF0Y2goL2luZGV4OltcXHNhLXpBLVowLTlfXFwtXFwuXStcXCQ/KFthLXpBLVpfLV0rKV8xLyk7XG4gICAgICAgICAgICBpZiAobWF0Y2hlcyAmJiBBcnJheS5pc0FycmF5KG1hdGNoZXMpKSB7XG4gICAgICAgICAgICAgIGVyci51c2VySW5mbyA9IHsgZHVwbGljYXRlZF9maWVsZDogbWF0Y2hlc1sxXSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLmhhbmRsZUVycm9yKGVycikpO1xuICB9XG5cbiAgLy8gUmVtb3ZlIGFsbCBvYmplY3RzIHRoYXQgbWF0Y2ggdGhlIGdpdmVuIFBhcnNlIFF1ZXJ5LlxuICAvLyBJZiBubyBvYmplY3RzIG1hdGNoLCByZWplY3Qgd2l0aCBPQkpFQ1RfTk9UX0ZPVU5ELiBJZiBvYmplY3RzIGFyZSBmb3VuZCBhbmQgZGVsZXRlZCwgcmVzb2x2ZSB3aXRoIHVuZGVmaW5lZC5cbiAgLy8gSWYgdGhlcmUgaXMgc29tZSBvdGhlciBlcnJvciwgcmVqZWN0IHdpdGggSU5URVJOQUxfU0VSVkVSX0VSUk9SLlxuICBkZWxldGVPYmplY3RzQnlRdWVyeShcbiAgICBjbGFzc05hbWU6IHN0cmluZyxcbiAgICBzY2hlbWE6IFNjaGVtYVR5cGUsXG4gICAgcXVlcnk6IFF1ZXJ5VHlwZSxcbiAgICB0cmFuc2FjdGlvbmFsU2Vzc2lvbjogP2FueVxuICApIHtcbiAgICBzY2hlbWEgPSBjb252ZXJ0UGFyc2VTY2hlbWFUb01vbmdvU2NoZW1hKHNjaGVtYSk7XG4gICAgcmV0dXJuIHRoaXMuX2FkYXB0aXZlQ29sbGVjdGlvbihjbGFzc05hbWUpXG4gICAgICAudGhlbihjb2xsZWN0aW9uID0+IHtcbiAgICAgICAgY29uc3QgbW9uZ29XaGVyZSA9IHRyYW5zZm9ybVdoZXJlKGNsYXNzTmFtZSwgcXVlcnksIHNjaGVtYSk7XG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uLmRlbGV0ZU1hbnkobW9uZ29XaGVyZSwgdHJhbnNhY3Rpb25hbFNlc3Npb24pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnIpKVxuICAgICAgLnRoZW4oXG4gICAgICAgICh7IGRlbGV0ZWRDb3VudCB9KSA9PiB7XG4gICAgICAgICAgaWYgKGRlbGV0ZWRDb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFBhcnNlLkVycm9yKFBhcnNlLkVycm9yLk9CSkVDVF9OT1RfRk9VTkQsICdPYmplY3Qgbm90IGZvdW5kLicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH0sXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICB0aHJvdyBuZXcgUGFyc2UuRXJyb3IoUGFyc2UuRXJyb3IuSU5URVJOQUxfU0VSVkVSX0VSUk9SLCAnRGF0YWJhc2UgYWRhcHRlciBlcnJvcicpO1xuICAgICAgICB9XG4gICAgICApO1xuICB9XG5cbiAgLy8gQXBwbHkgdGhlIHVwZGF0ZSB0byBhbGwgb2JqZWN0cyB0aGF0IG1hdGNoIHRoZSBnaXZlbiBQYXJzZSBRdWVyeS5cbiAgdXBkYXRlT2JqZWN0c0J5UXVlcnkoXG4gICAgY2xhc3NOYW1lOiBzdHJpbmcsXG4gICAgc2NoZW1hOiBTY2hlbWFUeXBlLFxuICAgIHF1ZXJ5OiBRdWVyeVR5cGUsXG4gICAgdXBkYXRlOiBhbnksXG4gICAgdHJhbnNhY3Rpb25hbFNlc3Npb246ID9hbnlcbiAgKSB7XG4gICAgc2NoZW1hID0gY29udmVydFBhcnNlU2NoZW1hVG9Nb25nb1NjaGVtYShzY2hlbWEpO1xuICAgIGNvbnN0IG1vbmdvVXBkYXRlID0gdHJhbnNmb3JtVXBkYXRlKGNsYXNzTmFtZSwgdXBkYXRlLCBzY2hlbWEpO1xuICAgIGNvbnN0IG1vbmdvV2hlcmUgPSB0cmFuc2Zvcm1XaGVyZShjbGFzc05hbWUsIHF1ZXJ5LCBzY2hlbWEpO1xuICAgIHJldHVybiB0aGlzLl9hZGFwdGl2ZUNvbGxlY3Rpb24oY2xhc3NOYW1lKVxuICAgICAgLnRoZW4oY29sbGVjdGlvbiA9PiBjb2xsZWN0aW9uLnVwZGF0ZU1hbnkobW9uZ29XaGVyZSwgbW9uZ29VcGRhdGUsIHRyYW5zYWN0aW9uYWxTZXNzaW9uKSlcbiAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnIpKTtcbiAgfVxuXG4gIC8vIEF0b21pY2FsbHkgZmluZHMgYW5kIHVwZGF0ZXMgYW4gb2JqZWN0IGJhc2VkIG9uIHF1ZXJ5LlxuICAvLyBSZXR1cm4gdmFsdWUgbm90IGN1cnJlbnRseSB3ZWxsIHNwZWNpZmllZC5cbiAgZmluZE9uZUFuZFVwZGF0ZShcbiAgICBjbGFzc05hbWU6IHN0cmluZyxcbiAgICBzY2hlbWE6IFNjaGVtYVR5cGUsXG4gICAgcXVlcnk6IFF1ZXJ5VHlwZSxcbiAgICB1cGRhdGU6IGFueSxcbiAgICB0cmFuc2FjdGlvbmFsU2Vzc2lvbjogP2FueVxuICApIHtcbiAgICBzY2hlbWEgPSBjb252ZXJ0UGFyc2VTY2hlbWFUb01vbmdvU2NoZW1hKHNjaGVtYSk7XG4gICAgY29uc3QgbW9uZ29VcGRhdGUgPSB0cmFuc2Zvcm1VcGRhdGUoY2xhc3NOYW1lLCB1cGRhdGUsIHNjaGVtYSk7XG4gICAgY29uc3QgbW9uZ29XaGVyZSA9IHRyYW5zZm9ybVdoZXJlKGNsYXNzTmFtZSwgcXVlcnksIHNjaGVtYSk7XG4gICAgcmV0dXJuIHRoaXMuX2FkYXB0aXZlQ29sbGVjdGlvbihjbGFzc05hbWUpXG4gICAgICAudGhlbihjb2xsZWN0aW9uID0+XG4gICAgICAgIGNvbGxlY3Rpb24uX21vbmdvQ29sbGVjdGlvbi5maW5kT25lQW5kVXBkYXRlKG1vbmdvV2hlcmUsIG1vbmdvVXBkYXRlLCB7XG4gICAgICAgICAgcmV0dXJuRG9jdW1lbnQ6ICdhZnRlcicsXG4gICAgICAgICAgc2Vzc2lvbjogdHJhbnNhY3Rpb25hbFNlc3Npb24gfHwgdW5kZWZpbmVkLFxuICAgICAgICB9KVxuICAgICAgKVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IG1vbmdvT2JqZWN0VG9QYXJzZU9iamVjdChjbGFzc05hbWUsIHJlc3VsdC52YWx1ZSwgc2NoZW1hKSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGlmIChlcnJvci5jb2RlID09PSAxMTAwMCkge1xuICAgICAgICAgIHRocm93IG5ldyBQYXJzZS5FcnJvcihcbiAgICAgICAgICAgIFBhcnNlLkVycm9yLkRVUExJQ0FURV9WQUxVRSxcbiAgICAgICAgICAgICdBIGR1cGxpY2F0ZSB2YWx1ZSBmb3IgYSBmaWVsZCB3aXRoIHVuaXF1ZSB2YWx1ZXMgd2FzIHByb3ZpZGVkJ1xuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLmhhbmRsZUVycm9yKGVycikpO1xuICB9XG5cbiAgLy8gSG9wZWZ1bGx5IHdlIGNhbiBnZXQgcmlkIG9mIHRoaXMuIEl0J3Mgb25seSB1c2VkIGZvciBjb25maWcgYW5kIGhvb2tzLlxuICB1cHNlcnRPbmVPYmplY3QoXG4gICAgY2xhc3NOYW1lOiBzdHJpbmcsXG4gICAgc2NoZW1hOiBTY2hlbWFUeXBlLFxuICAgIHF1ZXJ5OiBRdWVyeVR5cGUsXG4gICAgdXBkYXRlOiBhbnksXG4gICAgdHJhbnNhY3Rpb25hbFNlc3Npb246ID9hbnlcbiAgKSB7XG4gICAgc2NoZW1hID0gY29udmVydFBhcnNlU2NoZW1hVG9Nb25nb1NjaGVtYShzY2hlbWEpO1xuICAgIGNvbnN0IG1vbmdvVXBkYXRlID0gdHJhbnNmb3JtVXBkYXRlKGNsYXNzTmFtZSwgdXBkYXRlLCBzY2hlbWEpO1xuICAgIGNvbnN0IG1vbmdvV2hlcmUgPSB0cmFuc2Zvcm1XaGVyZShjbGFzc05hbWUsIHF1ZXJ5LCBzY2hlbWEpO1xuICAgIHJldHVybiB0aGlzLl9hZGFwdGl2ZUNvbGxlY3Rpb24oY2xhc3NOYW1lKVxuICAgICAgLnRoZW4oY29sbGVjdGlvbiA9PiBjb2xsZWN0aW9uLnVwc2VydE9uZShtb25nb1doZXJlLCBtb25nb1VwZGF0ZSwgdHJhbnNhY3Rpb25hbFNlc3Npb24pKVxuICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLmhhbmRsZUVycm9yKGVycikpO1xuICB9XG5cbiAgLy8gRXhlY3V0ZXMgYSBmaW5kLiBBY2NlcHRzOiBjbGFzc05hbWUsIHF1ZXJ5IGluIFBhcnNlIGZvcm1hdCwgYW5kIHsgc2tpcCwgbGltaXQsIHNvcnQgfS5cbiAgZmluZChcbiAgICBjbGFzc05hbWU6IHN0cmluZyxcbiAgICBzY2hlbWE6IFNjaGVtYVR5cGUsXG4gICAgcXVlcnk6IFF1ZXJ5VHlwZSxcbiAgICB7IHNraXAsIGxpbWl0LCBzb3J0LCBrZXlzLCByZWFkUHJlZmVyZW5jZSwgaGludCwgY2FzZUluc2Vuc2l0aXZlLCBleHBsYWluIH06IFF1ZXJ5T3B0aW9uc1xuICApOiBQcm9taXNlPGFueT4ge1xuICAgIHZhbGlkYXRlRXhwbGFpblZhbHVlKGV4cGxhaW4pO1xuICAgIHNjaGVtYSA9IGNvbnZlcnRQYXJzZVNjaGVtYVRvTW9uZ29TY2hlbWEoc2NoZW1hKTtcbiAgICBjb25zdCBtb25nb1doZXJlID0gdHJhbnNmb3JtV2hlcmUoY2xhc3NOYW1lLCBxdWVyeSwgc2NoZW1hKTtcbiAgICBjb25zdCBtb25nb1NvcnQgPSBfLm1hcEtleXMoc29ydCwgKHZhbHVlLCBmaWVsZE5hbWUpID0+XG4gICAgICB0cmFuc2Zvcm1LZXkoY2xhc3NOYW1lLCBmaWVsZE5hbWUsIHNjaGVtYSlcbiAgICApO1xuICAgIGNvbnN0IG1vbmdvS2V5cyA9IF8ucmVkdWNlKFxuICAgICAga2V5cyxcbiAgICAgIChtZW1vLCBrZXkpID0+IHtcbiAgICAgICAgaWYgKGtleSA9PT0gJ0FDTCcpIHtcbiAgICAgICAgICBtZW1vWydfcnBlcm0nXSA9IDE7XG4gICAgICAgICAgbWVtb1snX3dwZXJtJ10gPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1lbW9bdHJhbnNmb3JtS2V5KGNsYXNzTmFtZSwga2V5LCBzY2hlbWEpXSA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1lbW87XG4gICAgICB9LFxuICAgICAge31cbiAgICApO1xuXG4gICAgLy8gSWYgd2UgYXJlbid0IHJlcXVlc3RpbmcgdGhlIGBfaWRgIGZpZWxkLCB3ZSBuZWVkIHRvIGV4cGxpY2l0bHkgb3B0IG91dFxuICAgIC8vIG9mIGl0LiBEb2luZyBzbyBpbiBwYXJzZS1zZXJ2ZXIgaXMgdW51c3VhbCwgYnV0IGl0IGNhbiBhbGxvdyB1cyB0b1xuICAgIC8vIG9wdGltaXplIHNvbWUgcXVlcmllcyB3aXRoIGNvdmVyaW5nIGluZGV4ZXMuXG4gICAgaWYgKGtleXMgJiYgIW1vbmdvS2V5cy5faWQpIHtcbiAgICAgIG1vbmdvS2V5cy5faWQgPSAwO1xuICAgIH1cblxuICAgIHJlYWRQcmVmZXJlbmNlID0gdGhpcy5fcGFyc2VSZWFkUHJlZmVyZW5jZShyZWFkUHJlZmVyZW5jZSk7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlVGV4dEluZGV4ZXNJZk5lZWRlZChjbGFzc05hbWUsIHF1ZXJ5LCBzY2hlbWEpXG4gICAgICAudGhlbigoKSA9PiB0aGlzLl9hZGFwdGl2ZUNvbGxlY3Rpb24oY2xhc3NOYW1lKSlcbiAgICAgIC50aGVuKGNvbGxlY3Rpb24gPT5cbiAgICAgICAgY29sbGVjdGlvbi5maW5kKG1vbmdvV2hlcmUsIHtcbiAgICAgICAgICBza2lwLFxuICAgICAgICAgIGxpbWl0LFxuICAgICAgICAgIHNvcnQ6IG1vbmdvU29ydCxcbiAgICAgICAgICBrZXlzOiBtb25nb0tleXMsXG4gICAgICAgICAgbWF4VGltZU1TOiB0aGlzLl9tYXhUaW1lTVMsXG4gICAgICAgICAgcmVhZFByZWZlcmVuY2UsXG4gICAgICAgICAgaGludCxcbiAgICAgICAgICBjYXNlSW5zZW5zaXRpdmUsXG4gICAgICAgICAgZXhwbGFpbixcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC50aGVuKG9iamVjdHMgPT4ge1xuICAgICAgICBpZiAoZXhwbGFpbikge1xuICAgICAgICAgIHJldHVybiBvYmplY3RzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYmplY3RzLm1hcChvYmplY3QgPT4gbW9uZ29PYmplY3RUb1BhcnNlT2JqZWN0KGNsYXNzTmFtZSwgb2JqZWN0LCBzY2hlbWEpKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyKSk7XG4gIH1cblxuICBlbnN1cmVJbmRleChcbiAgICBjbGFzc05hbWU6IHN0cmluZyxcbiAgICBzY2hlbWE6IFNjaGVtYVR5cGUsXG4gICAgZmllbGROYW1lczogc3RyaW5nW10sXG4gICAgaW5kZXhOYW1lOiA/c3RyaW5nLFxuICAgIGNhc2VJbnNlbnNpdGl2ZTogYm9vbGVhbiA9IGZhbHNlLFxuICAgIG9wdGlvbnM/OiBPYmplY3QgPSB7fVxuICApOiBQcm9taXNlPGFueT4ge1xuICAgIHNjaGVtYSA9IGNvbnZlcnRQYXJzZVNjaGVtYVRvTW9uZ29TY2hlbWEoc2NoZW1hKTtcbiAgICBjb25zdCBpbmRleENyZWF0aW9uUmVxdWVzdCA9IHt9O1xuICAgIGNvbnN0IG1vbmdvRmllbGROYW1lcyA9IGZpZWxkTmFtZXMubWFwKGZpZWxkTmFtZSA9PiB0cmFuc2Zvcm1LZXkoY2xhc3NOYW1lLCBmaWVsZE5hbWUsIHNjaGVtYSkpO1xuICAgIG1vbmdvRmllbGROYW1lcy5mb3JFYWNoKGZpZWxkTmFtZSA9PiB7XG4gICAgICBpbmRleENyZWF0aW9uUmVxdWVzdFtmaWVsZE5hbWVdID0gb3B0aW9ucy5pbmRleFR5cGUgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuaW5kZXhUeXBlIDogMTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGRlZmF1bHRPcHRpb25zOiBPYmplY3QgPSB7IGJhY2tncm91bmQ6IHRydWUsIHNwYXJzZTogdHJ1ZSB9O1xuICAgIGNvbnN0IGluZGV4TmFtZU9wdGlvbnM6IE9iamVjdCA9IGluZGV4TmFtZSA/IHsgbmFtZTogaW5kZXhOYW1lIH0gOiB7fTtcbiAgICBjb25zdCB0dGxPcHRpb25zOiBPYmplY3QgPSBvcHRpb25zLnR0bCAhPT0gdW5kZWZpbmVkID8geyBleHBpcmVBZnRlclNlY29uZHM6IG9wdGlvbnMudHRsIH0gOiB7fTtcbiAgICBjb25zdCBjYXNlSW5zZW5zaXRpdmVPcHRpb25zOiBPYmplY3QgPSBjYXNlSW5zZW5zaXRpdmVcbiAgICAgID8geyBjb2xsYXRpb246IE1vbmdvQ29sbGVjdGlvbi5jYXNlSW5zZW5zaXRpdmVDb2xsYXRpb24oKSB9XG4gICAgICA6IHt9O1xuICAgIGNvbnN0IGluZGV4T3B0aW9uczogT2JqZWN0ID0ge1xuICAgICAgLi4uZGVmYXVsdE9wdGlvbnMsXG4gICAgICAuLi5jYXNlSW5zZW5zaXRpdmVPcHRpb25zLFxuICAgICAgLi4uaW5kZXhOYW1lT3B0aW9ucyxcbiAgICAgIC4uLnR0bE9wdGlvbnMsXG4gICAgfTtcblxuICAgIHJldHVybiB0aGlzLl9hZGFwdGl2ZUNvbGxlY3Rpb24oY2xhc3NOYW1lKVxuICAgICAgLnRoZW4oXG4gICAgICAgIGNvbGxlY3Rpb24gPT5cbiAgICAgICAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PlxuICAgICAgICAgICAgY29sbGVjdGlvbi5fbW9uZ29Db2xsZWN0aW9uLmNyZWF0ZUluZGV4KGluZGV4Q3JlYXRpb25SZXF1ZXN0LCBpbmRleE9wdGlvbnMsIGVycm9yID0+XG4gICAgICAgICAgICAgIGVycm9yID8gcmVqZWN0KGVycm9yKSA6IHJlc29sdmUoKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgIClcbiAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnIpKTtcbiAgfVxuXG4gIC8vIENyZWF0ZSBhIHVuaXF1ZSBpbmRleC4gVW5pcXVlIGluZGV4ZXMgb24gbnVsbGFibGUgZmllbGRzIGFyZSBub3QgYWxsb3dlZC4gU2luY2Ugd2UgZG9uJ3RcbiAgLy8gY3VycmVudGx5IGtub3cgd2hpY2ggZmllbGRzIGFyZSBudWxsYWJsZSBhbmQgd2hpY2ggYXJlbid0LCB3ZSBpZ25vcmUgdGhhdCBjcml0ZXJpYS5cbiAgLy8gQXMgc3VjaCwgd2Ugc2hvdWxkbid0IGV4cG9zZSB0aGlzIGZ1bmN0aW9uIHRvIHVzZXJzIG9mIHBhcnNlIHVudGlsIHdlIGhhdmUgYW4gb3V0LW9mLWJhbmRcbiAgLy8gV2F5IG9mIGRldGVybWluaW5nIGlmIGEgZmllbGQgaXMgbnVsbGFibGUuIFVuZGVmaW5lZCBkb2Vzbid0IGNvdW50IGFnYWluc3QgdW5pcXVlbmVzcyxcbiAgLy8gd2hpY2ggaXMgd2h5IHdlIHVzZSBzcGFyc2UgaW5kZXhlcy5cbiAgZW5zdXJlVW5pcXVlbmVzcyhjbGFzc05hbWU6IHN0cmluZywgc2NoZW1hOiBTY2hlbWFUeXBlLCBmaWVsZE5hbWVzOiBzdHJpbmdbXSkge1xuICAgIHNjaGVtYSA9IGNvbnZlcnRQYXJzZVNjaGVtYVRvTW9uZ29TY2hlbWEoc2NoZW1hKTtcbiAgICBjb25zdCBpbmRleENyZWF0aW9uUmVxdWVzdCA9IHt9O1xuICAgIGNvbnN0IG1vbmdvRmllbGROYW1lcyA9IGZpZWxkTmFtZXMubWFwKGZpZWxkTmFtZSA9PiB0cmFuc2Zvcm1LZXkoY2xhc3NOYW1lLCBmaWVsZE5hbWUsIHNjaGVtYSkpO1xuICAgIG1vbmdvRmllbGROYW1lcy5mb3JFYWNoKGZpZWxkTmFtZSA9PiB7XG4gICAgICBpbmRleENyZWF0aW9uUmVxdWVzdFtmaWVsZE5hbWVdID0gMTtcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy5fYWRhcHRpdmVDb2xsZWN0aW9uKGNsYXNzTmFtZSlcbiAgICAgIC50aGVuKGNvbGxlY3Rpb24gPT4gY29sbGVjdGlvbi5fZW5zdXJlU3BhcnNlVW5pcXVlSW5kZXhJbkJhY2tncm91bmQoaW5kZXhDcmVhdGlvblJlcXVlc3QpKVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgaWYgKGVycm9yLmNvZGUgPT09IDExMDAwKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFBhcnNlLkVycm9yKFxuICAgICAgICAgICAgUGFyc2UuRXJyb3IuRFVQTElDQVRFX1ZBTFVFLFxuICAgICAgICAgICAgJ1RyaWVkIHRvIGVuc3VyZSBmaWVsZCB1bmlxdWVuZXNzIGZvciBhIGNsYXNzIHRoYXQgYWxyZWFkeSBoYXMgZHVwbGljYXRlcy4nXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyKSk7XG4gIH1cblxuICAvLyBVc2VkIGluIHRlc3RzXG4gIF9yYXdGaW5kKGNsYXNzTmFtZTogc3RyaW5nLCBxdWVyeTogUXVlcnlUeXBlKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FkYXB0aXZlQ29sbGVjdGlvbihjbGFzc05hbWUpXG4gICAgICAudGhlbihjb2xsZWN0aW9uID0+XG4gICAgICAgIGNvbGxlY3Rpb24uZmluZChxdWVyeSwge1xuICAgICAgICAgIG1heFRpbWVNUzogdGhpcy5fbWF4VGltZU1TLFxuICAgICAgICB9KVxuICAgICAgKVxuICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLmhhbmRsZUVycm9yKGVycikpO1xuICB9XG5cbiAgLy8gRXhlY3V0ZXMgYSBjb3VudC5cbiAgY291bnQoXG4gICAgY2xhc3NOYW1lOiBzdHJpbmcsXG4gICAgc2NoZW1hOiBTY2hlbWFUeXBlLFxuICAgIHF1ZXJ5OiBRdWVyeVR5cGUsXG4gICAgcmVhZFByZWZlcmVuY2U6ID9zdHJpbmcsXG4gICAgaGludDogP21peGVkXG4gICkge1xuICAgIHNjaGVtYSA9IGNvbnZlcnRQYXJzZVNjaGVtYVRvTW9uZ29TY2hlbWEoc2NoZW1hKTtcbiAgICByZWFkUHJlZmVyZW5jZSA9IHRoaXMuX3BhcnNlUmVhZFByZWZlcmVuY2UocmVhZFByZWZlcmVuY2UpO1xuICAgIHJldHVybiB0aGlzLl9hZGFwdGl2ZUNvbGxlY3Rpb24oY2xhc3NOYW1lKVxuICAgICAgLnRoZW4oY29sbGVjdGlvbiA9PlxuICAgICAgICBjb2xsZWN0aW9uLmNvdW50KHRyYW5zZm9ybVdoZXJlKGNsYXNzTmFtZSwgcXVlcnksIHNjaGVtYSwgdHJ1ZSksIHtcbiAgICAgICAgICBtYXhUaW1lTVM6IHRoaXMuX21heFRpbWVNUyxcbiAgICAgICAgICByZWFkUHJlZmVyZW5jZSxcbiAgICAgICAgICBoaW50LFxuICAgICAgICB9KVxuICAgICAgKVxuICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLmhhbmRsZUVycm9yKGVycikpO1xuICB9XG5cbiAgZGlzdGluY3QoY2xhc3NOYW1lOiBzdHJpbmcsIHNjaGVtYTogU2NoZW1hVHlwZSwgcXVlcnk6IFF1ZXJ5VHlwZSwgZmllbGROYW1lOiBzdHJpbmcpIHtcbiAgICBzY2hlbWEgPSBjb252ZXJ0UGFyc2VTY2hlbWFUb01vbmdvU2NoZW1hKHNjaGVtYSk7XG4gICAgY29uc3QgaXNQb2ludGVyRmllbGQgPSBzY2hlbWEuZmllbGRzW2ZpZWxkTmFtZV0gJiYgc2NoZW1hLmZpZWxkc1tmaWVsZE5hbWVdLnR5cGUgPT09ICdQb2ludGVyJztcbiAgICBjb25zdCB0cmFuc2Zvcm1GaWVsZCA9IHRyYW5zZm9ybUtleShjbGFzc05hbWUsIGZpZWxkTmFtZSwgc2NoZW1hKTtcblxuICAgIHJldHVybiB0aGlzLl9hZGFwdGl2ZUNvbGxlY3Rpb24oY2xhc3NOYW1lKVxuICAgICAgLnRoZW4oY29sbGVjdGlvbiA9PlxuICAgICAgICBjb2xsZWN0aW9uLmRpc3RpbmN0KHRyYW5zZm9ybUZpZWxkLCB0cmFuc2Zvcm1XaGVyZShjbGFzc05hbWUsIHF1ZXJ5LCBzY2hlbWEpKVxuICAgICAgKVxuICAgICAgLnRoZW4ob2JqZWN0cyA9PiB7XG4gICAgICAgIG9iamVjdHMgPSBvYmplY3RzLmZpbHRlcihvYmogPT4gb2JqICE9IG51bGwpO1xuICAgICAgICByZXR1cm4gb2JqZWN0cy5tYXAob2JqZWN0ID0+IHtcbiAgICAgICAgICBpZiAoaXNQb2ludGVyRmllbGQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cmFuc2Zvcm1Qb2ludGVyU3RyaW5nKHNjaGVtYSwgZmllbGROYW1lLCBvYmplY3QpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbW9uZ29PYmplY3RUb1BhcnNlT2JqZWN0KGNsYXNzTmFtZSwgb2JqZWN0LCBzY2hlbWEpO1xuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyKSk7XG4gIH1cblxuICBhZ2dyZWdhdGUoXG4gICAgY2xhc3NOYW1lOiBzdHJpbmcsXG4gICAgc2NoZW1hOiBhbnksXG4gICAgcGlwZWxpbmU6IGFueSxcbiAgICByZWFkUHJlZmVyZW5jZTogP3N0cmluZyxcbiAgICBoaW50OiA/bWl4ZWQsXG4gICAgZXhwbGFpbj86IGJvb2xlYW5cbiAgKSB7XG4gICAgdmFsaWRhdGVFeHBsYWluVmFsdWUoZXhwbGFpbik7XG4gICAgbGV0IGlzUG9pbnRlckZpZWxkID0gZmFsc2U7XG4gICAgcGlwZWxpbmUgPSBwaXBlbGluZS5tYXAoc3RhZ2UgPT4ge1xuICAgICAgaWYgKHN0YWdlLiRncm91cCkge1xuICAgICAgICBzdGFnZS4kZ3JvdXAgPSB0aGlzLl9wYXJzZUFnZ3JlZ2F0ZUdyb3VwQXJncyhzY2hlbWEsIHN0YWdlLiRncm91cCk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBzdGFnZS4kZ3JvdXAuX2lkICYmXG4gICAgICAgICAgdHlwZW9mIHN0YWdlLiRncm91cC5faWQgPT09ICdzdHJpbmcnICYmXG4gICAgICAgICAgc3RhZ2UuJGdyb3VwLl9pZC5pbmRleE9mKCckX3BfJykgPj0gMFxuICAgICAgICApIHtcbiAgICAgICAgICBpc1BvaW50ZXJGaWVsZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdGFnZS4kbWF0Y2gpIHtcbiAgICAgICAgc3RhZ2UuJG1hdGNoID0gdGhpcy5fcGFyc2VBZ2dyZWdhdGVBcmdzKHNjaGVtYSwgc3RhZ2UuJG1hdGNoKTtcbiAgICAgIH1cbiAgICAgIGlmIChzdGFnZS4kcHJvamVjdCkge1xuICAgICAgICBzdGFnZS4kcHJvamVjdCA9IHRoaXMuX3BhcnNlQWdncmVnYXRlUHJvamVjdEFyZ3Moc2NoZW1hLCBzdGFnZS4kcHJvamVjdCk7XG4gICAgICB9XG4gICAgICBpZiAoc3RhZ2UuJGdlb05lYXIgJiYgc3RhZ2UuJGdlb05lYXIucXVlcnkpIHtcbiAgICAgICAgc3RhZ2UuJGdlb05lYXIucXVlcnkgPSB0aGlzLl9wYXJzZUFnZ3JlZ2F0ZUFyZ3Moc2NoZW1hLCBzdGFnZS4kZ2VvTmVhci5xdWVyeSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RhZ2U7XG4gICAgfSk7XG4gICAgcmVhZFByZWZlcmVuY2UgPSB0aGlzLl9wYXJzZVJlYWRQcmVmZXJlbmNlKHJlYWRQcmVmZXJlbmNlKTtcbiAgICByZXR1cm4gdGhpcy5fYWRhcHRpdmVDb2xsZWN0aW9uKGNsYXNzTmFtZSlcbiAgICAgIC50aGVuKGNvbGxlY3Rpb24gPT5cbiAgICAgICAgY29sbGVjdGlvbi5hZ2dyZWdhdGUocGlwZWxpbmUsIHtcbiAgICAgICAgICByZWFkUHJlZmVyZW5jZSxcbiAgICAgICAgICBtYXhUaW1lTVM6IHRoaXMuX21heFRpbWVNUyxcbiAgICAgICAgICBoaW50LFxuICAgICAgICAgIGV4cGxhaW4sXG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICAudGhlbihyZXN1bHRzID0+IHtcbiAgICAgICAgcmVzdWx0cy5mb3JFYWNoKHJlc3VsdCA9PiB7XG4gICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChyZXN1bHQsICdfaWQnKSkge1xuICAgICAgICAgICAgaWYgKGlzUG9pbnRlckZpZWxkICYmIHJlc3VsdC5faWQpIHtcbiAgICAgICAgICAgICAgcmVzdWx0Ll9pZCA9IHJlc3VsdC5faWQuc3BsaXQoJyQnKVsxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgcmVzdWx0Ll9pZCA9PSBudWxsIHx8XG4gICAgICAgICAgICAgIHJlc3VsdC5faWQgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgIChbJ29iamVjdCcsICdzdHJpbmcnXS5pbmNsdWRlcyh0eXBlb2YgcmVzdWx0Ll9pZCkgJiYgXy5pc0VtcHR5KHJlc3VsdC5faWQpKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHJlc3VsdC5faWQgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0Lm9iamVjdElkID0gcmVzdWx0Ll9pZDtcbiAgICAgICAgICAgIGRlbGV0ZSByZXN1bHQuX2lkO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgfSlcbiAgICAgIC50aGVuKG9iamVjdHMgPT4gb2JqZWN0cy5tYXAob2JqZWN0ID0+IG1vbmdvT2JqZWN0VG9QYXJzZU9iamVjdChjbGFzc05hbWUsIG9iamVjdCwgc2NoZW1hKSkpXG4gICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyKSk7XG4gIH1cblxuICAvLyBUaGlzIGZ1bmN0aW9uIHdpbGwgcmVjdXJzaXZlbHkgdHJhdmVyc2UgdGhlIHBpcGVsaW5lIGFuZCBjb252ZXJ0IGFueSBQb2ludGVyIG9yIERhdGUgY29sdW1ucy5cbiAgLy8gSWYgd2UgZGV0ZWN0IGEgcG9pbnRlciBjb2x1bW4gd2Ugd2lsbCByZW5hbWUgdGhlIGNvbHVtbiBiZWluZyBxdWVyaWVkIGZvciB0byBtYXRjaCB0aGUgY29sdW1uXG4gIC8vIGluIHRoZSBkYXRhYmFzZS4gV2UgYWxzbyBtb2RpZnkgdGhlIHZhbHVlIHRvIHdoYXQgd2UgZXhwZWN0IHRoZSB2YWx1ZSB0byBiZSBpbiB0aGUgZGF0YWJhc2VcbiAgLy8gYXMgd2VsbC5cbiAgLy8gRm9yIGRhdGVzLCB0aGUgZHJpdmVyIGV4cGVjdHMgYSBEYXRlIG9iamVjdCwgYnV0IHdlIGhhdmUgYSBzdHJpbmcgY29taW5nIGluLiBTbyB3ZSdsbCBjb252ZXJ0XG4gIC8vIHRoZSBzdHJpbmcgdG8gYSBEYXRlIHNvIHRoZSBkcml2ZXIgY2FuIHBlcmZvcm0gdGhlIG5lY2Vzc2FyeSBjb21wYXJpc29uLlxuICAvL1xuICAvLyBUaGUgZ29hbCBvZiB0aGlzIG1ldGhvZCBpcyB0byBsb29rIGZvciB0aGUgXCJsZWF2ZXNcIiBvZiB0aGUgcGlwZWxpbmUgYW5kIGRldGVybWluZSBpZiBpdCBuZWVkc1xuICAvLyB0byBiZSBjb252ZXJ0ZWQuIFRoZSBwaXBlbGluZSBjYW4gaGF2ZSBhIGZldyBkaWZmZXJlbnQgZm9ybXMuIEZvciBtb3JlIGRldGFpbHMsIHNlZTpcbiAgLy8gICAgIGh0dHBzOi8vZG9jcy5tb25nb2RiLmNvbS9tYW51YWwvcmVmZXJlbmNlL29wZXJhdG9yL2FnZ3JlZ2F0aW9uL1xuICAvL1xuICAvLyBJZiB0aGUgcGlwZWxpbmUgaXMgYW4gYXJyYXksIGl0IG1lYW5zIHdlIGFyZSBwcm9iYWJseSBwYXJzaW5nIGFuICckYW5kJyBvciAnJG9yJyBvcGVyYXRvci4gSW5cbiAgLy8gdGhhdCBjYXNlIHdlIG5lZWQgdG8gbG9vcCB0aHJvdWdoIGFsbCBvZiBpdCdzIGNoaWxkcmVuIHRvIGZpbmQgdGhlIGNvbHVtbnMgYmVpbmcgb3BlcmF0ZWQgb24uXG4gIC8vIElmIHRoZSBwaXBlbGluZSBpcyBhbiBvYmplY3QsIHRoZW4gd2UnbGwgbG9vcCB0aHJvdWdoIHRoZSBrZXlzIGNoZWNraW5nIHRvIHNlZSBpZiB0aGUga2V5IG5hbWVcbiAgLy8gbWF0Y2hlcyBvbmUgb2YgdGhlIHNjaGVtYSBjb2x1bW5zLiBJZiBpdCBkb2VzIG1hdGNoIGEgY29sdW1uIGFuZCB0aGUgY29sdW1uIGlzIGEgUG9pbnRlciBvclxuICAvLyBhIERhdGUsIHRoZW4gd2UnbGwgY29udmVydCB0aGUgdmFsdWUgYXMgZGVzY3JpYmVkIGFib3ZlLlxuICAvL1xuICAvLyBBcyBtdWNoIGFzIEkgaGF0ZSByZWN1cnNpb24uLi50aGlzIHNlZW1lZCBsaWtlIGEgZ29vZCBmaXQgZm9yIGl0LiBXZSdyZSBlc3NlbnRpYWxseSB0cmF2ZXJzaW5nXG4gIC8vIGRvd24gYSB0cmVlIHRvIGZpbmQgYSBcImxlYWYgbm9kZVwiIGFuZCBjaGVja2luZyB0byBzZWUgaWYgaXQgbmVlZHMgdG8gYmUgY29udmVydGVkLlxuICBfcGFyc2VBZ2dyZWdhdGVBcmdzKHNjaGVtYTogYW55LCBwaXBlbGluZTogYW55KTogYW55IHtcbiAgICBpZiAocGlwZWxpbmUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShwaXBlbGluZSkpIHtcbiAgICAgIHJldHVybiBwaXBlbGluZS5tYXAodmFsdWUgPT4gdGhpcy5fcGFyc2VBZ2dyZWdhdGVBcmdzKHNjaGVtYSwgdmFsdWUpKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwaXBlbGluZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGNvbnN0IHJldHVyblZhbHVlID0ge307XG4gICAgICBmb3IgKGNvbnN0IGZpZWxkIGluIHBpcGVsaW5lKSB7XG4gICAgICAgIGlmIChzY2hlbWEuZmllbGRzW2ZpZWxkXSAmJiBzY2hlbWEuZmllbGRzW2ZpZWxkXS50eXBlID09PSAnUG9pbnRlcicpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIHBpcGVsaW5lW2ZpZWxkXSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIC8vIFBhc3Mgb2JqZWN0cyBkb3duIHRvIE1vbmdvREIuLi50aGlzIGlzIG1vcmUgdGhhbiBsaWtlbHkgYW4gJGV4aXN0cyBvcGVyYXRvci5cbiAgICAgICAgICAgIHJldHVyblZhbHVlW2BfcF8ke2ZpZWxkfWBdID0gcGlwZWxpbmVbZmllbGRdO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm5WYWx1ZVtgX3BfJHtmaWVsZH1gXSA9IGAke3NjaGVtYS5maWVsZHNbZmllbGRdLnRhcmdldENsYXNzfSQke3BpcGVsaW5lW2ZpZWxkXX1gO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChzY2hlbWEuZmllbGRzW2ZpZWxkXSAmJiBzY2hlbWEuZmllbGRzW2ZpZWxkXS50eXBlID09PSAnRGF0ZScpIHtcbiAgICAgICAgICByZXR1cm5WYWx1ZVtmaWVsZF0gPSB0aGlzLl9jb252ZXJ0VG9EYXRlKHBpcGVsaW5lW2ZpZWxkXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuVmFsdWVbZmllbGRdID0gdGhpcy5fcGFyc2VBZ2dyZWdhdGVBcmdzKHNjaGVtYSwgcGlwZWxpbmVbZmllbGRdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmaWVsZCA9PT0gJ29iamVjdElkJykge1xuICAgICAgICAgIHJldHVyblZhbHVlWydfaWQnXSA9IHJldHVyblZhbHVlW2ZpZWxkXTtcbiAgICAgICAgICBkZWxldGUgcmV0dXJuVmFsdWVbZmllbGRdO1xuICAgICAgICB9IGVsc2UgaWYgKGZpZWxkID09PSAnY3JlYXRlZEF0Jykge1xuICAgICAgICAgIHJldHVyblZhbHVlWydfY3JlYXRlZF9hdCddID0gcmV0dXJuVmFsdWVbZmllbGRdO1xuICAgICAgICAgIGRlbGV0ZSByZXR1cm5WYWx1ZVtmaWVsZF07XG4gICAgICAgIH0gZWxzZSBpZiAoZmllbGQgPT09ICd1cGRhdGVkQXQnKSB7XG4gICAgICAgICAgcmV0dXJuVmFsdWVbJ191cGRhdGVkX2F0J10gPSByZXR1cm5WYWx1ZVtmaWVsZF07XG4gICAgICAgICAgZGVsZXRlIHJldHVyblZhbHVlW2ZpZWxkXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gcGlwZWxpbmU7XG4gIH1cblxuICAvLyBUaGlzIGZ1bmN0aW9uIGlzIHNsaWdodGx5IGRpZmZlcmVudCB0aGFuIHRoZSBvbmUgYWJvdmUuIFJhdGhlciB0aGFuIHRyeWluZyB0byBjb21iaW5lIHRoZXNlXG4gIC8vIHR3byBmdW5jdGlvbnMgYW5kIG1ha2luZyB0aGUgY29kZSBldmVuIGhhcmRlciB0byB1bmRlcnN0YW5kLCBJIGRlY2lkZWQgdG8gc3BsaXQgaXQgdXAuIFRoZVxuICAvLyBkaWZmZXJlbmNlIHdpdGggdGhpcyBmdW5jdGlvbiBpcyB3ZSBhcmUgbm90IHRyYW5zZm9ybWluZyB0aGUgdmFsdWVzLCBvbmx5IHRoZSBrZXlzIG9mIHRoZVxuICAvLyBwaXBlbGluZS5cbiAgX3BhcnNlQWdncmVnYXRlUHJvamVjdEFyZ3Moc2NoZW1hOiBhbnksIHBpcGVsaW5lOiBhbnkpOiBhbnkge1xuICAgIGNvbnN0IHJldHVyblZhbHVlID0ge307XG4gICAgZm9yIChjb25zdCBmaWVsZCBpbiBwaXBlbGluZSkge1xuICAgICAgaWYgKHNjaGVtYS5maWVsZHNbZmllbGRdICYmIHNjaGVtYS5maWVsZHNbZmllbGRdLnR5cGUgPT09ICdQb2ludGVyJykge1xuICAgICAgICByZXR1cm5WYWx1ZVtgX3BfJHtmaWVsZH1gXSA9IHBpcGVsaW5lW2ZpZWxkXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVyblZhbHVlW2ZpZWxkXSA9IHRoaXMuX3BhcnNlQWdncmVnYXRlQXJncyhzY2hlbWEsIHBpcGVsaW5lW2ZpZWxkXSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChmaWVsZCA9PT0gJ29iamVjdElkJykge1xuICAgICAgICByZXR1cm5WYWx1ZVsnX2lkJ10gPSByZXR1cm5WYWx1ZVtmaWVsZF07XG4gICAgICAgIGRlbGV0ZSByZXR1cm5WYWx1ZVtmaWVsZF07XG4gICAgICB9IGVsc2UgaWYgKGZpZWxkID09PSAnY3JlYXRlZEF0Jykge1xuICAgICAgICByZXR1cm5WYWx1ZVsnX2NyZWF0ZWRfYXQnXSA9IHJldHVyblZhbHVlW2ZpZWxkXTtcbiAgICAgICAgZGVsZXRlIHJldHVyblZhbHVlW2ZpZWxkXTtcbiAgICAgIH0gZWxzZSBpZiAoZmllbGQgPT09ICd1cGRhdGVkQXQnKSB7XG4gICAgICAgIHJldHVyblZhbHVlWydfdXBkYXRlZF9hdCddID0gcmV0dXJuVmFsdWVbZmllbGRdO1xuICAgICAgICBkZWxldGUgcmV0dXJuVmFsdWVbZmllbGRdO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG4gIH1cblxuICAvLyBUaGlzIGZ1bmN0aW9uIGlzIHNsaWdodGx5IGRpZmZlcmVudCB0aGFuIHRoZSB0d28gYWJvdmUuIE1vbmdvREIgJGdyb3VwIGFnZ3JlZ2F0ZSBsb29rcyBsaWtlOlxuICAvLyAgICAgeyAkZ3JvdXA6IHsgX2lkOiA8ZXhwcmVzc2lvbj4sIDxmaWVsZDE+OiB7IDxhY2N1bXVsYXRvcjE+IDogPGV4cHJlc3Npb24xPiB9LCAuLi4gfSB9XG4gIC8vIFRoZSA8ZXhwcmVzc2lvbj4gY291bGQgYmUgYSBjb2x1bW4gbmFtZSwgcHJlZml4ZWQgd2l0aCB0aGUgJyQnIGNoYXJhY3Rlci4gV2UnbGwgbG9vayBmb3JcbiAgLy8gdGhlc2UgPGV4cHJlc3Npb24+IGFuZCBjaGVjayB0byBzZWUgaWYgaXQgaXMgYSAnUG9pbnRlcicgb3IgaWYgaXQncyBvbmUgb2YgY3JlYXRlZEF0LFxuICAvLyB1cGRhdGVkQXQgb3Igb2JqZWN0SWQgYW5kIGNoYW5nZSBpdCBhY2NvcmRpbmdseS5cbiAgX3BhcnNlQWdncmVnYXRlR3JvdXBBcmdzKHNjaGVtYTogYW55LCBwaXBlbGluZTogYW55KTogYW55IHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShwaXBlbGluZSkpIHtcbiAgICAgIHJldHVybiBwaXBlbGluZS5tYXAodmFsdWUgPT4gdGhpcy5fcGFyc2VBZ2dyZWdhdGVHcm91cEFyZ3Moc2NoZW1hLCB2YWx1ZSkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBpcGVsaW5lID09PSAnb2JqZWN0Jykge1xuICAgICAgY29uc3QgcmV0dXJuVmFsdWUgPSB7fTtcbiAgICAgIGZvciAoY29uc3QgZmllbGQgaW4gcGlwZWxpbmUpIHtcbiAgICAgICAgcmV0dXJuVmFsdWVbZmllbGRdID0gdGhpcy5fcGFyc2VBZ2dyZWdhdGVHcm91cEFyZ3Moc2NoZW1hLCBwaXBlbGluZVtmaWVsZF0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBpcGVsaW5lID09PSAnc3RyaW5nJykge1xuICAgICAgY29uc3QgZmllbGQgPSBwaXBlbGluZS5zdWJzdHJpbmcoMSk7XG4gICAgICBpZiAoc2NoZW1hLmZpZWxkc1tmaWVsZF0gJiYgc2NoZW1hLmZpZWxkc1tmaWVsZF0udHlwZSA9PT0gJ1BvaW50ZXInKSB7XG4gICAgICAgIHJldHVybiBgJF9wXyR7ZmllbGR9YDtcbiAgICAgIH0gZWxzZSBpZiAoZmllbGQgPT0gJ2NyZWF0ZWRBdCcpIHtcbiAgICAgICAgcmV0dXJuICckX2NyZWF0ZWRfYXQnO1xuICAgICAgfSBlbHNlIGlmIChmaWVsZCA9PSAndXBkYXRlZEF0Jykge1xuICAgICAgICByZXR1cm4gJyRfdXBkYXRlZF9hdCc7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwaXBlbGluZTtcbiAgfVxuXG4gIC8vIFRoaXMgZnVuY3Rpb24gd2lsbCBhdHRlbXB0IHRvIGNvbnZlcnQgdGhlIHByb3ZpZGVkIHZhbHVlIHRvIGEgRGF0ZSBvYmplY3QuIFNpbmNlIHRoaXMgaXMgcGFydFxuICAvLyBvZiBhbiBhZ2dyZWdhdGlvbiBwaXBlbGluZSwgdGhlIHZhbHVlIGNhbiBlaXRoZXIgYmUgYSBzdHJpbmcgb3IgaXQgY2FuIGJlIGFub3RoZXIgb2JqZWN0IHdpdGhcbiAgLy8gYW4gb3BlcmF0b3IgaW4gaXQgKGxpa2UgJGd0LCAkbHQsIGV0YykuIEJlY2F1c2Ugb2YgdGhpcyBJIGZlbHQgaXQgd2FzIGVhc2llciB0byBtYWtlIHRoaXMgYVxuICAvLyByZWN1cnNpdmUgbWV0aG9kIHRvIHRyYXZlcnNlIGRvd24gdG8gdGhlIFwibGVhZiBub2RlXCIgd2hpY2ggaXMgZ29pbmcgdG8gYmUgdGhlIHN0cmluZy5cbiAgX2NvbnZlcnRUb0RhdGUodmFsdWU6IGFueSk6IGFueSB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKHZhbHVlKTtcbiAgICB9XG5cbiAgICBjb25zdCByZXR1cm5WYWx1ZSA9IHt9O1xuICAgIGZvciAoY29uc3QgZmllbGQgaW4gdmFsdWUpIHtcbiAgICAgIHJldHVyblZhbHVlW2ZpZWxkXSA9IHRoaXMuX2NvbnZlcnRUb0RhdGUodmFsdWVbZmllbGRdKTtcbiAgICB9XG4gICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICB9XG5cbiAgX3BhcnNlUmVhZFByZWZlcmVuY2UocmVhZFByZWZlcmVuY2U6ID9zdHJpbmcpOiA/c3RyaW5nIHtcbiAgICBpZiAocmVhZFByZWZlcmVuY2UpIHtcbiAgICAgIHJlYWRQcmVmZXJlbmNlID0gcmVhZFByZWZlcmVuY2UudG9VcHBlckNhc2UoKTtcbiAgICB9XG4gICAgc3dpdGNoIChyZWFkUHJlZmVyZW5jZSkge1xuICAgICAgY2FzZSAnUFJJTUFSWSc6XG4gICAgICAgIHJlYWRQcmVmZXJlbmNlID0gUmVhZFByZWZlcmVuY2UuUFJJTUFSWTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdQUklNQVJZX1BSRUZFUlJFRCc6XG4gICAgICAgIHJlYWRQcmVmZXJlbmNlID0gUmVhZFByZWZlcmVuY2UuUFJJTUFSWV9QUkVGRVJSRUQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnU0VDT05EQVJZJzpcbiAgICAgICAgcmVhZFByZWZlcmVuY2UgPSBSZWFkUHJlZmVyZW5jZS5TRUNPTkRBUlk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnU0VDT05EQVJZX1BSRUZFUlJFRCc6XG4gICAgICAgIHJlYWRQcmVmZXJlbmNlID0gUmVhZFByZWZlcmVuY2UuU0VDT05EQVJZX1BSRUZFUlJFRDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdORUFSRVNUJzpcbiAgICAgICAgcmVhZFByZWZlcmVuY2UgPSBSZWFkUHJlZmVyZW5jZS5ORUFSRVNUO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdW5kZWZpbmVkOlxuICAgICAgY2FzZSBudWxsOlxuICAgICAgY2FzZSAnJzpcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgUGFyc2UuRXJyb3IoUGFyc2UuRXJyb3IuSU5WQUxJRF9RVUVSWSwgJ05vdCBzdXBwb3J0ZWQgcmVhZCBwcmVmZXJlbmNlLicpO1xuICAgIH1cbiAgICByZXR1cm4gcmVhZFByZWZlcmVuY2U7XG4gIH1cblxuICBwZXJmb3JtSW5pdGlhbGl6YXRpb24oKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgY3JlYXRlSW5kZXgoY2xhc3NOYW1lOiBzdHJpbmcsIGluZGV4OiBhbnkpIHtcbiAgICByZXR1cm4gdGhpcy5fYWRhcHRpdmVDb2xsZWN0aW9uKGNsYXNzTmFtZSlcbiAgICAgIC50aGVuKGNvbGxlY3Rpb24gPT4gY29sbGVjdGlvbi5fbW9uZ29Db2xsZWN0aW9uLmNyZWF0ZUluZGV4KGluZGV4KSlcbiAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnIpKTtcbiAgfVxuXG4gIGNyZWF0ZUluZGV4ZXMoY2xhc3NOYW1lOiBzdHJpbmcsIGluZGV4ZXM6IGFueSkge1xuICAgIHJldHVybiB0aGlzLl9hZGFwdGl2ZUNvbGxlY3Rpb24oY2xhc3NOYW1lKVxuICAgICAgLnRoZW4oY29sbGVjdGlvbiA9PiBjb2xsZWN0aW9uLl9tb25nb0NvbGxlY3Rpb24uY3JlYXRlSW5kZXhlcyhpbmRleGVzKSlcbiAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnIpKTtcbiAgfVxuXG4gIGNyZWF0ZUluZGV4ZXNJZk5lZWRlZChjbGFzc05hbWU6IHN0cmluZywgZmllbGROYW1lOiBzdHJpbmcsIHR5cGU6IGFueSkge1xuICAgIGlmICh0eXBlICYmIHR5cGUudHlwZSA9PT0gJ1BvbHlnb24nKSB7XG4gICAgICBjb25zdCBpbmRleCA9IHtcbiAgICAgICAgW2ZpZWxkTmFtZV06ICcyZHNwaGVyZScsXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlSW5kZXgoY2xhc3NOYW1lLCBpbmRleCk7XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIGNyZWF0ZVRleHRJbmRleGVzSWZOZWVkZWQoY2xhc3NOYW1lOiBzdHJpbmcsIHF1ZXJ5OiBRdWVyeVR5cGUsIHNjaGVtYTogYW55KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgZm9yIChjb25zdCBmaWVsZE5hbWUgaW4gcXVlcnkpIHtcbiAgICAgIGlmICghcXVlcnlbZmllbGROYW1lXSB8fCAhcXVlcnlbZmllbGROYW1lXS4kdGV4dCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGV4aXN0aW5nSW5kZXhlcyA9IHNjaGVtYS5pbmRleGVzO1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gZXhpc3RpbmdJbmRleGVzKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gZXhpc3RpbmdJbmRleGVzW2tleV07XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaW5kZXgsIGZpZWxkTmFtZSkpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnN0IGluZGV4TmFtZSA9IGAke2ZpZWxkTmFtZX1fdGV4dGA7XG4gICAgICBjb25zdCB0ZXh0SW5kZXggPSB7XG4gICAgICAgIFtpbmRleE5hbWVdOiB7IFtmaWVsZE5hbWVdOiAndGV4dCcgfSxcbiAgICAgIH07XG4gICAgICByZXR1cm4gdGhpcy5zZXRJbmRleGVzV2l0aFNjaGVtYUZvcm1hdChcbiAgICAgICAgY2xhc3NOYW1lLFxuICAgICAgICB0ZXh0SW5kZXgsXG4gICAgICAgIGV4aXN0aW5nSW5kZXhlcyxcbiAgICAgICAgc2NoZW1hLmZpZWxkc1xuICAgICAgKS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGlmIChlcnJvci5jb2RlID09PSA4NSkge1xuICAgICAgICAgIC8vIEluZGV4IGV4aXN0IHdpdGggZGlmZmVyZW50IG9wdGlvbnNcbiAgICAgICAgICByZXR1cm4gdGhpcy5zZXRJbmRleGVzRnJvbU1vbmdvKGNsYXNzTmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgZ2V0SW5kZXhlcyhjbGFzc05hbWU6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9hZGFwdGl2ZUNvbGxlY3Rpb24oY2xhc3NOYW1lKVxuICAgICAgLnRoZW4oY29sbGVjdGlvbiA9PiBjb2xsZWN0aW9uLl9tb25nb0NvbGxlY3Rpb24uaW5kZXhlcygpKVxuICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLmhhbmRsZUVycm9yKGVycikpO1xuICB9XG5cbiAgZHJvcEluZGV4KGNsYXNzTmFtZTogc3RyaW5nLCBpbmRleDogYW55KSB7XG4gICAgcmV0dXJuIHRoaXMuX2FkYXB0aXZlQ29sbGVjdGlvbihjbGFzc05hbWUpXG4gICAgICAudGhlbihjb2xsZWN0aW9uID0+IGNvbGxlY3Rpb24uX21vbmdvQ29sbGVjdGlvbi5kcm9wSW5kZXgoaW5kZXgpKVxuICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLmhhbmRsZUVycm9yKGVycikpO1xuICB9XG5cbiAgZHJvcEFsbEluZGV4ZXMoY2xhc3NOYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYWRhcHRpdmVDb2xsZWN0aW9uKGNsYXNzTmFtZSlcbiAgICAgIC50aGVuKGNvbGxlY3Rpb24gPT4gY29sbGVjdGlvbi5fbW9uZ29Db2xsZWN0aW9uLmRyb3BJbmRleGVzKCkpXG4gICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyKSk7XG4gIH1cblxuICB1cGRhdGVTY2hlbWFXaXRoSW5kZXhlcygpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmdldEFsbENsYXNzZXMoKVxuICAgICAgLnRoZW4oY2xhc3NlcyA9PiB7XG4gICAgICAgIGNvbnN0IHByb21pc2VzID0gY2xhc3Nlcy5tYXAoc2NoZW1hID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5zZXRJbmRleGVzRnJvbU1vbmdvKHNjaGVtYS5jbGFzc05hbWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyKSk7XG4gIH1cblxuICBjcmVhdGVUcmFuc2FjdGlvbmFsU2Vzc2lvbigpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IHRyYW5zYWN0aW9uYWxTZWN0aW9uID0gdGhpcy5jbGllbnQuc3RhcnRTZXNzaW9uKCk7XG4gICAgdHJhbnNhY3Rpb25hbFNlY3Rpb24uc3RhcnRUcmFuc2FjdGlvbigpO1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodHJhbnNhY3Rpb25hbFNlY3Rpb24pO1xuICB9XG5cbiAgY29tbWl0VHJhbnNhY3Rpb25hbFNlc3Npb24odHJhbnNhY3Rpb25hbFNlY3Rpb246IGFueSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGNvbW1pdCA9IHJldHJpZXMgPT4ge1xuICAgICAgcmV0dXJuIHRyYW5zYWN0aW9uYWxTZWN0aW9uXG4gICAgICAgIC5jb21taXRUcmFuc2FjdGlvbigpXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgaWYgKGVycm9yICYmIGVycm9yLmhhc0Vycm9yTGFiZWwoJ1RyYW5zaWVudFRyYW5zYWN0aW9uRXJyb3InKSAmJiByZXRyaWVzID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbW1pdChyZXRyaWVzIC0gMSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgdHJhbnNhY3Rpb25hbFNlY3Rpb24uZW5kU2Vzc2lvbigpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBjb21taXQoNSk7XG4gIH1cblxuICBhYm9ydFRyYW5zYWN0aW9uYWxTZXNzaW9uKHRyYW5zYWN0aW9uYWxTZWN0aW9uOiBhbnkpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdHJhbnNhY3Rpb25hbFNlY3Rpb24uYWJvcnRUcmFuc2FjdGlvbigpLnRoZW4oKCkgPT4ge1xuICAgICAgdHJhbnNhY3Rpb25hbFNlY3Rpb24uZW5kU2Vzc2lvbigpO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1vbmdvU3RvcmFnZUFkYXB0ZXI7XG4iXX0=