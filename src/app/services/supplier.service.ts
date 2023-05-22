import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Supplier } from '../components/supplier/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  url: string = 'http://localhost:3000/Supplier';

  constructor(private http: HttpClient) { }

  getSupplier(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.url);
  }

  saveSupplier(supplier: Supplier): Observable<Supplier>{
    return this.http.post<Supplier>(this.url, supplier);
  }

  removeSupplier(supplier: Supplier): Observable<void> {
    return this.http.delete<void>(`${this.url}/${supplier.id}`);
  }

  updateSupplier(supplier: Supplier): Observable<Supplier> {
    return this.http.put<Supplier>(`${this.url}/${supplier.id}`, supplier);
  }
}
