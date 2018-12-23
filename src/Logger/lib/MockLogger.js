import ILogger from "./ILogger.js";

export default class MockLogger extends ILogger {
    constructor(options) {
        super(options);
        this.logs = [];
    }

    async Information(msg) {
        await this.logs.push(msg);
    }

    async GetLogs() {
        return await this.logs;
    }
}
