import { ButtonBase, Grid, Paper, Typography } from "@mui/material";

import { FunctionComponent } from "react";
import { Product } from "./Products";
import { ProductImage } from "./ProductImage";
import { FavoriteButton } from "../Cart/FavoriteButton";
import { AddButton } from "../Cart/AddButton";
import { ProductTitle } from "./Products.style";
import { Quantifier } from "../Quantifier/Quantifier";
import DeleteIcon from "@mui/icons-material/Delete";


interface ProductCardProps {
  product: Product;
  toggleFavorite: (productId: number) => void;
  addToCart: (product: Product) => void;
  cart: boolean;
  handleUpdateQuantity: (productId: number, operation: string) => void;
    removeProduct: (productId: number) => void;
}

export const ProductCard: FunctionComponent<ProductCardProps> = ({
  product,
  addToCart,
  toggleFavorite,
  cart,
    handleUpdateQuantity,
    removeProduct,
}) => {
  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        width: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <Grid container spacing={3}>
        <Grid item>
          <ProductImage product={product} />
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={3}>
            <Grid item>
              <Typography gutterBottom variant="subtitle1" component="div">
                <ProductTitle>{product.title}</ProductTitle>
              </Typography>
              <Typography variant="body2" gutterBottom>
                {product.description}
              </Typography>
              <Typography variant="body2" color="text.secondary"></Typography>
            </Grid>
            <Grid item></Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              <h3>{product.price}€</h3>
            </Typography>
            <Grid item>
              <FavoriteButton
                product={product}
                toggleFavorite={toggleFavorite}
              />
            </Grid>
            <Grid item xs={20}>
                {cart ? <><Quantifier handleUpdateQuantity={handleUpdateQuantity}
                              productId={product.id}
                              removeProduct={removeProduct} />
                        <DeleteIcon onClick={() => removeProduct(product.id)} /></> : <AddButton addToCart={addToCart} product={product} />}
              
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
