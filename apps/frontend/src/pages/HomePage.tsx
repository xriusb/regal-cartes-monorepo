import { useEffect, useState } from 'react';
import { RestaurantVoteForm } from '../components/votes/RestaurantVoteForm.tsx';

interface ScoringDTO {
    id: string;
    restaurantName: string;
    contestant: string;
    place: number;
    food: number;
    service: number;
    price: number;
}

interface HomePageProps {
    contestant: string;
    onLogout: () => void;
}

export function HomePage({ contestant, onLogout }: HomePageProps) {
    const [scorings, setScorings] = useState<ScoringDTO[]>([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/contestants/${contestant}/scorings`)
            .then(res => res.json())
            .then(data => setScorings(data));
    }, [contestant]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-8 py-12">
            <h1 className="font-[Bebas_Neue] text-[#eab94e] text-5xl tracking-widest">
                Benvingut/da!
            </h1>
            {scorings.map(s => (
                <RestaurantVoteForm
                    key={s.id}
                    scoringId={s.id}
                    restaurantName={s.restaurantName}
                    initialScores={{ espai: s.place, menjar: s.food, servei: s.service, preu: s.price }}
                />
            ))}
            <button
                onClick={onLogout}
                className="font-[Bebas_Neue] px-8 py-3 border border-[#eab94e] text-[#eab94e] tracking-widest text-xl hover:bg-[#eab94e] hover:text-[#1a1a1a] transition-colors cursor-pointer"
            >
                Tancar sessió
            </button>
        </div>
    );
}
