import axios from 'axios';
import { errorHandler } from './error.js';

class GoldPriceService {
    constructor() {
        this.goldPrices = {
            USD: null,
            EUR: null
        };
        this.lastUpdate = null;
        this.updateInterval = 5 * 60 * 1000;
        this.isUpdating = false;
    }

    async fetchGoldPrices() {
        try {
            const usdResponse = await axios.get("https://www.goldapi.io/api/XAU/USD", {
                headers: {
                    "x-access-token": process.env.GOLD_PRICE_API,
                    "Content-Type": "application/json"
                }
            });

            const eurResponse = await axios.get("https://www.goldapi.io/api/XAU/EUR", {
                headers: {
                    "x-access-token": process.env.GOLD_PRICE_API,
                    "Content-Type": "application/json"
                }
            });

            return {
                USD: usdResponse.data.price_gram_22k,
                EUR: eurResponse.data.price_gram_22k
            };
        } catch (error) {
            console.error('Error fetching gold prices:', error);
            
            if (error.response) {
                if (error.response.status === 401) {
                    throw errorHandler(401, 'Invalid API key for gold price service');
                } else if (error.response.status === 429) {
                    throw errorHandler(429, 'Rate limit exceeded for gold price API');
                } else {
                    throw errorHandler(error.response.status, `Gold price API error: ${error.response.status}`);
                }
            } else if (error.request) {
                throw errorHandler(503, 'Network error while fetching gold price');
            } else {
                throw errorHandler(500, 'Unknown error while fetching gold price');
            }
        }
    }

    async getGoldPrices() {
        const now = Date.now();

        if (!this.goldPrices.USD || !this.goldPrices.EUR || !this.lastUpdate || (now - this.lastUpdate) > this.updateInterval) {
            if (!this.isUpdating) {
                this.isUpdating = true;
                try {
                    const prices = await this.fetchGoldPrices();
                    this.goldPrices = prices;
                    this.lastUpdate = now;
                    console.log(`Gold prices updated: USD $${prices.USD}, EUR €${prices.EUR}\nlast update: ${new Date(this.lastUpdate).toLocaleString()}`);
                } catch (error) {
                    console.error('Failed to update gold prices:', error);

                    if (!this.goldPrices.USD) {
                        this.goldPrices.USD = 100;
                        console.log('Using default USD gold price: $100 per gram (22k)');
                    }
                    if (!this.goldPrices.EUR) {
                        this.goldPrices.EUR = 85;
                        console.log('Using default EUR gold price: €85 per gram (22k)');
                    }
                } finally {
                    this.isUpdating = false;
                }
            }
        }

        return this.goldPrices;
    }

    calculateProductPrice(popularityScore, weight, currency) {
        const goldPrice = this.goldPrices[currency] || this.goldPrices.USD;
        return (popularityScore + 1) * weight * goldPrice;
    }

    getLastUpdateFormatted() {
        return this.lastUpdate ? new Date(this.lastUpdate).toLocaleString() : null;
    }
}

const goldPriceService = new GoldPriceService();

export default goldPriceService; 