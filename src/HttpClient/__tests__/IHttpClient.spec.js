import IHttpClient from "../lib/IHttpClient.js";
import { MockLogger } from "../../Logger";
import { expect } from "chai";

describe("IHttpClient", () => {
    describe("constructor", () => {
        it("should throw an exception when baseUrl is null", () => {
            const sut = () => new IHttpClient(null, null);
            expect(sut).throw("IHttpClient->baseUrl is null");
        });

        it("should throw an exception when logger is null", () => {
            const sut = () => new IHttpClient("http://somehost.com", null);
            expect(sut).throw("IHttpClient->logger is null");
        });
    });

    describe("GetQueryString", () => {
        const mock_logger = new MockLogger({
            name: "mocklogger"
        });
        const sut = new IHttpClient("http://someurl.com", mock_logger);

        it("should return null when parameters is null", () => {
            const res = sut.GetQueryString(null);
            expect(res).to.be.null;
        });

        it("should return a=1&b=2 when parameters are a:1 and b:2", () => {
            const mock_options = {
                a: 1,
                b: 2
            };

            const res = sut.GetQueryString(mock_options);
            expect(res).to.eq("a=1&b=2");
        });
    });

    describe("Get", () => {
        const mock_logger = new MockLogger({
            name: "mocklogger"
        });
        const sut = new IHttpClient("http://someurl.com", mock_logger);

        it("should throw an exception as not implemented", async () => {
            try {
                await sut.Get("/");
            } catch (err) {
                expect(err).to.be.a("Error");
                expect(err.message).to.deep.eq("Get Not implemented");
            }
        });
    });

    describe("Post", () => {
        const mock_logger = new MockLogger({
            name: "mocklogger"
        });
        const sut = new IHttpClient("http://someurl.com", mock_logger);

        it("should throw an exception as not implemented", async () => {
            try {
                await sut.Post("/");
            } catch (err) {
                expect(err).to.be.a("Error");
                expect(err.message).to.deep.eq("Post Not implemented");
            }
        });
    });
});
