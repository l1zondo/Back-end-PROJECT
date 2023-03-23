import ProductManager from '../ProductManager.js';
import { Router } from "express";


const router = Router();
const productmanager=new ProductManager();

router.get("/",async(req,res)=>{
    const products= await productmanager.getProducts();

    res.render("home",{products});
})

router.get("/realtimeproducts", async (req,res)=>{
   
    res.render("realTimeProducts",{});
})
export default router;