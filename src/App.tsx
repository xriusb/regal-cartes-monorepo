import { useState } from 'react';
import { Header } from "./components/layout/Header.tsx";
import { LoginForm } from "./components/auth/LoginForm.tsx";
import { HomePage } from "./pages/HomePage.tsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isLoggedIn) {
    return <HomePage onLogout={() => setIsLoggedIn(false)} />;
  }

  return (
    <>
      <Header />
      <LoginForm onLoginSuccess={() => setIsLoggedIn(true)} />
    </>
  );
}

export default App
