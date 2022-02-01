import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { ProductService } from './services/product.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angularCrudJsonServer';
  // button : HTMLButtonElement = document.get
  displayedColumns: string[] = ['id', 'productName', 'category', 'date','freshness','price','comment','actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private dialog:MatDialog,
    private productService:ProductService,
  ){}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.getAllProducts();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'50%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllProducts()
      }
    })
  }
  getAllProducts(){
    this.productService.getProduct().subscribe({
      next:(res)=>{
        // console.log(res)
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  editProduct(row : any){
    this.dialog.open(DialogComponent, {
      width:'50%',
      data:row
    }).afterClosed().subscribe(val=>{
      if (val === 'update'){
        this.getAllProducts()
      }
    })
  }
  deleteProduct(id:number){
    this.productService.deleteProduct(id)
    .subscribe({
      next:(res)=>{
        alert("Product deleted successfully")
        this.getAllProducts()
      },
      error:(err)=>{
        alert(`Error while deleting the record ${err}`)
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
