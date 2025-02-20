import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useCart } from "../context/Cart/CartContext";
import { useRef } from "react";

const CheckoutPage = () => {
  const { cartItems, totalAmount } = useCart();

    const addressRef = useRef<HTMLInputElement>(null);

  const readerItemsInCart = () => {
    return (
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        sx={{
          border: 1,
          borderColor: "#cccccc",
          borderRadius: 3,
          padding: 2,
        }}
      >
        {cartItems.map((item) => (
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              gap={2}
              width="100%"
            >
              <img src={item.image} width={50} height={50} />
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
              >
                <Typography variant="h6">{item.title}</Typography>
                <Typography>
                  {item.quantity} x {item.unitPrice} SAR
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
        <Box>
          <Typography variant="body2" sx={{textAlign:"right"}}>
            Total Amount: {totalAmount.toFixed(2)} EGP
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Container fixed sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4" marginBottom={5}>
          Checkout
        </Typography>
      </Box>
        <TextField inputRef={addressRef} fullWidth label="Delivery Address" name="address" />
      {readerItemsInCart()}
      <Button variant="contained" fullWidth>Pay Now</Button>

    </Container>
  );
};

export default CheckoutPage;
