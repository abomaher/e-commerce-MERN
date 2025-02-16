import { prodictModel } from "../models/productModel";

export const getAllProducts = async () => {
    return await prodictModel.find();
}

export const seedInitialProducts = async () => {
    const products = [
        { title: "Iphone 16 pro", image: "https://alephksa.com/cdn/shop/files/iPhone_16_Pro_Black_Titanium_PDP_Image_Position_1__en-ME_e3fe2d51-c0d4-46c7-98cc-d9bf76d98746.jpg", price: 5200, stock: 5 },
        { title: "Imac 27 inch 2024", image: "https://i.ebayimg.com/images/g/CyYAAOSw~2Rmv8qy/s-l1200.jpg", price: 6000, stock: 10 }
    ];

    const existingProducts = await getAllProducts();

    if(existingProducts.length === 0){
        await prodictModel.insertMany(products);
    }

}
