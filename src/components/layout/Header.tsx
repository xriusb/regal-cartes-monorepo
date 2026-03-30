import logo from "../../assets/logo.svg";

export function Header() {
    return (
        <header>
            <div className="flex justify-center">
                <img src={logo} className="h-32 w-auto sm:h-48 md:h-64 lg:h-80 xl:h-96" alt="Regal de Cartes Logo" />
            </div>
        </header>
    )
}