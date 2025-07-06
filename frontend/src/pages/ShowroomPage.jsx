import { Spinner } from 'flowbite-react'
import React, { useEffect, useState, useCallback, useMemo } from 'react'
import ProductCard from '../components/ProductCard'

export default function ShowroomPage() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/product/getproducts`);
            if (!res.ok) {
                console.error('Failed to fetch products:', res.status, res.statusText);
                setProducts([]);
                setLoading(false);
                return;
            }
            const data = await res.json();
            setProducts(data.data?.products || []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([]);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const memoizedProducts = useMemo(() => products, [products]);

    return (
        <div className="flex-1 min-h-screen relative isolate bg-white dark:bg-[rgb(22,26,29)] px-6 py-6 sm:py-10 lg:px-8">
            <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 -z-50 transform-gpu overflow-hidden blur-3xl sm:-top-0"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(85% 40%, 100% 55%, 100% 30%, 90% 10%, 85% 5%, 78% 25%, 65% 60%, 55% 70%, 50% 65%, 48% 35%, 30% 80%, 0% 70%, 20% 100%, 30% 78%, 80% 95%, 90% 110%, 95% 130%, 98% 145%, 100% 160%, 100% 200%)',
                    }}
                    className="relative left-[calc(50%-5rem)] aspect-[1155/678] w-[48rem] -translate-x-1/2 rotate-[25deg] bg-gradient-to-tr from-[#f728a7] to-[#99d40e] opacity-40 sm:left-[calc(50%-20rem)] sm:w-[80rem] animate-pulse"
                />
            </div>
            <div className="flex-1 flex-wrap mx-auto max-w-2xl text-center">
                {!loading ? (
                    <section className='mt-0'>
                        {memoizedProducts && memoizedProducts.length > 0 ? (
                            <>
                                <p className="font-avenir font-normal text-[45px]">Product List</p>
                                <p className="mt-0 mb-6 sm:mb-10 text-md text-gray-600 dark:text-gray-400 leading-relaxed font-avenir font-light">We work to be with you in your most precious memories 💖</p>
                            </>
                        ) : (
                            <>
                                <p className="font-avenir font-normal text-[45px]">Product List</p>
                                <p className="mt-0 mb-6 sm:mb-10 text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-avenir font-light">No results found 😔</p>
                            </>
                        )}
                    </section>
                ) : (
                    <div className='flex p-5 justify-center pb-96 items-center md:items-baseline min-h-screen'>
                        <Spinner size='xl' />
                        <p className='text-center text-gray-500 m-2 font-avenir'>Searching...</p>
                    </div>
                )}
            </div>
            {memoizedProducts && memoizedProducts.length > 0 && (
                <div>
                    <div className='flex flex-wrap gap-5 mt-5 justify-center'>
                        {memoizedProducts.map((product, index) => (
                            <ProductCard key={`${product.name}-${index}`} product={product} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}