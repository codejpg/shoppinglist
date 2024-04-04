import * as React from "react";
import { useState, FunctionComponent } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Product } from "../../Products/Products";
import Grid from "@mui/material/Grid";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "50vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

interface ModalProps {
  onAddProduct: (product: Product) => void;
  products: Product[];
}
export const NewProductModal: FunctionComponent<ModalProps> = ({
  onAddProduct,
  products,
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    title: "",
    image: "",
    price: 0,
    description: "",
    category: "",
    thumbnail:
      "https://www.kurin.com/wp-content/uploads/placeholder-square.jpg",
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
    setNewProduct({
      id: 0,
      title: "",
      image: "",
      price: 0,
      description: "",
      category: "",
      thumbnail:
        "https://www.kurin.com/wp-content/uploads/placeholder-square.jpg",
      quantity: 0,
      favorite: false,
      selected: false,
    });
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
        <Box sx={{ ...style, width: "50%", mx: "auto", p: 2 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create product
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              "& > :not(style)": { m: 1, width: "95%" },
            }}
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={3}>
              <Grid item xs={20}>
                <TextField
                  id="outlined-basic"
                  label="Title"
                  value={newProduct.title}
                  variant="outlined"
                  type="string"
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      title: String(e.target.value),
                      id: Number(products.length + 1),
                    })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-number"
                  label="Price (€)"
                  value={newProduct.price}
                  variant="outlined"
                  type="number"
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      price: Number(e.target.value),
                    })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  rows={5}
                  fullWidth={true}
                  label="Description"
                  value={newProduct.description}
                  variant="outlined"
                  type="string"
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: String(e.target.value),
                    })
                  }
                />
              </Grid>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item xs={0}>
                <Button type="submit" variant="contained">
                  Create
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
