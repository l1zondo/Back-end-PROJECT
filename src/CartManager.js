import fs from "fs";

import { Blob } from "buffer";


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
                return `Carrito creado`;
            } else {

                const newCart = { id: this.cart.length + 1, products: [] }
                this.cart.push(newCart);
                await fs.promises.writeFile(this.path, JSON.stringify(this.cart, null, "\t"));
                return `Carrito creado2`

            }
        } catch (error) {
            console.error(`Error to read the file ${this.path} ${error}`);
            return [];
        }
    }
    addProducttoCart = async (cId, idProd) => {
        try {
            const productToAdd = {
                id: parseInt(idProd),
                quantity: 1,
              };
        
              const carts = await this.getCart();
        
              const cartIdFound = carts.findIndex((cart) => cart.id === parseInt(cId));
              const productIdFound = carts[cartIdFound].products.findIndex((prod) => prod.id === parseInt(idProd)) // Searches for a product ID inside a Cart ID.
        
              if (cartIdFound !== -1) {
                if ( productIdFound !== -1 ) {
                  carts[cartIdFound].products[productIdFound].quantity++;
                } else {
                  carts[cartIdFound].products.push(productToAdd);
                }
                await fs.promises.writeFile(this.path,JSON.stringify(carts, null, "\t"));
              } else {
                throw new Error(`Add: Carrito en ID ${cId} NO EXISTE`);
              }
           
        } catch (error) {
            console.log(error)
        }
    
    }

    getCartById = async (id) => {

        try {
            if (fs.existsSync(this.path)) {
                const result = await this.getCart();

                let indexValue = result.find((event) => event.id === id);
                console.log(indexValue)
                return indexValue;

            }
        } catch (error) {
            console.log(error);
        }


    }
    
}