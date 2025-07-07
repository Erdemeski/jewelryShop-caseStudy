import { Spinner } from 'flowbite-react'
import React, { useState } from 'react'
import { renderStars } from './Rating'

export default function ProductCard({ product, currency }) {
    const [imageLoaded, setImageLoaded] = useState(false)
    const [imageError, setImageError] = useState(false)
    const [selectedColor, setSelectedColor] = useState('yellow')

    const defineStarRating = () => {
        if (product.popularityScore >= 0.9) {
            return 5.0
        } else if (product.popularityScore >= 0.8) {
            return 4.5
        } else if (product.popularityScore >= 0.7) {
            return 4.0
        } else if (product.popularityScore >= 0.6) {
            return 3.5
        } else if (product.popularityScore >= 0.5) {
            return 3.0
        } else if (product.popularityScore >= 0.4) {
            return 2.5
        } else if (product.popularityScore >= 0.3) {
            return 2.0
        } else if (product.popularityScore >= 0.2) {
            return 1.5
        } else if (product.popularityScore >= 0.1) {
            return 1.0
        } else {
            return 0.0
        }
    }

    const handleImageLoad = () => {
        setImageLoaded(true)
    }

    const handleImageError = () => {
        setImageError(true)
        setImageLoaded(true)
    }

    const definePrice = () => {
        if (currency === 'usd') {
            return product.priceUSD.toFixed(2) + ' USD'
        } else if (currency === 'eur') {
            return product.priceEUR.toFixed(2) + ' EUR'
        } else {
            return 'Undefined'
        }
    }

    return (
        <div className='group relative w-full max-w-[400px] shadow-md border bg-white dark:border-zinc-600 border-zinc-200 dark:bg-gray-50 h-[430px] overflow-hidden rounded-xl sm:w-[430px] sm:max-w-[250px] transition-all duration-300 ease-out hover:scale-105'>
            <div className="relative h-[250px] w-full overflow-hidden rounded-b-xl">
                {!imageLoaded && (
                    <div className="absolute inset-0 bg-gray-100 dark:bg-gray-100 animate-pulse flex items-center justify-center">
                        <Spinner size='xl' />
                    </div>
                )}
                <img
                    src={product.images[selectedColor]}
                    alt={`${product.name} cover`}
                    className={`h-[250px] w-full object-cover transition-transform duration-300 ease-out z-20 rounded-b-xl group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                    loading="lazy"
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                />
                {imageError && (
                    <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <span className="text-gray-500 dark:text-gray-400 text-sm">Image not available</span>
                    </div>
                )}
            </div>
            <div className='p-3 flex flex-col gap-1'>
                <p className='font-montserrat font-medium text-[15px] text-black'>{product.name}</p>
                <p className='font-montserrat font-normal text-[15px] text-black'>{definePrice()}</p>
                <div className='flex justify-start items-center gap-3 mt-4 ml-1'>
                    <div className={`flex flex-col gap-1 bg-[#E6CA97] rounded-full p-1 w-5 h-5 ${selectedColor === 'yellow' ? 'outline outline-[0.1px] outline-black outline-offset-4' : ''}`} onClick={() => setSelectedColor('yellow')}>
                        <div className='w-full h-full bg-[#E6CA97] rounded-full'></div>
                    </div>
                    <div className={`flex flex-col gap-1 bg-[#D9D9D9] rounded-full p-1 w-5 h-5 ${selectedColor === 'white' ? 'outline outline-[0.1px] outline-black outline-offset-4' : ''}`} onClick={() => setSelectedColor('white')}>
                        <div className='w-full h-full bg-[#D9D9D9] rounded-full'></div>
                    </div>
                    <div className={`flex flex-col gap-1 bg-[#E1A4A9] rounded-full p-1 w-5 h-5 ${selectedColor === 'rose' ? 'outline outline-[0.1px] outline-black outline-offset-4' : ''}`} onClick={() => setSelectedColor('rose')}>
                        <div className='w-full h-full bg-[#E1A4A9] rounded-full'></div>
                    </div>
                </div>
                <div className='flex justify-start items-center mt-2'>
                    <p className='font-avenir font-normal text-[12px] text-black'>
                        {
                            selectedColor === 'yellow' ? 'Yellow Gold' : selectedColor === 'white' ? 'White Gold' : 'Rose Gold'
                        }
                    </p>
                </div>
                <div className='flex justify-start items-center mt-2'>
                    <div className="flex items-center gap-0">
                        {renderStars(defineStarRating())}
                        <span className='font-avenir font-normal text-[14px] text-black ml-2'>{defineStarRating()}/5</span>
                    </div>
                </div>
            </div>
        </div>
    )
}