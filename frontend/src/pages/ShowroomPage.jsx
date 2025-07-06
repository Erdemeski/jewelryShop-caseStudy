import { Spinner } from 'flowbite-react'
import React, { useEffect, useState, useCallback, useMemo } from 'react'
import ProductCard from '../components/ProductCard'
import ShowroomSidebar from '../components/ShowroomSidebar'

export default function ShowroomPage() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [filters, setFilters] = useState({})
    const [urlParams, setUrlParams] = useState(new URLSearchParams(location.search));

    const searchTerm = urlParams.get('search') || '';
    const sort = urlParams.get('sort') || 'popularity';
    const order = urlParams.get('order') || 'desc';
    const minWeight = urlParams.get('minWeight') || '';
    const maxWeight = urlParams.get('maxWeight') || '';

    const handleSearch = useCallback((newFilters) => {
        const updatedFilters = { ...filters, ...newFilters };
        setFilters(updatedFilters);
        
        const searchParams = new URLSearchParams();
        Object.entries(updatedFilters).forEach(([key, value]) => {
            if (value !== '' && value !== null && value !== undefined) {
                searchParams.set(key, value);
            }
        });
        
        const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
        window.history.pushState({}, '', newUrl);
        
        setUrlParams(searchParams);
        
        fetchProducts(updatedFilters);
    }, [filters]);

    const fetchProducts = useCallback(async (currentFilters = {}) => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            
            const search = currentFilters.search !== undefined ? currentFilters.search : searchTerm;
            const sortParam = currentFilters.sort || sort;
            const orderParam = currentFilters.order || order;
            const minWeightParam = currentFilters.minWeight !== undefined ? currentFilters.minWeight : minWeight;
            const maxWeightParam = currentFilters.maxWeight !== undefined ? currentFilters.maxWeight : maxWeight;
            
            if (search) params.set('search', search);
            if (sortParam) params.set('sort', sortParam);
            if (orderParam) params.set('order', orderParam);
            if (minWeightParam) params.set('minWeight', minWeightParam);
            if (maxWeightParam) params.set('maxWeight', maxWeightParam);
            
            const queryString = params.toString();
            const url = `/api/product/getproducts${queryString ? `?${queryString}` : ''}`;
            
            const res = await fetch(url);
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
    }, [searchTerm, sort, order, minWeight, maxWeight]);

    useEffect(() => {
        const initialFilters = {};
        if (searchTerm) initialFilters.search = searchTerm;
        if (sort) initialFilters.sort = sort;
        if (order) initialFilters.order = order;
        if (minWeight) initialFilters.minWeight = minWeight;
        if (maxWeight) initialFilters.maxWeight = maxWeight;
        
        setFilters(initialFilters);
        fetchProducts(initialFilters);
    }, [fetchProducts]);

    useEffect(() => {
        const currentFilters = {};
        if (searchTerm) currentFilters.search = searchTerm;
        if (sort) currentFilters.sort = sort;
        if (order) currentFilters.order = order;
        if (minWeight) currentFilters.minWeight = minWeight;
        if (maxWeight) currentFilters.maxWeight = maxWeight;
        
        setFilters(currentFilters);
        fetchProducts(currentFilters);
    }, [searchTerm, sort, order, minWeight, maxWeight, fetchProducts]);

    const memoizedProducts = useMemo(() => products, [products]);

    return (
        <div className='min-h-screen fade-in'>
            <div className='min-h-screen flex flex-col md:flex-row'>
                <div className='md:w-56 z-10'>
                    <ShowroomSidebar
                        searchTerm={searchTerm}
                        sort={sort}
                        order={order}
                        minWeight={minWeight}
                        maxWeight={maxWeight}
                        handleSearch={handleSearch}
                    />
                </div>

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
            </div>
        </div>
    )
}