import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ProductDto } from '../../dto/product.dto';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductApiService {
  private readonly http = inject(HttpClient);
  private basePath = 'v1/products';

  getAll$(): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>(this.basePath);
  }
}
