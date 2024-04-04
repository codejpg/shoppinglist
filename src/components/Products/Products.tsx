import { FunctionComponent, useEffect, useState } from "react";
import { ImageContainer, ProductCard, ProductTitle, ProductsContainer } from "./Products.style";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { FavoriteButton } from "../Cart/FavoriteButton";
import { AddButton } from "../Cart/AddButton";
import { ProductImage } from "./ProductImage";


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
              <ProductImage product={product} />
              <h3>{product.price}€</h3>
              <p>{product.quantity}</p>
              <p>{product.description}</p>
              <FavoriteButton product={product} toggleFavorite={toggleFavorite} />
              <AddButton addToCart={addToCart} product={product} />
            </div>
            </ProductCard>
          ))}
          </ProductsContainer>
        </div>
      </section>
    </div>
  );
};
