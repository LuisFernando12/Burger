import { IProduct } from './product.interface';

export interface ICreateRequest {
  //   status: 'PENDING' | 'RECEIVED' | 'IN_PREPARATION' | 'READY' | 'CANCELED';
  clientId: number;
  productIds: [number];
}
export interface IRequest {
  createdAt: Date;
  status: 'PENDING' | 'RECEIVED' | 'IN_PREPARATION' | 'READY' | 'CANCELED';
  clientId: number;
  products: Omit<IProduct, 'ingredientIds'>[];
}
