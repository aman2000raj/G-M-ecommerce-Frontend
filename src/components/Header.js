import React, { useContext, useEffect, useState } from 'react';
import { SidebarContext } from '../contexts/SidebarContext';
import { CartContext } from '../contexts/CartContext';
import { UserContext } from '../contexts/UserContext';
import { BsBag, BsPerson, BsSearch } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../img/logo.svg';

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);
  const { user, logout } = useContext(UserContext);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage =
    location.pathname !== '/login' && location.pathname !== '/signup';

  return (
    <header
      className={`${
        isActive ? 'bg-white py-4 shadow-md' : 'bg-none py-6'
      } fixed w-full z-10 transition-all`}
    >
      <div className='container mx-auto max-w-screen-xl flex items-center justify-between h-full px-6'>
        <Link to={'/'}>
          <div className='flex flex-row items-center justify-center space-x-2 md:space-x-4'>
            <div className='text-xl md:text-2xl font-bold'>
              G&M STORE
            </div>
            <img className='w-[40px]' src={Logo} alt='Logo' />
          </div>
        </Link>
        {isHomePage && (
          <div className='cursor-pointer flex items-center relative space-x-4 ml-4 md:ml-6'>
            {/* Search Icon */}
            <BsSearch className='text-2xl md:text-3xl cursor-pointer mx-2 md:mx-4' />
            {user ? (
              <div className='text-xl md:text-2xl flex items-center space-x-4'>
                <span>{user.firstName}</span>
                <button onClick={logout} className='text-sm md:text-base'>
                  Logout
                </button>
              </div>
            ) : (
              <Link to={'/login'}>
                <BsPerson className='text-2xl md:text-3xl cursor-pointer mx-2 md:mx-4' />
              </Link>
            )}
            <div onClick={() => setIsOpen(!isOpen)} className='relative'>
              <BsBag className='text-2xl md:text-3xl' />
              <div className='bg-red-500 absolute -right-2 -bottom-2 text-[10px] md:text-[12px] w-[16px] md:w-[18px] h-[16px] md:h-[18px] text-white rounded-full flex justify-center items-center'>
                {itemAmount}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
