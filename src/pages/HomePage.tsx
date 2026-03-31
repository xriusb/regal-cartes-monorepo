import { RestaurantVoteForm } from '../components/votes/RestaurantVoteForm.tsx';

interface HomePageProps {
    onLogout: () => void;
}

export function HomePage({ onLogout }: HomePageProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-8 py-12">
            <h1 className="font-[Bebas_Neue] text-[#eab94e] text-5xl tracking-widest">
                Benvingut/da!
            </h1>
            <RestaurantVoteForm restaurantName="La Sosenga" />
            <RestaurantVoteForm restaurantName="Atipical" />
            <button
                onClick={onLogout}
                className="font-[Bebas_Neue] px-8 py-3 border border-[#eab94e] text-[#eab94e] tracking-widest text-xl hover:bg-[#eab94e] hover:text-[#1a1a1a] transition-colors cursor-pointer"
            >
                Tancar sessió
            </button>
        </div>
    );
}
