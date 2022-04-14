export class Logger {
  
  private logs: Map<number, String>;
  
  private static instance : Logger | null = null;
  
  private constructor() {
    this.logs = new Map<number, String>();
  }
  
  public static getInstance() : Logger{
    if(this.instance===null)
    {
      this.instance = new Logger();
    }
    return this.instance;
  }

  public addLog(log: String) {
    this.logs.set(this.logs.size,log);
  }

  public getLogs(): String[] {
    return Array.from(this.logs.values());
  }
}
