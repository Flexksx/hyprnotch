enum LogLevel {
  DEBUG = 1,
  INFO = 2,
  ERROR = 3,
  WARN = 4,
}

export default class Logger {
  private loggingClassName: string;
  private static readonly DEFAULT_LOG_LEVEL = LogLevel.DEBUG;
  private static readonly MAX_CLASS_NAME_LENGTH = 20;

  private logLevel: LogLevel = Logger.DEFAULT_LOG_LEVEL;

  constructor(
    loggingClassName: string,
    logLevel: LogLevel = Logger.DEFAULT_LOG_LEVEL
  ) {
    this.loggingClassName = loggingClassName;
    this.logLevel = logLevel;
  }

  debug(message: string, ...args: any[]) {
    this.printWithLevel(LogLevel.DEBUG, message, ...args);
  }
  info(message: string, ...args: any[]) {
    this.printWithLevel(LogLevel.INFO, message, ...args);
  }
  warn(message: string, ...args: any[]) {
    this.printWithLevel(LogLevel.WARN, message, ...args);
  }
  error(message: string, ...args: any[]) {
    this.printWithLevel(LogLevel.ERROR, message, ...args);
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.logLevel;
  }

  private printWithLevel(level: LogLevel, message: string, ...args: any[]) {
    if (!this.shouldLog(level)) return;

    const levelString = LogLevel[level].toUpperCase();

    const max = Logger.MAX_CLASS_NAME_LENGTH;
    let name = this.loggingClassName;
    if (name.length > max) {
      name = name.slice(0, max);
    } else {
      name = name.padEnd(max, " ");
    }

    const formatted = `${levelString} - ${name} - ${message}`;
    console.log(formatted, ...args);
  }
}
