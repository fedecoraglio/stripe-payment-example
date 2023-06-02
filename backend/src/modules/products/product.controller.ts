import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getProducts(): ProductDto[] {
    return this.productService.getProducts();
  }

  @Get('/:id')
  getProductId(@Param('id') id: number): ProductDto {
    return this.productService.getProductById(id);
  }
}
