import { Toaster } from 'react-hot-toast';
import HeaderNav from '../navs/HeaderNav';

const Header = () => {

  return (
    <>
      <div className="w-full border-b md:ps-2">
        <header className="w-full container mx-auto md:flex md:justify-between md:items-center md:px-2 md:py-3">
          <HeaderNav />
        </header>
      </div>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: 'w-60 shadow-green-300 bg-green-200',
          duration: 8000,
        }}
      />
    </>
  )

}

export default Header;