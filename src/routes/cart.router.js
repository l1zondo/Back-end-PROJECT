import ProductManager from "../ProductManager.js";
import CartManager from "../CartManager.js";
import { Router } from "express";

const router = Router();

const productmanager = new ProductManager();
const cartmanager = new CartManager();

router.post("/", async (req, res) => {
    try {

        await cartmanager.createCart();
        return res.status(201).send({
            status: "success",
            message: {
                success: "Cart created",
            },
        });
    } catch (error) {
        console.log(error)
    }
})

router.get("/:cid", async (req, res) => {
    try {
        const id = req.params.cid



        if (isNaN(id) || id <= 0) {
            return res.status(400).send({
                status: "error",
                message: { error: `The id ${id} has an invalid value` },
            });
        }
        const cart = await cartmanager.getCartById(Number.parseInt(id));
        if (cart == 0) {
            return res.status(404).send({
                status: "error",
                message: { error: `The cart with the ID ${cid} does not exist` },
            });
        }
      


        return res.status(200).send({
            status: "success",
            message: { cart: cart },
        });
    } catch (error) {
        console.log(error)
    }
})

router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const cId = req.params.cid

        const pId = req.params.pid
        if (isNaN(cId) || cId <= 0) {
            return res.status(400).send({
                status: "error",
                message: { error: `The id ${pId} of this product has a invalid or does not exist` },
            });
        }

        if (isNaN(pId) || pId <= 0) {
            return res.status(400).send({
                status: "error",
                message: { error: `The id ${pId} of this product has a invalid value or does not exist` },
            });
        }

        const carts = await cartmanager.getCart();
        const cartIdFounded = carts.findIndex((cart) => cart.id === Number.parseInt(cId));

        const products = await productmanager.getProducts();
        const productIdFounded = products.findIndex((prod) => prod.id === Number.parseInt(pId));
        if (cartIdFounded === -1) {
            return res.status(400).send({
                status: "error",
                message: { error: `The cart with the id ${cId} does not exist in the file` },
            });
        }

        if (productIdFounded === -1) {
            return res.status(400).send({
                status: "error",
                message: { error: `The product with the id ${pId} does not exist in the file` },
            });
        }
       await cartmanager.addProducttoCart(Number.parseInt(cId), Number.parseInt(pId));

        return res.status(201).send({
            status: "success",
            message: {
                success: `Product successfully added`,
            },
        });
    } catch (error) {
        console.log(error)
    }
})
export default router;