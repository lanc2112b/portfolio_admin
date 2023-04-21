import ErrorMessage from "../uiparts/ErrorMessage";
const MainSection = ({ element }) => {

  return (
    <>
      <main className="container mt-3 mb-6 mx-auto px-2 flex flex-col grow">
        <ErrorMessage />
          {element}
      </main>

    </>
  )

}
export default MainSection;