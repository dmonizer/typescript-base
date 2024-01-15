import {BasePlugin} from "./model/BasePlugin";
import {CanLoad} from "./model/PluginInterfaces";
import {Logger} from "./utilities/logger";

const log = Logger("FirstPlugin");
export class FirstPlugin extends BasePlugin implements CanLoad {
    constructor() {
        log.debug("FirstPlugin constructor")
        super("FirstPlugin")
    }
    public async load(url: string) {
        log.debug(`FirstPlugin load() called with url: ${url}`)
        return await fetch(url).then(response => response.json())
    }
}
