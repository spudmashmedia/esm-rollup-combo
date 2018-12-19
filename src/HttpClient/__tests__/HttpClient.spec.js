import HttpClient from "../lib/HttpClient.js";
import axios from "axios";
import moxios from "moxios";
import sinon from "sinon";

import { MockLogger } from "../../Logger";
import { expect } from "chai";
import { equal } from "assert";

describe("HttpClient", () => {

    beforeEach(() =>{
        moxios.install();
    });
    afterEach(() => {
        moxios.uninstall();
    })

    const host = "https://fake.com";
    const mock_logger = new MockLogger({name: "mock-log"});

    const sut = new HttpClient(host, mock_logger);

    describe("Get", () => {
        const mock_response = {
            "results": [{
                "gender": "female",
                "name": {
                    "title": "miss",
                    "first": "alina",
                    "last": "weyers"
                },
                "location": {
                    "street": "amselweg 96",
                    "city": "schongau",
                    "state": "hessen",
                    "postcode": 20022,
                    "coordinates": {
                        "latitude": "-44.0080",
                        "longitude": "-171.0160"
                    },
                    "timezone": {
                        "offset": "-3:00",
                        "description": "Brazil, Buenos Aires, Georgetown"
                    }
                },
                "email": "alina.weyers@example.com",
                "login": {
                    "uuid": "f2530c61-dd1b-44cf-b32e-be3582a38d55",
                    "username": "blackwolf720",
                    "password": "chrisbln",
                    "salt": "3ZhUsW7D",
                    "md5": "9389e472b1d3e4fd409a045d42579a09",
                    "sha1": "ec1a7f82bb0b68c14f654556aa56a10240a3b93c",
                    "sha256": "d0c737be99e90abbe77447659f3645078e875c456d2d8523309b191524bd587a"
                },
                "dob": {
                    "date": "1991-01-23T16:02:37Z",
                    "age": 27
                },
                "registered": {
                    "date": "2005-06-19T05:34:06Z",
                    "age": 13
                },
                "phone": "0516-2583313",
                "cell": "0174-5477347",
                "id": {
                    "name": "",
                    "value": null
                },
                "picture": {
                    "large": "https://randomuser.me/api/portraits/women/35.jpg",
                    "medium": "https://randomuser.me/api/portraits/med/women/35.jpg",
                    "thumbnail": "https://randomuser.me/api/portraits/thumb/women/35.jpg"
                },
                "nat": "DE"
            }],
            "info": {
                "seed": "458dfeb76daa2baa",
                "results": 1,
                "page": 1,
                "version": "1.2"
            }
        };
        
        moxios.stubRequest(/api/, {
            status: 200,
            responseText: mock_response
        });

        it("should return some stuff", () => {
            let onFullfiled = sinon.spy();

            sut.Get('/api/')
            .then(onFullfiled);
            
            moxios.wait(() => {
                equal(onFullfiled.getCall(0).args[0].data).to.eq(mock_response);
            });            
        });
    });
});