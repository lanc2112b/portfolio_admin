import HeaderNav from '../navs/HeaderNav';

const Header = () => {

  return (
    <>
      <header className="w-full mx-auto sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-3">
        <HeaderNav />
      </header>
    </>
  )

}

export default Header;