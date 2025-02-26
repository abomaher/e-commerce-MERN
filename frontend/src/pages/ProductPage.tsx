import {
  Box,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Product } from "../types/Prodects";
import { BASE_URL } from "../constants/BaseUrl";
import { useCart } from "../context/Cart/CartContext";
import AlertDialog from "../components/AlertDialog";

const ProductPage = () => {
  const [error, setError] = useState("");
  const params = useParams();
  const [product, setProduct] = useState<Product>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { addItemToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/product/${params.id}`);

        if (!response.ok) {
          setError("Can not found this product!");
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, [params]);

  const handleQuantity = (type: string) => {
    if (type === "plus") {
      if (parseInt(product?.stock) <= quantity) {
        setError("The quantity bigger than stock!");
        return;
      }
      setQuantity(quantity + 1);
    } else {
      if (quantity <= 1) {
        return;
      }
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 5000);
  }, [error]);

  return (
    <>
      {error && <AlertDialog text={error} type="warning" />}

      <Container
        sx={{
          mt: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Box>
          <Grid container spacing={4}>
            <Grid item md={12}>
              <div role="presentation">
                <Breadcrumbs aria-label="breadcrumb">
                  <Button variant="text" onClick={() => navigate("/")}>
                    Home
                  </Button>
                  <Button variant="text" onClick={() => navigate("/category")}>
                    Smart Phone
                  </Button>
                  <Typography sx={{ color: "text.primary" }}>
                    {product?.title}
                  </Typography>
                </Breadcrumbs>
              </div>
            </Grid>
            <Grid item md={6}>
              <Box sx={{ border: 1, borderColor: "#cccccc" }}>
                <img src={product?.image} width="100%" />
              </Box>
            </Grid>
            <Grid item md={6}>
              <Typography variant="h4">{product?.title}</Typography>
              <Typography>{product?.price} SAR</Typography>
              <Typography>
                <div
                  dangerouslySetInnerHTML={{ __html: product?.description }}
                />
              </Typography>

              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  mt: 5,
                  mb: 5,
                }}
              >
                <Box display="flex" flexDirection="row" alignItems="center">
                  <Box>
                    <Typography variant="h6">Quantity</Typography>
                  </Box>
                </Box>

                <ButtonGroup variant="outlined">
                  <Button onClick={() => handleQuantity("")}>-</Button>
                  <Button>{quantity}</Button>
                  <Button onClick={() => handleQuantity("plus")}>+</Button>
                </ButtonGroup>
              </Box>

              <Box>
                <Button
                  fullWidth
                  size="large"
                  variant="outlined"
                  onClick={() => addItemToCart(product?._id, quantity)}
                >
                  Add to Cart
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default ProductPage;
