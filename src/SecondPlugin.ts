import {BasePlugin} from "./model/BasePlugin";
import {Runnable} from "./model/PluginInterfaces";
import {Logger} from "./utilities/logger";

const log = Logger("SecondPlugin");
export class SecondPlugin extends BasePlugin implements Runnable {
    constructor() {
        log.debug("SecondPlugin constructor")
        super("SecondPlugin")
    }
    public run():Promise<any> {
        log.info("running happily ever after")
        return new Promise((resolve, reject) => {resolve(this)})
    }
}
