export interface Group {
    id: string;
    name: string;       
    accountNo?: number;
    balance?: number;
    email?: string;
    userId?: string;
    passHint?: string;
    currency?: string;
    openDate?: Date;
    lastDate?: Date;
    state?: 'opened' | 'activated' | 'cancelled' | null;
}