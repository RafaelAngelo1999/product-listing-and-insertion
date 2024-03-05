import { Button, Grid, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSearchParams } from 'react-router-dom';

interface FilterProduct {
  idPedido: string;
  nameProduct: string;
  priceProduct: string;
}

const schema = yup.object().shape({
  idPedido: yup.string(),
  nameProduct: yup.string(),
  priceProduct: yup.string().notRequired(),
});

interface FilterProductProps {
  handleOpen: () => void;
}

const FilterProduct: React.FC<FilterProductProps> = ({ handleOpen }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleFilter = (data: FilterProduct) => {
    setSearchParams(state => {
      if (data.idPedido) {
        state.set('idPedido', data.idPedido);
      } else {
        state.delete('idPedido');
      }

      if (data.nameProduct) {
        state.set('nameProduct', data.nameProduct);
      } else {
        state.delete('nameProduct');
      }

      if (data.priceProduct) {
        state.set('priceProduct', data.priceProduct);
      } else {
        state.delete('priceProduct');
      }

      console.log(state);
      return state;
    });
  };

  console.log(searchParams);
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Filtros
      </Typography>
      <form
        onSubmit={handleSubmit(data => handleFilter(data as FilterProduct))}
      >
        <Grid
          container
          spacing={2}
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item xs={8} container spacing={2}>
            <Grid item>
              <TextField
                {...register('idPedido')}
                id="idPedido"
                label="ID Product"
                type="search"
                variant="outlined"
                error={!!errors.idPedido}
                helperText={
                  errors.idPedido ? errors.idPedido.message?.toString() : ''
                }
              />
            </Grid>
            <Grid item>
              <TextField
                {...register('nameProduct')}
                id="nameProduct"
                label="Name Product"
                type="search"
                variant="outlined"
                error={!!errors.nameProduct}
                helperText={
                  errors.nameProduct
                    ? errors.nameProduct.message?.toString()
                    : ''
                }
              />
            </Grid>
            <Grid item>
              <TextField
                {...register('priceProduct')}
                id="priceProduct"
                label="Price Product"
                type="search"
                variant="outlined"
                error={!!errors.priceProduct}
                helperText={errors.priceProduct?.message?.toString() || ''}
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            xs={4}
            justifyContent="flex-end"
            alignItems="center"
          >
            <Grid item>
              <Button
                size="large"
                variant="contained"
                endIcon={<SendIcon />}
                color="secondary"
                onClick={handleOpen}
              >
                Add Product
              </Button>
            </Grid>
            <Grid item>
              <Button
                type="submit"
                size="large"
                variant="contained"
                endIcon={<SendIcon />}
              >
                Filter
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default FilterProduct;
