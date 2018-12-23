/**
 * IHttpClient
 */
export default class IHttpClient {
    constructor(baseUrl, logger) {
        if (!baseUrl) {
            throw new Error("IHttpClient->baseUrl is null");
        }
        this.baseUrl = baseUrl;

        if (!logger) {
            throw new Error("IHttpClient->logger is null");
        }
        this.logger = logger;
    }

    /**
     * Utility to generate a querystring (does not include '?' character)
     * @param {*} params
     */
    GetQueryString(params) {
        if (!params) return null;

        return Object.keys(params)
            .map(q => `${q}=${params[q]}`)
            .join("&");
    }

    /**
     * ATT: OVERRIDE THIS FUNCTION
     * @param {*} route
     * @param {*} options
     */
    async Get(route, options) {
        console.log(route, options);
        throw new Error("Get Not implemented");
    }

    /**
     * ATT: OVERRIDE THIS FUNCTION
     * @param {*} route
     * @param {*} options
     */
    async Post(route, options) {
        console.log(route, options);
        throw new Error("Post Not implemented");
    }
}
