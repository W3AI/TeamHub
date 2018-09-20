export interface Update {
  id: number;
  name: string;     
  state: string;
  message: string;  
  duration?: number;
  cost?: number;
  date?: Date;
}