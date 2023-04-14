import { useState } from "react";
import classNames from 'classnames';

const HeaderNav = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    const menuHandler = () => {
        setMenuOpen(!menuOpen);
    }

    /*     const closeHandler = () => {
            setMenuOpen
        } */

    const menuGroupClass = classNames(
        'sm:inline-flex',
        'w-full',
        'bg-white',
        'bg-opacity-90',
        'absolute',
        'sm:relative',
        {
            'block': menuOpen,
            'hidden': !menuOpen,
        }
    )
    return (
        <>
            <div className="flex items-center justify-between px-4 py-3 sm:p-0">
                <div className="flex flex-row items-center">
                    <img src="/Muninn_72.png" alt="MuninnTech logo" />
                    <h1 className="ms-3 me-auto font-bold text-2xl sm:text-3xl md:text-4xl">MuninnTech</h1>
                </div>
                <button type="button" onClick={menuHandler} className="sm:hidden text-gray-500 hover:text-gray-800 focus:text-gray-800 text-xl" >
                    {!menuOpen ?
                        <i className="fa-solid fa-bars"></i>
                        :
                        <i className="fa-solid fa-xmark"></i>
                    }
                </button>
            </div>
            <nav className="flex xs:flex-col">
                <ul className={menuGroupClass} >
                    <li className="px-5 py-1 sm:px-3 hover:bg-slate-100 sm:ml-3 font-semibold "><a href="/">Link 2</a></li>
                    <li className="px-5 py-1 sm:px-3 hover:bg-slate-100 sm:ml-3 font-semibold "><a href="/">Link 3</a></li>
                    <li className="px-5 py-1 sm:px-3 hover:bg-slate-100 sm:ml-3 font-semibold"><a href="/">Link 1</a></li>
                </ul>
            </nav>
        </>
    )
}

export default HeaderNav;