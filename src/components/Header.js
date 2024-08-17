import React, { useContext, useEffect, useState } from 'react';
import { SidebarContext } from '../contexts/SidebarContext';
import { CartContext } from '../contexts/CartContext';
import { BsBag, BsPerson, BsSearch } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../img/logo.svg';

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);
  const location = useLocation();

  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  }, []);

  const isHomePage = location.pathname !== '/login' && location.pathname !== '/signup';

  return (
    <header
      className={`${
        isActive ? 'bg-white py-4 shadow-md' : 'bg-none py-6'
      } fixed w-full z-10 transition-all`}
    >
      <div className='container mx-auto max-w-screen-xl flex items-center justify-between h-full px-6'>
        <Link to={'/'}>
          <div className='flex flex-row items-center justify-center'>
            G&M STORE
            <img className='w-[40px] ml-2' src={Logo} alt='' />
          </div>
        </Link>
        {isHomePage && (
          <div className='cursor-pointer flex relative'>
            {/* Search Icon */}
            <BsSearch className='text-2xl cursor-pointer mx-4' />
            {/* Login Icon */}
            <Link to={'/login'}>
              <BsPerson className='text-2xl cursor-pointer mx-6' />
            </Link>
            <div onClick={() => setIsOpen(!isOpen)}>
              <BsBag className='text-2xl' />
              <div className='bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center'>
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
