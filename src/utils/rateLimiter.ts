export class RateLimiter {
    private requests: number = 0;
    private startTime: number = Date.now();
  
    async acquire(): Promise<void> {
      const now = Date.now();
      if (now - this.startTime > 60 * 1000) {
        this.startTime = now;
        this.requests = 0;
      }
  
      if (this.requests >= 50) {
        const waitTime = 60 * 1000 - (now - this.startTime);
        await new Promise(res => setTimeout(res, waitTime));
        this.startTime = Date.now();
        this.requests = 0;
      }
  
      this.requests++;
    }
  }
  