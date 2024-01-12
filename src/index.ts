import {PluginsConfig, PluginManager} from "./PluginManager";
import * as process from "process";




const workingDir = __dirname
const pluginConfig: PluginsConfig = { pluginNames : ['MyPlugin']}
const pluginManager = new PluginManager(pluginConfig)

// console.log(await plugin.load("https://jsonplaceholder.typicode.com/todos/1"))
