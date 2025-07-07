import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import productRoutes from './routes/product.router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


app.use('/api/product', productRoutes);


app.get('/', (req, res) => {
    res.json({
        message: 'Jewelry Shop API is running!',
        endpoints: {
            products: '/api/product/getproducts'
        }
    });
});

app.use(express.static(path.join(__dirname, '/client/dist')));


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/dist/index.html'));
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error!';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});