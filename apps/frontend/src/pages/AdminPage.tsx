import { useState } from 'react';
import { Header } from '../components/layout/Header.tsx';
import { CreateRestaurantModal } from '../components/admin/CreateRestaurantModal.tsx';

interface AdminPageProps {
    onLogout: () => void;
}

export function AdminPage({ onLogout }: AdminPageProps) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <Header />
            <div className="flex flex-col items-center gap-8 pt-4 pb-12">
                <h1 className="font-[Bebas_Neue] text-[#eab94e] text-5xl tracking-widest">
                    Panel d'admin
                </h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="font-[Bebas_Neue] px-8 py-3 bg-[#eab94e] text-[#1a1a1a] tracking-widest text-xl cursor-pointer"
                >
                    Crear Restaurant
                </button>
                <button
                    onClick={onLogout}
                    className="font-[Bebas_Neue] px-8 py-3 border border-[#eab94e] text-[#eab94e] tracking-widest text-xl hover:bg-[#eab94e] hover:text-[#1a1a1a] transition-colors cursor-pointer"
                >
                    Tancar sessió
                </button>
            </div>
            {showModal && (
                <CreateRestaurantModal onClose={() => setShowModal(false)} />
            )}
        </>
    );
}
