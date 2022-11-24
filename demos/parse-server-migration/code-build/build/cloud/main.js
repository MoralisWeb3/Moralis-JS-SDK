"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./generated/evmApi");
require("./generated/solApi");
const authService_1 = require("../auth/authService");
Parse.Cloud.define('requestMessage', async ({ params }) => {
    const { address, chain, networkType } = params;
    const message = await (0, authService_1.requestMessage)({
        address,
        chain,
        networkType,
    });
    return { message };
});
Parse.Cloud.define('getPluginSpecs', () => {
    // Not implemented, only excists to remove client-side errors when using the moralis-v1 package
    return [];
});
Parse.Cloud.define('getServerTime', () => {
    // Not implemented, only excists to remove client-side errors when using the moralis-v1 package
    return null;
});
//# sourceMappingURL=main.js.map