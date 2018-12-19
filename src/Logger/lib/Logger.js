import bunyan from "bunyan";
import uuidv1 from "uuid/v1";
import ILogger from "./ILogger.js";

export default class Logger extends ILogger{
    constructor(options){
        super(options);

        this.logger = bunyan.createLogger({
            name: (this.name? this.name: uuidv1())
        });
    }

    async Information(msg){
        await this.logger.info(msg);
    }
}