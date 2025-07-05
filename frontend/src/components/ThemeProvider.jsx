import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'


export default function ThemeProvider({ children }) {
    const { theme } = useSelector((state) => state.theme)
    
    useEffect(() => {
        document.documentElement.style.colorScheme = theme;
        
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }
        
        if (theme === 'dark') {
            metaThemeColor.content = '#161a1d';
        } else {
            metaThemeColor.content = '#ffffff';
        }
        
        document.documentElement.style.setProperty('color-scheme', theme, 'important');
        
    }, [theme]);
    
    return (
        <div className={theme}>
            <div className='bg-white text-gray-700 dark:text-gray-200 dark:bg-[rgb(22,26,29)] min-h-screen'>
                {children}
            </div>
        </div>
    )
}
