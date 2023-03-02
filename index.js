import ProductManager from './desafios.js';
const manager = new ProductManager();
const operacionesProductos = async () => {
    try {



       await manager.getProducts();

        // let product1 = await manager.addProduct("PR01", "Mouse Inalambrico Logitech", "Negro con led roja", 200, "mouse.jpg", 50)
        // console.log(product1);
        // let product2 = await manager.addProduct("PR02", "Teclado Inalambrico Logitech", "Blanco", 100, "teclado.jpg", 25)
        // console.log(product2)
              let product3 = await manager.addProduct("PR03", "Teclado Inalambrico Kingston", "Blanco", 100, "teclado.jpg", 25)
        console.log(product3)
         let productoId= await manager.getProductById(2)
         console.log(productoId);
        // let productAct = await manager.updateProduct(1, "Mouse");
        //  console.log(productAct);
        // let deleteproduct1 = await manager.deleteProducts(1);
        // console.log(deleteproduct1)
    } catch (error) {
        console.log(error);
    }


}
operacionesProductos();