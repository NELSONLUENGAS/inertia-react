import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
    status: {
        message: string;
        type?: 'success' | 'error' | 'info' | 'warning';
    };
    translations: Record<string, string>;
    chirps: Chirp[];
};

export type User = {
    id: number;
    name: string;
};

export type Chirp = {
    id: number;
    content: string;
    user: User;
    created_at: string;
    updated_at: string;
    edited: boolean;
};

export type ChirpCardProps = {
    chirp: Chirp;
};

export type ChirpFormProps = {
    chirp?: Chirp;
    isEditting?: boolean;
    setEditting?: (isEditting: boolean) => void;
};

export interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

export type Credentials = {
    email: string;
    password: string;
};

export type HandleSubmit = (event: React.FormEvent<HTMLFormElement>) => void;

export type HandleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
) => void;

export type HandleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
) => void;
