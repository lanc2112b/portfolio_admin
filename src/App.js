import './App.css';
import { Routes, Route } from 'react-router-dom';

import { Header, Footer, MainSection } from "./components/structure/index";
import NewAccountPage from './components/auth/NewAccountPage';
import LoginPage from './components/auth/LoginPage';
import ContactItems from './components/contacts/ContactItems';
import Portfolio from './components/portfolio/Portfolio';
import PortfolioItem from './components/portfolio/PortfolioItem';
import LandingPage from './components/landing/LandingPage';
import LandingViewItem from './components/landing/LandingViewItem';

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
        <Route path="/landing-content" element={<MainSection element={<LandingPage />} />} />
        <Route path="/landing-content/:id" element={<MainSection element={<LandingViewItem />} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
