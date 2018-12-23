import uuidv1 from "uuid/v1";

export default class ILogger {
    constructor(options) {
        this.name = options.name ? options.name : uuidv1();
    }

    async Information(msg) {
        console.log(msg);
        throw new Error("Not Implemented");
    }
    async Warning(msg) {
        console.log(msg);
        throw new Error("Not Implemented");
    }
    async Error(msg) {
        console.log(msg);
        throw new Error("Not Implemented");
    }
    async Fatal(msg) {
        console.log(msg);
        throw new Error("Not Implemented");
    }
}
