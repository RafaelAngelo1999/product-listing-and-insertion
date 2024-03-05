import axiosInstance from '../lib/axios';

interface FilterProductRequest {
  id?: string | null;
  name?: string | null;
  price?: string | null;
}

export async function getProducts({ id, name, price }: FilterProductRequest) {
  await wait(1000);

  try {
    const response = await axiosInstance.get('/products', {
      params: {
        id,
        name,
        price,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao obter produtos:', error);
    throw error;
  }
}

interface CreateProductRequest {
  id: string;
  name: string;
  price: number;
}

export async function createProduct(data: CreateProductRequest) {
  // await wait(1000);

  try {
    const response = await axiosInstance.post('/products', {
      id: data.id,
      name: data.name,
      price: data.price,
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar produto:', error);
    throw error;
  }
}

function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
