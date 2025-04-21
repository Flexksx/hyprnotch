enum LogLevel {
  DEBUG = "DEBUG",
  INFO = "INFO",
  ERROR = "ERROR",
  WARN = "WARN",
}

export default class Logger {
  private loggingClassName: string;
  constructor(loggingClassName: string) {
    this.loggingClassName = loggingClassName;
  }
  debug(message: string, ...args: any[]) {
    console.log(
      `[${LogLevel.DEBUG}][${this.loggingClassName}] ${message}`,
      ...args
    );
  }
  info(message: string, ...args: any[]) {
    console.log(
      `[${LogLevel.INFO}][${this.loggingClassName}] ${message}`,
      ...args
    );
  }
  error(message: string, ...args: any[]) {
    console.log(
      `[${LogLevel.ERROR}][${this.loggingClassName}] ${message}`,
      ...args
    );
  }
  warn(message: string, ...args: any[]) {
    console.log(
      `[${LogLevel.WARN}][${this.loggingClassName}] ${message}`,
      ...args
    );
  }
}
