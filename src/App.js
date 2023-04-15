import './App.css';
import NewAccountPage from './components/auth/NewAccountPage';
import { Header, Footer, MainSection } from "./components/structure/index";
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<MainSection />} />
        <Route path="/register" element={<MainSection element={<NewAccountPage />} />} />

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
