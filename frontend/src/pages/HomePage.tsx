import { Box, Container, Grid } from "@mui/material";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { Product } from "../types/Prodects";
import { BASE_URL } from "../constants/BaseUrl";

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
        try{
            const response = await fetch(`${BASE_URL}/product`);
            const data = await response.json();
            setProducts(data);
        } catch {
            setError(true)
        }
    }

    fetchData();
  }, []);

  if(error){
    return <Box>Somthing went wrong, please try again!</Box>
  }

  return (
    <Container sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        {products.map((p) => (
          <Grid item md={3}>
            <ProductCard {...p} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
