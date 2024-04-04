import { FunctionComponent, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export type Operation = "decrease" | "increase";

interface Props {
  removeProduct: (productId: number) => void;
  handleUpdateQuantity: (productId: number, operation: Operation) => void;
  productId: number;
}

export const Quantifier: FunctionComponent<Props> = ({
  removeProduct,
  handleUpdateQuantity,
  productId,
}) => {
  const [value, setValue] = useState<number>(1);
  useEffect(() => {
    if (value === 0) {
      removeProduct(productId);
    }
  }, [value, removeProduct, productId]);

  const reduce = (): void => {
    handleUpdateQuantity(productId, "decrease");
    setValue((prevState) => prevState - 1);
  };

  const increase = (): void => {
    handleUpdateQuantity(productId, "increase");
    setValue((prevState) => prevState + 1);
  };

  return (
    <div>
       <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid gray', borderRadius: '40px' }}>
       <Button
        value="check"
        onClick={reduce}
        sx={{
          minWidth: "30px",
          textAlign: "center",
          border: "none",
          backgroundColor: "none",
          '& .MuiInputBase-input': {
            border: 'none',
            minWidth: "30px",
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: 'none', 
              minWidth: "30px",
            },
          },
        }}
      >
      -
    </Button>
      <TextField
   
        type="number"
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
        InputLabelProps={{
          shrink: true,
        }}
        sx={{
          width: "50px",
          textAlign: "right",
          border: "none",
          backgroundColor: "none",
          '& .MuiInputBase-input': {
            border: 'none',
            '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
              '-webkit-appearance': 'none',
              margin: 0,
            },
            '-moz-appearance': 'textfield',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: 'none', 
            },
          },
        }}
      />
      
    <Button
        value="check"
        onClick={increase}
        sx={{
          minWidth: "30px",
          textAlign: "center",
          border: "none",
          backgroundColor: "none",
        }}
      >
      +
    </Button>
    </Box>
    </div>
  );
};
