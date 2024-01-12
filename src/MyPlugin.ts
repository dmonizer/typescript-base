import {PluginManager} from "./PluginManager";
import {YahaPlugin} from "./YahaPlugin";

export class MyPlugin extends YahaPlugin{
    constructor(name: string) {
        super()
        this.name = name
    }

    public async load(url: string){
        return await fetch(url).then(response => response.json())
    }
}
