class ProductManager {
    constructor(){
        this.products = []
    }


}

addProduct = (prodTitle, prodDescription, prodPrice, prodThumbnail, prodCode, prodStock) => {
    const productIndex = this.products.findIndex((product) => product.prodCode === prodCode)

    if (!prodTitle || !prodDescription ||!prodPrice ||!prodThumbnail ||!prodCode || !prodStock){
        console.log("Error: all fields are mandatory")
        return;
    }
}