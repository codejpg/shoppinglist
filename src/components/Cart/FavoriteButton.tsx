import React, { FunctionComponent } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Product } from '../Products/Products';

interface FavoriteButtonProps {
    product: Product;
    toggleFavorite: (product: Product) => void;
  }

export const FavoriteButton: FunctionComponent<FavoriteButtonProps> = ({ product, toggleFavorite }) => {
    return (
      <button onClick={() => toggleFavorite(product)}>
        {product.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </button>
    );
  };