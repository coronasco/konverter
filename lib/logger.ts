type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogEntry {
  level: LogLevel
  message: string
  data?: unknown
  timestamp: Date
  context?: string
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development'
  private isClient = typeof window !== 'undefined'

  private formatMessage(level: LogLevel, message: string, data?: unknown, context?: string): string {
    const timestamp = new Date().toISOString()
    const contextStr = context ? `[${context}]` : ''
    const dataStr = data ? ` ${JSON.stringify(data, null, 2)}` : ''
    return `[${timestamp}] ${level.toUpperCase()} ${contextStr} ${message}${dataStr}`
  }

  private shouldLog(level: LogLevel): boolean {
    // În producție, afișează doar warn și error
    if (!this.isDevelopment) {
      return level === 'warn' || level === 'error'
    }
    return true
  }

  debug(message: string, data?: unknown, context?: string): void {
    if (this.shouldLog('debug')) {
      console.debug(this.formatMessage('debug', message, data, context))
    }
  }

  info(message: string, data?: unknown, context?: string): void {
    if (this.shouldLog('info')) {
      console.info(this.formatMessage('info', message, data, context))
    }
  }

  warn(message: string, data?: unknown, context?: string): void {
    if (this.shouldLog('warn')) {
      console.warn(this.formatMessage('warn', message, data, context))
    }
  }

  error(message: string, error?: Error | unknown, context?: string): void {
    if (this.shouldLog('error')) {
      const errorData = error instanceof Error 
        ? { message: error.message, stack: error.stack }
        : error
      console.error(this.formatMessage('error', message, errorData, context))
    }

    // În producție, poți trimite erorile către un serviciu de monitoring
    if (!this.isDevelopment && this.isClient) {
      this.sendToMonitoring({
        level: 'error',
        message,
        data: error,
        timestamp: new Date(),
        context,
      })
    }
  }

  private sendToMonitoring(logEntry: LogEntry): void {
    // Aici poți integra cu Sentry, LogRocket, sau alt serviciu
    // Pentru moment, salvăm în localStorage pentru debug
    try {
      const logs = JSON.parse(localStorage.getItem('app_errors') || '[]')
      logs.push(logEntry)
      // Păstrează doar ultimele 50 de erori
      if (logs.length > 50) {
        logs.splice(0, logs.length - 50)
      }
      localStorage.setItem('app_errors', JSON.stringify(logs))
    } catch {
      // Ignore localStorage errors
    }
  }

  // Metodă pentru debugging în dezvoltare
  performance<T>(operation: string, fn: () => T, context?: string): T {
    if (!this.isDevelopment) {
      return fn()
    }

    const start = performance.now()
    const result = fn()
    const duration = performance.now() - start
    
    this.debug(`Performance: ${operation}`, { duration: `${duration.toFixed(2)}ms` }, context)
    return result
  }

  // Metodă pentru măsurarea performanței async
  async performanceAsync<T>(operation: string, fn: () => Promise<T>, context?: string): Promise<T> {
    if (!this.isDevelopment) {
      return await fn()
    }

    const start = performance.now()
    try {
      const result = await fn()
      const duration = performance.now() - start
      this.debug(`Performance: ${operation}`, { duration: `${duration.toFixed(2)}ms` }, context)
      return result
    } catch (error) {
      const duration = performance.now() - start
      this.error(`Performance: ${operation} failed`, error, context)
      this.debug(`Performance: ${operation} (failed)`, { duration: `${duration.toFixed(2)}ms` }, context)
      throw error
    }
  }
}

// Singleton instance
export const logger = new Logger()

// Convenience exports pentru backward compatibility
export const log = {
  debug: (message: string, data?: unknown, context?: string) => logger.debug(message, data, context),
  info: (message: string, data?: unknown, context?: string) => logger.info(message, data, context),
  warn: (message: string, data?: unknown, context?: string) => logger.warn(message, data, context),
  error: (message: string, error?: Error | unknown, context?: string) => logger.error(message, error, context),
}
