import { useState, useCallback, useEffect } from "react";
import "./App.css";
import { Products, Product } from "./components/Products/Products";
import { Cart } from "./components/Cart/Cart";
import { ProductsContainer, PageWrapper, Wrapper } from "./App.style";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { Header } from "./components/Header/Header";
import { Typography } from "@mui/material";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const API_URL = "https://dummyjson.com/products";

function App() {
  const [cart, setCart] = useState<{ [key: number]: Product }>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

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
          favorite: false,
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
    setTotalPrice(totalPrice + product.price);
  };

  const toggleFavorite = (productId: number) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((p) =>
        p.id === productId ? { ...p, favorite: !p.favorite } : p
      );
      console.log(updatedProducts);
      return updatedProducts;
    });
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[productId]) {
        updatedCart[productId] = {
          ...updatedCart[productId],
          favorite: !updatedCart[productId].favorite,
        };
      }
      return updatedCart;
    });
  };

  const handleUpdateQuantity = (productId: number, operation: string) => {
    setCart((prevCart) => {
      const product = prevCart[productId];
      let newQuantity = product.quantity;

      if (operation === "increase") {
        newQuantity += 1;
        setTotalPrice(totalPrice + product.price);
      } else if (operation === "decrease" && newQuantity > 0) {
        newQuantity -= 1;
        setTotalPrice(totalPrice - product.price);
      }

      return {
        ...prevCart,
        [productId]: { ...product, quantity: newQuantity },
      };
    });
  };
  const removeProduct = (productId: number) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      delete newCart[productId];
      return newCart;
    });
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, selected: false } : product
      )
    );
    setTotalPrice(
      totalPrice - cart[productId].price * cart[productId].quantity
    );
  };
  const addProduct = (product: Product) => {
    fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: product.title,
        description: product.description,
        price: product.price,
      }),
    })
      .then((res) => res.json())
      .then(console.log);

    setProducts((prevProducts) => [...prevProducts, product]);
  };

  const handleDelete = () => {
    setCart({});
    setTotalPrice(0);
    setProducts((prevProducts) =>
      prevProducts.map((product) => ({ ...product, selected: false }))
    );
  };

  const isInCart = useCallback(
    (product: Product): boolean =>
      Object.keys(cart || {}).includes(product.id.toString()),
    [cart]
  );
  return (
    <>
      <PageWrapper>
        <Typography variant="h2" >My Shopping List</Typography>
  
      <Wrapper>
        <ProductsContainer>
        <Header
        addProduct={addProduct}
        products={products}
        toggleFavorite={toggleFavorite}
        addToCart={addToCart}
      />
        <Products
              products={products}
              addToCart={addToCart}
              isInCart={isInCart}
              toggleFavorite={toggleFavorite}
              cart={cart} handleUpdateQuantity={handleUpdateQuantity}
              removeProduct={removeProduct}  />
        </ProductsContainer>
        <ProductsContainer>
        <Cart
              totalPrice={totalPrice}
              cart={cart}
              handleUpdateQuantity={handleUpdateQuantity}
              removeProduct={removeProduct}
              toggleFavorite={toggleFavorite}
              products={products}
              handleDelete={handleDelete} addToCart={addToCart}/>
        </ProductsContainer>
      </Wrapper>
      </PageWrapper>
    </>
  );
}

export default App;
