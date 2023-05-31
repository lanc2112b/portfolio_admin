import { useState } from "react";
import useLogout from "../../hooks/useLogout";
import useAuth from "../../hooks/useAuth";

import classNames from 'classnames';
import { Link } from "react-router-dom";

const HeaderNav = () => {

    const logout = useLogout();
    const { user } = useAuth();

    const [menuOpen, setMenuOpen] = useState(false);

    const menuHandler = () => {
        setMenuOpen(!menuOpen);
    }

    const [subMenu, setSubMenu] = useState(false);

    const subMenuHandler = () => {
        setSubMenu(!subMenu);
    }
    
    const menuGroupClass = classNames(
        'md:inline-flex',
        'w-full',
        'bg-white',
        'bg-opacity-90',
        'xs:absolute',
        'md:relative',
        {
            'block': menuOpen,
            'hidden': !menuOpen,
        }
    )

    return (
        <>
            <div className="flex items-center justify-between px-5 py-3 md:p-0">
                <div className="flex flex-row items-center">
                    <img src="/Muninn_72.png" alt="MuninnTech logo" />
                    <h1 className="ms-3 me-auto font-bold text-xl sm:text-1xl md:text-2xl">MuninnTech</h1>
                </div>
                <button type="button" onClick={menuHandler} className="md:hidden text-gray-500 hover:text-gray-800 focus:text-gray-800 text-xl" >
                    {!menuOpen ?
                        <i className="fa-solid fa-bars"></i>
                        :
                        <i className="fa-solid fa-xmark"></i>
                    }
                </button>
            </div>
            <nav className="flex xs:flex-col">
                <ul className={menuGroupClass} >
                    <li className="px-5 py-1 md:px-3 hover:bg-slate-100 md:hover:bg-white md:ml-3 font-semibold "><Link to="/" >Home</Link></li>
                    {user?.token ? 
                        <>
                            <li className="px-5 py-1 md:px-3 hover:bg-slate-100 md:hover:bg-white md:ml-3 font-semibold "><Link to="/messages" >Messages</Link></li>
                            <li className="px-5 py-1 md:px-3 hover:bg-slate-100 md:hover:bg-white md:ml-3 font-semibold "><Link to="/logs" >Logs</Link></li>
                            <li className="px-5 py-1 md:px-3 hover:bg-slate-100 md:hover:bg-white md:ml-3 font-semibold "><Link to="/portfolio" >Portfolio</Link></li>
                            <li className="px-5 py-1 md:px-3 hover:bg-slate-100 md:hover:bg-white md:ml-3 font-semibold "><Link to="/landing-content" >FP Content</Link></li>
                            <li className="px-5 py-1 md:px-3 sm:ml-3 hover:bg-slate-100 md:hover:bg-white">
                                <button type="button" className="inline-flex justify-center items-center" id="menu-button" aria-expanded="true" aria-haspopup="true" onClick={subMenuHandler}>
                                    <span className="text-xs me-2 inline md:hidden xl:inline">{user?.first_name} {user?.last_name}</span>
                                    <img src={user?.photo_url ?? null} alt="user profile" className="shadow-sm rounded-full max-w-6 max-h-6 min-w-6 min-h-6 inline" />
                                </button>
                                <div className={`${subMenu ? "absolute" : "hidden"} left-30 md:right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                    <button onClick={logout} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">
                                        <i className="me-3 fa-solid fa-right-from-bracket"></i>
                                        Logout
                                    </button>
                                </div>
                            </li>
                        </>
                        :
                        <>
                            <li className="px-5 py-1 md:px-3 hover:bg-slate-100 md:hover:bg-white md:ml-3 font-semibold "><Link to="/login" >Login</Link></li>
                            <li className="px-5 py-1 md:px-3 hover:bg-slate-100 md:hover:bg-white md:ml-3 font-semibold"><Link to="/register" >Register</Link></li>
                        </>
                    }
                </ul>
            </nav>
        </>
    )
}

export default HeaderNav;