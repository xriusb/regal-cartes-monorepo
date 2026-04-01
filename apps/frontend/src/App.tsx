import { useState } from 'react';
import { Header } from "./components/layout/Header.tsx";
import { LoginForm } from "./components/auth/LoginForm.tsx";
import { HomePage } from "./pages/HomePage.tsx";

function App() {
  const [contestant, setContestant] = useState<string | null>(null);

  if (contestant) {
    return <HomePage contestant={contestant} onLogout={() => setContestant(null)} />;
  }

  return (
    <>
      <Header />
      <LoginForm onLoginSuccess={(username) => setContestant(username)} />
    </>
  );
}

export default App
