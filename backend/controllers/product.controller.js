import { errorHandler } from "../utils/error.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import goldPriceService from '../utils/goldPriceService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getProducts = async (req, res, next) => {
    try {
        const {
            sort = 'popularity',
            order = 'desc',
            limit = null,
            page = 1,
            search = null,
            minWeight = null,
            maxWeight = null,
            minPopularity = null,
            maxPopularity = null
        } = req.query;

        const productsPath = path.join(__dirname, '..', 'products.json');

        const productsData = fs.readFileSync(productsPath, 'utf8');
        let products = JSON.parse(productsData);

        if (search) {
            products = products.filter(product =>
                product.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (minWeight !== null) {
            products = products.filter(product => product.weight >= parseFloat(minWeight));
        }
        if (maxWeight !== null) {
            products = products.filter(product => product.weight <= parseFloat(maxWeight));
        }

        if (minPopularity !== null) {
            products = products.filter(product => product.popularityScore >= parseFloat(minPopularity));
        }
        if (maxPopularity !== null) {
            products = products.filter(product => product.popularityScore <= parseFloat(maxPopularity));
        }

        let goldPriceUSD, goldPriceEUR;
        try {
            const goldPrices = await goldPriceService.getGoldPrices();
            goldPriceUSD = goldPrices.USD;
            goldPriceEUR = goldPrices.EUR;
        } catch (goldError) {
            console.error('Gold price service error:', goldError);
            goldPriceUSD = 100;
            goldPriceEUR = 85;
        }

        const productsWithPrices = products.map(product => ({
            ...product,
            priceUSD: goldPriceService.calculateProductPrice(product.popularityScore, product.weight, 'USD'),
            priceEUR: goldPriceService.calculateProductPrice(product.popularityScore, product.weight, 'EUR')
        }));

        productsWithPrices.sort((a, b) => {
            let aValue, bValue;

            switch (sort) {
                case 'weight':
                    aValue = a.weight;
                    bValue = b.weight;
                    break;
                case 'price':
                    aValue = a.priceUSD;
                    bValue = b.priceUSD;
                    break;
                case 'popularity':
                    aValue = a.popularityScore;
                    bValue = b.popularityScore;
                    break;
                default:
                    aValue = a.popularityScore;
                    bValue = b.popularityScore;
                    break;
            }

            if (order === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        const totalProducts = productsWithPrices.length;
        const totalPages = limit ? Math.ceil(totalProducts / parseInt(limit)) : 1;
        const currentPage = parseInt(page);
        const itemsPerPage = limit ? parseInt(limit) : totalProducts;
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        const paginatedProducts = productsWithPrices.slice(startIndex, endIndex);

        const response = {
            success: true,
            message: 'Products fetched successfully',
            data: {
                products: paginatedProducts,
                pagination: {
                    currentPage,
                    totalPages,
                    totalProducts,
                    itemsPerPage,
                    hasNextPage: currentPage < totalPages,
                    hasPrevPage: currentPage > 1
                },
                filters: {
                    sort,
                    order,
                    search: search || null,
                    minWeight: minWeight ? parseFloat(minWeight) : null,
                    maxWeight: maxWeight ? parseFloat(maxWeight) : null,
                    minPopularity: minPopularity ? parseFloat(minPopularity) : null,
                    maxPopularity: maxPopularity ? parseFloat(maxPopularity) : null
                },
                goldPriceUSD: goldPriceUSD,
                goldPriceEUR: goldPriceEUR,
                lastUpdate: goldPriceService.getLastUpdateFormatted()
            }
        };

        res.status(200).json(response);

    } catch (error) {
        console.error('Error in getProducts:', error);
        if (error.statusCode) {
            next(error);
        } else {
            next(errorHandler(500, 'Internal server error while fetching products'));
        }
    }
};