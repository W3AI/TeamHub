export interface Card {
    id: string;
    name: string;  
    bank: string; 
    type?: 'credit' | 'debit' | null; 
    accountNo?: number;
    address?: string;   
    validThru?: Date; 
    balance?: number;
    email?: string;
    userId?: string;
    passHint?: string;
    currency?: string;
    openDate?: Date;
    lastDate?: Date;
    state?: 'opened' | 'activated' | 'cancelled' | null;
}