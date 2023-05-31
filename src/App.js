import './App.css';

import { Routes, Route } from 'react-router-dom';

import { MainSection } from "./components/structure/index";

import RequireAuth from './components/auth/RequireAuth';
import PersistLogin from './components/auth/PersistLogin';
import NewAccountPage from './components/auth/NewAccountPage';
import LoginPage from './components/auth/LoginPage';
import ContactItems from './components/contacts/ContactItems';
import Portfolio from './components/portfolio/Portfolio';
import PortfolioItem from './components/portfolio/PortfolioItem';
import LandingPage from './components/landing/LandingPage';
import LandingViewItem from './components/landing/LandingViewItem';
import FourOhFour from './components/errorpages/FourOhFour';
import Forbidden from './components/errorpages/Forbidden';
import AdminLandingPage from './components/AdminLandingPage';
import LogView from './components/logs/LogView';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainSection />}>
        {/** public */}
        <Route path="/" element={<AdminLandingPage />} />
        <Route path="register" element={<NewAccountPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="forbidden" element={<Forbidden />} />
        <Route path="not-found" element={<FourOhFour />} />
        {/** protected */}
        <Route element={<PersistLogin />} >
          <Route element={<RequireAuth />} >
            <Route path="/messages" element={<ContactItems />} />
            <Route path="/logs" element={<LogView />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:id" element={<PortfolioItem />} />
            <Route path="/landing-content" element={<LandingPage />} />
            <Route path="/landing-content/:id" element={<LandingViewItem />} />
          </Route>
        </Route>

      </Route>
      <Route path="*" element={<FourOhFour />} />
    </Routes>
  );
}

export default App;
