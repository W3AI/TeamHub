import { Update } from "./update.model";

export class LoggerService {
  updates: Update[] = []; 

  getLog() {
    return this.updates.slice();
  }
  
}