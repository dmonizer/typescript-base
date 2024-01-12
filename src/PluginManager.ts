import {MyPlugin} from "./MyPlugin";
import process from "process";

export interface PluginsConfig {
    pluginNames : string[]
}
export class PluginManager {
    private config: PluginsConfig;
    public name: string = "PluginManager"
    private detectedEnv: { ext: string; isTsNode: boolean; codePath: string; isTypescript: boolean };

    public constructor(config: PluginsConfig) {
        this.config = config;
        this.detectedEnv = this.detectEnvironment();
        this.init()
    }

    public async init(): Promise<void> {
        console.log(`${this.name} intializing`)
        return this.loadPlugins(this.config.pluginNames);
    }

    // You don't need to return anything from here because `async` functions
    // always return a `Promise`.
    private async loadPlugins(plugins: string[]): Promise<void> {
        console.log(process.cwd())
        for (let pluginName of plugins) {
            console.log(`Loading plugin ${pluginName} ...`)
            const expandedPlugin = this.expandPluginName(pluginName)
            let loaded: MyPlugin = new (await import(expandedPlugin).then((loaded)=>loaded[pluginName]))(expandedPlugin)
            loaded.register(this);
        }
    }

    private expandPluginName(plugin : string): string {
        return process.cwd() + this.detectedEnv.codePath + plugin + this.detectedEnv.ext
    }

    private detectEnvironment() {
        return {
            // @ts-ignore
            isTsNode : process[Symbol.for("ts-node.register.instance")] != null,
            isTypescript : __filename.indexOf('.ts') === __filename.length-3,
            // @ts-ignore
            ext: this.isTypescript ? '.ts' : '.js',
            // @ts-ignore
            codePath: this.isTypescript ? (this.isTsNode ? '/' : "/") : '/dist/'
        }
    }
}
