import express from "express";
import productsRouter from './routes/products.router.js';
import cartrouter from './routes/cart.router.js'
import viewrouter from './routes/views.router.js'
import handlebars from 'express-handlebars'
import __dirname from "./utils.js";
const productServer = express();
import {Server} from 'socket.io';
import socket from './socket.js'
productServer.use(express.json());
productServer.use(express.urlencoded({ extended: true }));


productServer.engine("handlebars",handlebars.engine());
productServer.set("views",`${__dirname}/views`);
productServer.set("view engine","handlebars");


productServer.use("/api/products", productsRouter);
productServer.use("/api/carts",cartrouter);
productServer.use(express.static(`${__dirname}/public`));
productServer.use("/",viewrouter);
const httpServer=productServer.listen(8080, () => {
    try {
        console.log("Servidor arriba en el puerto 8080");
    } catch (error) {
        console.log(error);
    }
});
socket.connect(httpServer)
// const socketServer = new Server(httpServer)

// socketServer.on("connection",(socket)=>{
//     console.log("cliente conectado")
//     socket.on("message",(data)=>{
//         console.log(data);
//     })
// })