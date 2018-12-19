import axios from "axios";
import {
    RandomuserService
} from "./RandomuserService";
import {
    HttpClient
} from "./HttpClient";
import {
    Logger
} from "./Logger";
import uuidv1 from "uuid/v1";

export default class AppContainer {
    async Run(procId) {
        const logger = new Logger({
            name: "esm-test"
        });

        logger.Information(`<<< START PROCESS - pid: [${procId}] >>>`);

        const client = new HttpClient("https://randomuser.me", logger);
        const userService = new RandomuserService(client, logger); //can mock out client
        const response = await userService.GetUsers("female", "13", uuidv1());
        const user = response.results[0];
        logger.Information(`Live Response: ${user.name.first} ${user.name.last}\n\n`);

        logger.Information(`<<< END PROCESS - pid: [${procId}] >>>\n\n`);
    }
}