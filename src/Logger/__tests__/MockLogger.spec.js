import MockLogger from "../lib/MockLogger.js";
import { expect } from "chai";

describe("MockLogger", () => {
    describe("Information", () => {
        const sut = new MockLogger({
            name: "mocklogger-information"
        });
        it("should be HELLO", async () => {
            await sut.Information("hello");
            const sut_logs = await sut.GetLogs();

            expect(sut_logs.length).to.gt(0);
            expect(sut_logs[0].toUpperCase()).to.eq("HELLO");
        });
    });
});
