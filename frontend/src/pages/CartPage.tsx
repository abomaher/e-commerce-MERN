import { Box, Container, Typography } from "@mui/material";
import { useCart } from "../context/Cart/CartContext";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

const CartPage = () => {
  const {
    cartItems,
    totalAmount,
    updateItemInCart,
    removeItemInCart,
    clearCart,
  } = useCart();

  const handleQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      return;
    }

    updateItemInCart(productId, quantity);
  };

  const handleRemoveItem = (productId: string) => {
    removeItemInCart(productId);
  };

  const readerItemsInCart = () => {
    return (
      <Box display="flex" flexDirection="column" gap={4}>
        {cartItems.map((item) => (
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              border: 1,
              borderColor: "#cccccc",
              borderRadius: 3,
              padding: 2,
            }}
          >
            <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
              <img src={item.image} width={100} height={100} />
              <Box>
                <Typography variant="h5">{item.title}</Typography>
                <Typography>
                  {item.quantity} x {item.unitPrice} SAR
                </Typography>
                <Button onClick={() => handleRemoveItem(item.productId)}>
                  Remove Item
                </Button>
              </Box>
            </Box>

            <ButtonGroup variant="contained" aria-label="Basic button group">
              <Button
                onClick={() =>
                  handleQuantity(item.productId, item.quantity - 1)
                }
              >
                -
              </Button>
              <Button
                onClick={() =>
                  handleQuantity(item.productId, item.quantity + 1)
                }
              >
                +
              </Button>
            </ButtonGroup>
          </Box>
        ))}
        <Box>
          <Typography variant="h5">
            Total Amount: {totalAmount.toFixed(2)} SAR
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Container fixed sx={{ mt: 4 }}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4" marginBottom={5}>
          My Cart
        </Typography>
        <Button onClick={() => clearCart()}>Clear Cart</Button>
      </Box>

      {cartItems.length ? (
        readerItemsInCart()
      ) : (
        <Typography>
          Cart is empty. Please start shopping and add items first.
        </Typography>
      )}
    </Container>
  );
};

export default CartPage;
