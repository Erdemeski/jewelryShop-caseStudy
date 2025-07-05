import dotenv from "dotenv";
dotenv.config();
import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
    res.json({
        message: 'Jewelry Shop API is running!'
    });
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