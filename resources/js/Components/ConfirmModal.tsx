import { useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

interface ConfirmModalProps {
    message: string;
    onConfirm: () => void;
    onCancel?: () => void;
    title?: string;
    confirmText?: string;
    cancelText?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    message,
    onConfirm,
    onCancel,
    title = 'Are you sure?',
    confirmText = 'Yes',
    cancelText = 'No',
}) => {
    const SwalManager = useRef(withReactContent(Swal));

    useEffect(() => {
        SwalManager.current
            .fire({
                title,
                text: message,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: confirmText,
                cancelButtonText: cancelText,
                reverseButtons: true,
                customClass: {
                    confirmButton: 'swal2-confirm-button',
                    cancelButton: 'swal2-cancel-button',
                },
            })
            .then((result) => {
                if (result.isConfirmed) {
                    onConfirm();
                } else if (onCancel) {
                    onCancel();
                }
            });
    }, [message, title, confirmText, cancelText, onConfirm, onCancel]);

    return null;
};

export default ConfirmModal;
