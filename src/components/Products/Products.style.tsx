import styled from 'styled-components';

export const ProductsContainer = styled.div`
  text-align: center;
  padding: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  width: 55vw;
  grid-gap: 20px;
`;

export const ImageContainer = styled.div`
    display: flex;
    border-radius: 10px;
    justify-content: center;
    overflow: hidden;
    width: 300px;
    height: 300px;

    `;

export const ProductCard = styled.div`
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