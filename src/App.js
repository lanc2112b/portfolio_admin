import './App.css';
import { Routes, Route } from 'react-router-dom';

import { Header, Footer, MainSection } from "./components/structure/index";
import NewAccountPage from './components/auth/NewAccountPage';
import LoginPage from './components/auth/LoginPage';
import ContactItems from './components/contacts/ContactItems';
import Portfolio from './components/portfolio/Portfolio';
import PortfolioItem from './components/portfolio/PortfolioItem';

function App() {
  return (
    <div id="wrapper" className="w-full flex flex-col min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<MainSection />} />
        <Route path="/register" element={<MainSection element={<NewAccountPage />} />} />
        <Route path="/login" element={<MainSection element={<LoginPage />} />} />
        <Route path="/messages" element={<MainSection element={<ContactItems />} />} />
        <Route path="/portfolio" element={<MainSection element={<Portfolio />} />} />
        <Route path="/portfolio/:id" element={<MainSection element={<PortfolioItem />} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
