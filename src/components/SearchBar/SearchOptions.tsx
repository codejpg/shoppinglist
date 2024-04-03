import { FunctionComponent } from 'react';
import { Product } from '../Products/Products';
import { FavoriteButton } from '../Cart/FavoriteButton';

interface SearchOptionProps {
    productsId: number;
    toggleFavorite: (productId: number) => void;
  }


export const SearchOptions: FunctionComponent<SearchOptionProps> = ({productsId, toggleFavorite}) =>{

    return (
        <div>
        <p>Add to list</p>
        <p>Save for later <FavoriteButton toggleFavorite={toggleFavorite} productId={productsId}/></p>

        <p>{productsId}</p>
        </div>
    );
}