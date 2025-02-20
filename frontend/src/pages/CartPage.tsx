import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../context/Auth/AuthContext";
import { BASE_URL } from "../constants/BaseUrl";

const CartPage = () => {
    const { token } = useAuth();
    const [cart, setCart] = useState();
    const [error, setError] = useState('');

    useEffect(() => {

        if(!token){
            return;
        }

        const fetchCart = async () => {
            const response = await fetch(`${BASE_URL}/cart`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if(!response.ok){
                setError('Fsiled to fetch user cart. Please try again.');
            }

            const data = await response.json();
            setCart(data);
        };
    
        fetchCart();
      }, [token]);

console.log({cart});
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h6">My Cart</Typography>
      {error && <Typography sx={{color: "red"}}>{error}</Typography>}
    </Container>
  );
};

export default CartPage;

