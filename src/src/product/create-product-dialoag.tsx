import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { createProduct } from '../../data/product';
import { queryClient } from '../../lib/react-query';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
  id: yup.string(),
  name: yup
    .string()
    .required('Name is required')
    .min(5, 'Name must be at least 5 characters long'),
  price: yup
    .number()
    .required('Price is required')
    .positive('Price must be positive'),
});

type CreateProductForm = {
  id?: string;
  name: string;
  price: number;
};

interface Props {
  open: boolean;
  handleClose: () => void;
}

const CreateProductDialog: React.FC<Props> = ({ open, handleClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductForm>({
    resolver: yupResolver(schema),
  });

  const handleCreateProduct = async (data: CreateProductForm) => {
    try {
      await createProductFn({
        ...data,
        id: crypto.randomUUID(),
      });
      handleClose();

      toast.success('Product successfully registered.');
    } catch (err) {
      toast.error('Error while registering the product.');
    }
  };

  const { mutateAsync: createProductFn } = useMutation({
    mutationFn: createProduct,
    onSuccess(_, variables) {
      queryClient.setQueryData(['products'], prev => [
        ...prev,
        {
          id: variables.id,
          name: variables.name,
          price: variables.price,
        },
      ]);
    },
  });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={'lg'} fullWidth>
      <DialogTitle>Add Product</DialogTitle>
      <DialogContent>
        <DialogContentText>Please enter product details:</DialogContentText>
        <form onSubmit={handleSubmit(handleCreateProduct)}>
          <TextField
            autoFocus
            {...register('name')}
            required
            autoComplete="false"
            margin="dense"
            id="name"
            label="Product Name"
            fullWidth
            variant="standard"
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            {...register('price')}
            required
            margin="dense"
            id="price"
            label="Product Price"
            type="number"
            fullWidth
            variant="standard"
            error={!!errors.price}
            helperText={errors.price?.message}
          />
          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Add Product
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductDialog;
