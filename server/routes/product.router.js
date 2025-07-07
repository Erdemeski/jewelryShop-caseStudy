import express from "express";
import { getProducts} from "../controllers/product.controller.js";

const router = express.Router();

router.get('/getproducts', getProducts);

export default router;