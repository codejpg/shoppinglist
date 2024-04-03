import React, { useState, useCallback, useEffect} from 'react';
import './App.css';
import { Products, Product } from './components/Products/Products';
import { Cart } from './components/Cart/Cart';
import { Wrapper } from './App.style';
import { BasicModal } from './components/Modal';
import { SearchBar } from './components/SearchBar/SearchBar'

const API_URL = "https://dummyjson.com/products";

function App() {
  const [cart, setCart] = useState<{ [key: number]: Product }>({});
  const [products, setProducts] = useState<Product[]>([]); 

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  //const [favorites, setFavorites] = useState<Record<number, boolean>>({});

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

  const addToCart = (product: Product) => {
    const newCart = { ...cart };
    product.selected = true;
    if (newCart[product.id]) {
      newCart[product.id].quantity += 1;
    } else {
      newCart[product.id] = { ...product, quantity: 1 };
    }
    setCart(newCart);
  };

  const toggleFavorite = (productId: number) => {
    setProducts(prevProducts => {
      const updatedProducts = prevProducts.map(p => 
        p.id === productId ? { ...p, favorite: !p.favorite } : p
      );
      console.log(updatedProducts);
      return updatedProducts;
    });
    setCart(prevCart => {
    const updatedCart = { ...prevCart };
    if (updatedCart[productId]) {
      updatedCart[productId] = { ...updatedCart[productId], favorite: !updatedCart[productId].favorite };
    }
    return updatedCart;
  });
  };

  const handleUpdateQuantity = (productId: number, operation: string) => {
    setCart(prevCart => {
      const product = prevCart[productId];
      let newQuantity = product.quantity;

      if (operation === 'increase') {
        newQuantity += 1;
      } else if (operation === 'decrease' && newQuantity > 0) {
        newQuantity -= 1;
      }
  
      return {
        ...prevCart,
        [productId]: { ...product, quantity: newQuantity }
      };
    });
  };
  const removeProduct = (productId: number) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      delete newCart[productId];
      return newCart;
    });
    setProducts(prevProducts => 
      prevProducts.map(product =>
        product.id === productId ? { ...product, selected: false } : product
      )
    );
  };

  const isInCart = useCallback((product: Product): boolean => 
  Object.keys(cart || {}).includes(product.id.toString()), 
  [cart]
);
  return (
    <>
      <div>
      </div>
      <h1>My Shopping List</h1>
      <BasicModal />
      <SearchBar products={products} toggleFavorite={toggleFavorite}/>
      <Wrapper>
        
        
      <Products products={products} addToCart={addToCart} isInCart={isInCart} toggleFavorite={toggleFavorite} cart={cart} />
        <Cart cart={cart} handleUpdateQuantity={handleUpdateQuantity} removeProduct={removeProduct} toggleFavorite={toggleFavorite} products={products}/>
      </Wrapper>
    </>
  )
}

export default App
