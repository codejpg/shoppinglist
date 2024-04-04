import { FunctionComponent } from "react";
import { Product } from "../Products/Products";
import { Quantifier } from "../Quantifier/Quantifier";
import { FavoriteButton } from "./FavoriteButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { ProductImage } from "../Products/ProductImage";
import { Button } from "@mui/material";
import { CartContainer } from "./Cart.style";
import { ProductCard } from "../Products/ProductCard";

interface CartProps {
  cart: { [key: number]: Product };
  handleUpdateQuantity: (productId: number, operation: string) => void;
  removeProduct: (productId: number) => void;
  products: Product[];
  toggleFavorite: (productId: number) => void;
  totalPrice: number;
  handleDelete: () => void;
  addToCart: (product: Product) => void;
}

export const Cart: FunctionComponent<CartProps> = ({
  totalPrice,
  cart,
  handleUpdateQuantity,
  removeProduct,
  toggleFavorite,
  handleDelete,
  addToCart,
}) => {
  const cartItems = Object.values(cart);

  return (
    <div>
      <CartContainer>
        <p>My Products</p> <Button onClick={handleDelete}>delete all</Button>

        {cartItems.map((product: Product) => (
          <div key={product.id}>
            <ProductCard
              product={product}
              handleUpdateQuantity={handleUpdateQuantity}
              removeProduct={removeProduct}
              toggleFavorite={toggleFavorite}
              cart={true} addToCart={addToCart}/>
          </div>
        ))}

        <p>Total Price: ${totalPrice}</p>
        
      </CartContainer>
    </div>
  );
};
