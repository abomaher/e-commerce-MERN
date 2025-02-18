import { cartModel } from "../models/cartModel";
import { productModel } from "../models/productModel";

interface CreateCartForUser {
  userId: string;
}

const createCartForUser = async ({ userId }: CreateCartForUser) => {
  const cart = await cartModel.create({ userId, totalAmount: 0 });
  await cart.save();
  return cart;
};

interface GetActiveCartForUser {
  userId: string;
}

export const getActiveCartForUser = async ({
  userId,
}: GetActiveCartForUser) => {
  let cart = await cartModel.findOne({ userId, status: "active" });

  if (!cart) {
    cart = await createCartForUser({ userId });
  }

  return cart;
};

interface addItemToCart {
  productId: any;
  quantity: number;
  userId: string;
}

export const addItemToCart = async ({
  productId,
  quantity,
  userId,
}: addItemToCart) => {
  const cart = await getActiveCartForUser({ userId });

  // Dose the item exist in the cart?
  const existsCart = cart.items.find((p) => p.product.toString() === productId);

  if (existsCart) {
    return { data: "Item already exists in cart!", statusCode: 400 };
  }

  // Fetch the product
  const product = await productModel.findById(productId);

  if (!product) {
    return { data: "Product not found!", statusCode: 400 };
  }

  if (product.stock < quantity) {
    return { data: "Low stock for item!", statusCode: 400 };
  }

  cart.items.push({
    product: productId,
    unitPrice: product.price,
    quantity: quantity,
  });

  // Update the totalAmount for the cart
  cart.totalAmount += product.price * quantity;

  const updatedCart = await cart.save();

  return { data: updatedCart, statusCode: 200 };
};

interface updateItemToCart {
  productId: any;
  quantity: number;
  userId: string;
}

export const updateItemToCart = async ({
  productId,
  quantity,
  userId,
}: updateItemToCart) => {
  const cart = await getActiveCartForUser({ userId });

  // Dose the item exist in the cart?
  const existsCart = cart.items.find((p) => p.product.toString() === productId);

  if (!existsCart) {
    return { data: "Item dose not exists in cart!", statusCode: 400 };
  }

  // Fetch the product
  const product = await productModel.findById(productId);

  if (!product) {
    return { data: "Product not found!", statusCode: 400 };
  }

  if (product.stock < quantity) {
    return { data: "Low stock for item!", statusCode: 400 };
  }


  // Calculate total amount for the cart 
  const otherCartItems = cart.items.filter((p) => p.product.toString() !== productId);

  let total = otherCartItems.reduce((sum, product) => {
    sum += product.quantity * product.unitPrice;
    return sum;
  }, 0)

  existsCart.quantity = quantity;
  total += existsCart.quantity * existsCart.unitPrice;

  cart.totalAmount =  total;

  const updatedCart = await cart.save();

  return { data: updatedCart, statusCode: 200 };

}