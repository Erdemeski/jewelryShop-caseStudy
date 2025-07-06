import axios from 'axios';
import { errorHandler } from './error.js';

class GoldPriceService {
    constructor() {
        this.goldPrice = null;
        this.lastUpdate = null;
        this.updateInterval = 5 * 60 * 1000;
        this.isUpdating = false;
    }

    async fetchGoldPrice() {
        try {
            const response = await axios.get("https://www.goldapi.io/api/XAU/USD", {
                headers: {"x-access-token": process.env.GOLD_PRICE_API,
                    "Content-Type": "application/json"}
            });
            const result = response.data;
            return result.price_gram_22k;
        } catch (error) {
            console.error('Error fetching gold price:', error);
            
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

    async getGoldPrice() {
        const now = Date.now();

        if (!this.goldPrice || !this.lastUpdate || (now - this.lastUpdate) > this.updateInterval) {
            if (!this.isUpdating) {
                this.isUpdating = true;
                try {
                    this.goldPrice = await this.fetchGoldPrice();
                    this.lastUpdate = now;
                    console.log(`Gold price updated: $${this.goldPrice}`);
                } catch (error) {
                    console.error('Failed to update gold price:', error);

                    if (!this.goldPrice) {
                        this.goldPrice = 100;
                        console.log('Using default gold price: $100 per gram (22k)');
                    }
                } finally {
                    this.isUpdating = false;
                }
            }
        }

        return this.goldPrice;
    }

    calculateProductPrice(popularityScore, weight) {
        return (popularityScore + 1) * weight * this.goldPrice;
    }
}

const goldPriceService = new GoldPriceService();

export default goldPriceService; 