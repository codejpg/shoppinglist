import { FunctionComponent } from 'react';
import { Product } from '../Products/Products';
import { Quantifier } from '../Quantifier/Quantifier';
import { FavoriteButton } from './FavoriteButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


interface CartProps {
    cart: { [key: number]: Product };
    handleUpdateQuantity: (productId: number, operation: string) => void;
    removeProduct: (productId: number) => void;
    products: Product[];
    toggleFavorite: (productId: number) => void;
}

export const Cart: FunctionComponent<CartProps> = ({ cart, handleUpdateQuantity, removeProduct, toggleFavorite}) => {
  const cartItems = Object.values(cart);

  return (
    <div>
      <h1>Cart</h1>
      {cartItems.map(product => (
        <div key={product.id}>
          <h3>{product.title}</h3>
          <img src={product.thumbnail} alt={product.title} />
          <p>Quantity: {product.quantity}</p>
          <button onClick={() => toggleFavorite(product.id)}>
        {product.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </button>
          <Quantifier handleUpdateQuantity={handleUpdateQuantity} productId={product.id} removeProduct={removeProduct}/>
        </div>
      ))}
    </div>
  );
};