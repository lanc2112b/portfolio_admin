import './App.css';
import { Routes, Route } from 'react-router-dom';

import { Header, Footer, MainSection } from "./components/structure/index";
import NewAccountPage from './components/auth/NewAccountPage';
import LoginPage from './components/auth/LoginPage';
import ContactItems from './components/contacts/ContactItems';

function App() {
  return (
    <div id="wrapper" className="w-full flex flex-col min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<MainSection />} />
        <Route path="/register" element={<MainSection element={<NewAccountPage />} />} />
        <Route path="/login" element={<MainSection element={<LoginPage />} />} />
        <Route path="/messages" element={<MainSection element={<ContactItems />} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
