export interface IUser {
    id?: number;

    gender: 0 | 1 | '0' | '1';
    first_name?: string;
    last_name?: string;
    email?: string;
    birthday?: string;
    nationality: string;
    phone: string;
    country?: string;
    zip?: string;
    city?: string;
    address?: string;
}