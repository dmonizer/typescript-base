import {config} from "dotenv";
config()
import {PluginManager} from "./PluginManager";
import {CanLoad, isCanLoad, isRunnable, PluginsConfig} from "./model/PluginInterfaces";
import {Logger} from "./utilities/logger";



const log = Logger("Main")


const workingDir = __dirname
const pluginConfig: PluginsConfig = {pluginNames: ['FirstPlugin', 'SecondPlugin']}
const pluginManager = new PluginManager(pluginConfig)
log.debug("PluginManager loaded")
pluginManager.loadedPlugins().then(plugins=> plugins.map(async p => {
    if (isCanLoad(p)) {
        console.log(await (p as CanLoad).load("https://jsonplaceholder.typicode.com/todos/1"))
    } else if (isRunnable(p)) {
        p.run().then((res=>log.debug("Plugin.run() finished with result: ",res)))
    }
}))

function startServer() {
    setInterval(() => true, 200)
}

startServer()
