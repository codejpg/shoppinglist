import { FunctionComponent } from "react";
import { ProductTitle, ProductsContainer } from "./Products.style";
import { FavoriteButton } from "../Cart/FavoriteButton";
import { AddButton } from "../Cart/AddButton";
import { ProductImage } from "./ProductImage";
import { ProductCard } from "./ProductCard";


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
          <ProductsContainer>
          {products.map((product: Product) => (
            <ProductCard product={product} toggleFavorite={toggleFavorite} addToCart={addToCart} cart={false} handleUpdateQuantity={handleUpdateQuantity}
             removeProduct={removeProduct}  />
       
          ))}
          </ProductsContainer>
        </div>
      </section>
    </div>
  );
};
