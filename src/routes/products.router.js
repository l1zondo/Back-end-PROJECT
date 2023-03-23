import ProductManager from '../ProductManager.js';
import { Router } from "express";
import { uploader } from '../utils.js';
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


        const consultaId = await manager.getProductById(Number.parseInt(id));
        if (typeof (consultaId) === "string") {
            return res.status(400).send({ status: "error", message: consultaId });
        }
        return res.status(200).send({
            status: "success",
            message: { product: consultaId },
        });

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
router.post("/", uploader.array("thumbnails"), async (req, res) => {
    let product = req.body;

    let filesToadd = req.files
    console.log(product)



    if (!filesToadd) {
        return res.status(400).send({
            status: "error",
            message: { error: `No se pudieron guardar las miniaturas` },
        });
    }
    product.thumbnails = [];
    if (filesToadd) {
        filesToadd.forEach(files => {
            const imgUrladd = `http://localhost:8080/images/${files.filename}`;
            product.thumbnails.push(imgUrladd)
        });
    }
    let result = await manager.addProduct(product);

    if (typeof (result) === "string") {
        return res.status(400).send({
            status: "error",
            message: { error: result },
        });
    }


    res.status(201).send({
        status: "success",
        message: {
            success: `Product successfully added`

        },
    });
});

router.put("/:pid", uploader.array("thumbnails"), async (req, res) => {
    try {
        const product = req.body;
        const id = req.params.pid;
        const filesToUpdate=req.files
        
        product.thumbnails = [];
        if (filesToUpdate) {
            filesToUpdate.forEach(files => {
                const imgUrlUpdate = `http://localhost:8080/images/${files.filename}`;
                product.thumbnails.push(imgUrlUpdate)
            });
        }
        let result = await manager.updateProduct(Number.parseInt(id), product);

        if (typeof (result) === "string") {
            return res.status(404).send({
                status: "error",
                message: { error: result },
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
        console.log(id)

        let result = await manager.deleteProducts(id);
        if (typeof (result) === "string") {
            return res.status(404).send({
                status: "error",
                message: { error: result },
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