import { FunctionComponent, useEffect, useState } from "react";
import { ImageContainer, ProductCard, ProductTitle, ProductsContainer } from "./Products.style";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { FavoriteButton } from "../Cart/FavoriteButton";

const API_URL = "https://dummyjson.com/products";

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



export const Products: FunctionComponent<ProductsProps> = ({ addToCart, toggleFavorite}) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  

  useEffect(() => {
    fetchData(API_URL);
  }, []);

  async function fetchData(url: string) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        const productsWithFavorites = data.products.map((product: any) => ({
          ...product,
          favorite: false
        }));
        setProducts(productsWithFavorites);
        setIsLoading(false);
      } else {
        setError(true);
        setIsLoading(false);
      }
    } catch (error) {
      setError(true);
      setIsLoading(false);
    }
  }

  

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
              <button onClick={() => toggleFavorite(product.id)}>
        {product.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </button>
              <button
                disabled={product.selected}
                onClick={() => addToCart(product)}
              >
                {product.selected ? "In Cart" : "Add to Cart"}
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
