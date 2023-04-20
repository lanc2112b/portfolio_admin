import HeaderNav from '../navs/HeaderNav';

const Header = () => {

  return (
    <>
      <div className="w-full border-b md:ps-2">
      <header className="w-full container mx-auto md:flex md:justify-between md:items-center md:px-2 md:py-3">
        <HeaderNav />
        </header>
      </div>
    </>
  )

}

export default Header;