import { FunctionComponent } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Product } from '../Products/Products';

interface FavoriteButtonProps {
    product: Product;
    toggleFavorite: (productId: number) => void;
  }

export const FavoriteButton: FunctionComponent<FavoriteButtonProps> = ({ product, toggleFavorite }) => {
    return (
      
      <button onClick={() => toggleFavorite(product.id)}>
        {product.favorite ?  <FavoriteIcon /> : <FavoriteBorderIcon />}
      </button>
    );
  };

  export const Favorite: FunctionComponent<FavoriteButtonProps> = ({ product}) => {
    return (
      
      <div>
        {product.favorite ?  <FavoriteIcon /> : <FavoriteBorderIcon />}
      </div>
    );
  };