export interface Relation {
    id: string;
    name: string;
    email?: string;
    projects?: string;
    services?: string;
    tags?: string;       // Interests
    privacy: 'private' | 'family' | 'friends' | 'edu' | 'business' | 'public';
    description?: string;
    url?: string;
    invited?: boolean;  // Invitation to connect
}