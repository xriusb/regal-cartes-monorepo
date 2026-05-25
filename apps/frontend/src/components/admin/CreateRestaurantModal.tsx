import { useState } from 'react';

interface CreateRestaurantModalProps {
    onClose: () => void;
}

export function CreateRestaurantModal({ onClose }: CreateRestaurantModalProps) {
    const [restaurantName, setRestaurantName] = useState('');
    const [contestantName, setContestantName] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/contestants/${contestantName}/scorings`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ restaurantName }),
                }
            );
            if (response.status === 201) {
                setSuccess(true);
            } else {
                setError('Error en crear el restaurant. Torna-ho a intentar.');
            }
        } catch {
            setError('Error de connexió. Torna-ho a intentar.');
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="flex flex-col gap-6 px-10 py-10 bg-[#1a1a1a] border border-[#eab94e]/50 w-full max-w-sm mx-4">
                {success ? (
                    <>
                        <p className="font-[Bebas_Neue] text-[#eab94e] text-3xl tracking-widest text-center">
                            Restaurant creat!
                        </p>
                        <button
                            type="button"
                            onClick={onClose}
                            className="font-[Bebas_Neue] py-3 bg-[#eab94e] text-[#1a1a1a] tracking-widest text-xl cursor-pointer"
                        >
                            Acceptar
                        </button>
                    </>
                ) : (
                    <>
                        <h2 className="font-[Bebas_Neue] text-[#eab94e] text-2xl tracking-widest text-center">
                            Crear Restaurant
                        </h2>
                        <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="restaurantName" className="text-[#eab94e] text-sm tracking-widest uppercase">
                                    Nom del restaurant
                                </label>
                                <input
                                    id="restaurantName"
                                    type="text"
                                    value={restaurantName}
                                    onChange={e => setRestaurantName(e.target.value)}
                                    required
                                    className="bg-transparent border border-[#eab94e]/50 text-white px-4 py-2 focus:outline-none focus:border-[#eab94e] w-full"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="contestantName" className="text-[#eab94e] text-sm tracking-widest uppercase">
                                    Concursant
                                </label>
                                <input
                                    id="contestantName"
                                    type="text"
                                    value={contestantName}
                                    onChange={e => setContestantName(e.target.value)}
                                    required
                                    className="bg-transparent border border-[#eab94e]/50 text-white px-4 py-2 focus:outline-none focus:border-[#eab94e] w-full"
                                />
                            </div>
                            {error && (
                                <p className="text-red-400 text-sm">{error}</p>
                            )}
                            <button
                                type="submit"
                                className="font-[Bebas_Neue] py-3 bg-[#eab94e] text-[#1a1a1a] tracking-widest text-xl cursor-pointer mt-2"
                            >
                                Crear
                            </button>
                            <button
                                type="button"
                                className="font-[Bebas_Neue] py-3 bg-[#eab94e] text-[#1a1a1a] tracking-widest text-xl cursor-pointer mt-2"
                                onClick={onClose}
                            >
                                Cançel·lar
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
