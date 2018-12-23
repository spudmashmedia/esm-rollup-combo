import { RandomuserService } from "./RandomuserService";
import { HttpClient } from "./HttpClient";
import { Logger } from "./Logger";
import uuidv1 from "uuid/v1";
import TransactionService from "./TransactionService";

export default class AppContainer {
    constructor() {
        this.logger = new Logger({
            name: "esm-test"
        });
        this.trans = new TransactionService({
            dbFile: "tempdb.sqlite",
            logger: this.logger,
            maxLogs: 3
        });
    }

    async Run(procId) {
        this.logger.Information(`<<< START PROCESS - pid: [${procId}] >>>`);

        const client = new HttpClient("https://randomuser.me", this.logger);
        const userService = new RandomuserService(client, this.logger); //can mock out client
        const response = await userService.GetUsers("female", "13", uuidv1());
        const user = response.results[0];
        this.logger.Information(
            `Live Response: ${user.name.first} ${user.name.last}\n\n`
        );

        this.logger.Information(`<<< END PROCESS - pid: [${procId}] >>>\n\n`);

        let res = await this.trans.PutHistory("RETRIEVED", user);
        console.log(res);
        res = await this.trans.GetHistory();
        console.log(res.data.map(x => x.dataValues));
        console.log(`COUNT: ${res.data.length}`);
        return res.data.length;
    }
}
