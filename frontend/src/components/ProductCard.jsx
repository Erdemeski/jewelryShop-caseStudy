import { Spinner } from 'flowbite-react'
import React, { useState } from 'react'

export default function ProductCard({ product }) {
    const [imageLoaded, setImageLoaded] = useState(false)
    const [imageError, setImageError] = useState(false)

    const handleImageLoad = () => {
        setImageLoaded(true)
    }

    const handleImageError = () => {
        setImageError(true)
        setImageLoaded(true)
    }

    return (
        <div className='group relative w-full max-w-[400px] shadow-md border bg-white dark:border-zinc-600 border-zinc-200 dark:bg-gray-200 h-[400px] overflow-hidden rounded-xl sm:w-[430px] sm:max-w-[250px] transition-all duration-300 ease-out hover:scale-105'>
            <div className="relative h-[250px] w-full overflow-hidden rounded-b-xl">
                {!imageLoaded && (
                    <div className="absolute inset-0 bg-gray-100 dark:bg-gray-100 animate-pulse flex items-center justify-center">
                        <Spinner size='xl' />
                    </div>
                )}
                <img
                    src={product.images.yellow}
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
            <div className='p-3 flex flex-col gap-2'>
            </div>
        </div>
    )
}