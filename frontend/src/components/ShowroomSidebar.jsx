import { Button, Label, Sidebar, TextInput } from "flowbite-react";
import { AiOutlineSearch } from 'react-icons/ai'
import { useState, useEffect } from 'react';

export default function ShowroomSidebar({
    handleSearch,
    searchTerm,
    sort,
    order,
    minWeight,
    maxWeight,
    data,
}) {
    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
    const [localMinWeight, setLocalMinWeight] = useState(minWeight);
    const [localMaxWeight, setLocalMaxWeight] = useState(maxWeight);
    console.log(data);

    useEffect(() => {
        setLocalSearchTerm(searchTerm);
    }, [searchTerm]);

    useEffect(() => {
        setLocalMinWeight(minWeight);
    }, [minWeight]);

    useEffect(() => {
        setLocalMaxWeight(maxWeight);
    }, [maxWeight]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        handleSearch({ search: localSearchTerm });
    };

    const handleSortChange = (newSort, newOrder) => {
        handleSearch({ sort: newSort, order: newOrder });
    };

    const handleWeightFilter = () => {
        handleSearch({
            minWeight: localMinWeight,
            maxWeight: localMaxWeight
        });
    };

    const handleClearFilters = () => {
        setLocalSearchTerm('');
        setLocalMinWeight('');
        setLocalMaxWeight('');
        handleSearch({
            search: '',
            minWeight: '',
            maxWeight: '',
            sort: 'popularity',
            order: 'desc'
        });
    };

    return (
        <div className="h-full">
            <Sidebar className='w-full md:w-56 h-full'
                theme={{
                    root: {
                        inner: "h-full overflow-y-auto overflow-x-hidden rounded bg-gray-50 px-3 py-4 dark:bg-[rgb(32,38,43)] dark:border-b-2 dark:border-gray-700"
                    },
                    item: {
                        base: "flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
                        active: "bg-gray-100 dark:bg-gray-700"
                    }
                }}>
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Label htmlFor="searchTerm" value="Search in Products:" />
                        <form onSubmit={handleSearchSubmit} className="m-1">
                            <TextInput
                                value={localSearchTerm}
                                onChange={(e) => {
                                    setLocalSearchTerm(e.target.value);
                                    handleSearch({ search: e.target.value });
                                }}
                                sizing='sm'
                                placeholder='Search...'
                                id='searchTerm'
                                type='text'
                                rightIcon={AiOutlineSearch}
                            />
                        </form>

                        <div className="mt-4">
                            <div className="space-y-3 mt-5">
                                <div>
                                    <div className="text-sm font-medium mb-2">Popularity</div>
                                    <div className="flex gap-1">
                                        <Button
                                            size="xs"
                                            color={sort === 'popularity' && order === 'desc' ? 'success' : 'gray'}
                                            onClick={() => handleSortChange('popularity', 'desc')}
                                            className="flex-1"
                                        >
                                            High to Low
                                        </Button>
                                        <Button
                                            size="xs"
                                            color={sort === 'popularity' && order === 'asc' ? 'success' : 'gray'}
                                            onClick={() => handleSortChange('popularity', 'asc')}
                                            className="flex-1"
                                        >
                                            Low to High
                                        </Button>
                                    </div>
                                </div>

                                <div>
                                    <div className="text-sm font-medium mb-2">Weight</div>
                                    <div className="flex gap-1">
                                        <Button
                                            size="xs"
                                            color={sort === 'weight' && order === 'desc' ? 'success' : 'gray'}
                                            onClick={() => handleSortChange('weight', 'desc')}
                                            className="flex-1"
                                        >
                                            Heavy to Light
                                        </Button>
                                        <Button
                                            size="xs"
                                            color={sort === 'weight' && order === 'asc' ? 'success' : 'gray'}
                                            onClick={() => handleSortChange('weight', 'asc')}
                                            className="flex-1"
                                        >
                                            Light to Heavy
                                        </Button>
                                    </div>
                                </div>

                                <div>
                                    <div className="text-sm font-medium mb-2">Price</div>
                                    <div className="flex gap-1">
                                        <Button
                                            size="xs"
                                            color={sort === 'price' && order === 'desc' ? 'success' : 'gray'}
                                            onClick={() => handleSortChange('price', 'desc')}
                                            className="flex-1"
                                        >
                                            Expensive to Cheap
                                        </Button>
                                        <Button
                                            size="xs"
                                            color={sort === 'price' && order === 'asc' ? 'success' : 'gray'}
                                            onClick={() => handleSortChange('price', 'asc')}
                                            className="flex-1"
                                        >
                                            Cheap to Expensive
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Label value="Weight Filter:" />
                            <div className="space-y-2 mt-2">
                                <div className="flex flex-row justify-between gap-2 items-center">
                                    <TextInput
                                        className="w-1/2"
                                        value={localMinWeight}
                                        onChange={(e) => setLocalMinWeight(e.target.value)}
                                        sizing='sm'
                                        placeholder='Min Weight'
                                        type='number'
                                        step="0.1"
                                    />
                                    <TextInput
                                        className="w-1/2"
                                        value={localMaxWeight}
                                        onChange={(e) => setLocalMaxWeight(e.target.value)}
                                        sizing='sm'
                                        placeholder='Max Weight'
                                        type='number'
                                        step="0.1"
                                    />
                                </div>
                                <Button
                                    onClick={handleWeightFilter}
                                    className="w-full text-sm font-medium mt-2"
                                    gradientDuoTone="purpleToBlue"
                                    outline
                                    size="sm"
                                >
                                    Apply Weight Filter
                                </Button>
                            </div>
                        </div>

                        <div className="mt-10">
                            <Button
                                onClick={handleClearFilters}
                                className="w-full text-sm font-medium mt-2"
                                color="red"
                                size="sm"
                                outline
                            >
                                Clear All Filters
                            </Button>
                        </div>
                    </Sidebar.ItemGroup>
                    <div className="mt-8 md:mt-20 p-4 bg-gradient-to-br from-yellow-50 to-amber-100 dark:from-yellow-400/20 dark:to-amber-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700/30">
                        <div className="flex items-center gap-2 mb-3 justify-center">
                            <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
                                <span className="text-sm font-bold text-white">🪙</span>
                            </div>
                            <h2 className="text-montserrat text-lg font-medium text-gray-800 dark:text-white">Gold Prices</h2>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded-md shadow-sm">
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">USD</span>
                                <span className="text-sm font-bold text-green-600 dark:text-green-400">
                                    {data.data?.goldPriceUSD ? `$${data.data.goldPriceUSD}` : 'N/A'}
                                </span>
                            </div>

                            <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded-md shadow-sm">
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">EUR</span>
                                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                                    {data.data?.goldPriceEUR ? `€${data.data.goldPriceEUR}` : 'N/A'}
                                </span>
                            </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-yellow-200 dark:border-yellow-700/30">
                            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                                Last Update: <br /> <span className="font-bold">{data.data?.lastUpdate ? data.data.lastUpdate : 'N/A'} UTC</span>
                            </p>
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 text-center">
                                (Limited requests per month.)
                            </p>
                        </div>
                    </div>
                </Sidebar.Items>
            </Sidebar>
        </div>
    );
}
