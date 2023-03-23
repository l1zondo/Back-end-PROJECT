import fs from "fs";

import { Blob } from "buffer";
import ProductManager from "./ProductManager.js";

const productmanager = new ProductManager();
export default class CartManager {
    constructor() {
        this.cart = [];
        this.pathfiles = "./files";
        this.path = "./files/Cart.json";
    }
    getCart = async () => {
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
            console.error(`Error to read the file ${this.path} ${error}`);
            return [];
        }

    }
    createCart = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const result = JSON.parse(data);
                const otherCart = { id: result.length + 1, products: [] }
                result.push(otherCart)
                await fs.promises.writeFile(this.path, JSON.stringify(result, null, "\t"));
                return `Cart created`;
            } else {

                const newCart = { id: this.cart.length + 1, products: [] }
                this.cart.push(newCart);
                await fs.promises.writeFile(this.path, JSON.stringify(this.cart, null, "\t"));
                return `Cart created`

            }
        } catch (error) {
            console.error(`Error to read the file ${this.path} ${error}`);
            return [];
        }
    }
    addProducttoCart = async (cId, idProd, quantity) => {
        try {

            if (isNaN(cId) || cId <= 0) {
                return `The id ${cId} of this cart has a invalid value or does not exist`
            }

            if (isNaN(idProd) || idProd <= 0) {
                return `The id ${idProd} of this product has a invalid value or does not exist`
            }

            const carts = await this.getCart();
            const cartIdFounded = carts.findIndex((cart) => cart.id === Number.parseInt(cId));

            const products = await productmanager.getProducts();
            const productIdFounded = products.findIndex((prod) => prod.id === Number.parseInt(idProd));
            if (cartIdFounded === -1) {
                return `The cart with the id ${cId} does not exist in the file`
            }

            if (productIdFounded === -1) {
                return `The product with the id ${idProd} does not exist in the file`
            }
            let productToAdd = {}
            if (isNaN(quantity) || quantity <= 0) {
                productToAdd = {
                    id: Number.parseInt(idProd),
                    quantity: 1
                };
            } else {
                productToAdd = {
                    id: Number.parseInt(idProd),
                    quantity: Number.parseInt(quantity)
                };
            }



            const cartIdFound = carts.findIndex((cart) => cart.id === parseInt(cId));
            const productIdFound = carts[cartIdFound].products.findIndex((prod) => prod.id === parseInt(idProd))
            if (cartIdFound !== -1) {
                if (productIdFound !== -1) {
                    if (isNaN(quantity) || quantity <= 0) {
                        carts[cartIdFound].products[productIdFound].quantity++;
                    } else {
                        carts[cartIdFound].products[productIdFound].quantity += Number.parseInt(quantity)
                    }
                } else {
                    carts[cartIdFound].products.push(productToAdd);
                }
                await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
                return carts;
            } else {
                return `The cart with this ID does not exist`;
            }
        } catch (error) {
            console.log(error)
        }

    }

    getCartById = async (id) => {

        try {
            if (fs.existsSync(this.path)) {

                if (isNaN(id) || id <= 0) {
                    return `The cart has an invalid id`
                }
                const result = await this.getCart();

                let indexValue = result.find((event) => event.id === Number.parseInt(id));

                if (indexValue!==undefined) {
                    
                    return indexValue;
                }else{
                    return `The cart with that id does not exist`
                }


            }
        } catch (error) {
            console.log(error);
        }


    }

}