import { Injectable } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  private readonly productList: ProductDto[] = [
    {
      id: 1,
      name: 'Mouse',
      price: 1500,
    },
    {
      id: 2,
      name: 'Keyboard',
      price: 2500,
    },
  ];

  getProducts() {
    return this.productList;
  }

  getProductById(id: number): ProductDto {
    return this.productList.find(product => product.id === id);
  }
}
