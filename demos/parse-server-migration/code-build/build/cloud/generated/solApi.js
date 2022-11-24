"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
const moralis_1 = __importDefault(require("moralis"));
const core_1 = require("@moralisweb3/core");
const rateLimit_1 = require("../../rateLimit");
const axios_1 = require("axios");
const getErrorMessage = (error, name) => {
    // Resolve Axios data inside the MoralisError
    if (error instanceof core_1.MoralisError &&
        error.cause &&
        error.cause instanceof axios_1.AxiosError &&
        error.cause.response &&
        error.cause.response.data) {
        return JSON.stringify(error.cause.response.data);
    }
    if (error instanceof Error) {
        return error.message;
    }
    return `API error while calling ${name}`;
};
const beforeApiRequest = async (user, ip, name) => {
    if (!(await (0, rateLimit_1.handleRateLimit)(user, ip))) {
        throw new Error(`Too many requests to ${name} API from this particular client, the clients needs to wait before sending more requests.`);
    }
};
Parse.Cloud.define("sol-balance", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'balance');
        //@ts-ignore
        const result = await moralis_1.default.SolApi.account.balance(params);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'sol-balance'));
    }
});
Parse.Cloud.define("sol-getSPL", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'getSPL');
        const result = await moralis_1.default.SolApi.account.getSPL(params);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'sol-getSPL'));
    }
});
Parse.Cloud.define("sol-getNFTs", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'getNFTs');
        const result = await moralis_1.default.SolApi.account.getNFTs(params);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'sol-getNFTs'));
    }
});
Parse.Cloud.define("sol-getPortfolio", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'getPortfolio');
        const result = await moralis_1.default.SolApi.account.getPortfolio(params);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'sol-getPortfolio'));
    }
});
Parse.Cloud.define("sol-getNFTMetadata", async ({ params, user, ip }) => {
    try {
        await beforeApiRequest(user, ip, 'getNFTMetadata');
        const result = await moralis_1.default.SolApi.nft.getNFTMetadata(params);
        return result === null || result === void 0 ? void 0 : result.raw;
    }
    catch (error) {
        throw new Error(getErrorMessage(error, 'sol-getNFTMetadata'));
    }
});
// TODO: implement in SDK
// Parse.Cloud.define("sol-getTokenPrice", async ({params, user, ip}: any) => {
//   try {
//     await beforeApiRequest(user, ip, 'getTokenPrice');
//     const result = await Moralis.SolApi.token.getTokenPrice(params);
//     return result?.raw;
//   } catch (error) {
//     throw new Error(getErrorMessage(error, 'sol-getTokenPrice'));
//   }
// })
//# sourceMappingURL=solApi.js.map