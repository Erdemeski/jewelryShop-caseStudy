import { Button, Dropdown, Navbar, NavbarToggle } from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { FaTurkishLiraSign, FaDollarSign } from 'react-icons/fa6'
import { GrCurrency } from "react-icons/gr"
import { useSelector, useDispatch } from "react-redux"
import { toggleTheme } from '../redux/theme/themeSlice'
import { toggleLanguage } from '../redux/page_Language/languageSlice';
import { selectCurrency } from '../redux/currency/currencySlice';
import en from "../assets/lang_Icons/en.png";
import tr from "../assets/lang_Icons/tr.png";
import logo from "../assets/photos/ring-diamond.png";

export default function Header() {

    const dispatch = useDispatch();
    const path = useLocation().pathname;
    const { theme } = useSelector((state) => state.theme);
    const { language } = useSelector((state) => state.language);
    const { currency } = useSelector((state) => state.currency);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`sticky top-0 z-[9999] transition-all duration-300 ${isScrolled ? 'backdrop-blur-3xl bg-white/5 dark:bg-[rgb(22,26,29)]/5 shadow-md' : ''}`}>
            <Navbar className={`transition-all duration-300 ${isScrolled ? 'bg-white/70 dark:bg-[rgb(22,26,29)]/70 dark:shadow-2xl' : 'dark:bg-[rgb(22,26,29)]'}`}>
                <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white focus:outline-none focus:ring-0'>
                    <span className='ml-2 text-2xl font-semibold flex items-center'>
                        <img src={logo} alt="logo" className='w-12 h-12 mb-1' />
                        Jewelry
                        <span className='bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text'>Store</span>
                    </span>
                </Link>
                <div className='flex gap-1 md:order-2'>

                    <Button className='w-13 h-11 dark:bg-[rgb(22,26,29)]/70 hidden sm:inline' color='gray' pill onClick={() => dispatch(toggleLanguage())}>
                        {language === 'en' ?
                            <div className='flex justify-center items-center'><img src={en} alt="" className='w-4 h-4' /></div>
                            :
                            <div className='flex justify-center items-center'><img src={tr} alt="" className='w-4 h-4' /></div>}
                    </Button>

                    <Dropdown className='hidden sm:inline' label="" dismissOnClick={false} renderTrigger={() => <span>
                        <Button className='w-13 h-11 dark:bg-[rgb(22,26,29)]/70 hidden sm:inline' color='gray' pill>
                            <GrCurrency className='w-4 h-4 text-gray-700 dark:text-gray-300' />
                        </Button>
                    </span>}>
                        <Dropdown.Item className={currency === 'usd' ? 'dark:bg-slate-600 bg-gray-100' : ''} onClick={() => dispatch(selectCurrency('usd'))}>
                            <div className='flex justify-center items-center'>
                                <FaDollarSign className='w-5 h-5 mr-1' />
                                <span className='flex justify-center'>USD</span>
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item className={currency === 'try' ? 'dark:bg-slate-600 bg-gray-100' : ''} onClick={() => dispatch(selectCurrency('try'))}>
                            <div className='flex justify-center items-center'>
                                <FaTurkishLiraSign className='w-5 h-5 mr-1' />
                                <span className='flex justify-center'>TRY</span>
                            </div>
                        </Dropdown.Item>
                    </Dropdown>

                    <Button className='w-13 h-11 dark:bg-[rgb(22,26,29)]/70 hidden sm:inline' color='gray' pill onClick={() => dispatch(toggleTheme())}>
                        {theme === 'light' ? <FaSun className='text-gray-700 dark:text-gray-300' /> : <FaMoon className='text-gray-700 dark:text-gray-300' />}
                    </Button>

                    <NavbarToggle />
                </div >
                <Navbar.Collapse>
                    <Navbar.Link active={path === "/"} as={'div'}>
                        <Link to='/'>
                            Home
                        </Link>
                    </Navbar.Link>
                    <Navbar.Link active={path === "/showroom"} as={'div'}>
                        <Link to='/showroom'>
                            Showroom
                        </Link>
                    </Navbar.Link>
                    <Navbar.Link active={path === "/about"} as={'div'}>
                        <Link to='/about'>
                            About Us
                        </Link>
                    </Navbar.Link>
                    <div className='flex justify-center sm:hidden'>
                        <Navbar.Link as={'div'}>
                            <div onClick={(e) => e.stopPropagation()}>
                                <Dropdown label="Language" className='rounded-full z-50' inline>
                                    <Button className='w-13 h-11 justify-center items-center mx-1' color='gray' pill onClick={() => dispatch(toggleLanguage())}>
                                        {language === 'en' ?
                                            <div className='flex justify-center items-center'><img src={en} alt="" className='w-4 h-4' /></div>
                                            :
                                            <div className='flex justify-center items-center'><img src={tr} alt="" className='w-4 h-4' /></div>}
                                    </Button>
                                </Dropdown>
                            </div>
                        </Navbar.Link>

                        <Navbar.Link as={'div'}>
                            <div onClick={(e) => e.stopPropagation()}>
                                <Dropdown label="Currency" className='z-50' inline>
                                    <Dropdown.Item className={currency === 'usd' ? 'dark:bg-slate-600 bg-gray-100' : ''} onClick={() => dispatch(selectCurrency('usd'))}>
                                        <div className='flex justify-center items-center'>
                                            <FaDollarSign className='w-5 h-5 mr-1' />
                                            <span className='flex justify-center'>USD</span>
                                        </div>
                                    </Dropdown.Item>
                                    <Dropdown.Item className={currency === 'try' ? 'dark:bg-slate-600 bg-gray-100' : ''} onClick={() => dispatch(selectCurrency('try'))}>
                                        <div className='flex justify-center items-center'>
                                            <FaTurkishLiraSign className='w-5 h-5 mr-1' />
                                            <span className='flex justify-center'>TRY</span>
                                        </div>
                                    </Dropdown.Item>
                                </Dropdown>
                            </div>
                        </Navbar.Link>

                        <Navbar.Link as={'div'}>
                            <div onClick={(e) => e.stopPropagation()}>
                                <Dropdown label="Theme" className='rounded-full z-50' inline>
                                    <Button className='w-13 h-11 justify-center items-center mx-1' color='gray' pill onClick={() => dispatch(toggleTheme())}>
                                        {theme === 'light' ? <FaSun className='text-gray-700 dark:text-gray-300' /> : <FaMoon className='text-gray-700 dark:text-gray-300' />}
                                    </Button>
                                </Dropdown>
                            </div>
                        </Navbar.Link>
                    </div>
                </Navbar.Collapse>
            </Navbar >

        </div>
    )
}
