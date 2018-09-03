export interface Transaction {
    id: string;
    items: string;  // list of items, services transactioned
    amount: number;
    direction: 'received' | 'sent';
    card?: string;
    bank?: string; 
    type?: 'cash' | 'credit' | 'debit' | null; 
    accountNo?: number;
}