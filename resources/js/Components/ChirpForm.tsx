import { ChirpFormProps, HandleSubmit, HandleTextAreaChange } from '@/types';
import { useForm } from '@inertiajs/react';
import InputError from './InputError';
import InputLabel from './InputLabel';
import SubmitButton from './SubmitButton';
import TextAreaInput from './TextAreaInput';

type FormData = {
    content: string;
};

const ChirpForm: React.FC<ChirpFormProps> = ({
    chirp,
    isEditting,
    setEditting,
}) => {
    const handleSubmit: HandleSubmit = (event) => {
        event.preventDefault();

        if (isEditting) {
            patch(route('chirps.update', chirp), {
                onSuccess: () => {
                    reset();
                    if (setEditting) setEditting(false);
                },
                preserveState: true,
            });
        } else {
            post(route('chirps.store'), {
                onSuccess: () => {
                    reset();
                },
                preserveState: true,
            });
        }
    };

    const onCancel = () => {
        if (setEditting) setEditting(false);
    };

    const handleTextAreaChange: HandleTextAreaChange = (event) => {
        const { name, value } = event.target;

        setData(name as keyof FormData, value);
        clearErrors(name as keyof FormData);
    };

    const {
        data,
        setData,
        post,
        patch,
        errors,
        processing,
        reset,
        clearErrors,
    } = useForm<FormData>({
        content: chirp?.content ?? '',
    });
    return (
        <form onSubmit={handleSubmit}>
            <InputLabel className="cursor-pointer py-3" htmlFor="content">
                Post content
            </InputLabel>
            <TextAreaInput
                id="content"
                cols={50}
                rows={10}
                name="content"
                value={data.content}
                onChange={handleTextAreaChange}
            ></TextAreaInput>
            {errors.content && <InputError message={errors.content} />}
            <div
                className={`disabled flex items-center ${isEditting ? 'justify-between' : 'justify-center'} p-2`}
            >
                <SubmitButton
                    className="disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={processing ? true : false}
                    label={
                        processing && isEditting
                            ? 'Actualizando...'
                            : processing && !isEditting
                              ? 'Enviando...'
                              : isEditting
                                ? 'Actualizar'
                                : 'Enviar'
                    }
                />
                {isEditting && (
                    <SubmitButton
                        className="rounded-md bg-blue-500 px-4 py-2 font-semibold text-white transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:opacity-50"
                        type="button"
                        onClick={onCancel}
                        label="Cancelar"
                    />
                )}
            </div>
        </form>
    );
};

export default ChirpForm;
