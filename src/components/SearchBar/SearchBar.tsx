import React, { FunctionComponent, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { Product } from '../Products/Products';
import Box from '@mui/material/Box';
import { SearchOptions } from './SearchOptions';

interface SearchProps {
    products: Product[];
    toggleFavorite: (productId: number) => void;
  }

function sleep(duration: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export const SearchBar: FunctionComponent<SearchProps> = ({products,toggleFavorite}) =>{
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
        <Box component="li" {...props}>
          <img src={option.thumbnail} alt={option.title} style={{ marginRight: 8 }} />
          {option.title}
          <SearchOptions productsId={option.id} toggleFavorite={toggleFavorite}/>
        </Box>
      )}
    />
  );
}
