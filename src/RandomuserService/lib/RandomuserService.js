import uuidv1 from "uuid/v1";

export default class RandomuserService {
    constructor(httpClient, logger) {
        if (!httpClient) {
            throw new Error("RandomuserService::HttpClient is null");
        }
        this.client = httpClient;
        if (!logger) {
            throw new Error("RandomuserService::logger is null");
        }
        this.logger = logger;
    }

    /**
     * GetUsers
     */
    async GetUsers(gender = "male", results = "1", seed = uuidv1()) {
        const options = {
            queryParams: {
                gender: gender,
                results: results,
                seed: seed
            }
        };

        let res = {};

        try {
            await this.logger.Information(">>> RandomuserService::GetUsers...");
            res = await this.client.Get("/api/", options);

            if (res.error) {
                return res.error;
            }
            return res.data;
        } catch (err) {
            console.error(
                `Unhandled error in RandomuserService::GetUsers\n\nOptions: ${options}`
            );
            throw err;
        }
    }
}
