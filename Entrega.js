class ProductManager {
    constructor(){
        this.products = []
    }



addProduct = (prodTitle, prodDescription, prodPrice, prodThumbnail, prodCode, prodStock) => {

    const productIndex = this.products.findIndex((product) => product.prodCode === prodCode)

    if (!prodTitle || !prodDescription ||!prodPrice ||!prodThumbnail ||!prodCode || !prodStock){
        console.log("Error: all fields are mandatory")
        return;
    }

if (productIndex === -1){
    const product = {
        prodId: this.products.lenght +1,
        prodTitle,
        prodDescription,
        prodPrice,
        prodThumbnail,
        prodCode,
        prodStock,
    };
    this.products.push(product);
    console.log(`Product with code ${prodCode}added succesfully`)
    } else{
        console.log(`Error: Product with code ${prodCode} already exists`);
    }
};

getProducts = () => {
    console.log(this.products);
    return this.products;
}

getProductById = (productId) => {
    const productIdFound =this.products.findIndex((prod) => prod.prodId === productId);
    if (productIdFound === -1){
        console.log (`Error: Product with ID ${productId}:`);
        console.log(this.products[productIdFound])
    }
};
}