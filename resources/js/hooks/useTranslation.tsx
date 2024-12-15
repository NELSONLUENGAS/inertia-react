import { usePage } from '@inertiajs/react';

/**
 * Hook para manejar traducciones.
 */
const useTranslation = () => {
    const { props } = usePage();
    const translations = props?.translations || {};

    /**
     * Función para traducir un texto basado en las claves del objeto de traducciones
     * @param key - Clave de la traducción
     * @returns Traducción encontrada o la clave original si no existe
     */
    const __ = (key: string) => {
        const trimmedText = key.replace(/\s+/g, ' ').trim();
        return translations[trimmedText] || key;
    };

    return { __ };
};

export default useTranslation;
