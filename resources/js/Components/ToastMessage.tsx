import { useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

interface ToastMessageProps {
    message: string;
    type?: 'success' | 'error' | 'info' | 'warning';
}

const ToastMessage: React.FC<ToastMessageProps> = ({
    message,
    type = 'info',
}) => {
    const SwalManager = useRef(withReactContent(Swal));

    useEffect(() => {
        SwalManager.current.fire({
            toast: true,
            position: 'top-end',
            icon: type,
            title: message,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            customClass: {
                // popup: 'swal2-toast',
                // popup: 'swal2-toast', // Personaliza el contenedor
                // title: 'my-custom-title', // Personaliza el título
                // content: 'my-custom-content', // Personaliza el contenido
                // icon: 'my-custom-icon', // Personaliza el icono
                // confirmButton: 'my-custom-confirm-button', // Personaliza el botón de confirmación
                // actions: 'my-custom-actions', // Personaliza las acciones
            },
        });
    }, [type, message]);

    return null;
};

export default ToastMessage;
