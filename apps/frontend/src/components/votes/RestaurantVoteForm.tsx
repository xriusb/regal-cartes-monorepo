import { useState } from 'react';

interface VoteScores {
    espai: number | null;
    menjar: number | null;
    servei: number | null;
    preu: number | null;
}

interface RestaurantVoteFormProps {
    scoringId: string;
    restaurantName: string;
    initialScores?: VoteScores;
    onSubmit?: (scores: VoteScores) => void;
}

interface ScoreFields {
    espai: string;
    menjar: string;
    servei: string;
    preu: string;
}

const EMPTY_SCORES: ScoreFields = { espai: '', menjar: '', servei: '', preu: '' };

const SCORE_FIELDS: { key: keyof ScoreFields; label: string }[] = [
    { key: 'espai',  label: 'Espai'  },
    { key: 'menjar', label: 'Menjar' },
    { key: 'servei', label: 'Servei' },
    { key: 'preu',   label: 'Preu'   },
];

export function RestaurantVoteForm({ scoringId, restaurantName, initialScores, onSubmit }: RestaurantVoteFormProps) {
    const [scores, setScores] = useState<ScoreFields>(
        initialScores
            ? {
                espai:   initialScores.espai   != null ? String(initialScores.espai)   : '',
                menjar:  initialScores.menjar  != null ? String(initialScores.menjar)  : '',
                servei:  initialScores.servei  != null ? String(initialScores.servei)  : '',
                preu:    initialScores.preu    != null ? String(initialScores.preu)    : '',
              }
            : EMPTY_SCORES
    );
    const [errors, setErrors] = useState<Partial<ScoreFields>>({});
    const [showSuccess, setShowSuccess] = useState(false);

    function handleChange(field: keyof ScoreFields, value: string) {
        setScores(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: undefined }));
    }

    function validate(fields: ScoreFields): Partial<ScoreFields> {
        const newErrors: Partial<ScoreFields> = {};
        for (const { key } of SCORE_FIELDS) {
            const raw = fields[key].trim();
            if (raw === '') {
                newErrors[key] = 'Requerit';
                continue;
            }
            const n = Number(raw);
            if (!Number.isInteger(n) || n < 0 || n > 10) {
                newErrors[key] = '0 – 10';
            }
        }
        return newErrors;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const newErrors = validate(scores);
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        const result: VoteScores = {
            espai:  Number(scores.espai),
            menjar: Number(scores.menjar),
            servei: Number(scores.servei),
            preu:   Number(scores.preu),
        };
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/scorings/${scoringId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ place: result.espai, food: result.menjar, service: result.servei, price: result.preu }),
        });
        if (response.ok) setShowSuccess(true);
        if (onSubmit) onSubmit(result);
    }

    function handleReset() {
        setScores(EMPTY_SCORES);
        setErrors({});
    }

    return (
        <>
        {showSuccess && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
                <div className="flex flex-col items-center gap-6 px-10 py-10 bg-[#1a1a1a] border border-[#eab94e]/50">
                    <p className="font-[Bebas_Neue] text-[#eab94e] text-3xl tracking-widest text-center">
                        Puntuacions enviades!
                    </p>
                    <button
                        type="button"
                        onClick={() => setShowSuccess(false)}
                        className="font-[Bebas_Neue] px-10 py-3 bg-[#eab94e] text-[#1a1a1a] tracking-widest text-xl cursor-pointer"
                    >
                        Acceptar
                    </button>
                </div>
            </div>
        )}
        <div className="w-full max-w-sm mx-auto flex flex-col gap-6 px-8 py-10 bg-[#2a2a2a]">
            <h2 className="font-[Bebas_Neue] text-[#eab94e] text-4xl text-center tracking-widest">
                {restaurantName}
            </h2>
            <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-4">
                {SCORE_FIELDS.map(({ key, label }) => (
                    <div key={key}>
                        <div className="flex items-center justify-between gap-4">
                            <label htmlFor={key} className="text-[#eab94e] text-sm tracking-widest uppercase">
                                {label}
                            </label>
                            <input
                                id={key}
                                type="number"
                                min={0}
                                max={10}
                                step={1}
                                value={scores[key]}
                                onChange={e => handleChange(key, e.target.value)}
                                placeholder="0 - 10"
                                className="bg-transparent border border-[#eab94e]/50 text-white px-3 py-2 w-20 text-center focus:outline-none focus:border-[#eab94e]"
                            />
                        </div>
                        {errors[key] && (
                            <p className="text-red-400 text-xs mt-1 text-right">{errors[key]}</p>
                        )}
                    </div>
                ))}
                <div className="flex gap-4 mt-2">
                    <button
                        type="submit"
                        className="font-[Bebas_Neue] flex-1 py-3 bg-[#eab94e] text-[#1a1a1a] tracking-widest text-xl cursor-pointer"
                    >
                        Enviar
                    </button>
                    <button
                        type="button"
                        onClick={handleReset}
                        className="font-[Bebas_Neue] flex-1 py-3 border border-[#eab94e] text-[#eab94e] tracking-widest text-xl hover:bg-[#eab94e] hover:text-[#1a1a1a] transition-colors cursor-pointer"
                    >
                        Esborrar
                    </button>
                </div>
            </form>
        </div>
        </>
    );
}
