import { useState } from 'react';
import { getProducts } from '../../data/product';
import CreateProductDialog from './create-product-dialoag';
import FilterProduct from './filter-product';
import ListProduct from './list-product';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

interface Product {
  id: string;
  name: string;
  price: number;
}

const Product = () => {
  const [openDialogCreateProduct, setOpenDialogCreateProduct] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get('idPedido');
  const name = searchParams.get('nameProduct');
  const price = searchParams.get('priceProduct');

  const { data: products, isLoading } = useQuery({
    queryKey: ['products', id, name, price],
    queryFn: () => getProducts({ id, name, price }),
    // refetchOnWindowFocus: true, //abrir nova aba
    // refetchInterval: 1000 * 5,
    // retry: 5,
  });

  return (
    <>
      <FilterProduct handleOpen={() => setOpenDialogCreateProduct(true)} />
      {isLoading ? (
        <Box sx={{ display: 'flex', width: '60%' }}>
          <CircularProgress />
        </Box>
      ) : (
        <ListProduct products={products || []} />
      )}
      <CreateProductDialog
        open={openDialogCreateProduct}
        handleClose={() => setOpenDialogCreateProduct(false)}
      />
    </>
  );
};

export default Product;
