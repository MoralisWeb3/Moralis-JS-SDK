"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.load = void 0;

var _graphql = require("graphql");

var _graphqlRelay = require("graphql-relay");

var _deepcopy = _interopRequireDefault(require("deepcopy"));

var _UsersRouter = _interopRequireDefault(require("../../Routers/UsersRouter"));

var objectsMutations = _interopRequireWildcard(require("../helpers/objectsMutations"));

var _defaultGraphQLTypes = require("./defaultGraphQLTypes");

var _usersQueries = require("./usersQueries");

var _mutation = require("../transformers/mutation");

var _node = _interopRequireDefault(require("parse/node"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const usersRouter = new _UsersRouter.default();

const load = parseGraphQLSchema => {
  if (parseGraphQLSchema.isUsersClassDisabled) {
    return;
  }

  const signUpMutation = (0, _graphqlRelay.mutationWithClientMutationId)({
    name: 'SignUp',
    description: 'The signUp mutation can be used to create and sign up a new user.',
    inputFields: {
      fields: {
        descriptions: 'These are the fields of the new user to be created and signed up.',
        type: parseGraphQLSchema.parseClassTypes['_User'].classGraphQLCreateType
      }
    },
    outputFields: {
      viewer: {
        description: 'This is the new user that was created, signed up and returned as a viewer.',
        type: new _graphql.GraphQLNonNull(parseGraphQLSchema.viewerType)
      }
    },
    mutateAndGetPayload: async (args, context, mutationInfo) => {
      try {
        const {
          fields
        } = (0, _deepcopy.default)(args);
        const {
          config,
          auth,
          info
        } = context;
        const parseFields = await (0, _mutation.transformTypes)('create', fields, {
          className: '_User',
          parseGraphQLSchema,
          req: {
            config,
            auth,
            info
          }
        });
        const {
          sessionToken,
          objectId
        } = await objectsMutations.createObject('_User', parseFields, config, auth, info);
        context.info.sessionToken = sessionToken;
        return {
          viewer: await (0, _usersQueries.getUserFromSessionToken)(context, mutationInfo, 'viewer.user.', objectId)
        };
      } catch (e) {
        parseGraphQLSchema.handleError(e);
      }
    }
  });
  parseGraphQLSchema.addGraphQLType(signUpMutation.args.input.type.ofType, true, true);
  parseGraphQLSchema.addGraphQLType(signUpMutation.type, true, true);
  parseGraphQLSchema.addGraphQLMutation('signUp', signUpMutation, true, true);
  const logInWithMutation = (0, _graphqlRelay.mutationWithClientMutationId)({
    name: 'LogInWith',
    description: 'The logInWith mutation can be used to signup, login user with 3rd party authentication system. This mutation create a user if the authData do not correspond to an existing one.',
    inputFields: {
      authData: {
        descriptions: 'This is the auth data of your custom auth provider',
        type: new _graphql.GraphQLNonNull(_defaultGraphQLTypes.OBJECT)
      },
      fields: {
        descriptions: 'These are the fields of the user to be created/updated and logged in.',
        type: new _graphql.GraphQLInputObjectType({
          name: 'UserLoginWithInput',
          fields: () => {
            const classGraphQLCreateFields = parseGraphQLSchema.parseClassTypes['_User'].classGraphQLCreateType.getFields();
            return Object.keys(classGraphQLCreateFields).reduce((fields, fieldName) => {
              if (fieldName !== 'password' && fieldName !== 'username' && fieldName !== 'authData') {
                fields[fieldName] = classGraphQLCreateFields[fieldName];
              }

              return fields;
            }, {});
          }
        })
      }
    },
    outputFields: {
      viewer: {
        description: 'This is the new user that was created, signed up and returned as a viewer.',
        type: new _graphql.GraphQLNonNull(parseGraphQLSchema.viewerType)
      }
    },
    mutateAndGetPayload: async (args, context, mutationInfo) => {
      try {
        const {
          fields,
          authData
        } = (0, _deepcopy.default)(args);
        const {
          config,
          auth,
          info
        } = context;
        const parseFields = await (0, _mutation.transformTypes)('create', fields, {
          className: '_User',
          parseGraphQLSchema,
          req: {
            config,
            auth,
            info
          }
        });
        const {
          sessionToken,
          objectId
        } = await objectsMutations.createObject('_User', _objectSpread(_objectSpread({}, parseFields), {}, {
          authData
        }), config, auth, info);
        context.info.sessionToken = sessionToken;
        return {
          viewer: await (0, _usersQueries.getUserFromSessionToken)(context, mutationInfo, 'viewer.user.', objectId)
        };
      } catch (e) {
        parseGraphQLSchema.handleError(e);
      }
    }
  });
  parseGraphQLSchema.addGraphQLType(logInWithMutation.args.input.type.ofType, true, true);
  parseGraphQLSchema.addGraphQLType(logInWithMutation.type, true, true);
  parseGraphQLSchema.addGraphQLMutation('logInWith', logInWithMutation, true, true);
  const logInMutation = (0, _graphqlRelay.mutationWithClientMutationId)({
    name: 'LogIn',
    description: 'The logIn mutation can be used to log in an existing user.',
    inputFields: {
      username: {
        description: 'This is the username used to log in the user.',
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
      },
      password: {
        description: 'This is the password used to log in the user.',
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
      }
    },
    outputFields: {
      viewer: {
        description: 'This is the existing user that was logged in and returned as a viewer.',
        type: new _graphql.GraphQLNonNull(parseGraphQLSchema.viewerType)
      }
    },
    mutateAndGetPayload: async (args, context, mutationInfo) => {
      try {
        const {
          username,
          password
        } = (0, _deepcopy.default)(args);
        const {
          config,
          auth,
          info
        } = context;
        const {
          sessionToken,
          objectId
        } = (await usersRouter.handleLogIn({
          body: {
            username,
            password
          },
          query: {},
          config,
          auth,
          info
        })).response;
        context.info.sessionToken = sessionToken;
        return {
          viewer: await (0, _usersQueries.getUserFromSessionToken)(context, mutationInfo, 'viewer.user.', objectId)
        };
      } catch (e) {
        parseGraphQLSchema.handleError(e);
      }
    }
  });
  parseGraphQLSchema.addGraphQLType(logInMutation.args.input.type.ofType, true, true);
  parseGraphQLSchema.addGraphQLType(logInMutation.type, true, true);
  parseGraphQLSchema.addGraphQLMutation('logIn', logInMutation, true, true);
  const logOutMutation = (0, _graphqlRelay.mutationWithClientMutationId)({
    name: 'LogOut',
    description: 'The logOut mutation can be used to log out an existing user.',
    outputFields: {
      ok: {
        description: "It's always true.",
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLBoolean)
      }
    },
    mutateAndGetPayload: async (_args, context) => {
      try {
        const {
          config,
          auth,
          info
        } = context;
        await usersRouter.handleLogOut({
          config,
          auth,
          info
        });
        return {
          ok: true
        };
      } catch (e) {
        parseGraphQLSchema.handleError(e);
      }
    }
  });
  parseGraphQLSchema.addGraphQLType(logOutMutation.args.input.type.ofType, true, true);
  parseGraphQLSchema.addGraphQLType(logOutMutation.type, true, true);
  parseGraphQLSchema.addGraphQLMutation('logOut', logOutMutation, true, true);
  const resetPasswordMutation = (0, _graphqlRelay.mutationWithClientMutationId)({
    name: 'ResetPassword',
    description: 'The resetPassword mutation can be used to reset the password of an existing user.',
    inputFields: {
      email: {
        descriptions: 'Email of the user that should receive the reset email',
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
      }
    },
    outputFields: {
      ok: {
        description: "It's always true.",
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLBoolean)
      }
    },
    mutateAndGetPayload: async ({
      email
    }, context) => {
      const {
        config,
        auth,
        info
      } = context;
      await usersRouter.handleResetRequest({
        body: {
          email
        },
        config,
        auth,
        info
      });
      return {
        ok: true
      };
    }
  });
  parseGraphQLSchema.addGraphQLType(resetPasswordMutation.args.input.type.ofType, true, true);
  parseGraphQLSchema.addGraphQLType(resetPasswordMutation.type, true, true);
  parseGraphQLSchema.addGraphQLMutation('resetPassword', resetPasswordMutation, true, true);
  const confirmResetPasswordMutation = (0, _graphqlRelay.mutationWithClientMutationId)({
    name: 'ConfirmResetPassword',
    description: 'The confirmResetPassword mutation can be used to reset the password of an existing user.',
    inputFields: {
      username: {
        descriptions: 'Username of the user that have received the reset email',
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
      },
      password: {
        descriptions: 'New password of the user',
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
      },
      token: {
        descriptions: 'Reset token that was emailed to the user',
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
      }
    },
    outputFields: {
      ok: {
        description: "It's always true.",
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLBoolean)
      }
    },
    mutateAndGetPayload: async ({
      username,
      password,
      token
    }, context) => {
      const {
        config
      } = context;

      if (!username) {
        throw new _node.default.Error(_node.default.Error.USERNAME_MISSING, 'you must provide a username');
      }

      if (!password) {
        throw new _node.default.Error(_node.default.Error.PASSWORD_MISSING, 'you must provide a password');
      }

      if (!token) {
        throw new _node.default.Error(_node.default.Error.OTHER_CAUSE, 'you must provide a token');
      }

      const userController = config.userController;
      await userController.updatePassword(username, token, password);
      return {
        ok: true
      };
    }
  });
  parseGraphQLSchema.addGraphQLType(confirmResetPasswordMutation.args.input.type.ofType, true, true);
  parseGraphQLSchema.addGraphQLType(confirmResetPasswordMutation.type, true, true);
  parseGraphQLSchema.addGraphQLMutation('confirmResetPassword', confirmResetPasswordMutation, true, true);
  const sendVerificationEmailMutation = (0, _graphqlRelay.mutationWithClientMutationId)({
    name: 'SendVerificationEmail',
    description: 'The sendVerificationEmail mutation can be used to send the verification email again.',
    inputFields: {
      email: {
        descriptions: 'Email of the user that should receive the verification email',
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
      }
    },
    outputFields: {
      ok: {
        description: "It's always true.",
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLBoolean)
      }
    },
    mutateAndGetPayload: async ({
      email
    }, context) => {
      try {
        const {
          config,
          auth,
          info
        } = context;
        await usersRouter.handleVerificationEmailRequest({
          body: {
            email
          },
          config,
          auth,
          info
        });
        return {
          ok: true
        };
      } catch (e) {
        parseGraphQLSchema.handleError(e);
      }
    }
  });
  parseGraphQLSchema.addGraphQLType(sendVerificationEmailMutation.args.input.type.ofType, true, true);
  parseGraphQLSchema.addGraphQLType(sendVerificationEmailMutation.type, true, true);
  parseGraphQLSchema.addGraphQLMutation('sendVerificationEmail', sendVerificationEmailMutation, true, true);
};

exports.load = load;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9HcmFwaFFML2xvYWRlcnMvdXNlcnNNdXRhdGlvbnMuanMiXSwibmFtZXMiOlsidXNlcnNSb3V0ZXIiLCJVc2Vyc1JvdXRlciIsImxvYWQiLCJwYXJzZUdyYXBoUUxTY2hlbWEiLCJpc1VzZXJzQ2xhc3NEaXNhYmxlZCIsInNpZ25VcE11dGF0aW9uIiwibmFtZSIsImRlc2NyaXB0aW9uIiwiaW5wdXRGaWVsZHMiLCJmaWVsZHMiLCJkZXNjcmlwdGlvbnMiLCJ0eXBlIiwicGFyc2VDbGFzc1R5cGVzIiwiY2xhc3NHcmFwaFFMQ3JlYXRlVHlwZSIsIm91dHB1dEZpZWxkcyIsInZpZXdlciIsIkdyYXBoUUxOb25OdWxsIiwidmlld2VyVHlwZSIsIm11dGF0ZUFuZEdldFBheWxvYWQiLCJhcmdzIiwiY29udGV4dCIsIm11dGF0aW9uSW5mbyIsImNvbmZpZyIsImF1dGgiLCJpbmZvIiwicGFyc2VGaWVsZHMiLCJjbGFzc05hbWUiLCJyZXEiLCJzZXNzaW9uVG9rZW4iLCJvYmplY3RJZCIsIm9iamVjdHNNdXRhdGlvbnMiLCJjcmVhdGVPYmplY3QiLCJlIiwiaGFuZGxlRXJyb3IiLCJhZGRHcmFwaFFMVHlwZSIsImlucHV0Iiwib2ZUeXBlIiwiYWRkR3JhcGhRTE11dGF0aW9uIiwibG9nSW5XaXRoTXV0YXRpb24iLCJhdXRoRGF0YSIsIk9CSkVDVCIsIkdyYXBoUUxJbnB1dE9iamVjdFR5cGUiLCJjbGFzc0dyYXBoUUxDcmVhdGVGaWVsZHMiLCJnZXRGaWVsZHMiLCJPYmplY3QiLCJrZXlzIiwicmVkdWNlIiwiZmllbGROYW1lIiwibG9nSW5NdXRhdGlvbiIsInVzZXJuYW1lIiwiR3JhcGhRTFN0cmluZyIsInBhc3N3b3JkIiwiaGFuZGxlTG9nSW4iLCJib2R5IiwicXVlcnkiLCJyZXNwb25zZSIsImxvZ091dE11dGF0aW9uIiwib2siLCJHcmFwaFFMQm9vbGVhbiIsIl9hcmdzIiwiaGFuZGxlTG9nT3V0IiwicmVzZXRQYXNzd29yZE11dGF0aW9uIiwiZW1haWwiLCJoYW5kbGVSZXNldFJlcXVlc3QiLCJjb25maXJtUmVzZXRQYXNzd29yZE11dGF0aW9uIiwidG9rZW4iLCJQYXJzZSIsIkVycm9yIiwiVVNFUk5BTUVfTUlTU0lORyIsIlBBU1NXT1JEX01JU1NJTkciLCJPVEhFUl9DQVVTRSIsInVzZXJDb250cm9sbGVyIiwidXBkYXRlUGFzc3dvcmQiLCJzZW5kVmVyaWZpY2F0aW9uRW1haWxNdXRhdGlvbiIsImhhbmRsZVZlcmlmaWNhdGlvbkVtYWlsUmVxdWVzdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7OztBQUVBLE1BQU1BLFdBQVcsR0FBRyxJQUFJQyxvQkFBSixFQUFwQjs7QUFFQSxNQUFNQyxJQUFJLEdBQUdDLGtCQUFrQixJQUFJO0FBQ2pDLE1BQUlBLGtCQUFrQixDQUFDQyxvQkFBdkIsRUFBNkM7QUFDM0M7QUFDRDs7QUFFRCxRQUFNQyxjQUFjLEdBQUcsZ0RBQTZCO0FBQ2xEQyxJQUFBQSxJQUFJLEVBQUUsUUFENEM7QUFFbERDLElBQUFBLFdBQVcsRUFBRSxtRUFGcUM7QUFHbERDLElBQUFBLFdBQVcsRUFBRTtBQUNYQyxNQUFBQSxNQUFNLEVBQUU7QUFDTkMsUUFBQUEsWUFBWSxFQUFFLG1FQURSO0FBRU5DLFFBQUFBLElBQUksRUFBRVIsa0JBQWtCLENBQUNTLGVBQW5CLENBQW1DLE9BQW5DLEVBQTRDQztBQUY1QztBQURHLEtBSHFDO0FBU2xEQyxJQUFBQSxZQUFZLEVBQUU7QUFDWkMsTUFBQUEsTUFBTSxFQUFFO0FBQ05SLFFBQUFBLFdBQVcsRUFBRSw0RUFEUDtBQUVOSSxRQUFBQSxJQUFJLEVBQUUsSUFBSUssdUJBQUosQ0FBbUJiLGtCQUFrQixDQUFDYyxVQUF0QztBQUZBO0FBREksS0FUb0M7QUFlbERDLElBQUFBLG1CQUFtQixFQUFFLE9BQU9DLElBQVAsRUFBYUMsT0FBYixFQUFzQkMsWUFBdEIsS0FB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QixDQUNFdUMsNkJBQTZCLENBQUN0RCxJQUE5QixDQUFtQ2dCLEtBQW5DLENBQXlDeEIsSUFBekMsQ0FBOEN5QixNQURoRCxFQUVFLElBRkYsRUFHRSxJQUhGO0FBS0FqQyxFQUFBQSxrQkFBa0IsQ0FBQytCLGNBQW5CLENBQWtDdUMsNkJBQTZCLENBQUM5RCxJQUFoRSxFQUFzRSxJQUF0RSxFQUE0RSxJQUE1RTtBQUNBUixFQUFBQSxrQkFBa0IsQ0FBQ2tDLGtCQUFuQixDQUNFLHVCQURGLEVBRUVvQyw2QkFGRixFQUdFLElBSEYsRUFJRSxJQUpGO0FBTUQsQ0F6VkQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHcmFwaFFMTm9uTnVsbCwgR3JhcGhRTFN0cmluZywgR3JhcGhRTEJvb2xlYW4sIEdyYXBoUUxJbnB1dE9iamVjdFR5cGUgfSBmcm9tICdncmFwaHFsJztcbmltcG9ydCB7IG11dGF0aW9uV2l0aENsaWVudE11dGF0aW9uSWQgfSBmcm9tICdncmFwaHFsLXJlbGF5JztcbmltcG9ydCBkZWVwY29weSBmcm9tICdkZWVwY29weSc7XG5pbXBvcnQgVXNlcnNSb3V0ZXIgZnJvbSAnLi4vLi4vUm91dGVycy9Vc2Vyc1JvdXRlcic7XG5pbXBvcnQgKiBhcyBvYmplY3RzTXV0YXRpb25zIGZyb20gJy4uL2hlbHBlcnMvb2JqZWN0c011dGF0aW9ucyc7XG5pbXBvcnQgeyBPQkpFQ1QgfSBmcm9tICcuL2RlZmF1bHRHcmFwaFFMVHlwZXMnO1xuaW1wb3J0IHsgZ2V0VXNlckZyb21TZXNzaW9uVG9rZW4gfSBmcm9tICcuL3VzZXJzUXVlcmllcyc7XG5pbXBvcnQgeyB0cmFuc2Zvcm1UeXBlcyB9IGZyb20gJy4uL3RyYW5zZm9ybWVycy9tdXRhdGlvbic7XG5pbXBvcnQgUGFyc2UgZnJvbSAncGFyc2Uvbm9kZSc7XG5cbmNvbnN0IHVzZXJzUm91dGVyID0gbmV3IFVzZXJzUm91dGVyKCk7XG5cbmNvbnN0IGxvYWQgPSBwYXJzZUdyYXBoUUxTY2hlbWEgPT4ge1xuICBpZiAocGFyc2VHcmFwaFFMU2NoZW1hLmlzVXNlcnNDbGFzc0Rpc2FibGVkKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3Qgc2lnblVwTXV0YXRpb24gPSBtdXRhdGlvbldpdGhDbGllbnRNdXRhdGlvbklkKHtcbiAgICBuYW1lOiAnU2lnblVwJyxcbiAgICBkZXNjcmlwdGlvbjogJ1RoZSBzaWduVXAgbXV0YXRpb24gY2FuIGJlIHVzZWQgdG8gY3JlYXRlIGFuZCBzaWduIHVwIGEgbmV3IHVzZXIuJyxcbiAgICBpbnB1dEZpZWxkczoge1xuICAgICAgZmllbGRzOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uczogJ1RoZXNlIGFyZSB0aGUgZmllbGRzIG9mIHRoZSBuZXcgdXNlciB0byBiZSBjcmVhdGVkIGFuZCBzaWduZWQgdXAuJyxcbiAgICAgICAgdHlwZTogcGFyc2VHcmFwaFFMU2NoZW1hLnBhcnNlQ2xhc3NUeXBlc1snX1VzZXInXS5jbGFzc0dyYXBoUUxDcmVhdGVUeXBlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIG91dHB1dEZpZWxkczoge1xuICAgICAgdmlld2VyOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiAnVGhpcyBpcyB0aGUgbmV3IHVzZXIgdGhhdCB3YXMgY3JlYXRlZCwgc2lnbmVkIHVwIGFuZCByZXR1cm5lZCBhcyBhIHZpZXdlci4nLFxuICAgICAgICB0eXBlOiBuZXcgR3JhcGhRTE5vbk51bGwocGFyc2VHcmFwaFFMU2NoZW1hLnZpZXdlclR5cGUpLFxuICAgICAgfSxcbiAgICB9LFxuICAgIG11dGF0ZUFuZEdldFBheWxvYWQ6IGFzeW5jIChhcmdzLCBjb250ZXh0LCBtdXRhdGlvbkluZm8pID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHsgZmllbGRzIH0gPSBkZWVwY29weShhcmdzKTtcbiAgICAgICAgY29uc3QgeyBjb25maWcsIGF1dGgsIGluZm8gfSA9IGNvbnRleHQ7XG5cbiAgICAgICAgY29uc3QgcGFyc2VGaWVsZHMgPSBhd2FpdCB0cmFuc2Zvcm1UeXBlcygnY3JlYXRlJywgZmllbGRzLCB7XG4gICAgICAgICAgY2xhc3NOYW1lOiAnX1VzZXInLFxuICAgICAgICAgIHBhcnNlR3JhcGhRTFNjaGVtYSxcbiAgICAgICAgICByZXE6IHsgY29uZmlnLCBhdXRoLCBpbmZvIH0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHsgc2Vzc2lvblRva2VuLCBvYmplY3RJZCB9ID0gYXdhaXQgb2JqZWN0c011dGF0aW9ucy5jcmVhdGVPYmplY3QoXG4gICAgICAgICAgJ19Vc2VyJyxcbiAgICAgICAgICBwYXJzZUZpZWxkcyxcbiAgICAgICAgICBjb25maWcsXG4gICAgICAgICAgYXV0aCxcbiAgICAgICAgICBpbmZvXG4gICAgICAgICk7XG5cbiAgICAgICAgY29udGV4dC5pbmZvLnNlc3Npb25Ub2tlbiA9IHNlc3Npb25Ub2tlbjtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHZpZXdlcjogYXdhaXQgZ2V0VXNlckZyb21TZXNzaW9uVG9rZW4oY29udGV4dCwgbXV0YXRpb25JbmZvLCAndmlld2VyLnVzZXIuJywgb2JqZWN0SWQpLFxuICAgICAgICB9O1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBwYXJzZUdyYXBoUUxTY2hlbWEuaGFuZGxlRXJyb3IoZSk7XG4gICAgICB9XG4gICAgfSxcbiAgfSk7XG5cbiAgcGFyc2VHcmFwaFFMU2NoZW1hLmFkZEdyYXBoUUxUeXBlKHNpZ25VcE11dGF0aW9uLmFyZ3MuaW5wdXQudHlwZS5vZlR5cGUsIHRydWUsIHRydWUpO1xuICBwYXJzZUdyYXBoUUxTY2hlbWEuYWRkR3JhcGhRTFR5cGUoc2lnblVwTXV0YXRpb24udHlwZSwgdHJ1ZSwgdHJ1ZSk7XG4gIHBhcnNlR3JhcGhRTFNjaGVtYS5hZGRHcmFwaFFMTXV0YXRpb24oJ3NpZ25VcCcsIHNpZ25VcE11dGF0aW9uLCB0cnVlLCB0cnVlKTtcbiAgY29uc3QgbG9nSW5XaXRoTXV0YXRpb24gPSBtdXRhdGlvbldpdGhDbGllbnRNdXRhdGlvbklkKHtcbiAgICBuYW1lOiAnTG9nSW5XaXRoJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdUaGUgbG9nSW5XaXRoIG11dGF0aW9uIGNhbiBiZSB1c2VkIHRvIHNpZ251cCwgbG9naW4gdXNlciB3aXRoIDNyZCBwYXJ0eSBhdXRoZW50aWNhdGlvbiBzeXN0ZW0uIFRoaXMgbXV0YXRpb24gY3JlYXRlIGEgdXNlciBpZiB0aGUgYXV0aERhdGEgZG8gbm90IGNvcnJlc3BvbmQgdG8gYW4gZXhpc3Rpbmcgb25lLicsXG4gICAgaW5wdXRGaWVsZHM6IHtcbiAgICAgIGF1dGhEYXRhOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uczogJ1RoaXMgaXMgdGhlIGF1dGggZGF0YSBvZiB5b3VyIGN1c3RvbSBhdXRoIHByb3ZpZGVyJyxcbiAgICAgICAgdHlwZTogbmV3IEdyYXBoUUxOb25OdWxsKE9CSkVDVCksXG4gICAgICB9LFxuICAgICAgZmllbGRzOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uczogJ1RoZXNlIGFyZSB0aGUgZmllbGRzIG9mIHRoZSB1c2VyIHRvIGJlIGNyZWF0ZWQvdXBkYXRlZCBhbmQgbG9nZ2VkIGluLicsXG4gICAgICAgIHR5cGU6IG5ldyBHcmFwaFFMSW5wdXRPYmplY3RUeXBlKHtcbiAgICAgICAgICBuYW1lOiAnVXNlckxvZ2luV2l0aElucHV0JyxcbiAgICAgICAgICBmaWVsZHM6ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNsYXNzR3JhcGhRTENyZWF0ZUZpZWxkcyA9IHBhcnNlR3JhcGhRTFNjaGVtYS5wYXJzZUNsYXNzVHlwZXNbXG4gICAgICAgICAgICAgICdfVXNlcidcbiAgICAgICAgICAgIF0uY2xhc3NHcmFwaFFMQ3JlYXRlVHlwZS5nZXRGaWVsZHMoKTtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhjbGFzc0dyYXBoUUxDcmVhdGVGaWVsZHMpLnJlZHVjZSgoZmllbGRzLCBmaWVsZE5hbWUpID0+IHtcbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGZpZWxkTmFtZSAhPT0gJ3Bhc3N3b3JkJyAmJlxuICAgICAgICAgICAgICAgIGZpZWxkTmFtZSAhPT0gJ3VzZXJuYW1lJyAmJlxuICAgICAgICAgICAgICAgIGZpZWxkTmFtZSAhPT0gJ2F1dGhEYXRhJ1xuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBmaWVsZHNbZmllbGROYW1lXSA9IGNsYXNzR3JhcGhRTENyZWF0ZUZpZWxkc1tmaWVsZE5hbWVdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBmaWVsZHM7XG4gICAgICAgICAgICB9LCB7fSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICB9LFxuICAgIH0sXG4gICAgb3V0cHV0RmllbGRzOiB7XG4gICAgICB2aWV3ZXI6IHtcbiAgICAgICAgZGVzY3JpcHRpb246ICdUaGlzIGlzIHRoZSBuZXcgdXNlciB0aGF0IHdhcyBjcmVhdGVkLCBzaWduZWQgdXAgYW5kIHJldHVybmVkIGFzIGEgdmlld2VyLicsXG4gICAgICAgIHR5cGU6IG5ldyBHcmFwaFFMTm9uTnVsbChwYXJzZUdyYXBoUUxTY2hlbWEudmlld2VyVHlwZSksXG4gICAgICB9LFxuICAgIH0sXG4gICAgbXV0YXRlQW5kR2V0UGF5bG9hZDogYXN5bmMgKGFyZ3MsIGNvbnRleHQsIG11dGF0aW9uSW5mbykgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgeyBmaWVsZHMsIGF1dGhEYXRhIH0gPSBkZWVwY29weShhcmdzKTtcbiAgICAgICAgY29uc3QgeyBjb25maWcsIGF1dGgsIGluZm8gfSA9IGNvbnRleHQ7XG5cbiAgICAgICAgY29uc3QgcGFyc2VGaWVsZHMgPSBhd2FpdCB0cmFuc2Zvcm1UeXBlcygnY3JlYXRlJywgZmllbGRzLCB7XG4gICAgICAgICAgY2xhc3NOYW1lOiAnX1VzZXInLFxuICAgICAgICAgIHBhcnNlR3JhcGhRTFNjaGVtYSxcbiAgICAgICAgICByZXE6IHsgY29uZmlnLCBhdXRoLCBpbmZvIH0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHsgc2Vzc2lvblRva2VuLCBvYmplY3RJZCB9ID0gYXdhaXQgb2JqZWN0c011dGF0aW9ucy5jcmVhdGVPYmplY3QoXG4gICAgICAgICAgJ19Vc2VyJyxcbiAgICAgICAgICB7IC4uLnBhcnNlRmllbGRzLCBhdXRoRGF0YSB9LFxuICAgICAgICAgIGNvbmZpZyxcbiAgICAgICAgICBhdXRoLFxuICAgICAgICAgIGluZm9cbiAgICAgICAgKTtcblxuICAgICAgICBjb250ZXh0LmluZm8uc2Vzc2lvblRva2VuID0gc2Vzc2lvblRva2VuO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdmlld2VyOiBhd2FpdCBnZXRVc2VyRnJvbVNlc3Npb25Ub2tlbihjb250ZXh0LCBtdXRhdGlvbkluZm8sICd2aWV3ZXIudXNlci4nLCBvYmplY3RJZCksXG4gICAgICAgIH07XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHBhcnNlR3JhcGhRTFNjaGVtYS5oYW5kbGVFcnJvcihlKTtcbiAgICAgIH1cbiAgICB9LFxuICB9KTtcblxuICBwYXJzZUdyYXBoUUxTY2hlbWEuYWRkR3JhcGhRTFR5cGUobG9nSW5XaXRoTXV0YXRpb24uYXJncy5pbnB1dC50eXBlLm9mVHlwZSwgdHJ1ZSwgdHJ1ZSk7XG4gIHBhcnNlR3JhcGhRTFNjaGVtYS5hZGRHcmFwaFFMVHlwZShsb2dJbldpdGhNdXRhdGlvbi50eXBlLCB0cnVlLCB0cnVlKTtcbiAgcGFyc2VHcmFwaFFMU2NoZW1hLmFkZEdyYXBoUUxNdXRhdGlvbignbG9nSW5XaXRoJywgbG9nSW5XaXRoTXV0YXRpb24sIHRydWUsIHRydWUpO1xuXG4gIGNvbnN0IGxvZ0luTXV0YXRpb24gPSBtdXRhdGlvbldpdGhDbGllbnRNdXRhdGlvbklkKHtcbiAgICBuYW1lOiAnTG9nSW4nLFxuICAgIGRlc2NyaXB0aW9uOiAnVGhlIGxvZ0luIG11dGF0aW9uIGNhbiBiZSB1c2VkIHRvIGxvZyBpbiBhbiBleGlzdGluZyB1c2VyLicsXG4gICAgaW5wdXRGaWVsZHM6IHtcbiAgICAgIHVzZXJuYW1lOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiAnVGhpcyBpcyB0aGUgdXNlcm5hbWUgdXNlZCB0byBsb2cgaW4gdGhlIHVzZXIuJyxcbiAgICAgICAgdHlwZTogbmV3IEdyYXBoUUxOb25OdWxsKEdyYXBoUUxTdHJpbmcpLFxuICAgICAgfSxcbiAgICAgIHBhc3N3b3JkOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiAnVGhpcyBpcyB0aGUgcGFzc3dvcmQgdXNlZCB0byBsb2cgaW4gdGhlIHVzZXIuJyxcbiAgICAgICAgdHlwZTogbmV3IEdyYXBoUUxOb25OdWxsKEdyYXBoUUxTdHJpbmcpLFxuICAgICAgfSxcbiAgICB9LFxuICAgIG91dHB1dEZpZWxkczoge1xuICAgICAgdmlld2VyOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiAnVGhpcyBpcyB0aGUgZXhpc3RpbmcgdXNlciB0aGF0IHdhcyBsb2dnZWQgaW4gYW5kIHJldHVybmVkIGFzIGEgdmlld2VyLicsXG4gICAgICAgIHR5cGU6IG5ldyBHcmFwaFFMTm9uTnVsbChwYXJzZUdyYXBoUUxTY2hlbWEudmlld2VyVHlwZSksXG4gICAgICB9LFxuICAgIH0sXG4gICAgbXV0YXRlQW5kR2V0UGF5bG9hZDogYXN5bmMgKGFyZ3MsIGNvbnRleHQsIG11dGF0aW9uSW5mbykgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgeyB1c2VybmFtZSwgcGFzc3dvcmQgfSA9IGRlZXBjb3B5KGFyZ3MpO1xuICAgICAgICBjb25zdCB7IGNvbmZpZywgYXV0aCwgaW5mbyB9ID0gY29udGV4dDtcblxuICAgICAgICBjb25zdCB7IHNlc3Npb25Ub2tlbiwgb2JqZWN0SWQgfSA9IChcbiAgICAgICAgICBhd2FpdCB1c2Vyc1JvdXRlci5oYW5kbGVMb2dJbih7XG4gICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgIHVzZXJuYW1lLFxuICAgICAgICAgICAgICBwYXNzd29yZCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBxdWVyeToge30sXG4gICAgICAgICAgICBjb25maWcsXG4gICAgICAgICAgICBhdXRoLFxuICAgICAgICAgICAgaW5mbyxcbiAgICAgICAgICB9KVxuICAgICAgICApLnJlc3BvbnNlO1xuXG4gICAgICAgIGNvbnRleHQuaW5mby5zZXNzaW9uVG9rZW4gPSBzZXNzaW9uVG9rZW47XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB2aWV3ZXI6IGF3YWl0IGdldFVzZXJGcm9tU2Vzc2lvblRva2VuKGNvbnRleHQsIG11dGF0aW9uSW5mbywgJ3ZpZXdlci51c2VyLicsIG9iamVjdElkKSxcbiAgICAgICAgfTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcGFyc2VHcmFwaFFMU2NoZW1hLmhhbmRsZUVycm9yKGUpO1xuICAgICAgfVxuICAgIH0sXG4gIH0pO1xuXG4gIHBhcnNlR3JhcGhRTFNjaGVtYS5hZGRHcmFwaFFMVHlwZShsb2dJbk11dGF0aW9uLmFyZ3MuaW5wdXQudHlwZS5vZlR5cGUsIHRydWUsIHRydWUpO1xuICBwYXJzZUdyYXBoUUxTY2hlbWEuYWRkR3JhcGhRTFR5cGUobG9nSW5NdXRhdGlvbi50eXBlLCB0cnVlLCB0cnVlKTtcbiAgcGFyc2VHcmFwaFFMU2NoZW1hLmFkZEdyYXBoUUxNdXRhdGlvbignbG9nSW4nLCBsb2dJbk11dGF0aW9uLCB0cnVlLCB0cnVlKTtcblxuICBjb25zdCBsb2dPdXRNdXRhdGlvbiA9IG11dGF0aW9uV2l0aENsaWVudE11dGF0aW9uSWQoe1xuICAgIG5hbWU6ICdMb2dPdXQnLFxuICAgIGRlc2NyaXB0aW9uOiAnVGhlIGxvZ091dCBtdXRhdGlvbiBjYW4gYmUgdXNlZCB0byBsb2cgb3V0IGFuIGV4aXN0aW5nIHVzZXIuJyxcbiAgICBvdXRwdXRGaWVsZHM6IHtcbiAgICAgIG9rOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkl0J3MgYWx3YXlzIHRydWUuXCIsXG4gICAgICAgIHR5cGU6IG5ldyBHcmFwaFFMTm9uTnVsbChHcmFwaFFMQm9vbGVhbiksXG4gICAgICB9LFxuICAgIH0sXG4gICAgbXV0YXRlQW5kR2V0UGF5bG9hZDogYXN5bmMgKF9hcmdzLCBjb250ZXh0KSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCB7IGNvbmZpZywgYXV0aCwgaW5mbyB9ID0gY29udGV4dDtcblxuICAgICAgICBhd2FpdCB1c2Vyc1JvdXRlci5oYW5kbGVMb2dPdXQoe1xuICAgICAgICAgIGNvbmZpZyxcbiAgICAgICAgICBhdXRoLFxuICAgICAgICAgIGluZm8sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB7IG9rOiB0cnVlIH07XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHBhcnNlR3JhcGhRTFNjaGVtYS5oYW5kbGVFcnJvcihlKTtcbiAgICAgIH1cbiAgICB9LFxuICB9KTtcblxuICBwYXJzZUdyYXBoUUxTY2hlbWEuYWRkR3JhcGhRTFR5cGUobG9nT3V0TXV0YXRpb24uYXJncy5pbnB1dC50eXBlLm9mVHlwZSwgdHJ1ZSwgdHJ1ZSk7XG4gIHBhcnNlR3JhcGhRTFNjaGVtYS5hZGRHcmFwaFFMVHlwZShsb2dPdXRNdXRhdGlvbi50eXBlLCB0cnVlLCB0cnVlKTtcbiAgcGFyc2VHcmFwaFFMU2NoZW1hLmFkZEdyYXBoUUxNdXRhdGlvbignbG9nT3V0JywgbG9nT3V0TXV0YXRpb24sIHRydWUsIHRydWUpO1xuXG4gIGNvbnN0IHJlc2V0UGFzc3dvcmRNdXRhdGlvbiA9IG11dGF0aW9uV2l0aENsaWVudE11dGF0aW9uSWQoe1xuICAgIG5hbWU6ICdSZXNldFBhc3N3b3JkJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdUaGUgcmVzZXRQYXNzd29yZCBtdXRhdGlvbiBjYW4gYmUgdXNlZCB0byByZXNldCB0aGUgcGFzc3dvcmQgb2YgYW4gZXhpc3RpbmcgdXNlci4nLFxuICAgIGlucHV0RmllbGRzOiB7XG4gICAgICBlbWFpbDoge1xuICAgICAgICBkZXNjcmlwdGlvbnM6ICdFbWFpbCBvZiB0aGUgdXNlciB0aGF0IHNob3VsZCByZWNlaXZlIHRoZSByZXNldCBlbWFpbCcsXG4gICAgICAgIHR5cGU6IG5ldyBHcmFwaFFMTm9uTnVsbChHcmFwaFFMU3RyaW5nKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBvdXRwdXRGaWVsZHM6IHtcbiAgICAgIG9rOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkl0J3MgYWx3YXlzIHRydWUuXCIsXG4gICAgICAgIHR5cGU6IG5ldyBHcmFwaFFMTm9uTnVsbChHcmFwaFFMQm9vbGVhbiksXG4gICAgICB9LFxuICAgIH0sXG4gICAgbXV0YXRlQW5kR2V0UGF5bG9hZDogYXN5bmMgKHsgZW1haWwgfSwgY29udGV4dCkgPT4ge1xuICAgICAgY29uc3QgeyBjb25maWcsIGF1dGgsIGluZm8gfSA9IGNvbnRleHQ7XG5cbiAgICAgIGF3YWl0IHVzZXJzUm91dGVyLmhhbmRsZVJlc2V0UmVxdWVzdCh7XG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBlbWFpbCxcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnLFxuICAgICAgICBhdXRoLFxuICAgICAgICBpbmZvLFxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB7IG9rOiB0cnVlIH07XG4gICAgfSxcbiAgfSk7XG5cbiAgcGFyc2VHcmFwaFFMU2NoZW1hLmFkZEdyYXBoUUxUeXBlKHJlc2V0UGFzc3dvcmRNdXRhdGlvbi5hcmdzLmlucHV0LnR5cGUub2ZUeXBlLCB0cnVlLCB0cnVlKTtcbiAgcGFyc2VHcmFwaFFMU2NoZW1hLmFkZEdyYXBoUUxUeXBlKHJlc2V0UGFzc3dvcmRNdXRhdGlvbi50eXBlLCB0cnVlLCB0cnVlKTtcbiAgcGFyc2VHcmFwaFFMU2NoZW1hLmFkZEdyYXBoUUxNdXRhdGlvbigncmVzZXRQYXNzd29yZCcsIHJlc2V0UGFzc3dvcmRNdXRhdGlvbiwgdHJ1ZSwgdHJ1ZSk7XG5cbiAgY29uc3QgY29uZmlybVJlc2V0UGFzc3dvcmRNdXRhdGlvbiA9IG11dGF0aW9uV2l0aENsaWVudE11dGF0aW9uSWQoe1xuICAgIG5hbWU6ICdDb25maXJtUmVzZXRQYXNzd29yZCcsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnVGhlIGNvbmZpcm1SZXNldFBhc3N3b3JkIG11dGF0aW9uIGNhbiBiZSB1c2VkIHRvIHJlc2V0IHRoZSBwYXNzd29yZCBvZiBhbiBleGlzdGluZyB1c2VyLicsXG4gICAgaW5wdXRGaWVsZHM6IHtcbiAgICAgIHVzZXJuYW1lOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uczogJ1VzZXJuYW1lIG9mIHRoZSB1c2VyIHRoYXQgaGF2ZSByZWNlaXZlZCB0aGUgcmVzZXQgZW1haWwnLFxuICAgICAgICB0eXBlOiBuZXcgR3JhcGhRTE5vbk51bGwoR3JhcGhRTFN0cmluZyksXG4gICAgICB9LFxuICAgICAgcGFzc3dvcmQ6IHtcbiAgICAgICAgZGVzY3JpcHRpb25zOiAnTmV3IHBhc3N3b3JkIG9mIHRoZSB1c2VyJyxcbiAgICAgICAgdHlwZTogbmV3IEdyYXBoUUxOb25OdWxsKEdyYXBoUUxTdHJpbmcpLFxuICAgICAgfSxcbiAgICAgIHRva2VuOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uczogJ1Jlc2V0IHRva2VuIHRoYXQgd2FzIGVtYWlsZWQgdG8gdGhlIHVzZXInLFxuICAgICAgICB0eXBlOiBuZXcgR3JhcGhRTE5vbk51bGwoR3JhcGhRTFN0cmluZyksXG4gICAgICB9LFxuICAgIH0sXG4gICAgb3V0cHV0RmllbGRzOiB7XG4gICAgICBvazoge1xuICAgICAgICBkZXNjcmlwdGlvbjogXCJJdCdzIGFsd2F5cyB0cnVlLlwiLFxuICAgICAgICB0eXBlOiBuZXcgR3JhcGhRTE5vbk51bGwoR3JhcGhRTEJvb2xlYW4pLFxuICAgICAgfSxcbiAgICB9LFxuICAgIG11dGF0ZUFuZEdldFBheWxvYWQ6IGFzeW5jICh7IHVzZXJuYW1lLCBwYXNzd29yZCwgdG9rZW4gfSwgY29udGV4dCkgPT4ge1xuICAgICAgY29uc3QgeyBjb25maWcgfSA9IGNvbnRleHQ7XG4gICAgICBpZiAoIXVzZXJuYW1lKSB7XG4gICAgICAgIHRocm93IG5ldyBQYXJzZS5FcnJvcihQYXJzZS5FcnJvci5VU0VSTkFNRV9NSVNTSU5HLCAneW91IG11c3QgcHJvdmlkZSBhIHVzZXJuYW1lJyk7XG4gICAgICB9XG4gICAgICBpZiAoIXBhc3N3b3JkKSB7XG4gICAgICAgIHRocm93IG5ldyBQYXJzZS5FcnJvcihQYXJzZS5FcnJvci5QQVNTV09SRF9NSVNTSU5HLCAneW91IG11c3QgcHJvdmlkZSBhIHBhc3N3b3JkJyk7XG4gICAgICB9XG4gICAgICBpZiAoIXRva2VuKSB7XG4gICAgICAgIHRocm93IG5ldyBQYXJzZS5FcnJvcihQYXJzZS5FcnJvci5PVEhFUl9DQVVTRSwgJ3lvdSBtdXN0IHByb3ZpZGUgYSB0b2tlbicpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB1c2VyQ29udHJvbGxlciA9IGNvbmZpZy51c2VyQ29udHJvbGxlcjtcbiAgICAgIGF3YWl0IHVzZXJDb250cm9sbGVyLnVwZGF0ZVBhc3N3b3JkKHVzZXJuYW1lLCB0b2tlbiwgcGFzc3dvcmQpO1xuICAgICAgcmV0dXJuIHsgb2s6IHRydWUgfTtcbiAgICB9LFxuICB9KTtcblxuICBwYXJzZUdyYXBoUUxTY2hlbWEuYWRkR3JhcGhRTFR5cGUoXG4gICAgY29uZmlybVJlc2V0UGFzc3dvcmRNdXRhdGlvbi5hcmdzLmlucHV0LnR5cGUub2ZUeXBlLFxuICAgIHRydWUsXG4gICAgdHJ1ZVxuICApO1xuICBwYXJzZUdyYXBoUUxTY2hlbWEuYWRkR3JhcGhRTFR5cGUoY29uZmlybVJlc2V0UGFzc3dvcmRNdXRhdGlvbi50eXBlLCB0cnVlLCB0cnVlKTtcbiAgcGFyc2VHcmFwaFFMU2NoZW1hLmFkZEdyYXBoUUxNdXRhdGlvbihcbiAgICAnY29uZmlybVJlc2V0UGFzc3dvcmQnLFxuICAgIGNvbmZpcm1SZXNldFBhc3N3b3JkTXV0YXRpb24sXG4gICAgdHJ1ZSxcbiAgICB0cnVlXG4gICk7XG5cbiAgY29uc3Qgc2VuZFZlcmlmaWNhdGlvbkVtYWlsTXV0YXRpb24gPSBtdXRhdGlvbldpdGhDbGllbnRNdXRhdGlvbklkKHtcbiAgICBuYW1lOiAnU2VuZFZlcmlmaWNhdGlvbkVtYWlsJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdUaGUgc2VuZFZlcmlmaWNhdGlvbkVtYWlsIG11dGF0aW9uIGNhbiBiZSB1c2VkIHRvIHNlbmQgdGhlIHZlcmlmaWNhdGlvbiBlbWFpbCBhZ2Fpbi4nLFxuICAgIGlucHV0RmllbGRzOiB7XG4gICAgICBlbWFpbDoge1xuICAgICAgICBkZXNjcmlwdGlvbnM6ICdFbWFpbCBvZiB0aGUgdXNlciB0aGF0IHNob3VsZCByZWNlaXZlIHRoZSB2ZXJpZmljYXRpb24gZW1haWwnLFxuICAgICAgICB0eXBlOiBuZXcgR3JhcGhRTE5vbk51bGwoR3JhcGhRTFN0cmluZyksXG4gICAgICB9LFxuICAgIH0sXG4gICAgb3V0cHV0RmllbGRzOiB7XG4gICAgICBvazoge1xuICAgICAgICBkZXNjcmlwdGlvbjogXCJJdCdzIGFsd2F5cyB0cnVlLlwiLFxuICAgICAgICB0eXBlOiBuZXcgR3JhcGhRTE5vbk51bGwoR3JhcGhRTEJvb2xlYW4pLFxuICAgICAgfSxcbiAgICB9LFxuICAgIG11dGF0ZUFuZEdldFBheWxvYWQ6IGFzeW5jICh7IGVtYWlsIH0sIGNvbnRleHQpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHsgY29uZmlnLCBhdXRoLCBpbmZvIH0gPSBjb250ZXh0O1xuXG4gICAgICAgIGF3YWl0IHVzZXJzUm91dGVyLmhhbmRsZVZlcmlmaWNhdGlvbkVtYWlsUmVxdWVzdCh7XG4gICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgZW1haWwsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjb25maWcsXG4gICAgICAgICAgYXV0aCxcbiAgICAgICAgICBpbmZvLFxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4geyBvazogdHJ1ZSB9O1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBwYXJzZUdyYXBoUUxTY2hlbWEuaGFuZGxlRXJyb3IoZSk7XG4gICAgICB9XG4gICAgfSxcbiAgfSk7XG5cbiAgcGFyc2VHcmFwaFFMU2NoZW1hLmFkZEdyYXBoUUxUeXBlKFxuICAgIHNlbmRWZXJpZmljYXRpb25FbWFpbE11dGF0aW9uLmFyZ3MuaW5wdXQudHlwZS5vZlR5cGUsXG4gICAgdHJ1ZSxcbiAgICB0cnVlXG4gICk7XG4gIHBhcnNlR3JhcGhRTFNjaGVtYS5hZGRHcmFwaFFMVHlwZShzZW5kVmVyaWZpY2F0aW9uRW1haWxNdXRhdGlvbi50eXBlLCB0cnVlLCB0cnVlKTtcbiAgcGFyc2VHcmFwaFFMU2NoZW1hLmFkZEdyYXBoUUxNdXRhdGlvbihcbiAgICAnc2VuZFZlcmlmaWNhdGlvbkVtYWlsJyxcbiAgICBzZW5kVmVyaWZpY2F0aW9uRW1haWxNdXRhdGlvbixcbiAgICB0cnVlLFxuICAgIHRydWVcbiAgKTtcbn07XG5cbmV4cG9ydCB7IGxvYWQgfTtcbiJdfQ==