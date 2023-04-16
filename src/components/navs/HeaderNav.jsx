import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/User";
import classNames from 'classnames';
import { Link } from "react-router-dom";

const HeaderNav = () => {

    const { user, setUser } = useContext(UserContext);  //user, 

    useEffect(() => {
        const theUser = localStorage.getItem("user");

        if (theUser && !theUser.includes("undefined")) {
            setUser(JSON.parse(theUser));
        }
    }, [setUser]);

    const logoutHandler = () => {
        localStorage.removeItem("user");

        setUser({
            user: {
                firstName: null,
                lastName: null,
                picture: null,
                email: null,
                token: null,
                refresh: null,
            },
        });
        window.location.replace('/login');
    };



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
            <div className="flex items-center justify-between px-5 py-3 sm:p-0">
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
                    <li className="px-5 py-1 sm:px-3 hover:bg-slate-100 sm:ml-3 font-semibold "><Link to="/" >Home</Link></li>

                    {!user.email && <li className="px-5 py-1 sm:px-3 hover:bg-slate-100 sm:ml-3 font-semibold "><Link to="/login" >Login</Link></li>}
                    {!user.email && <li className="px-5 py-1 sm:px-3 hover:bg-slate-100 sm:ml-3 font-semibold"><Link to="/register" >Register</Link></li>}
                    {user.email && <li className="px-5 py-1 sm:px-3 hover:bg-slate-100 sm:ml-3 font-semibold" onClick={logoutHandler}>Logout</li>}
                    {user.email && <li className="px-5 py-1 sm:px-3 sm:ml-3 font-semibold "><img src={user.photo_url ?? null} alt="user profile" className="rounded-full w-6 h-6" /></li>}
                </ul>
            </nav>
        </>
    )
}

export default HeaderNav;