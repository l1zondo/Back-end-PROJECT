import ProductManager from './ProductManager.js';
import express from "express";
const manager = new ProductManager();
const productServer = express();



productServer.get("/products", async (req, res) => {
    try {
        const consulta = await manager.getProducts();
        let limit = Number.parseInt(req.query.limit)

        if (limit) {
         
            const resultado = consulta.slice(0, limit);
            res.send(resultado);
        } else {
      
            res.send(consulta);
        }
    } catch (error) {
        console.log(error)
    }
});

productServer.get("/products/:pid", async (req, res) => {
    try {
        let id = req.params.pid
        console.log(id)
        const consultaId = await manager.getProductById(Number.parseInt(id));
        if (!consultaId) {
            console.log("ej");
            return res.send({ error: "El producto con ese id no se encuentra en el archivo" });
        } else {
            res.send(consultaId);
        }
    } catch (error) {
        console.log(error);
    }
});

productServer.listen(8080, () => {
    try {
        console.log("Servidor arriba en el puerto 8080");
    } catch (error) {
        console.log(error);
    }
});