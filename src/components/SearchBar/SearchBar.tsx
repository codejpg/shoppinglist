import React, { FunctionComponent, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { Product } from '../Products/Products';
import { SearchOptions } from './SearchOptions';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
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
      sx={{ minWidth: '30vw', height: '50px'}}
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
                 p: 3,
                 margin: 'auto',
                 flexGrow: 1,
             }}
         >
         <Grid container spacing={3} component="li" {...props}>
           <Grid item>
         
       
                <ProductImage product={option} />
               
        
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
                 
               </Grid>
             </Grid>
             <Grid item>
               <Typography variant="subtitle1" component="div">
               { <SearchOptions productsId={option.id} toggleFavorite={toggleFavorite} product={option} addToCart={addToCart}/>}
        
               </Typography>
             </Grid>
           </Grid>
         </Grid>
       </Paper>
      )}
    />
  );
}
