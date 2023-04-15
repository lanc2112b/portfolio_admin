import './App.css';
import NewAccountPage from './components/auth/NewAccountPage';
import LoginPage from './components/auth/LoginPage';
import { Header, Footer, MainSection } from "./components/structure/index";
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div id="wrapper" className="w-full flex flex-col min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<MainSection />} />
        <Route path="/register" element={<MainSection element={<NewAccountPage />} />} />
        <Route path="/login" element={<MainSection element={<LoginPage />} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
