import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ProductApiService } from './api/product-api.service';
import { ProductDto } from '../dto/product.dto';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly productApiService = inject(ProductApiService);
  private readonly _products$ = new BehaviorSubject<ProductDto[]>([]);
  private _isLoading$ = new BehaviorSubject<boolean>(true);
  readonly isLoading$ = this._isLoading$.asObservable();
  readonly products$ = this._products$.asObservable();

  getAll$(): Observable<ProductDto[]> {
    this._isLoading$.next(true);
    return this.productApiService
      .getAll$()
      .pipe(tap((products) => {
        this._products$.next(products);
        this._isLoading$.next(false);
      }));
  }
}
