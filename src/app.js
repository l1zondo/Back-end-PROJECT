
import express from "express";
import productsRouter from './routes/products.router.js';
import cartrouter from './routes/cart.router.js'

const productServer = express();


productServer.use(express.json());
productServer.use(express.urlencoded({ extended: true }));
// productServer.use(express.static(`${__dirname}/public`));

productServer.use("/api/products", productsRouter);
productServer.use("/api/carts",cartrouter);

productServer.listen(8080, () => {
    try {
        console.log("Servidor arriba en el puerto 8080");
    } catch (error) {
        console.log(error);
    }
});