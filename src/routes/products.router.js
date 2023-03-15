import ProductManager from '../ProductManager.js';
import { Router } from "express";

const router = Router();

// router.get("/", (req, res) => {
//     res.send({ pets });
// );
const manager = new ProductManager();

router.get("/", async (req, res) => {
    try {
        const consulta = await manager.getProducts();

        let limit = req.query.limit


        if (!consulta) {
            return res.status(404).send({
                message: { error: `No products found in the list` },
            });
        }

        if (limit) {
            if (isNaN(limit)) {
                return res.status(400).send({

                    message: { error: `The limit written ${limit} is not a valid value` },
                });
            }
            const resultado = consulta.slice(0, limit);

            return res.status(200).send({
                status: "success",
                message: { products: resultado },
            });
        } else {
            return res.status(200).send({
                status: "success",
                message: { products: consulta },
            });
        }
    } catch (error) {
        console.log(error)
    }
});

router.get("/:pid", async (req, res) => {
    try {
        let id = req.params.pid

        if (isNaN(id) || id < 1) {
            return res.status(400).send({
                status: "error",
                message: { error: `This product has not a valid ID` },
            });
        }


        const consultaId = await manager.getProductById(Number.parseInt(id));
        if (!consultaId || consultaId == 0) {

            return res.status(400).send({ status: "error", message: "This product  with this ID does not exist in the list" });
        } else {
            res.status(200).send({
                status: "success",
                message: { product: consultaId },
            });
        }
    } catch (error) {
        console.log(error);
    }
});
//router.post("/", uploader.array("thumbnails"), async (req,
// router.post("/", async (req, res) => {
//     try {
//         let product = req.body;
//         console.log(product);
//         if (!product.title || !product.description || !product.code || !product.price || !product.stock || !product.category) {
//             return res.status(400).send({
//                 status: "error",
//                 message: { error: "All the fields must not be empty" },
//             });
//         }

//         const products = await manager.getProducts()
//         const productIndex = await products.findIndex((prod) => prod.code === product.code);
//         if (productIndex !== -1) {
//             return res.status(400).send({
//                 status: "error",
//                 message: { error: `The product with the code${product.code} exist in the list` },
//             });
//         }
//         // if (req.files) products.thumbnail = req.files;
//         // console.log(req.files)
//         // if (!req.files && !products.thumbnail) {
//         //     return res.status(400).send({
//         //         status: "error",
//         //         message: { error: `No se pudieron guardar las miniaturas` },
//         //     });
//         // }
//         //  product = await manager.addProduct(product);
//         //return res.send(product);
//         return res.status(201).send({
//             status: "success",
//             message: {
//                 success: `Product ${product.title} successfully added`,
//                 id: `${product.id}`,
//             },
//         });

//     } catch (error) {
//         console.log(error)
//     }
// })
router.post("/", async (req, res) => {
    let newProduct = req.body;
    console.log(newProduct);
    if (!newProduct.title || !newProduct.description || !newProduct.code || !newProduct.price || !newProduct.stock || !newProduct.category ) {
      return res.status(400).send({
        status: "error",
        message: { error: "Todos los campos son obligatorios" },
      });
    }
  
    if (newProduct.id || newProduct.id == 0) {
      return res.status(400).send({
        status: "error",
        message: { error: "Producto sin ID Asignado" },
      });
    }
  
    // if (req.files) newProduct.thumbnails = req.files;
  
    // if (!req.files && !newProduct.thumbnails) {
    //   return res.status(400).send({
    //     status: "error",
    //     message: { error: `No se pudieron guardar las miniaturas` },
    //   });
    // }
  
    const products = await manager.getProducts()
    const productIndex = await products.findIndex((prod) => prod.code === newProduct.code);
  
    if (productIndex !== -1) {
      return res.status(400).send({
        status: "error",
        message: { error: `This product has exist in the list` },
      });
    }
  
    newProduct = await manager.addProduct(newProduct);
  
    return res.status(201).send({
      status: "success",
      message: {
        success: `Product successfully added`
      
      },
    });
  });
  
router.put("/:pid", async (req, res) => {
    try {
        const product = req.body;
        const id = req.params.pid;


        if (!product) {
            return res.status(400).send({
                status: "error",
                message: { error: "The fields does not have any value" },
            });
        }
        if (isNaN(id) || id <= 0) {
            return res.status(400).send({
                status: "error",
                message: { error: `${updatePos} Id with a invalid position` },
            });
        }
        if (product.id) {
            return res.status(400).send({
                status: "error",
                message: { error: "The ID of this product can not change" },
            });
        }
        console.log(id);
        console.log(product)
        let result = await manager.updateProduct(Number.parseInt(id), product);

        if (result === -1) {
            return res.status(404).send({
                status: "error",
                message: { error: `The list has not any products with this Id` },
            });
        }
        return res.status(200).send({
            status: "success",
            message: { update: `The product was updated` },
        });
    } catch (error) {
        console.log(error);
    }
})
router.delete("/:pid", async (req, res) => {
    try {
        const id = req.params.pid;
        if (!id) {
            return res.status(400).send({
                status: "error",
                message: { error: "The Id does not exist" },
            });
        }

        if (isNaN(id) || id <= 0) {
            return res.status(400).send({
                status: "error",
                message: { error: `The id has not a valid value` },
            });
        }

        let result = await manager.deleteProducts(Number.parseInt(id));
        if (result === -1) {
            return res.status(404).send({
                status: "error",
                message: { error: `The product with this Id does not exist in the list` },
            });
        }
        return res.status(200).send({
            status: "success",
            message: {
                delete: `The product was sucessfully eliminated`,
            },
        });

    } catch (error) {
        console.log(error);
    }
});

export default router;