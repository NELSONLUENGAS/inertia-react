import { ChirpCardProps } from '@/types';
import { faCaretDown, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm, usePage } from '@inertiajs/react';
import { Fragment, useState } from 'react';
import ChirpForm from './ChirpForm';
import ConfirmModal from './ConfirmModal';
import Dropdown from './Dropdown';

const ChirpCard: React.FC<ChirpCardProps> = ({ chirp }) => {
    const [editting, setEditting] = useState(false);
    const [showOnDelete, setShowOnDelete] = useState(false);

    const { delete: deleteChirp } = useForm();

    const onDelete = () => setShowOnDelete(true);
    const onConfirm = () => {
        deleteChirp(route('chirps.destroy', chirp.id));
        setShowOnDelete(false);
    };
    const onCancel = () => {
        setShowOnDelete(false);
    };

    const {
        props: {
            auth: { user },
        },
    } = usePage();

    return (
        <div className="flex items-start rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-lg dark:border-gray-700 dark:bg-gray-700">
            {showOnDelete && (
                <ConfirmModal
                    message={'This action cannot be undone'}
                    onCancel={onCancel}
                    onConfirm={onConfirm}
                />
            )}
            <div className="mr-4">
                <FontAwesomeIcon
                    icon={faUserCircle}
                    className="text-4xl text-gray-500 dark:text-gray-300"
                />
            </div>
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {chirp.user.name}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {chirp.created_at}
                    </p>
                </div>
                {editting ? (
                    <ChirpForm
                        chirp={chirp}
                        isEditting={editting}
                        setEditting={setEditting}
                    />
                ) : (
                    <Fragment>
                        <p className="mt-3 text-gray-800 dark:text-gray-200">
                            {chirp.content}
                        </p>
                        {chirp.edited && (
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                <i>Edited at {chirp.updated_at}</i>
                            </p>
                        )}
                    </Fragment>
                )}
            </div>
            {chirp.user.id == user.id && (
                <Dropdown>
                    <Dropdown.Trigger>
                        <FontAwesomeIcon
                            icon={faCaretDown}
                            className="px-3 text-lg text-gray-500 dark:text-gray-300"
                        />
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                        <Dropdown.Button onClick={() => setEditting(true)}>
                            Edit
                        </Dropdown.Button>
                        <Dropdown.Button onClick={onDelete}>
                            Delete
                        </Dropdown.Button>
                    </Dropdown.Content>
                </Dropdown>
            )}
        </div>
    );
};

export default ChirpCard;
