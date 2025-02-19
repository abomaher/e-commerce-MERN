import { cartModel, ICartItem } from "../models/cartModel";
import { IOrderItem, orderModel } from "../models/orderModel";
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

interface clearCart {
  userId: string;
}

export const clearCart = async ({
  userId,
}: clearCart) => {
  const cart = await getActiveCartForUser({ userId });

  cart.items = [];
  cart.totalAmount = 0;

  const updatedCart = await cart.save();

  return { data: updatedCart, statusCode: 200 };
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
  const existsInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );

  if (existsInCart) {
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
  const existsInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );

  if (!existsInCart) {
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
  const otherCartItems = cart.items.filter(
    (p) => p.product.toString() !== productId
  );

  let total = calculateCartTotalItems({cartItems: otherCartItems});

  existsInCart.quantity = quantity;
  total += existsInCart.quantity * existsInCart.unitPrice;

  cart.totalAmount = total;

  const updatedCart = await cart.save();

  return { data: updatedCart, statusCode: 200 };
};

interface deleteItemToCart {
  productId: any;
  userId: string;
}

export const deleteItemToCart = async ({
  productId,
  userId,
}: deleteItemToCart) => {
  const cart = await getActiveCartForUser({ userId });

  // Dose the item exist in the cart?
  const existsInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );

  if (!existsInCart) {
    return { data: "Item dose not exists in cart!", statusCode: 400 };
  }

  // Calculate total amount for the cart
  const otherCartItems = cart.items.filter(
    (p) => p.product.toString() !== productId
  );

  const total = calculateCartTotalItems({cartItems: otherCartItems});

  cart.items = otherCartItems;
  cart.totalAmount = total;

  const updatedCart = await cart.save();

  return { data: updatedCart, statusCode: 200 };
};

const calculateCartTotalItems = ({ cartItems }: { cartItems: ICartItem[] }) => {
  const total = cartItems.reduce((sum, product) => {
    sum += product.quantity * product.unitPrice;
    return sum;
  }, 0);

  return total;
};

interface checkout{
  userId: string;
  address: string;
}

export const checkout = async ({ userId, address }: checkout) => {

  if(!address){
    return { data: "Please add the address", statusCode: 400 };
  }

  const cart = await getActiveCartForUser({ userId });

  const orderItems: IOrderItem[] = [];

  // Loop cartItems and create orderIthems
  for(const item of cart.items){
    const product = await productModel.findById(item.product);

    if(!product){
      return { data: "Product not found", statusCode: 400 };
    }

    const orderItem: IOrderItem = {
      productTitle: product.title,
      productImage: product.image,
      quantity: item.quantity,
      unitPrice: item.unitPrice
    };

    orderItems.push(orderItem);
  }

  const order = await orderModel.create({
    orderItems,
    userId,
    total: cart.totalAmount,
    address,
  });

  await order.save();

  // Update the cart status to be completed
  cart.status = "completed";
  await cart.save();

  return { data: order, statusCode: 200 };

}
