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
import FourOhFour from './components/errorpages/FourOhFour';
import AdminLandingPage from './components/AdminLandingPage';
import LogView from './components/logs/LogView';

function App() {
  return (
    <div id="wrapper" className="w-full flex flex-col min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<MainSection element={<AdminLandingPage />} />} />
        <Route path="/register" element={<MainSection element={<NewAccountPage />} />} />
        <Route path="/login" element={<MainSection element={<LoginPage />} />} />
        <Route path="/messages" element={<MainSection element={<ContactItems />} />} />
        <Route path="/logs" element={<MainSection element={<LogView />} />} />
        <Route path="/portfolio" element={<MainSection element={<Portfolio />} />} />
        <Route path="/portfolio/:id" element={<MainSection element={<PortfolioItem />} />} />
        <Route path="/landing-content" element={<MainSection element={<LandingPage />} />} />
        <Route path="/landing-content/:id" element={<MainSection element={<LandingViewItem />} />} />
        <Route path="*" element={<MainSection element={<FourOhFour />} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
