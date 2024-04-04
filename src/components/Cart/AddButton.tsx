import { FunctionComponent } from 'react';
import { Product } from '../Products/Products';

interface AddButtonProps {
    product: Product;
    addToCart: (product: Product) => void;
  }

export const AddButton: FunctionComponent<AddButtonProps> = ({ product, addToCart}) => {
    return (
      
        <button
        disabled={product.selected}
        onClick={() => addToCart(product)}
      >
        {product.selected ? "Added" : "Add to list"}
      </button>
    );
  };
