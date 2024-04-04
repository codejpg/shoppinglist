import styled from 'styled-components';

export const ProductsContainer = styled.div`
  text-align: left;
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 2fr));
  grid-gap: 20px;
  min-width: 30vw;
`;

export const ImageContainer = styled.div`
    display: flex;
    border-radius: 10px;
    justify-content: center;
    overflow: hidden;
    object-fit: contain;
    width: 100px;
    height: 100px;

    `;

export const ProductCard2 = styled.div`
  display: grid;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const ProductTitle = styled.div`
  font-size: 1.2rem;
  margin: 0;
  height: 20%;
`;