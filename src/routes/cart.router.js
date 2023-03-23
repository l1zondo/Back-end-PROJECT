import ProductManager from "../ProductManager.js";
import CartManager from "../CartManager.js";
import { Router } from "express";

const router = Router();


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
        const cart = await cartmanager.getCartById(id);
        if (typeof(cart)==="string") {
            return res.status(404).send({
                status: "error",
                message: { error:cart},
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
        const cId=req.params.cid
        const pId=req.params.pid
        const cantidad=req.body.quantity
        console.log(cantidad)
      
        let cart= await cartmanager.addProducttoCart(cId,pId,cantidad);
        if(typeof(cart) === "string"){
            return res.status(400).send({ status: "error", message: cart });
        }
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