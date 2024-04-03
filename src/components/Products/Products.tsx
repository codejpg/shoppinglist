import { FunctionComponent, useEffect, useState } from "react";
import { ImageContainer, ProductCard, ProductTitle, ProductsContainer } from "./Products.style";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { FavoriteButton } from "../Cart/FavoriteButton";


export type Product = {
  id: number;
  title: string;
  price: number;
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
}



export const Products: FunctionComponent<ProductsProps> = ({ products, addToCart, toggleFavorite}) => {

  

  return (
    <div>
      <section>
        <h1>Products</h1>

        <div>
          <ProductsContainer>
          {products.map((product: Product) => (
            <ProductCard>
            <div key={product.id}>
              <ProductTitle><h2>{product.title}</h2></ProductTitle>
              <ImageContainer><img src={product.thumbnail} alt={product.title} /></ImageContainer>
              <h3>{product.price}€</h3>
              <p>{product.quantity}</p>
              <FavoriteButton product={product} toggleFavorite={toggleFavorite} />
              <button
                disabled={product.selected}
                onClick={() => addToCart(product)}
              >
                {product.selected ? "Added" : "Add to list"}
              </button>
            </div>
            </ProductCard>
          ))}
          </ProductsContainer>
        </div>
      </section>
    </div>
  );
};
