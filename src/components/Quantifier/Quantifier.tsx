import { FunctionComponent, useState, useEffect } from "react";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import ToggleButton from '@mui/material/ToggleButton';

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
  const [selected, setSelected] = useState(false);
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
      <input type="button" value="-" onClick={reduce} />
      <TextField
        id="outlined-number"
        type="number"
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
        InputLabelProps={{
          shrink: true,
        }}
      />
    <ToggleButton
        value="check"
        selected={selected}
        onClick={increase}
        onChange={() => {
          setSelected(!selected);
        }}
      >
      +
    </ToggleButton>
     
    </div>
  );
};
