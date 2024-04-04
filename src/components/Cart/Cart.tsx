import { FunctionComponent } from 'react';
import { Product } from '../Products/Products';
import { Quantifier } from '../Quantifier/Quantifier';
import { FavoriteButton } from './FavoriteButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import { ProductImage } from '../Products/ProductImage';
import { Button } from '@mui/material';


interface CartProps {
    cart: { [key: number]: Product };
    handleUpdateQuantity: (productId: number, operation: string) => void;
    removeProduct: (productId: number) => void;
    products: Product[];
    toggleFavorite: (productId: number) => void;
    totalPrice: number;
    handleDelete: () => void;
}

export const Cart: FunctionComponent<CartProps> = ({ totalPrice, cart, handleUpdateQuantity, removeProduct, toggleFavorite, handleDelete}) => {
  const cartItems = Object.values(cart);

  return (
    <div>
      <h1>Cart</h1>
      {cartItems.map((product: Product) => (
        <div key={product.id}>
          <h3>{product.title}</h3>
          <ProductImage product={product} />
          <p>{product.price}€</p>
          <FavoriteButton product={product} toggleFavorite={toggleFavorite} />
          <Quantifier handleUpdateQuantity={handleUpdateQuantity} productId={product.id} removeProduct={removeProduct}/>
          <DeleteIcon onClick={() => removeProduct(product.id)} />
        </div>
      ))}
      <p>Total Price: ${totalPrice}</p>
      <Button onClick={handleDelete}>clear cart</Button>
    </div>
  );
};