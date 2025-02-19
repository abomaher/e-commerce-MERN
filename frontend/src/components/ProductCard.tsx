import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface Props {
  id: string;
  title: string;
  image: string;
  price: string;
}

export default function ProductCard({ title, image, price }: Props) {
  return (
    <Card>
      <CardMedia
        sx={{ height: 300, width: "100%" }}
        image={image}
        title={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {price} SAR
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained">Add to Cart</Button>
      </CardActions>
    </Card>
  );
}
