import * as React from "react";
import { useState, FunctionComponent } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { Product } from "./Products/Products";

const style = {
  position: "absolute" as "absolute",
  top: "10%",
  left: "10%",
  width: "80vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

interface ModalProps {
  onAddProduct: (product: Product) => void;
}
export const BasicModal: FunctionComponent<ModalProps> = ({onAddProduct}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    title: "",
    image: "",
    price: 0,
    description: "",
    thumbnail: "https://www.kurin.com/wp-content/uploads/placeholder-square.jpg",
    quantity: 0,
    favorite: false,
    selected: false,
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Add the new product
    onAddProduct(newProduct);
    handleClose();
    console.log(newProduct);
    // Reset the form fields
    setNewProduct({ id: 0, title: '', image: '', price: 0, description: '', thumbnail: 'https://www.kurin.com/wp-content/uploads/placeholder-square.jpg', quantity: 0, favorite: false, selected: false });
  };
  return (
    <div>
      <Button onClick={handleOpen}>Add new product</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create product
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Title"
              value={newProduct.title}
              variant="outlined"
              type="string"
              onChange={(e) => setNewProduct({ ...newProduct, title: String(e.target.value) })}
            />
            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={5}
                label="Description"
                value={newProduct.description}
                variant="outlined"
                type="string"
                onChange={(e) => setNewProduct({ ...newProduct, description: String(e.target.value) })}
              />
            </FormControl>
            <TextField
              id="outlined-number"
              label="Price"
              value={newProduct.price}
              variant="outlined"
              type="number"
              onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
            />
            <Button
              type="submit"
              variant="contained"
            >
              Create
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
