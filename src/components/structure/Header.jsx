import HeaderNav from '../navs/HeaderNav';

const Header = () => {

  return (
    <>
      <div className="w-full border-b sm:ps-2">
      <header className="w-full container mx-auto sm:flex sm:justify-between sm:items-center sm:px-2 sm:py-3">
        <HeaderNav />
        </header>
      </div>
    </>
  )

}

export default Header;