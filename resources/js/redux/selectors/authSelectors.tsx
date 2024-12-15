import { AuthState } from '@/types';
import { RootState } from '../store';

export const selectAuthState = (state: RootState): AuthState => state.auth;
export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectAuthIsLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;
