import React, { FunctionComponent, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { Product } from '../Products/Products';
import Box from '@mui/material/Box';
import { SearchOptions } from './SearchOptions';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { ProductImage } from '../Products/ProductImage';

//  Sources of Snippets: 
//          Grid: https://mui.com/material-ui/react-grid/
//          Search: https://mui.com/material-ui/react-autocomplete/#search-input

interface SearchProps {
    products: Product[];
    toggleFavorite: (productId: number) => void;
    addToCart: (product: Product) => void;
  }

function sleep(duration: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export const SearchBar: FunctionComponent<SearchProps> = ({products,toggleFavorite, addToCart}) =>{
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Product[]>([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      //await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions([...products]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="search-bar"
      sx={{ width: '80vw', height: '10vh'}}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      getOptionLabel={(option) => option.title}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search products"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
          
                {params.InputProps.endAdornment}

              </React.Fragment>
            ),
          }}
        />
      )}
      renderOption={(props, option) => (
         <Paper
         sx={{
           p: 2,
           margin: 'auto',
           flexGrow: 1,
         }}
       >
         <Grid container spacing={2} component="li" {...props}>
           <Grid item>
             <ButtonBase sx={{ width: 128, height: 128 }}>
       
                <ProductImage product={option} />
               
             </ButtonBase>
           </Grid>
           <Grid item xs={12} sm container>
             <Grid item xs container direction="column" spacing={2}>
               <Grid item xs>
                 <Typography gutterBottom variant="subtitle1" component="div">
                 {option.title}
                 </Typography>
                 <Typography variant="body2" gutterBottom>
                   {option.description}
                 </Typography>
               </Grid>
               <Grid item>
                 <Typography sx={{ cursor: 'pointer' }} variant="body2">
                   Remove
                 </Typography>
               </Grid>
             </Grid>
             <Grid item>
               <Typography variant="subtitle1" component="div">
               <SearchOptions productsId={option.id} toggleFavorite={toggleFavorite} product={option} addToCart={addToCart}/>
        
               </Typography>
             </Grid>
           </Grid>
         </Grid>
       </Paper>
      )}
    />
  );
}
