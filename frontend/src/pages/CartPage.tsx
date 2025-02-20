import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../context/Auth/AuthContext";
import { BASE_URL } from "../constants/BaseUrl";
import { useCart } from "../context/Cart/CartContext";

const CartPage = () => {
    const { token } = useAuth();
    const [error, setError] = useState('');
    const { cartItems, totalAmount } = useCart();

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h6">My Cart</Typography>
      {cartItems.map((item) => (
        <Box>{item.title}</Box>
      ))}
      {error && <Typography sx={{color: "red"}}>{error}</Typography>}
    </Container>
  );
};

export default CartPage;

