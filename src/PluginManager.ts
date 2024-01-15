import process from "process";
import {BasePlugin} from "./model/BasePlugin";
import {PluginsConfig} from "./model/PluginInterfaces";
import {Logger} from "./utilities/logger";

const log = Logger("PluginManager")

export class PluginManager {
    public name: string = "PluginManager"
    private config: PluginsConfig;
    private detectedEnv: { ext: string; isTsNode: boolean; codePath: string; isTypescript: boolean };
    private _loadedPlugins: BasePlugin[] = new Array<BasePlugin>();
    private initialized: boolean = false
    private initializing: boolean = false

    public constructor(config: PluginsConfig) {
        this.config = config;
        this.detectedEnv = this.detectEnvironment();
        this.initialize()
    }

    loadedPlugins(): Promise<BasePlugin[]> {
        return new Promise((resolve, reject) => {
            const sleep = () => {
                if (!this.initialized) {
                    log.trace("not yet initialized, sleeping some");
                    setTimeout(sleep, 10)
                } else {
                    log.trace("initialized, resolving");
                    return resolve(this._loadedPlugins)
                }
            }
            sleep()
        })
    }

    private async initialize() {
        this.initializing = true;
        log.info(`${this.name} intializing`)
        log.debug("Using plugins configuration ", this.config)
        this._loadedPlugins = await this.loadPlugins(this.config.pluginNames);
        this.initialized = true;
        this.initializing = false;
    }

    private async loadPlugins(plugins: string[]): Promise<BasePlugin[]> {
        const loadedPlugins = new Array<BasePlugin>();
        log.debug("Working in: ", process.cwd())
        for (let pluginName of plugins) {
            log.info(`Loading plugin ${pluginName} ...`)
            loadedPlugins.push(await this.loadSinglePlugin(pluginName))
        }
        return loadedPlugins
    }

    private async loadSinglePlugin(pluginName: string): Promise<BasePlugin> {
        log.trace(`Loading plugin ${pluginName}`)
        const expandedPlugin = this.expandPluginName(pluginName)
        log.trace(`Expanded plugin: ${expandedPlugin}`)
        const importedPlugin = (await import(expandedPlugin).then((loaded) => {
            log.trace(`Loaded: ${loaded}`)
                return loaded[pluginName]}))

        return new importedPlugin(expandedPlugin)
    }

    private expandPluginName(plugin: string): string {
        return process.cwd() + this.detectedEnv.codePath + plugin + this.detectedEnv.ext
    }

    private async registerPlugins(loadedPlugins: BasePlugin[]) {
        loadedPlugins.map((plugin) => plugin.register())
    }

    private detectEnvironment() {
        return {
            // @ts-ignore
            isTsNode: process[Symbol.for("ts-node.register.instance")]!=null,
            isTypescript: __filename.indexOf('.ts')===__filename.length - 3,
            // @ts-ignore
            ext: this.isTypescript ? '.ts':'.js',
            // @ts-ignore
            codePath: this.isTypescript ? (this.isTsNode ? '/':"/"):'/dist/'
        }
    }
}
