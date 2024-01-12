import {PluginManager} from "./PluginManager";

export class YahaPlugin {
    protected name: string = "";
    public register(parent : PluginManager){
        console.log(`Registering ${this.name} for ${parent.name}`)
    }
}
