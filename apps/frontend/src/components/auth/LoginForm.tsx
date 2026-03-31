import { useState } from 'react';

const VALID_USERS: Record<string, string> = {
    'xavi': 'xavi',
    'sandra': 'sandra',
    'admin': 'admin'
};

interface LoginFormProps {
    onLoginSuccess: () => void;
}

export function LoginForm({ onLoginSuccess }: LoginFormProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const storedPassword = VALID_USERS[username];

        if (storedPassword && storedPassword === password) {
            onLoginSuccess();
        } else {
            setError('Usuari o contrasenya incorrectes');
        }
    }

    return (
        <div className="flex flex-col items-center mt-8">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm flex flex-col gap-6 px-8 py-10"
            >
                <h1 className="font-[Bebas_Neue] text-[#eab94e] text-4xl text-center tracking-widest">
                    Iniciar sessió
                </h1>

                <div className="flex flex-col gap-2">
                    <label htmlFor="username" className="text-[#eab94e] text-sm tracking-widest uppercase">
                        Concursant
                    </label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => { setUsername(e.target.value); setError(''); }}
                        className="bg-transparent border border-[#eab94e]/50 text-white px-4 py-2 w-full focus:outline-none focus:border-[#eab94e]"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="text-[#eab94e] text-sm tracking-widest uppercase">
                        Contrasenya
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); setError(''); }}
                        className="bg-transparent border border-[#eab94e]/50 text-white px-4 py-2 w-full focus:outline-none focus:border-[#eab94e]"
                    />
                </div>

                {error && (
                    <p role="alert" className="text-red-400 text-sm text-center">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    className="font-[Bebas_Neue] w-full py-3 border border-[#eab94e] text-[#eab94e] tracking-widest text-xl hover:bg-[#eab94e] hover:text-[#1a1a1a] transition-colors cursor-pointer"
                >
                    Iniciar sessió
                </button>
            </form>
        </div>
    );
}
