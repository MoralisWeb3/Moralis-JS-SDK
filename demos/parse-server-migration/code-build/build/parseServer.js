"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseServer = void 0;
// @ts-ignore
const parse_server_1 = __importDefault(require("parse-server"));
const config_1 = __importDefault(require("./config"));
const MoralisEthAdapter_1 = __importDefault(require("./auth/MoralisEthAdapter"));
exports.parseServer = new parse_server_1.default({
    databaseURI: config_1.default.DATABASE_URI,
    cloud: config_1.default.CLOUD_PATH,
    serverURL: config_1.default.SERVER_URL,
    publicServerURL: config_1.default.SERVER_URL,
    appId: config_1.default.APPLICATION_ID,
    masterKey: config_1.default.MASTER_KEY,
    auth: {
        moralisEth: {
            module: MoralisEthAdapter_1.default,
        },
    },
});
//# sourceMappingURL=parseServer.js.map