import {Logger} from "../utilities/logger";

const log = Logger("BasePlugin")
export class BasePlugin {
    protected name: string = "";
    constructor(name: string) { this.name = name; }
    public register(){
        log.debug(`Registering ${this.name}`)
    }
}
