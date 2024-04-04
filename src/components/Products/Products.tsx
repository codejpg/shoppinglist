import { FunctionComponent } from "react";
import { ProductsContainer } from "./Products.style";
import { ProductCard } from "./ProductCard";
import  { Grid } from "@mui/material";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
  image: string;
  quantity: number;
  favorite: boolean;
  selected: boolean;
  category: string;
};

interface ProductsProps {
  addToCart: (product: Product) => void;
  isInCart: (product: Product) => void;
  toggleFavorite: (productId: number) => void;
  cart: { [key: number]: Product };
  products: Product[];
  handleUpdateQuantity: (productId: number, operation: string) => void;
  removeProduct: (productId: number) => void;
}



export const Products: FunctionComponent<ProductsProps> = ({ products, addToCart, toggleFavorite, handleUpdateQuantity, removeProduct }) => {

  

  return (
    <div>
      <section>
        <p>new products</p>

        <div>
        <Grid container spacing={2}>
          <ProductsContainer>
          {products.map((product: Product) => (
            <Grid item xs={12} sm={6} key={product.id}>
            <ProductCard product={product} toggleFavorite={toggleFavorite} addToCart={addToCart} cart={false} handleUpdateQuantity={handleUpdateQuantity}
             removeProduct={removeProduct}  />
       </Grid>
          ))}
          </ProductsContainer>
          </Grid>
        </div>
      </section>
    </div>
  );
};
