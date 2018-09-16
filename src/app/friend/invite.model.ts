export interface Invite {
    id: string;
    name: string;
    email: string;
    message: string;
    dateSent: Date;
    dateResponse: Date;
    connected: boolean;
}