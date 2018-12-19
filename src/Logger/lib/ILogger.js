import uuidv1 from "uuid/v1";

export default class ILogger {
    constructor(options) {
        this.name = (options.name ? options.name : uuidv1());
    }

    async Information(msg){
        throw new Error("Not Implemented");
    }
    async Warning(msg){
        throw new Error("Not Implemented");
    }
    async Error(msg){
        throw new Error("Not Implemented");
    }
    async Fatal(msg){
        throw new Error("Not Implemented");
    }
}