import fs from "fs";
import express from "express";
import { Blob } from "buffer";
export default class ProductManager {
    constructor() {
        this.products = [];
        this.pathfiles = "./files";
        this.path = "./files/Products.json";
    }

    productServer = express();
    returnObject = async () => {
        const data = await fs.promises.readFile(this.path, 'utf-8');
        const result = JSON.parse(data);
        return result;

    }

    getProducts = async () => {
        try {
            if (!fs.existsSync(this.pathfiles)) {
                fs.mkdirSync(this.pathfiles)
            }
            if (fs.existsSync(this.path)) {

                const data = await fs.promises.readFile(this.path, 'utf-8');

                const size = new Blob([data]).size;
                if (size > 0) {
                    const result = JSON.parse(data);
                    return result;
                } else {
                    return [];
                }
            } else {
                return [];
            }
        } catch (error) {
            console.log(error)
        }

    }
    addProduct = async (productObject) => {

        try {

            productObject.stock > 0
                ? productObject = { status: true, ...productObject }
                : productObject = { status: false, ...productObject }



            // if (productObject.thumbnail[1].hasOwnProperty("fieldname")) {
            //     const imgPaths = productObject.thumbnail.map(prod => prod.path);
            //     productObject.thumbnail = imgPaths;
            // }

            const products = await this.getProducts();
            const productIndex = await products.findIndex((prod) => prod.code === productObject.code);

            if (productIndex === -1) {
                products.length === 0
                    ? productObject = { id: 1, ...productObject }
                    : productObject = { id: products[products.length - 1].id + 1, ...productObject }
                products.push(productObject);
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
                return productObject;
            }

        } catch (error) {
            console.log(error);
        }

    }

    getProductById = async (id) => {

        try {
            if (fs.existsSync(this.path)) {
                const result = await this.getProducts();

                let indexValue = result.find((event) => event.id === id);

                return indexValue;

            }
        } catch (error) {
            console.log(error);
        }



    }
    deleteProducts = async (id) => {
        try {
            const products = await this.getProducts()
            let productFounded = products.findIndex((product) => product.id === id)
            if (productFounded !== -1) {
                const valor = products.filter((event) => event.id != id);
                await fs.promises.writeFile(this.path, JSON.stringify(valor, null, "\t"))
                return "Product eliminated";
            } else {
                return productFounded;
            }
        } catch (error) {
            console.log(error)
        }

    }
    updateProduct = async (idUpdate, productUpdate) => {
        try {
            const products = await this.getProducts();
            if (products === "error") {
                return "The file is empty";
            }
            let productExists = products.findIndex((product) => product.id === idUpdate)
            if (productExists !== -1) {

                const productoAmodificar = products.filter((product) => product.id === idUpdate);

                const productoModificado = {
                    id: idUpdate,
                    title: productUpdate.title ?? productoAmodificar[0].title,
                    description: productUpdate.description ?? productoAmodificar[0].description,
                    code: productUpdate.code ?? productoAmodificar[0].code,
                    status: productUpdate.status ?? productoAmodificar[0].status,
                    price: productUpdate.price ?? productoAmodificar[0].price,
                    category: productUpdate.category ?? productoAmodificar[0].category,
                    thumbnail: productUpdate.thumbnail ?? productoAmodificar[0].thumbnail,
                    stock: productUpdate.stock ?? productoAmodificar[0].stock

                }

                products[idUpdate - 1] = productoModificado;

                //console.log(this.products)
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
            } else {
                return productExists;
            }
        } catch (error) {
            console.log(error)
        }

    }
}
