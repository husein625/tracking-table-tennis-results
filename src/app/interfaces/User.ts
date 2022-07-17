export interface IUser {
    id?: number;

    gender: 0 | 1 | '0' | '1';
    first_name?: string;
    last_name?: string;
    birthday?: string;
    country?: string;
    fileSource?: string;
}