import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SupplierService } from 'src/app/services/supplier.service';
import { Supplier } from './supplier';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  supplier: Supplier[] = [];
  formGroupSupplier: FormGroup;
  isEditing: boolean = false;

  constructor(private supplierService: SupplierService, private formBuilder: FormBuilder) {

    this.formGroupSupplier = formBuilder.group({
      id: [''],
      name: [''],
      active: [''],
      category: ['Regional'],
      contact: ['']
    })
  }

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers() {
    this.supplierService.getSupplier().subscribe({
      next: data => this.supplier = data
    })
  }

  saveSupplier() {
    if(this.isEditing) {
      this.isEditing = false;
      this.supplierService.updateSupplier(this.formGroupSupplier.value).subscribe({
        next: data => {
          this.loadSuppliers();
          this.formGroupSupplier.reset();
        }
      })
    }
    else {
      this.supplierService.saveSupplier(this.formGroupSupplier.value).subscribe({
        next: data => {
          this.supplier.push(data);
          this.formGroupSupplier.reset();
        }
      })
    }

  }

  editSupplier(supplier: Supplier): void {
    this.formGroupSupplier.setValue(supplier);
    this.isEditing = true;
  }

  removeSupplier(supplier: Supplier): void {
    this.supplierService.removeSupplier(supplier).subscribe({
      next: () => {
        this.supplier.splice(this.supplier.indexOf(supplier), 1);
      }
    })
  }

}
