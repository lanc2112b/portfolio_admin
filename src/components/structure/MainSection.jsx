import { Outlet } from "react-router-dom";
import ErrorMessage from "../uiparts/ErrorMessage";
import { Header, Footer } from "../structure/index";

const MainSection = () => {

  return (
    <>
      <div id="wrapper" className="w-full flex flex-col min-h-screen">
        <Header />
        <main className="container mt-3 mb-6 mx-auto px-2 flex flex-col grow">
          <ErrorMessage />
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )

}
export default MainSection;