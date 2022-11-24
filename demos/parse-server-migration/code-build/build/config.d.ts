declare const _default: Readonly<{
    MORALIS_API_KEY: string;
    PORT: number;
    DATABASE_URI: string;
    CLOUD_PATH: string;
    MASTER_KEY: string;
    APPLICATION_ID: string;
    SERVER_URL: string;
    REDIS_CONNECTION_STRING: string;
    RATE_LIMIT_TTL: number;
    RATE_LIMIT_AUTHENTICATED: number;
    RATE_LIMIT_ANONYMOUS: number;
    USE_STREAMS: boolean;
    STREAMS_WEBHOOK_URL: string;
} & import("envalid").CleanedEnvAccessors>;
export default _default;
