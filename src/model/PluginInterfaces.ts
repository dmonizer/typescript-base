enum ARGUMENTS_COUNT {
    zero, one, two
}

export interface CanLoad {
    load(url: string): Promise<any>;
}

export function isCanLoad<E extends object>(obj: E): obj is E & CanLoad {
    return typeof (<CanLoad>obj).load==='function' && (<CanLoad>obj).load.length===ARGUMENTS_COUNT.one;
}

export interface Runnable {
    run(): Promise<any | void>;
}

export function isRunnable<E extends object>(obj: E): obj is E & Runnable {
    return typeof (<Runnable>obj).run==='function' && (<Runnable>obj).run.length===ARGUMENTS_COUNT.zero;
}


export interface PluginsConfig {
    pluginNames: string[]
}
