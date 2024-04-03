import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

const style = {
    position: 'absolute' as 'absolute',
    top: '10%',
    left: '10%',
    width: '80vw',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: '10px',
    p: 4,
  };
export function BasicModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
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
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" label="Title" variant="outlined" />
          <FormControl fullWidth sx={{ m: 1 }}>
          <TextField  id="outlined-multiline-static"
          multiline
          rows={5}
          label="Description" variant="outlined" />
          </FormControl>
          <TextField id="outlined-number" label="Price" variant="outlined" type="number" />
          <Button variant="contained">Create</Button>
        </Box>
          </Box>
        </Modal>
      </div>
    );
  }