"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isASubscriptionOperation = void 0;
var graphql_1 = require("graphql");
var isASubscriptionOperation = function (document, operationName) {
    var operationAST = (0, graphql_1.getOperationAST)(document, operationName);
    return !!operationAST && operationAST.operation === 'subscription';
};
exports.isASubscriptionOperation = isASubscriptionOperation;
//# sourceMappingURL=is-subscriptions.js.map