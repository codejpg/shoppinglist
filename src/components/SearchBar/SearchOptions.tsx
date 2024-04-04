import { FunctionComponent } from 'react';
import { Product } from '../Products/Products';
import { FavoriteButton } from '../Cart/FavoriteButton';
import { AddButton } from '../Cart/AddButton';

interface SearchOptionProps {
    toggleFavorite: (productId: number) => void;
    product: Product;
    addToCart: (product: Product) => void;
  }


export const SearchOptions: FunctionComponent<SearchOptionProps> = ({ toggleFavorite, product, addToCart}) =>{

    return (
        <div>
        <p>Add to list <AddButton addToCart={addToCart} product={product} /></p>
        <p>Save for later <FavoriteButton toggleFavorite={toggleFavorite} product={product}/></p>
        </div>
    );
}