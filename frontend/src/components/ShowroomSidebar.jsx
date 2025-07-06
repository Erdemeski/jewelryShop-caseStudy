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
}) {
    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
    const [localMinWeight, setLocalMinWeight] = useState(minWeight);
    const [localMaxWeight, setLocalMaxWeight] = useState(maxWeight);

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
            <Sidebar className='w-full md:w-56 h-full'>
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
                </Sidebar.Items>
            </Sidebar>
        </div>
    );
}
