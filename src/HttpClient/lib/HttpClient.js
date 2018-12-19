import IHttpClient from "./IHttpClient";
import axios from "axios";

/**
 * Class: HttpClient - remember to pass it a baseUrl and a logger
 */
export default class HttpClient extends IHttpClient {
    constructor(baseUrl, logger) {
        super(baseUrl, logger);
        
        this.client = axios.create({baseURL: this.baseUrl});
    }

    /**
     * HTTP GET
     * @param {*} route 
     * @param {*} options 
     */
    async Get(route, options) {
        await this.logger.Information("HttpClient::Get");
        let result = {};

        try {
            let uri = route;
            // got parameters?
            if (options && options.queryParams) {
                uri += ('?' + this.GetQueryString(options.queryParams));
            }
            await this.logger.Information(`MockHttpClient::Get - fetching: ${uri}`)
            const res = await this.client.get(uri);
            result.data = res.data;
        } catch (err) {
            result.error = err;
        }

        return result;
    }

    /**
     * HTTP POST
     * @param {*} route 
     * @param {*} options 
     */
    async Post(route, options) {
        await this.logger.Information("HttpClient::Post");
        let result = {};

        try {
            let uri = route;

            // got parameters?
            if (options && options.queryParams) {
                uri += ('?' + this.GetQueryString(options.queryParams));
            }

            await this.logger.Information(`MockHttpClient::Get - posting to: ${uri}`)
            const res = await this.client.post(uri, {
                headers: options.headers,
                data: options.data
            });

            result.data = res.data;
        } catch (err) {
            result.error = err;
        }

        return result;
    }
}