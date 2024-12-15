import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';

// Configuración del store
export const store = configureStore({
    reducer: {
        auth: authSlice,
    },
});

// Tipos de TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
