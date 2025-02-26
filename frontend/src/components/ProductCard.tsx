import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useCart } from "../context/Cart/CartContext";
import { useNavigate } from "react-router-dom";

interface Props {
  _id: string;
  title: string;
  image: string;
  price: string;
}

export default function ProductCard({ _id, title, image, price }: Props) {
  const { addItemToCart } = useCart();
  const navigate = useNavigate();


  const productPage = () => {
    navigate(`/product/${_id}`);
  }

  return (
    <Card>
      <CardMedia
        sx={{ height: 300, width: "100%" }}
        image={image}
        title={title}
      />
      <CardContent>
        <Button variant="text" sx={{padding: 0, background: "#ffffff"}} onClick={productPage}>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
        </Button>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {price} SAR
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          onClick={() => addItemToCart(_id)}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
