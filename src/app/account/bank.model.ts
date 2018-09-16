export interface Bank {
    id: string;
    name: string;   
    rpDisplayName: string;      // ToDo - Check these conenctions to user
    displayName: string;
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