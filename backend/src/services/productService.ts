import { productModel } from "../models/productModel";

export const getAllProducts = async () => {
  return await productModel.find();
};

interface getProduct{
  productId: string;
}

export const getProduct = async ({ productId }: getProduct) => {
  return await productModel.findById(productId);
};

export const seedInitialProducts = async () => {
  try {
    const products = [
      {
        title: "Iphone 16 pro",
        image:
          "https://alephksa.com/cdn/shop/files/iPhone_16_Pro_Black_Titanium_PDP_Image_Position_1__en-ME_e3fe2d51-c0d4-46c7-98cc-d9bf76d98746.jpg",
        price: 5200,
        stock: 5,
      },
      {
        title: "Imac 27 inch 2024",
        image: "https://i.ebayimg.com/images/g/CyYAAOSw~2Rmv8qy/s-l1200.jpg",
        price: 6000,
        stock: 10,
      },
      {
        title: "Toshiba Laptop",
        image: "https://teletraders.net/wp-content/uploads/2021/06/sell-used-toshiba-laptops.png",
        price: 1000,
        stock: 3,
      },
    ];

    const existingProducts = await getAllProducts();

    if (existingProducts.length === 0) {
      await productModel.insertMany(products);
    }
  } catch (err) {
    console.error("Cannot seed database", err);
  }
};
