type LogLevel = string
const LOG_LEVELS: LogLevel[] = ['TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR']

export interface Log {
    warn: (...args: any[]) => void;
    trace: (...args: any[]) => void;
    debug: (...args: any[]) => void;
    error: (...args: any[]) => void;
    info: (...args: any[]) => void
}

export const Logger = (logSource: string) => {
    const ACTIVE_LEVEL = LOG_LEVELS.indexOf(process.env?.LOGLEVEL?.toUpperCase() || 'INFO')

    const formatDateTime = () => new Intl.DateTimeFormat('en-GB', {
        dateStyle: 'short', timeStyle: 'long', timeZone: 'UTC',
    }).format(new Date())

    function writeLog(source: string, level: LogLevel, ...args: any[]) {
        if (LOG_LEVELS.indexOf(level) >= ACTIVE_LEVEL) {
            const argumentsAsStrings = Array.from(args).map(arg => (typeof arg) === "object" ? JSON.stringify(arg):arg);

            console.log(`[${source}] - [${level}] - ${formatDateTime()} - ${argumentsAsStrings.join(' - ')}`)
        }
    }

    function getLoggerFor(level: LogLevel) {
        return (...args: any[]) => writeLog(logSource, level, ...args)
    }

    return {
        trace: getLoggerFor(LOG_LEVELS[0]),
        debug: getLoggerFor(LOG_LEVELS[1]),
        info: getLoggerFor(LOG_LEVELS[2]),
        warn: getLoggerFor(LOG_LEVELS[3]),
        error: getLoggerFor(LOG_LEVELS[4])

    }
}
