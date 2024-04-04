import { Grid } from "@mui/material";
import { FunctionComponent } from "react";
import { Product } from "../Products/Products";
import { SearchBar } from "../SearchBar/SearchBar";
import { NewProductModal } from "../NewProductModal";


interface HeaderProps {
  products: Product[];
  toggleFavorite: (productId: number) => void;
  addToCart: (product: Product) => void;
  addProduct: (product: Product) => void;
}

export const Header: FunctionComponent<HeaderProps> = ({
  products,
  toggleFavorite,
  addToCart,
  addProduct,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs>
      <SearchBar
            products={products}
            toggleFavorite={toggleFavorite}
            addToCart={addToCart}
          />
          
      </Grid>
      <Grid item xs={2}>
      
          
      <NewProductModal onAddProduct={addProduct} products={products} />
      </Grid>
    </Grid>
  );
};
