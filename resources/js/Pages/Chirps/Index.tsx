import ChirpCard from '@/Components/ChirpCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function ChripsIndex(props: PageProps) {
    const { chirps, translations } = props;
    console.log(translations);
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Chirps" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden bg-white shadow-md sm:rounded-lg dark:bg-gray-800">
                        <Link
                            href="/chirps/create"
                            className="absolute right-6 top-6 inline-block rounded-md bg-blue-500 px-6 py-2 text-sm font-medium text-white shadow transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-500"
                        >
                            Create
                        </Link>
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h1 className="mb-8 text-3xl font-bold">
                                All Chirps
                            </h1>

                            <div className="space-y-6">
                                {chirps.map((chirp, key) => (
                                    <ChirpCard
                                        key={`chirp_card_${key}`}
                                        chirp={chirp}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
