import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';



@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  freshnessList = ["Brand New", "Second Hand", "Refurbished"]
  productForm!: FormGroup
  actionButton: string ="Save"
  dialogTitle : string = "Add"
  constructor(
    private formBuilder : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private productService:ProductService,
    private dialogRef:MatDialogRef<DialogComponent>,
  ) { }
  // TODO: LOOK UP > definite assignement
  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName:['',Validators.required],
      category:['',Validators.required],
      freshness:['',Validators.required],
      price:['',[Validators.required, Validators.min(0)]],
      comment:['',Validators.required],
      date:['',Validators.required],
    })
    // console.log(this.editData);
    if(this.editData){
      this.actionButton = "Update"
      this.dialogTitle = "Update"
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
    }
  }
  addProduct(){
    // console.log(this.productForm.value);
    if(!this.editData){
      if(this.productForm.valid){
        this.productService.postProduct(this.productForm.value).subscribe({
          next:(res)=>{
            alert("product added succesfully")
            this.productForm.reset()
            this.dialogRef.close('save')
          },
          error:(err)=>{
            // alert("error while adding the product")
            console.log(`error while adding product ${err}`)
          }
        })
      }
    }else{
      this.updateProduct()
    }
  }
  updateProduct(){
    this.productService.updateProduct(this.productForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert('Product updated')
        this.productForm.reset()
        this.dialogRef.close('update')
      },
      error:(err)=>{
        // alert(err)
        console.log(`error while updating product ${err}`)
      }
    })
  }
  deleteProduct(){
    this.productService.deleteProduct(this.editData.id).subscribe({
      next:(res)=>{
        alert('Product deleted successfully')
      },
      error:(err)=>{
        console.log(`error while deleting product ${err}`)
      }
    })
  }
}
