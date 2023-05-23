
enum LogLevel {
  Error = '\x1b[31mError\x1b[0m',
  Warning = '\x1b[33mWarning\x1b[0m',
  Info = '\x1b[32mInfo\x1b[0m',
}

class Logger {
  private static instance: Logger;

  private constructor() {
    // Private constructor to prevent external instantiation
  }

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  log(level: LogLevel, message: string): void {
    const logEntry = this.formatLogEntry(level, message);
    this.writeToLog(logEntry);
  }

  private formatLogEntry(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}]: ${message}`;
  }

  private writeToLog(logEntry: string): void {
    // TODO: send the logger to kibaba or other logging system
    console.log(logEntry);
  }

  error(message: string): void {
    this.log(LogLevel.Error, message);
  }

  warning(message: string): void {
    this.log(LogLevel.Warning, message);
  }

  info(message: string): void {
    this.log(LogLevel.Info, message);
  }
}



export default Logger;
// logger.error('An error occurred.');
// logger.warning('A warning message.');
// logger.info('An informational message.');
