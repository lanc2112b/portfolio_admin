import './App.css';
import { Header, Footer, MainSection } from "./components/structure/index";

function App() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <Header />
      <MainSection />
      <Footer />
    </div>
  );
}

export default App;
