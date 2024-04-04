import { ImageContainer} from "./Products.style";
import { Product } from "./Products";
import { FunctionComponent } from 'react';

interface ProductImageProps {
    product: Product;
  }

  export const ProductImage: FunctionComponent<ProductImageProps> = ({product}) => {
  return (
    <ImageContainer>
      <img src={product.thumbnail} alt={product.title} />
    </ImageContainer>
  );
}